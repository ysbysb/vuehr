<template>
                      <div id="getPie2" name="getPie2" style="position:absolute;left:395px;top:35px">
                          <svg id="chartd14cd" width="400" height="190" class="pieChart" disposeData="30,20,43,55,13,30" disposeColor="#a54aa5,#ca5145,#fe9a87,#ffed88,#88ddeb,#60a9e7,#d48bfe,#014e71,#9f3ea0,#c64739,#ff947f,#feeb80,#82dbec,#55a4e4" disposeLeft="0px" disposeTop="0px" disposeInnerR="62.99999999999999" disposeOuterR="90" style="position: absolute; left: 0px; top: 0px; cursor: pointer;"><g class="main"><g class="gBox" transform="translate(200,95)"><path fill="#a54aa5" d="M5.5109105961630896e-15,-90A90,90,0,0,1,75.08828424960703,-49.61602128798938L52.561798974724915,-34.731214901592566A62.99999999999999,62.99999999999999,0,0,0,3.857637417314162e-15,-62.99999999999999Z"></path></g><g class="gBox" transform="translate(200,95)"><path fill="#ca5145" d="M75.08828424960703,-49.61602128798938A90,90,0,0,1,89.75358208913592,6.655411495072389L62.82750746239513,4.658788046550672A62.99999999999999,62.99999999999999,0,0,0,52.561798974724915,-34.731214901592566Z"></path></g><g class="gBox" transform="translate(200,95)"><path fill="#fe9a87" d="M89.75358208913592,6.655411495072389A90,90,0,0,1,7.393317357131551,89.69581293715297L5.175322149992085,62.78706905600707A62.99999999999999,62.99999999999999,0,0,0,62.82750746239513,4.658788046550672Z"></path></g><g class="gBox" transform="translate(200,95)"><path fill="#ffed88" d="M7.393317357131551,89.69581293715297A90,90,0,0,1,-88.90349933534628,-14.005991786734787L-62.23244953474239,-9.80419425071435A62.99999999999999,62.99999999999999,0,0,0,5.175322149992085,62.78706905600707Z"></path></g><g class="gBox" transform="translate(200,95)"><path fill="#88ddeb" d="M-88.90349933534628,-14.005991786734787A90,90,0,0,1,-75.08828424960704,-49.61602128798937L-52.56179897472492,-34.73121490159255A62.99999999999999,62.99999999999999,0,0,0,-62.23244953474239,-9.80419425071435Z"></path></g><g class="gBox" transform="translate(200,95)"><path fill="#60a9e7" d="M-75.08828424960704,-49.61602128798937A90,90,0,0,1,-1.6532731788489267e-14,-90L-1.1572912251942486e-14,-62.99999999999999A62.99999999999999,62.99999999999999,0,0,0,-52.56179897472492,-34.73121490159255Z"></path></g><g class="text" transform="translate(200,95)"><text transform="translate(36.235122572915984,-67.37407433223669)" style="font-size: 12px; text-anchor: middle;">30</text></g><g class="text" transform="translate(200,95)"><text transform="translate(74.02728402483228,-19.292776365956495)" style="font-size: 12px; text-anchor: middle;">20</text></g><g class="text" transform="translate(200,95)"><text transform="translate(54.315645716295414,53.87077714700132)" style="font-size: 12px; text-anchor: middle;">43</text></g><g class="text" transform="translate(200,95)"><text transform="translate(-56.05808653739032,52.05517201745144)" style="font-size: 12px; text-anchor: middle;">55</text></g><g class="text" transform="translate(200,95)"><text transform="translate(-71.32074826622737,-27.66949343131214)" style="font-size: 12px; text-anchor: middle;">13</text></g><g class="text" transform="translate(200,95)"><text transform="translate(-36.235122572916026,-67.37407433223666)" style="font-size: 12px; text-anchor: middle;">30</text></g></g></svg>
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
                  </script>