<template>
    <div class="polygonalChart3">
        <div class="polygonal3_top"></div>

        <div class="polygonal3_bottom"></div>
    </div>
</template>

<script>
import * as d3 from 'd3';
    export default {
        name: "Polygonal3",
        data(){
            return{
                
            }
        },
        mounted(){
            this.getPolygonal3_top();
            this.getPolygonal3_bottom()
        },
        methods:{
            getPolygonal3_top(){
                //配置参数
                let option = {
                   data : [
                        {colorLine : "#57cb73",value : [510,700,1500,500,100,600]},
                        {colorLine : "#75a0ea",value : [800,1400,400,1800,500,700]},
                    ],
                    xText:[2014,2015,2016,2017,2018,2019],
                    width : 444,
                    height : 134,
                    posL:20
                };
                let datas = option.data;
                //定义折线颜色数组
                let colorsLine = [];
                datas.forEach(function (item,index) {
                    colorsLine.push(item.colorLine);
                })
                //找出所有数据中的最大值
                let maxNum = 0;
                for (let i = 0; i < datas.length; i ++){
                    let maxOne = d3.max(datas[i].value,function (d) {
                        return d;
                    })
                    if (maxOne > maxNum){
                        maxNum = maxOne;
                    }
                }
                
                let marge = {
                    top : 18, 
                    bottom : 50, 
                    left : 50, 
                    right : 30
                };
                 //定义画布
                let svg = d3.select(".polygonal3_top")
                    .append("svg")
                    .attr("width",option.width)
                    .attr("height",option.height)
                    // .style('border','1px solid black')
                //创建分组
                let g = svg.append("g")
                    .attr("class","gBox")
                    .attr("transform","translate("+option.posL+","+ marge.top +")");
            
                //设置比例尺
                let scale_x = d3.scaleLinear()
                    .domain([0,option.xText.length-1]) //x轴的数值个数
                    .range([0,option.width-marge.left-marge.right-10]);
                let scale_y = d3.scaleLinear()
                    .domain([0,maxNum])
                    .range([option.height-marge.top-marge.bottom,0]);
                //添加x轴
                let x_axis = d3.axisBottom(scale_x)
                    .ticks(option.xText.length) //自定义刻度
                    .tickFormat(d3.format("d")) //显示设置刻度格式
                    .tickSizeInner(0)
                    .tickSizeOuter(0)
                    .tickPadding(10); //设置刻度和标签之间的填充
                //显示x轴
                g.append("g")
                    .attr("class","axis1")
                    .call(x_axis)
                    .attr("transform","translate("+marge.left+","+(option.height-marge.bottom)+")")
                    .selectAll("text")
                    .text(function (d,i) {
                        return option.xText[i]
                    })
                    .style("font-size","12");
                //创建y轴
                let y_axis = d3.axisLeft(scale_y)
                    .ticks(5) //自定义刻度
                    .tickFormat(d3.format("d")) //显示设置刻度格式
                    .tickSizeInner(-option.width+marge.bottom)    //刻度线长短
                    .tickSizeOuter(0)
                    .tickPadding(8); //设置刻度和标签之间的填充
                
                //显示y轴
                g.append("g")
                    .attr("class","axis")
                    .call(y_axis)
                    .style("font-size","12")
                    .attr("transform","translate("+marge.right+","+marge.top+")");
                //去掉纵轴的竖线
                g.selectAll(".axis path")
                    .attr("fill","none")
                    .attr("stroke-width","5px")
                    .attr("stroke","transparent")
                    .attr("shape-rendering","crispEdges")
                //渐变色
                let defs1 = g.append("defs");
                // 渐变定义
                let linearGradient1 = defs1.append("linearGradient")
                    .attr("id","linearColor1")
                    .attr("x1","0%")
                    .attr("y1","0%")
                    .attr("x2","0%")
                    .attr("y2","100%");
                let stop1 = linearGradient1.append("stop")
                    .attr("offset","0%")
                    .style("stop-color","#57cb73")
                    .attr("stop-opacity","1");
                let stop2 = linearGradient1.append("stop")
                    .attr("offset","100%")
                    .style("stop-color","#57cb73")
                    .attr("stop-opacity","0.1");

                let defs2 = g.append("defs");
                // 渐变定义
                let linearGradient2 = defs2.append("linearGradient")
                    .attr("id","linearColor2")
                    .attr("x1","0%")
                    .attr("y1","0%")
                    .attr("x2","0%")
                    .attr("y2","100%");
                let stop21 = linearGradient2.append("stop")
                    .attr("offset","0%")
                    .style("stop-color","#75a0ea")
                    .attr("stop-opacity","1");
                let stop22 = linearGradient2.append("stop")
                    .attr("offset","100%")
                    .style("stop-color","#75a0ea")
                    .attr("stop-opacity","0.1");
                //画折线函数
                let line_generator = d3.line()//创建一个线线生成器
                    .x(function (d,i) { //x访问器
                        return scale_x(i);
                    })
                    .y(function (d) { //y访问器
                        return scale_y(d);
                    })
                    .curve(d3.curveNatural);//曲线样式
                //画路径
                g.selectAll(".pathLine")
                    .data(datas)
                    .enter()
                    .append("path")
                    .attr("class","pathLine")
                    .attr("d",function (d,i) {
                        return line_generator(d.value)
                    })
                    .attr("transform","translate("+marge.left+","+marge.top+")")
                    .attr("fill","none")
                    .attr("stroke-width","2")
                    .attr("stroke",function(d,i){
                        return colorsLine[i]
                    })
                //画面积函数
                let area_generator = d3.area()
                    .x(function (d,i) {
                    return scale_x(i);
                    })
                    .y0(option.height-marge.top-marge.bottom)
                    .y1(function (d,i) {
                    return scale_y(d);
                    })
                    .curve(d3.curveNatural);
                //画面积（填充）
                g.selectAll(".pathArea")
                    .data(datas)
                    .enter()
                    .append("path")
                    .attr("class","pathArea")
                    .attr("d",function (d,i) {
                    return area_generator(d.value);
                    })
                    .attr("transform","translate("+marge.left+","+marge.top+")")
                    .attr("fill",function (d,i) {
                    if (i == 0) { //关闭
                        return "url(#" + linearGradient1.attr("id") + ")";
                    }
                    if (i == 1){ //发起
                        return "url(#" + linearGradient2.attr("id") + ")";
                    }
                    })
                
            },
            getPolygonal3_bottom(){
                //配置参数
                let option = {
                   data : [
                        {colorLine : "#9761e5",value : [40,300,450,120,90,120,200,310,210,140,190,110]},
                        {colorLine : "#57cb73",value : [10,110,250,490,120,400,150,210,400,100,300,50]},                   
                        {colorLine : "#75a0ea",value : [10,90,150,350,220,320,60,410,120,300,50,100]}
                    ],
                    xText:[1,2,3,4,5,6,7,8,9,10,11,12],
                    width : 444,
                    height : 134,
                    posL:20
                };
                let datas = option.data;
                //定义折线颜色数组
                let colorsLine = [];
                datas.forEach(function (item,index) {
                    colorsLine.push(item.colorLine);
                })
                //找出所有数据中的最大值
                let maxNum = 0;
                for (let i = 0; i < datas.length; i ++){
                    let maxOne = d3.max(datas[i].value,function (d) {
                        return d;
                    })
                    if (maxOne > maxNum){
                        maxNum = maxOne;
                    }
                }
                
                let marge = {
                    top : 18, 
                    bottom : 50, 
                    left : 50, 
                    right : 30
                };
                 //定义画布
                let svg = d3.select(".polygonal3_bottom")
                    .append("svg")
                    .attr("width",option.width)
                    .attr("height",option.height)
                    // .style('border','1px solid black')
                //创建分组
                let g = svg.append("g")
                    .attr("class","gBox")
                    .attr("transform","translate("+option.posL+","+ marge.top +")");
            
                //设置比例尺
                let scale_x = d3.scaleLinear()
                    .domain([0,option.xText.length-1]) //x轴的数值个数
                    .range([0,option.width-marge.left-marge.right-10]);
                let scale_y = d3.scaleLinear()
                    .domain([0,maxNum])
                    .range([option.height-marge.top-marge.bottom,0]);
                //添加x轴
                let x_axis = d3.axisBottom(scale_x)
                    .ticks(option.xText.length) //自定义刻度
                    .tickFormat(d3.format("d")) //显示设置刻度格式
                    .tickSizeInner(0)
                    .tickSizeOuter(0)
                    .tickPadding(10); //设置刻度和标签之间的填充
                //显示x轴
                g.append("g")
                    .attr("class","axis1")
                    .call(x_axis)
                    .attr("transform","translate("+marge.left+","+(option.height-marge.bottom)+")")
                    .selectAll("text")
                    .text(function (d,i) {
                        return option.xText[i]
                    })
                    .style("font-size","12");
                //创建y轴
                let y_axis = d3.axisLeft(scale_y)
                    .ticks(5) //自定义刻度
                    .tickFormat(d3.format("d")) //显示设置刻度格式
                    .tickSizeInner(-option.width+marge.bottom)    //刻度线长短
                    .tickSizeOuter(0)
                    .tickPadding(8); //设置刻度和标签之间的填充
                
                //显示y轴
                g.append("g")
                    .attr("class","axis")
                    .call(y_axis)
                    .style("font-size","12")
                    .attr("transform","translate("+marge.right+","+marge.top+")");
                //去掉纵轴的竖线
                g.selectAll(".axis path")
                    .attr("fill","none")
                    .attr("stroke-width","5px")
                    .attr("stroke","transparent")
                    .attr("shape-rendering","crispEdges")
                //渐变色
                let defs1 = g.append("defs");
                // 渐变定义
                let linearGradient1 = defs1.append("linearGradient")
                    .attr("id","linearColor1")
                    .attr("x1","0%")
                    .attr("y1","0%")
                    .attr("x2","0%")
                    .attr("y2","100%");
                let stop1 = linearGradient1.append("stop")
                    .attr("offset","0%")
                    .style("stop-color","#75a0ea")
                    .attr("stop-opacity","1");
                let stop2 = linearGradient1.append("stop")
                    .attr("offset","100%")
                    .style("stop-color","#75a0ea")
                    .attr("stop-opacity","0.1");

                //画折线函数
                let line_generator = d3.line()//创建一个线线生成器
                    .x(function (d,i) { //x访问器
                        return scale_x(i);
                    })
                    .y(function (d) { //y访问器
                        return scale_y(d);
                    })
                    .curve(d3.curveNatural);//曲线样式
                //画路径
                g.selectAll(".pathLine")
                    .data(datas)
                    .enter()
                    .append("path")
                    .attr("class","pathLine")
                    .attr("d",function (d,i) {
                        return line_generator(d.value)
                    })
                    .attr("transform","translate("+marge.left+","+marge.top+")")
                    .attr("fill","none")
                    .attr("stroke-width","2")
                    .attr("stroke",function(d,i){
                        return colorsLine[i]
                    })
                //画面积函数
                let area_generator = d3.area()
                    .x(function (d,i) {
                    return scale_x(i);
                    })
                    .y0(option.height-marge.top-marge.bottom)
                    .y1(function (d,i) {
                    return scale_y(d);
                    })
                    .curve(d3.curveNatural);
                //画面积（填充）
                g.selectAll(".pathArea")
                    .data(datas)
                    .enter()
                    .append("path")
                    .attr("class","pathArea")
                    .attr("d",function (d,i) {
                    return area_generator(d.value);
                    })
                    .attr("transform","translate("+marge.left+","+marge.top+")")
                    .attr("fill",function(d,i){
                        
                        // if (i == 2) { //关闭
                        //     return "url(#" + linearGradient1.attr("id") + ")";
                        // }else{
                            return colorsLine[i]
                        // }
                    })
                
            },
        }
    }
</script>

<style scoped>


</style>