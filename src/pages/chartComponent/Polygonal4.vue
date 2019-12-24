<template>
    <div class="polygonalChart4">
        <div class="polygonal4">

        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';
    export default {
        name: "Polygonal4",
        data(){
            return{
                
            }
        },
        mounted(){
            this.getPolygonal4()
        },
        methods:{
           getPolygonal4(){
               let option = {
                    width : 590,
                    height : 268,
                    barData:[2000,1500,780,2241,5164,947,3013,2143,1832,1232],
                    barColor:"#4dcccb",
                    barTextColor:"#4dcccb",
                    rectWidth:16,

                    polydata:[3024,2135,2014,2998,3978,4217,3927,3026,2296,1793],
                    polyColor:"#b58cef",
                    polyTextColor:"#b58cef",

                    xText:["xxx","xxx","xxx","xxx","xxx","xxx","xxx","xxx","xxx","xxx"],
                    posL:10,
               };
               let marge = {
                    top : 18, 
                    bottom : 50, 
                    left : 50, 
                    right : 30
                };

                //定义画布
                let svg = d3.select(".polygonal4")
                    .append("svg")
                    .attr("width",option.width)
                    .attr("height",option.height)
                    // .style('border','1px solid black')
                //创建分组
                let g = svg.append("g")
                    .attr("class","gBox")
                    .attr("transform","translate("+option.posL+","+ marge.top +")");
                
                //求两组数据的最大值
                let num1 = option.barData;
                let num2 = option.polydata;
                let newArr = num1.concat(num2);
                let maxNum = d3.max(newArr);    //两个数组的最大值  

               //定义柱状图x,y轴比例尺
                let scale_x= d3.scaleLinear()
                    .domain([0,option.xText.length-1])
                    .range([0,option.width-marge.left-marge.right]);

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
                    .attr("class","axis")
                    .call(x_axis)
                    .attr("transform","translate("+marge.left+","+(option.height-marge.bottom)+")")
                    .selectAll("text")
                    .text(function (d,i) {
                        return option.xText[i]
                    })
                    .style("font-size","12")
                    .style("color",option.barTextColor);
                //创建y轴
                let y_axis = d3.axisLeft(scale_y)
                    .ticks(5) //自定义刻度
                    .tickFormat(d3.format("d")) //显示设置刻度格式
                    .tickSizeInner(-option.width+marge.bottom)    //刻度线长短
                    .tickSizeOuter(0)
                    .tickPadding(8) ; //设置刻度和标签之间的填充
                
                //显示y轴
                g.append("g")
                    .attr("class","axis")
                    .call(y_axis)
                    .style("font-size","12")
                    .style("color",option.barTextColor)
                    .attr("transform","translate("+marge.right+","+marge.top+")");
                //去掉纵轴的竖线
                g.selectAll(".axis path")
                    .attr("fill","none")
                    .attr("stroke-width","5px")
                    .attr("stroke","transparent")
                    .attr("shape-rendering","crispEdges");
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
                    .style("stop-color","#87e6e5")
                    .attr("stop-opacity","1");
                let stop2 = linearGradient1.append("stop")
                    .attr("offset","100%")
                    .style("stop-color","#87e6e5")
                    .attr("stop-opacity","0");

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
                    .data(option.polydata)
                    .enter()
                    .append("path")
                    .attr("class","pathLine")
                    .attr("d",function (d,i) {
                        return line_generator(option.polydata)
                    })
                    .attr("transform","translate("+marge.left+","+marge.top+")")
                    .attr("fill","none")
                    .attr("stroke-width","2")
                    .attr("stroke",option.polyColor);
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
                    .data(option.polydata)
                    .enter()
                    .append("path")
                    .attr("class","pathArea")
                    .attr("d",function (d,i) {
                        return area_generator(option.polydata);
                    })
                    .attr("transform","translate("+marge.left+","+marge.top+")")
                    .attr("fill",function (d,i) {
                        return "url(#" + linearGradient1.attr("id") + ")";
                    })
                 //画圆点
                for (let j = 0; j < option.polydata.length; j ++){
                    let cs = g.selectAll(".circle")
                        .data(option.polydata)
                        .enter()
                        .append("g");
                    cs.append("circle")
                        .attr("class","circle"+j)
                        .attr("transform","translate("+marge.left+","+marge.top+")")
                        .attr("fill",option.polyColor)
                        .attr("cx",function (d,i) {
                            return scale_x(i);
                        })
                        .attr("cy",function (d,i) {
                            return scale_y(d);
                        })
                        .attr("r",function () {
                            return 5;
                        });
                    cs.append("text")
                        .attr("x",function(d,i){
                            return scale_x(i)+marge.left-16
                        })
                        .attr("y",function(d,i){
                            return scale_y(d)+marge.top/2
                        })
                        .text(function(d){
                            return d
                        })
                        .style("font-size","12")
                        .attr("fill",option.polyTextColor);
                    
                }
                
                //创建矩形
                let gs = g.selectAll(".rect")
                    .data(option.barData)
                    .enter()
                    .append("g");
                gs.append("rect")   //添加矩形
                    .attr("x",function(d,i){
                        return scale_x(i)+marge.left-option.rectWidth/2     
                    })
                    .attr("y",function(d,i){
                        return scale_y(d)+marge.top;
                    })
                    .attr("width",function(){
                        return option.rectWidth
                    })
                    .attr("height",function(d){
                        return option.height-marge.top-marge.bottom-scale_y(d);
                    })
                    .attr("fill",option.barColor);
                gs.append("text")
                    .attr("x",function(d,i){
                        return scale_x(i)+marge.left-16
                    })
                    .attr("y",function(d,i){
                        return scale_y(d)+option.rectWidth
                    })
                    // .attr("dx",function(){
                    // 		(scale_x.step()-rectPadding)/2;
                    // 	})
                    // .attr("dy",20)
                    .text(function(d){
                        return d
                    })
                    .style("font-size","12")
                    .attr("fill",option.barTextColor);

           }
        }
    }
</script>

<style scoped>

</style>