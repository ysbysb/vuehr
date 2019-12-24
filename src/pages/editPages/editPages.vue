<template>
    <div class="container">
      <div class="container_top">
        <div class="contents">
          <div class="titles">数据可视化一站式平台</div>
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
          <ul class="operations ulbox">
<!--            <li v-for="(item,index) in operations">-->
<!--              <div>-->
<!--                <img :src="item.icon"/>-->
<!--                <i>{{item.name}}</i>-->
<!--              </div>-->
<!--            </li>-->
            <li @click="jump">
              <div>
                <img src="../../../static/img/editPages/baocun.png"/>
                <i>保存</i>
              </div>
            </li>
            <li>
              <div>
                <img src="../../../static/img/editPages/yulan.png"/>
                <i>预览</i>
              </div>
            </li>
            <li>
              <div>
                <img src="../../../static/img/editPages/fenxiang.png"/>
                <i>分享</i>
              </div>
            </li>
            <li>
              <div>
                <img src="../../../static/img/editPages/fabu.png"/>
                <i>发布</i>
              </div>
            </li>
            <li>
              <div>
                <img src="../../../static/img/editPages/back.png"/>
                <i>退出</i>
              </div>
            </li>
          </ul>
        </div>
        <div class="personalDetails">
            <img src="../../../static/img/editPages/person.png" class="personIcon"/>
            <img src="../../../static/img/editPages/sanjiaokaobei.png" class="sharp"/>
        </div>
      </div>
      <div class="container_content">
        <div class="container_left">
          <div class="layerBox"><span>图层</span></div>
          <ul class="moves">
            <li v-for="item in layers"><img :src="item.icon"/></li>
          </ul>
          <div class="menu">
            <ul class="menuBox">
<!--              <li>-->
<!--                <div class="lock"></div>-->
<!--                <div class="menu_box">-->
<!--                  <div class="submenu_title">-->
<!--                    <i></i>-->
<!--                    <span>导航一</span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </li>-->
            </ul>
          </div>
          <ul class="known">
            <li v-for="item in known">{{item.name}}</li>
          </ul>
        </div>
        <div class="container_middle">
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
          <div class="layerBoxOnce">
            <div class="canvasBox"> <!--图片生成画板-->

              <ul class="list" id="list">
                <li v-for="(item,index) in items" :key="index" :style="'background-color:'+item.color"
                    class="liAll" :class="{current:index===showIndex}"
                    @click="sessionName(index)"
                    @keydown.enter="keyFn">
                  <div :class="item.chartName" class="chartAll">

                  </div>
                </li>
              </ul>

            </div>
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
        <div class="container_right">

          <!--初始化页面配置-->
          <div class="initialize">
            <div class="titles"><span>页面设置</span></div>
            <div class="barBox">
              <ul>
                <li>
                  <span>屏幕大小</span>
                  <input type="number" value="1920" placeholder="宽" class="dataInp"/>
                  <input type="number" value="1080" placeholder="高" class="dataInp"/>
                </li>
                <li>
                  <span>背景颜色</span>
                  <input type="text" value="170" placeholder="高" class="dataInp"/>
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
          <div class="right_pie">
            <div class="titles"><span>饼图参数设置</span></div>
            <div class="barBox">
              <el-tabs type="border-card">
                <el-tab-pane label="基础">
                  <ul>
                    <li>
                      <span>图表宽度：</span>
                      <input type="number" value="300" placeholder="宽" id="inpW" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表高度：</span>
                      <input type="number" value="190" placeholder="高" id="inpH" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表位置：</span>
                      <input type="number" value="0" placeholder="横坐标" id="inpL" min="0" max="840" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表位置：</span>
                      <input type="number" value="0" placeholder="纵坐标" id="inpT" min="0" max="800" class="dataInp"/>
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
          <div class="right_bar">
            <div class="titles"><span>折线图参数设置</span></div>
            <div class="barBox">
              <el-tabs type="border-card">
                <el-tab-pane label="基础">
                  <ul>
                    <li>
                      <span>图表宽度：</span>
                      <input type="number" value="300" placeholder="宽" id="barW" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表高度：</span>
                      <input type="number" value="190" placeholder="高" id="barH" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表位置：</span>
                      <input type="number" value="0" placeholder="横坐标" id="barL" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表位置：</span>
                      <input type="number" value="0" placeholder="纵坐标" id="barT" class="dataInp"/>
                    </li>
                    <li>
                      <span>柱形边距：</span>
                      <input type="number" value="10" placeholder="间距" id="barP" class="dataInp"/>
                    </li>
                    <li>
                      <span>图表数据：</span>
                      <textarea rows="5" cols="40" id="barData" class="dataInp">

                      </textarea>
                    </li>
                    <li>
                      <span>图表颜色：</span>
                      <textarea rows="5" cols="40" id="barColor" class="dataInp">

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
  @import '../../../static/css/editPages/editPages.css';
</style>
<script src="../../../static/js/editPages/editPages.js"></script>
