<template>
                      <div class="resume_preview_page" style="width:1920px;height:1080px;background-color: rgba(19, 206, 102, 0.8)" >
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
                      import getPie1 from './getPie1'
                       import getPie2 from './getPie2'
                      export default {
                          //需要返回页面的data
                          data() {
                            return {
                              websock:{},
                              websocketdata: [{"comname":"getPie1","comdata":null},{"comname":"getPie2","comdata":null}]
                            }
                          },
                          components:{
                               /*需要自己引入子组件,组件名为子组件的文件名*/
                               getPie1,
                               getPie2
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
                  </script>