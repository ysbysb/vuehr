<template>
    <div class="container">
      <!-- 用户信息界面弹出框 -->
      <userInterface :dialogFormVisible.sync='dialogFormVisible' :userInformation.sync='userInformation'></userInterface>
      <mytemplate :dialogTemVisible.sync='dialogTemVisible' :userId.sync='userId'  ref="paresll"></mytemplate>
      <!--顶层选择框-->
      <div class="container_top" @click="rightMenu">
        <div class="contents">
          <div class="titles">数据可视化一站式平台</div>
          <!--图表选择区域-->
          <div class="chartsFNBox">
            <ul class="chartsFN ulbox"> <!--图表选择区域-->
              <li v-for="(item,index) in chartsFN" @click="clickHandle(item.name,index)" :class="{clickShow:index===clickIndex}">
                <div>
                  <img :src="item.icon"/>
                  <i>{{item.name}}</i>
                </div>
              </li>
            </ul>
          </div>
          <!--网站的保存、浏览、分享、下载、退出,我的场景-->
          <ul class="operations ulbox">
            <li v-for="(item,index) in operations" @click="selectNav(item.name,index)">
              <div>
                <img :src="item.icon"/>
                <i>{{item.name}}</i>
              </div>
            </li>
          </ul>
          <ul class="mytemplate" style="float:left">
            <li>
              <div @click="getmytemplate">
                <img style="display:block;height:25px;margin-top:7px;margin-bottom:6px;text-align:center;vertical-align:middle;margin-left:8px" src="../../../static/img/editPages/sucai.png"/>
                <i>我的场景</i>
              </div>
            </li>
          </ul>

        </div>
        <div class="personalDetails" @click="getUserInformation">
            <img src="../../../static/img/editPages/person.png" class="personIcon"/>
            <img src="../../../static/img/editPages/sanjiaokaobei.png" class="sharp"/>
        </div>
      </div>
      <!--下边控制面板-->
      <div class="container_content" >
        <!--左侧控制面板-->
        <div class="container_left"   @click="rightMenu">
          <div  class="layerBox"><span>图层</span></div>
          <!--上、下移选择-->
          <ul class="moves">
            <li v-for="item in layers"><img :src="item.icon"/></li>
          </ul>
          <!--出现在画布中的图形添加到左边菜单栏中-->
          <div class="menu">
            <ul class="menuBox" id="menuBox">
              <!--图形-->
            </ul>
          </div>
          <!--对画布中的图形进行操作（分组、锁定、添加、替换）-->
          <ul class="known">
            <li v-for="item in known">{{item.name}}</li>
          </ul>
        </div>
        <!--中间画布层-->
        <div class="container_middle"   @click="rightMenu">
          <!--顶层选择框的二级菜单栏-->
          <ul class="listBoxOnce ulboxOnce">
            <li v-for="item in listBoxOnce" class="operationChart">
              <div>
                <img :src="item.icon" :class="item.className" @click="showChart(item.className,item.marks)"/>
                <i>{{item.name}}</i>
              </div>
            </li>
            <li class="operationBtn"><!--操作区-->
              <button><i class="el-icon-caret-top"></i></button>
              <button><i class="el-icon-caret-bottom"></i></button>
              <button><i class="el-icon-d-caret"></i></button>
            </li>
          </ul>
          <!--画板区域
          -->
          <div class="layerBoxOnce">
            <!--图片生成画板-->
            <div class="canvasBox" @click="clickEsp" >
              <div class="showArea">
              <!--{{lastArgLsit[0].name}}-->
              <component  v-for="(item,index) in lastArgLsit" :is="item.name" :name="item.comname" :option="item.optionData" :cxxr="item.cxxr" ref="parentclasschild" :parentclass="item.parentclass" :mark="item.mark" :flag="index" :parentid="item.parentid==''?item.parentclass+index:item.parentid" :parentdragid="item.parentdragid==''?item.parentclass+index+0:item.parentdragid" :comtop="item.comtop" :comleft="item.comleft" :comwidth="item.comwidth" :comheight="item.comheight" @item="itemId"></component>
              </div>
            </div>
            <!--画布底部控制台-->
            <div class="bottomKnown">
              <div class="posblock">
                <span>缩放百分比</span>
                <el-slider v-model="value" :show-tooltip="false" style="float: left;width: 62%;height: 100%;"></el-slider>
                <b>{{value}} %</b>
              </div>
              <div class="posCanvas">
                画布：1920*1080
              </div>
            </div>
          </div>
        </div>
        <!--右边控制图表菜单栏-->
        <div class="container_right"   @click="rightMenu">

          <!--初始化页面配置-->
          <div class="initialize" id="initialize">
            <div class="titles"><span>页面设置</span></div>
            <div class="barBox">
              <ul>
                <li>
                  <span>屏幕大小</span>
                  <input type="number" v-model="widthvalue"placeholder="宽" class="dataInp"/>
                  <input type="number" v-model="heightvalue" placeholder="高" class="dataInp"/>
                </li>
                <li>
                  <span>背景颜色</span>
                  <el-color-picker class="mycolorpicker"v-model="bgcolor" show-alpha ></el-color-picker>
                </li>
                <li>
                  <span>背景图</span>
                  <input type="text" value="0" placeholder="横坐标" class="dataInp"/>
                </li>
                <li>
                  <span>重置</span>
                  <input type="text" value="0" placeholder="恢复默认背景" class="dataInp"/>
                </li>
                <li>
                  <span>页面缩放方式</span>
                  <input type="text" value="0" placeholder="恢复默认背景" class="dataInp"/>
                </li>
                <li>
                  <span>栅格间距</span>
                  <input type="" value="8" placeholder="px" class="dataInp"/>
                </li>
                <li>
                  <span>缩略图</span>
                  <textarea rows="5" cols="40" class="dataInp">

                  </textarea>
                </li>
              </ul>
            </div>
          </div>

          <!--饼图-->
          <div class="right_pie thubs">
            <div class="titles"><span>饼图参数设置</span></div>
            <div class="barBox">

              <el-tabs type="border-card">
                <el-tab-pane label="基础">
                  <ul>
                    <li>
                      <span>图表宽度：</span>
                      <input type="number"  v-model="this.resizeData.width" value="300" placeholder="宽" id="inpW" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表高度：</span>
                      <input type="number" v-model="this.resizeData.height" value="190" placeholder="高" id="inpH" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表位置：</span>
                      <input type="number" v-model="this.resizeData.left" value="0" placeholder="横坐标" id="inpL" min="0" max="840" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表位置：</span>
                      <input type="number" v-model="this.resizeData.top" value="0" placeholder="纵坐标" id="inpT" min="0" max="800" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表数据：</span>
                      <textarea rows="5" cols="40" id="textData" class="dataInp">

                      </textarea>
                    </li>
                    <li>
                      <span>图表颜色：</span>
                      <textarea rows="5" cols="40" id="textColor" class="dataInp">

                      </textarea>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="高级">高级</el-tab-pane>
              </el-tabs>
            </div>
          </div>

          <!--柱图-->
          <div class="right_bar thubs">
            <div class="titles"><span>柱图参数设置</span></div>
            <div  class="barBox">
              <el-tabs type="border-card">
                <el-tab-pane label="基础">
                  <ul>
                    <li>
                      <span>图表宽度：</span>
                      <input   type="number" v-model="this.resizeData.width" value="400" placeholder="宽" id="barW" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表高度：</span>
                      <input   type="number" v-model="this.resizeData.height" value="190" placeholder="高" id="barH" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表位置：</span>
                      <input   type="number"  v-model="this.resizeData.left" value="0" placeholder="横坐标" id="barL" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表位置：</span>
                      <input   type="number" v-model="this.resizeData.top" value="0" placeholder="纵坐标" id="barT" class="dataInp"/>
                    </li>
                    <li>
                      <span>柱形边距：</span>
                      <input type="number" v-model="this.resizeData.rectpadding" placeholder="间距" id="barP" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表数据：</span>
                      <textarea  v-model="this.resizeData.dataset" rows="5" cols="40" id="barData" class="dataInp">

                      </textarea>
                    </li>
                    <li>x
                      <span>x轴数据：</span>
                      <textarea   v-model="this.resizeData.xtext" rows="5" cols="40" id="barxData" class="dataInp">

                      </textarea>
                    </li>
                    <li>
                      <span>图表颜色：</span>
                      <textarea v-model="this.resizeData.rectcolor" rows="5" cols="40" id="barColor" class="dataInp">

                      </textarea>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="高级">高级</el-tab-pane>
              </el-tabs>
            </div>
          </div>

          <!--折线图1-->
          <div class="right_line1 thubs">
            <div class="titles"><span>折线图1参数设置</span></div>
            <div class="barBox">
              <el-tabs type="border-card">
                <el-tab-pane label="基础">
                  <ul>
                    <li>
                      <span>图表宽度：</span>
                      <input type="number" value="550" placeholder="宽" id="line1W" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表高度：</span>
                      <input type="number" value="268" placeholder="高" id="line1H" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表位置：</span>
                      <input type="number" value="0" placeholder="横坐标" id="line1L" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表位置：</span>
                      <input type="number" value="0" placeholder="纵坐标" id="line1T" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表数据：</span>
                      <textarea rows="5" cols="40" id="line1Data" class="dataInp">

                      </textarea>
                    </li>
                    <li>
                      <span>图表颜色：</span>
                      <textarea rows="5" cols="40" id="line1Color" class="dataInp">

                      </textarea>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="高级">高级</el-tab-pane>
              </el-tabs>
            </div>
          </div>

          <!--折线图2-->
          <div class="right_line2 thubs">
            <div class="titles"><span>折线图2参数设置</span></div>
            <div class="barBox">
              <el-tabs type="border-card">
                <el-tab-pane label="基础">
                  <ul>
                    <li>
                      <span>图表宽度：</span>
                      <input type="number" value="550" placeholder="宽" id="line2W" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表高度：</span>
                      <input type="number" value="268" placeholder="高" id="line2H" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表位置：</span>
                      <input type="number" value="0" placeholder="横坐标" id="line2L" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表位置：</span>
                      <input type="number" value="0" placeholder="纵坐标" id="line2T" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表数据：</span>
                      <textarea rows="5" cols="40" id="line2Data" class="dataInp">

                      </textarea>
                    </li>
                    <li>
                      <span>图表颜色：</span>
                      <textarea rows="5" cols="40" id="line2Color" class="dataInp">

                      </textarea>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="高级">高级</el-tab-pane>
              </el-tabs>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>

<style scoped>
  @import '../../../static/css/editPages3/editPages3.css';
</style>
<script src="../../../static/js/editPages3/editPages3.js">
</script>
