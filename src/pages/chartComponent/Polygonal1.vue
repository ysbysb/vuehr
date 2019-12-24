<template>
    <div class="polygonalChart1">
        <div class="polygonal1">

        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';
    export default {
        name: "Polygonal1",
        data(){
            return{
            }
        },
        mounted(){
            this.getPolygonal1()
        },
        methods:{
            getPolygonal1(){    
                let option = { //配置参数
                    //模拟数据
                    data : [
                        {colorLine : "#4dcccb",value : [45,55,42,70,50,60,38,57,59,55,46,68]},
                        {colorLine : "#57cb73",value : [90,90,76,79,93,81,72,78,88,76,79,78]},
                    ],
                    //定义折线图x轴数据
                    xText : [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019],
                    width : 550,
                    height : 268,
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
                let svg = d3.select(".polygonal1")
                    .append("svg")
                    .attr("width",option.width)
                    .attr("height",option.height);
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
                    // .ticks(20) //自定义刻度
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
                //画折线函数
                let line_generator = d3.line()//创建一个线线生成器
                    .x(function (d,i) { //x访问器
                        return scale_x(i);
                    })
                    .y(function (d) { //y访问器
                        return scale_y(d);
                    })
                    // .curve(d3.curveNatural);//曲线样式
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
                    .attr("stroke-width","1")
                    .attr("stroke",function(d,i){
                        return colorsLine[i]
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
                            return 5;
                        })
                }

            }
        }
    }
</script>

<style scoped>

</style>