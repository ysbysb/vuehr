
function  exportVUE(the){
  console.log(the)
  /*获取所有的图表组件*/
  var options=[]
  var websocketdata=[]
  var docnamehtml=[]
  var dLi=document.querySelectorAll('.showArea div')
  console.log(dLi.length)
  for(var i=0;i<dLi.length;i++){//循环遍历所有的图表组件拆出来将名字，内容，类型存起来
    var comname=dLi[i].getAttribute("name")
    var comtype=dLi[i].getAttribute("class")
    var comhtml=dLi[i].innerHTML
    websocketdata.push({comname:comname,comdata:null})
    options.push({comname:comname,comhtml:comhtml,comtype:comtype})
  }
  /*父组件的文本*/
  console.log(options);
  let html = `<template>
                      <div class="resume_preview_page">
                         <component  v-for="(item,index) in websocketdata" :is="item.comname" :name="item.comname" :dataset="item.comdata" :id="item.comname" ></component>
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
                  </style>
                  <script>
                      import * as d3 from 'd3';
                      /*需要自己引入子组件,组件名为子组件的文件名*/
                      export default {
                          //需要返回页面的data
                          data() {
                            return {
                              websock:{},
                              websocketdata: `+JSON.stringify(websocketdata)+`
                            }
                          },
                          components:{
                               /*需要自己引入子组件,组件名为子组件的文件名*/
                         },
                          created(){                   
                            this.initWebSocket();
                          },
                          methods:{
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
                                this.websocketdata = [
                                  {"comname":"getBar1","dataset":result},
                                  {"comname":"getBar2","dataset":result},
                                
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
  /*将父组件的文件名和文本内容存起来*/
  docnamehtml.push({chartName:"xiazai",param:html})
  /*遍历每个图表组件对象判断图表类型来给相对应的子组件内容 并将名字和子组件的内容存起来*/
  options.forEach(function(v,i){
    if(v.comtype=="getBar"){
      var template = v.comhtml
      let html = `<template>
                      <div id="`+v.comname+`" name="`+v.comname+`">
                          ${template}
                      </div>
                  </template>
                  <script>
                      import * as d3 from 'd3';
                      export default {
                          //需要返回页面的data
                           props:['name','dataset','id'],
                          data() {
                            return {
                              
                            }
                          },
                          created(){
                            this.getBar(this.dataset);
                          },
                          methods:{
                            getBar(data){
                              /*清空图表*/
                              if(data == null){
                                 var svgelement=document.getElementById(this.id).firstElementChild
                                 var option = { //配置参数
                                  width: svgelement.getAttribute('width'),
                                  height: svgelement.getAttribute('height'),
                                  dataset: svgelement.getAttribute('disposeData').split(","),
                                  posL:svgelement.getAttribute('disposeLeft'),
                                  posT:svgelement.getAttribute('disposeposT'),
                                  rectPadding: svgelement.getAttribute('disposeRectPad'),
                                  color: svgelement.getAttribute('disposeColor').split(",")
                                };
                                
                              }else{
                                var svgelement=document.getElementById(this.id).firstElementChild
                                 var option = { //配置参数
                                  width: svgelement.getAttribute('width'),
                                  height: svgelement.getAttribute('height'),
                                  dataset: data,
                                  posL:svgelement.getAttribute('disposeLeft'),
                                  posT:svgelement.getAttribute('disposeposT'),
                                  rectPadding: svgelement.getAttribute('disposeRectPad'),
                                  color: svgelement.getAttribute('disposeColor').split(",")
                                }; 
                              }
                               document.getElementById(this.id).firstElementChild.remove();
                                var marge = {top:50,bottom:50,left:50,right:50};
                              let svg = d3.select("#"+this.id)
                                .append("svg") //创建svg画布
                                .attr("class","barChart")
                                .attr("id",option.parentClass)
                                .attr("width",option.width)
                                .attr("height",option.height)
                                .style("position","absolute")
                                .style("left",option.posL)
                                .style("top",option.posT)
                                .attr("disposeLeft", option.posL)
                                .attr("disposeTop", option.posT)
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
                    
                        
                            }
                          }
                      }
                  </script>`;
      docnamehtml.push({chartName:v.comname,param:html})

    }else if(v.comtype=="getPie"){
      var template = v.comhtml
      let html = `<template>
                      <div id="`+v.comname+`" name="`+v.comname+`">
                          ${template}
                      </div>
                  </template>
                  <script>
                      import * as d3 from 'd3';
                      export default {
                          //需要返回页面的data
                           props:['name','dataset','id'],
                          data() {
                            return {
                              
                            }
                          },
                          created(){
                            this.getPie(this.dataset);
                          },
                          methods:{
                            getPie(data){
                              /*清空图表*/
                              if(data == null){
                                 var svgelement=document.getElementById(this.id).firstElementChild
                                 var option = { //配置参数
                                  width: svgelement.getAttribute('width'),
                                  height: svgelement.getAttribute('height'),
                                  dataset: svgelement.getAttribute('disposeData').split(","),
                                  posL:svgelement.getAttribute('disposeLeft'),
                                  posT:svgelement.getAttribute('disposeTop'),
                                  innerRadius: target.getAttribute('disposeInnerR'),
                                  outerRadius: target.getAttribute('disposeOuterR'),
                                  color: svgelement.getAttribute('disposeColor').split(",")
                                };
                                
                              }else{
                                var svgelement=document.getElementById(this.id).firstElementChild
                                 var option = { //配置参数
                                  width: svgelement.getAttribute('width'),
                                  height: svgelement.getAttribute('height'),
                                  dataset: data,
                                  posL:svgelement.getAttribute('disposeLeft'),
                                  posT:svgelement.getAttribute('disposeTop'),
                                  innerRadius: target.getAttribute('disposeInnerR'),
                                  outerRadius: target.getAttribute('disposeOuterR'),
                                  color: svgelement.getAttribute('disposeColor').split(",")
                                }; 
                              }
                               document.getElementById(this.id).firstElementChild.remove();
                                var padding = {
                                top: 5,
                                bottom: 5,
                                left: 5,
                                right: 5
                              };
                        
                              function computeDelay(index) {
                                var delay = 0;
                                for (var i = 0; i < index; i++) {
                                  delay += 0.55
                                }
                                return delay * time;
                              }
                        
                              var pieRadius = 0; //圆环内外径
                              if(option.width > option.height){
                                pieRadius = (option.height-padding.top-padding.bottom)/2;
                              }else{
                                pieRadius = (option.width-padding.left-padding.right)/2;
                              }
                              var innerRadius = option.innerRadius = pieRadius*0.7;
                              var outerRadius = option.outerRadius = pieRadius;
                        
                              if(cxxr || _this.reEdit){
                                _this.parentClass = option.className;
                              }else{
                                _this.parentClass = 'chart'+this.getRandom(5);
                                option.className = _this.parentClass;
                              }
                              var svg = d3.select("#"+this.id)
                                .append("svg")
                                .attr("id",_this.parentClass)
                                .attr("width", option.width)
                                .attr("height", option.height)
                                .attr("class", "pieChart")
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
                                .sort(null)
                                .startAngle(0);
                        
                              // var innerRadius = option.innerRadius;
                              // var outerRadius = option.outerRadius;
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
                                .attr("transform", "translate(" + option.width / 2 + "," + option.height / 2 + ")");
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
                    
                        
                            }
                          }
                      }
                  </script>`;
      docnamehtml.push({chartName:v.comname,param:html})
    }
  })
  /*遍历所有存起来的文件名，和文件内容并下载*/
  docnamehtml.forEach(function(v,i){
    var a = document.createElement('a');
    var url = window.URL.createObjectURL(new Blob([v.param],{ type: "text/plain;charset='utf-8'" }));
    a.href = url;
    a.download = v.chartName+".vue";
    a.click();
    window.URL.revokeObjectURL(url);
  })

}
export {
  exportVUE
}
