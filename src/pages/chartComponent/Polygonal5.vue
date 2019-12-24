<template>
    <div class="polygonalChart5">
        <div class="polygonal5">

        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';
    export default {
        name: "Polygonal5",
        data(){
            return{
            }
        },
        mounted(){
            this.getPolygonal5()
        },
        methods:{
            getPolygonal5(){
                let option = { //配置参数
                    //模拟数据
                    data :[
                         {colorLine : "#75a0ea",value : [45,65,42,100,50]}
                    ],
                    //定义折线图x轴数据
                    xText : ["xxx","xxx","xxx","xxx","xxx"],
                    width : 550,
                    height : 268,
                    posL:20
                };
                let datas = option.data;
                let marge = {
                    top : 18, 
                    bottom : 50, 
                    left : 50, 
                    right : 30
                };
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

                 //定义画布
                let svg = d3.select(".polygonal5")
                    .append("svg")
                    .attr("width",option.width)
                    .attr("height",option.height); 
                //创建分组
                let g = svg.append("g")
                    .attr("class","gBox")
                    .attr("transform","translate("+option.posL+","+ marge.top +")");

                // //定义背景填充
                // let defss=svg.append("defs");
                // let pattern=defss.append("pattern")
                //     .attr("id","patter-0")
                //     .attr("height","1")
                //     .attr("width","1")
                //     .attr("patternContentUnits","objectBoundingBox")
                // let image=pattern.append("image")
                //     .attr("height","1")
                //     .attr("width","1")
                //     .attr("preserveAspectRatio","none")
                //     .attr("xlink:href","../../../static/img//zoubiantanchaung.png")


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
                    .attr("class","axis")
                    .call(x_axis)
                    .attr("transform","translate("+marge.left+","+(option.height-marge.bottom)+")")
                    .selectAll("text")
                    .style("font-size","12")
                    .text(function (d,i) {
                        return option.xText[i]
                    });
                //创建y轴
                let y_axis = d3.axisLeft(scale_y)
                    .ticks(5) //自定义刻度
                    .tickFormat(d3.format("d")) //显示设置刻度格式
                    .tickSizeInner(-option.width+marge.bottom)    //刻度线长短
                    .tickSizeOuter(0)
                    .tickPadding(10); //设置刻度和标签之间的填充
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
                    .style("stop-color","#75a0ea")
                    .attr("stop-opacity","0.9");
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
                    .attr("stroke-width","3")
                    .attr("stroke",function(d,i){
                        return colorsLine[i]
                    });
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
                        return "url(#" + linearGradient1.attr("id") + ")";
                    })
                //画圆点
                for (let j = 0; j < datas.length; j ++){
                    g.selectAll(".circle")
                        .data(datas[j].value)
                        .enter()
                        .append("circle")
                        .attr("class","circle"+j)
                        .attr("transform","translate("+marge.left+","+marge.top+")")
                        .attr("fill",function(d){
                            return colorsLine[j]
                        })
                        .attr("cx",function (d,i) {
                            return scale_x(i);
                        })
                        .attr("cy",function (d,i) {
                            return scale_y(d);
                        })
                        .attr("r",function () {
                            return 3;
                        })
                        .attr("stroke-width","3px")
                        .attr("stroke","#87e6e5")

                        
                }


            }
        }
    }
</script>

<style scoped>

</style>