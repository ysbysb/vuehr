
function  exportVUE(aa){

  /*只生成中间区域的文本VUE*/
  var template = aa.getElementsByClassName('showArea')[0].innerHTML;
  console.log(template);
  let html = `<template>
                      <div class="resume_preview_page">
                          ${template}
                      </div>
                  </template>
                  <style scoped>
                     *{
    margin:0;
    padding:0;
    border: 0;
    list-style: none;
    box-sizing: border-box;
  }
  html,body {
    width: 100%;
    height: 100%;
    font-family: "微软雅黑";
  }
  .resume_preview_page{
    width:1200px;height:800px;background: rgba(222,222,0,0.3);position:relative;
  }
  .resume_preview_page ul{ /*中间区域分区*/
    width:100%;
    height:100%;
  }
  .resume_preview_page ul li{
    width:49%;
    height:24%;
    margin-right:1%;
    margin-bottom:1%;
    background-color: #c2e7b0;
    float: left;
  }
  .resume_preview_page ul li .chartAll{
    width: 400px;
    margin: auto;
  }
                  </style>
                  <script>
                      import * as d3 from 'd3';
                      export default {
                          //需要返回页面的data
                          data() {
                            return {
                              websock:{}
                            }
                          },
                          created(){
                            this.initWebSocket();
                          },
                          methods:{
                            getPie(option){/*圆环*/
                              /*清空图表*/
                              if(document.getElementsByClassName(option.targets)[0].firstElementChild != null){
                                document.getElementsByClassName(option.targets)[0].firstElementChild.remove();
                              }
                              
                              //画布周边的空白
                              var padding = {
                                top: 5,
                                bottom: 5,
                                left: 5,
                                right: 5
                              };
                              
                              function computeDelay(index) {
                                var delay = 0
                                for (var i = 0; i < index; i++) {
                                  delay += 0.55
                                }
                                return delay * time;
                              }
                        
                              var svg = d3.select("."+option.targets)
                                    .append("svg")
                                    .attr("width", option.width)
                                    .attr("height", option.height)
                                    .attr("class", "pieChart")
                                    .attr("id",option.parentClass)
                                    .style("position","absolute")
                                    .style("left",option.posL)
                                    .style("top",option.posT)
                                    .attr("disposeData", option.dataset)
                                    .attr("disposeColor", option.color)
                                    .attr("disposeInnerR", option.innerRadius)
                                    .attr("disposeOuterR", option.outerRadius)
                                    .style("cursor", "pointer");
                              var g = svg.append("g")
                                .attr("class", "main");
                    
                              var dataset = option.dataset;
                              var pie = d3.pie()
                                .padAngle(0) // padAngle 补白
                                .value(function (d) {
                                  return d
                                })
                                .sort(null);
                    
                              var arc = d3.arc()
                                .innerRadius(option.innerRadius)
                                .outerRadius(option.outerRadius);
                              var pieData = pie(dataset);
                              var time = 500;
                              var pies = g.selectAll(".gBox")
                                .data(pieData)
                                .enter()
                                .append("g")
                                .attr("class", "gBox")
                                .attr("transform", "translate(" + option.width / 2 + "," + option.height / 2 + ")")
                              pies.append("path")
                                .attr("fill", function (d, i) {
                                  return option.color[i];
                                })
                                .transition()
                                .delay(function(d, i) {
                                  return computeDelay(i)
                                })
                                .duration(function(d, i) {
                                  return 0.55 * time
                                })
                                .attrTween('d', function(d) {
                                  var i = d3.interpolate(d.startAngle, d.endAngle);
                                  return function(t) {
                                    d.endAngle = i(t);
                                    return arc(d);
                                  }
                                });
                    
                              var textCenter = g.selectAll(".text")
                                .data(pieData) //返回是pie(data0)
                                .enter()
                                .append("g")
                                .attr("class", "text")
                                .attr("transform", "translate(" + option.width / 2 + "," + option.height / 2 + ")")
                                .append("text")
                                .style("font-size", "12px")
                                .style('text-anchor', "middle")
                                .attr('transform', function (d, i) {
                                  var pos = arc.centroid(d); //将数字放在圆弧中心
                                  return 'translate(' + pos + ')';
                                })
                                .transition()
                                .delay(function(d, i) {
                                  return computeDelay(i)
                                })
                                .duration(function(d, i) {
                                  return 0.55 * time
                                })
                                .text(function (d) {
                                  return d.data;
                                });
                              
                            },
                            getBar(option){
                              /*清空图表*/
                              if(document.getElementsByClassName(option.targets)[0].firstElementChild != null){
                                document.getElementsByClassName(option.targets)[0].firstElementChild.remove();
                              }
                        
                              var marge = {top:50,bottom:50,left:50,right:50};
                              let svg = d3.select("."+option.targets)
                                .append("svg") //创建svg画布
                                .attr("class","barChart")
                                .attr("id",option.parentClass)
                                .attr("width",option.width)
                                .attr("height",option.height)
                                .style("position","absolute")
                                .style("left",option.posL)
                                .style("top",option.posT)
                                .attr("disposeData", option.dataset)
                                .attr("disposeColor", option.color)
                                .attr("disposeRectPad", option.rectPadding)
                                .style("cursor","pointer");
                              let g = svg.append("g") //给画布设置称一个分组
                                .attr("transform","translate("+ marge.top +","+ marge.left +")");
                    
                              let xScale = d3.scaleBand() //x轴比例尺
                                .domain(d3.range(option.dataset.length))
                                .range([0,option.width-marge.left-marge.right]);
                              let xAxis = d3.axisBottom(xScale);//x坐标轴
                    
                              let yScale = d3.scaleLinear() //y轴比例尺
                                .domain([0,d3.max(option.dataset)])
                                .range([option.height-marge.top-marge.bottom,0]);
                              let yAxis = d3.axisLeft(yScale); //y坐标轴
                    
                              g.append("g")
                                .attr("transform","translate("+ 0 +","+ (option.height-marge.top-marge.bottom) +")")
                                .call(xAxis); //为柱状图添加x坐标轴
                              g.append("g")
                                .attr("transform","translate(0,0)")
                                .call(yAxis); //为柱状图添加Y坐标轴
                    
                              //绘制矩形和文字
                              let gs = g.selectAll(".rect") //为每个矩形和对应的文字创建一个分组<g>
                                .data(option.dataset)
                                .enter()
                                .append("g");
                    
                              //绘制矩形
                              gs.append("rect")
                                .attr("x",function (d,i) { //生成的矩形距离画布左侧的距离
                                  // console.log(i);
                                  return xScale(i)+option.rectPadding/2;
                                })
                                .attr("y",function (d) { //生成的矩形距离画布顶部的距离
                                  var min = yScale.domain()[0];
                                  return yScale(min);//可以得知，这里返回的是最大值
                                })
                                .attr("width",function () { //根据比例尺来计算出矩形的宽度
                                  return xScale.bandwidth()-option.rectPadding;
                                })
                                .attr("height",function (d) { //画布高度-距离顶部-距离底部-矩形距离顶部的高算出矩形的高度
                                  return 0;
                                })
                                .attr("fill",function (d,i) {
                                  if (option.color.length > 1){
                                    return option.color[i];
                                  } else {
                                    return option.color[0];
                                  }
                                })
                                .transition()//添加过渡
                                .duration(2000)//持续时间
                                .delay(function(d,i){//延迟
                                  return i*300;
                                })
                                .attr("y",function (d) { //生成的矩形距离画布顶部的距离
                                  return yScale(d)
                                })
                                .attr("height",function (d) { //画布高度-距离顶部-距离底部-矩形距离顶部的高算出矩形的高度
                                  return option.height-marge.top-marge.bottom-yScale(d);
                                });
                    
                              //绘制文字
                              gs.append("text")
                                .attr("x",function (d,i) {
                                  return xScale(i)+option.rectPadding/2
                                })
                                .attr("y",function (d) {
                                  var min = yScale.domain()[0];
                                  return yScale(min);
                                })
                                .attr("dx",function () { //文字距离矩形左边的距离
                                  return (xScale.bandwidth() - option.rectPadding*2)/2;
                                })
                                .attr("dy",function () { //文字距离矩形顶部的距离
                                  return 0;
                                })
                                .text(function (d) {
                                  return d;
                                })
                                .style("opacity","0")
                                .transition()//添加过渡
                                .duration(2000)//持续时间
                                .delay(function(d,i){//延迟
                                  return i*300;
                                })
                                .style("opacity","1")
                                .attr("y",function (d) {
                                  return yScale(d)
                                });
                        
                            },
                            getPolygonal1(option){
                              /*清空图表*/
                              if(document.getElementsByClassName(option.targets)[0].firstElementChild != null){
                                document.getElementsByClassName(option.targets)[0].firstElementChild.remove();
                              }
                            let datas = option.dataset;

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
   
      let svg = d3.select("."+option.targets)
        .append("svg") //创建svg画布
        .attr("class","getPolygonal1Chart")
        .attr("id",option.parentClass)
        .attr("width",option.width)
        .attr("height",option.height)
        .style("position","absolute")
        .style("left",option.posL)
        .style("top",option.posT)

        /*图表数据需用于下载功能*/
        .attr("disposeData", option.dataset)
       /* .attr("disposeColor", option.color)
        .attr("disposeRectPad", option.rectPadding)*/
        .style("cursor","pointer");
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

    },
    getPolygonal2(option){
                              /*清空图表*/
                              if(document.getElementsByClassName(option.targets)[0].firstElementChild != null){
                                document.getElementsByClassName(option.targets)[0].firstElementChild.remove();
                              }
                            let datas = option.dataset;

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
   
      let svg = d3.select("."+option.targets)
        .append("svg") //创建svg画布
        .attr("class","getPolygonal2Chart")
        .attr("id",option.parentClass)
        .attr("width",option.width)
        .attr("height",option.height)
        .style("position","absolute")
        .style("left",option.posL)
        .style("top",option.posT)

        /*图表数据需用于下载功能*/
        .attr("disposeData", option.dataset)
      /*  .attr("disposeColor", option.color)
        .attr("disposeRectPad", option.rectPadding)*/
        .style("cursor","pointer");
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

    },
                            chooseFn(item){
                              if(item.targetFN == "getPie"){
                                /*重新渲染图表*/
                                // var target = document.getElementsByClassName(item.parentClass)[0].getElementsByClassName("pieChart")[0];
                                var target = document.querySelector('.'+item.parentClass).querySelector("svg");
                                var option = { //配置参数
                                  width: target.getAttribute('width'),
                                  height: target.getAttribute('height'),
                                  dataset: item.dataset,
                                  innerRadius: target.getAttribute('disposeInnerR'),
                                  outerRadius: target.getAttribute('disposeOuterR'),
                                  color: target.getAttribute('disposeColor').split(","),
                                  targets: item.parentClass,
                                  svgChart: item.targetFN
                                };
                                this.getPie(option);
                              }else if(item.targetFN == "getBar"){                         
                                /*重新渲染图表*/
                                var target = document.getElementsByClassName(item.parentClass)[0].getElementsByClassName("barChart")[0];
                                var option = { //配置参数
                                  width: target.getAttribute('width'),
                                  height: target.getAttribute('height'),
                                  dataset: item.dataset,
                                  rectPadding: target.getAttribute('disposeRectPad'),
                                  color: target.getAttribute('disposeColor').split(","),
                                  targets: item.parentClass,
                                  svgChart: item.targetFN
                                };
                                this.getBar(option);
                              }else if(item.targetFN == "getPolygonal1"){
                                
                                  /*重新渲染图表*/
                                var target = document.getElementsByClassName(item.parentClass)[0].getElementsByClassName("getPolygonal1Chart")[0];
                                var option = { //配置参数
                                  width: target.getAttribute('width'),
                                  height: target.getAttribute('height'),
                                  dataset: item.dataset,
                                  color: target.getAttribute('disposeColor').split(","),
                                  targets: item.parentClass,
                                  svgChart: item.targetFN
                                };
                                this.getPolygonal1(option);
                              }else if(item.targetFN == "getPolygonal2"){
                                
                                  /*重新渲染图表*/
                                var target = document.getElementsByClassName(item.parentClass)[0].getElementsByClassName("getPolygonal2Chart")[0];
                                var option = { //配置参数
                                  width: target.getAttribute('width'),
                                  height: target.getAttribute('height'),
                                  dataset: item.dataset,
                                  color: target.getAttribute('disposeColor').split(","),
                                  targets: item.parentClass,
                                  svgChart: item.targetFN
                                };
                                this.getPolygonal2(option);
                              }
                              
                            },
                            initWebSocket(){ //初始化weosocket
                              var wsuri = this.api+"/innerthreetwoOPS";//ws地址
                              this.websocket = new WebSocket(wsuri);
                              this.websocket.onopen = this.websocketonopen;
                              this.websocket.onerror = this.websocketonerror;
                              this.websocket.onmessage = this.websocketonmessage;
                              this.websocket.onclose = this.websocketclose;
                            },
                            websocketonopen() {
                              console.log("WebSocket连接成功");
                            },
                            websocketonerror(e) { //错误
                              console.log("WebSocket连接发生错误");
                            },
                            websocketonmessage(e){ //数据接收
                              if(e.data != "连接成功") {
                                let redata = JSON.parse(e.data);/*接收后台传递数据*/
                                this.websock = redata;/*赋值给data中数据*/
                                console.log(this.websock);
                                                                
                                var result = [];
                                var n = Math.random() * 15;//这个值可以改变的，对应的生成多少个字母，根据自己需求所改
                                for(var i=0;i<n;i++){
                                //生成一个0到25的数字
                                    var ranNum = Math.ceil(Math.random() * 25);
                                    result.push(ranNum);
                                }
                                this.websock = [
                                  {"parentClass":"chart0","dataset":result,"targetFN":"getPie"},
                                  {"parentClass":"chart1","dataset":result,"targetFN":"getBar"},
                                   {"parentClass":"chart2","dataset":result,"targetFN":"getPolygonal1"},
                                   {"parentClass":"chart3","dataset":result,"targetFN":"getPolygonal2"},
                                ];
                                
                                var _this = this;
                                this.websock.forEach(function (item) {
                                  _this.chooseFn(item);
                                });
                                
                              }
                            },
                            websocketsend(agentData){//数据发送
                              this.websocket.send(agentData);
                            },
                            websocketclose(e){ //关闭
                              console.log("connection closed (" + e.code + ")");
                            }
                          }
                      }
                  </script>`;
  for(var i=0;i<3;i++){
    console.log(i)
    var a = document.createElement('a');
    var url = window.URL.createObjectURL(new Blob([html],{ type: "text/plain;charset='utf-8'" }));
    a.href = url;
    a.download = 'form.vue';
    a.click();
    console.log(url)
    window.URL.revokeObjectURL(url);
  }

}
export {
  exportVUE
}
