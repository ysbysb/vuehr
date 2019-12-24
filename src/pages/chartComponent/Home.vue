<template>
    <div class="home_container">
        <div class="container">
            <!-- 标题 -->
            <div class="container_title">
                <p>数据可视化一站式平台</p> 
                <div class="title_right">
                    <div class="pic">
                        <img src="../../../static/img/chartComponent/photo.png" alt="">
                    </div>
                    <img class="push2" src="../../../static/img/chartComponent/push2.png" alt="">
                </div>
            </div>
            <div class="container_content">
                <!-- 左侧列表 -->
                <div class="content_left">
                    <p>
                        <img  class="rectangle" src="../../../static/img/chartComponent/rectangle.png" alt="">
                        <span>数据大屏</span> 
                        <img  class="add" src="../../../static/img/chartComponent/add.png" alt="">
                        <img  class="remove1" src="../../../static/img/chartComponent/remove1.png" alt="">
                    </p>
                    <ul>
                        <li v-for="item,index in list">{{item}}</li>
                    </ul>
                    
                </div>
                <!-- 右侧内容 -->
                <div class="content_right">
                    <!-- 顶部筛选栏 -->
                    <div class="right_line">
                        <ul class="line_all">
                            <li>
                                <span>全部大屏</span> 
                            </li>
                            <li>
                                <span>共计</span>
                                <span>7</span>
                            </li>
                            <li>
                                <span>已发布</span>
                                <span>4</span>
                            </li>
                            <li>
                                <span>未发布</span>
                                <span>5</span>
                            </li>
                        </ul>
                        <ul class="line_nav">
                            <li class="nav1">
                                <span>搜索</span>
                                <input class="search" placeholder="请输入内容">
                                <img class="search_img" src="../../../static/img/chartComponent/search.png" alt="">
                            </li>
                            <li class="nav2">
                                <span>排序</span>
                                <input class="order" placeholder="按最后编辑时间">
                                <img class="order_img" src="../../../static/img/chartComponent/push1.png" alt="">
                            </li>
                            <li class="nav3">
                                <div></div>
                                <span>添加至分组</span>
                            </li>
                            <li class="nav4">
                                <div></div>
                                <span>移除分组</span>
                            </li>
                            <li class="nav5">
                                <div></div>
                                <span>删除</span>
                            </li>
                            <li class="nav6">
                                <div></div>
                                <span>编辑</span>
                            </li>
                        </ul>
                    </div>
                    <!-- 图表内容 -->
                    <div class="right_main">
                        <!-- 新建大屏 -->
                        <div class="insert">
                            <div class="mask"></div> <!-- 遮罩 -->
                            <div class="insert_all">
                                <img src="../../../static/img/chartComponent/add2.jpg" alt="">
                            </div>
                            <div class="insert_block">
                                <div class="insert_text">
                                    <p>新建大屏</p>
                                </div>
                            </div>
                            
                        </div>
                        <!-- 工单 -->
                        <div class="chart" v-for="item,index in textList">
                            <div class="chart_block">
                                <div class="chart_text">
                                    <p class="text_num">{{item.num}}</p>
                                    <div class="text_time">
                                        <span>最后编辑</span>
                                        <span>{{item.time}}</span>
                                    </div>
                                </div> 
                            </div>                    
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';
    export default {
        name: "Home",
        data(){
            return{
                list:["全部大屏","一期项目","镜面屏二期项目","十三屏项目"],
                textList:[
                    {num:"内3-1 工单",time:"2019-7-31"},
                    {num:"内3-2 工单",time:"2019-7-31"},
                ],
            }
        },
        mounted(){
            
        },
        methods:{
            
        }
    }
</script>

<style scoped>
  @import '../../../static/css/chartComponent/home.css';
</style>