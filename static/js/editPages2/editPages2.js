import * as d3 from 'd3';
import {resumecss} from './index.js'
import Sortable from 'sortablejs'
export default {
  //需要返回页面的data
  data() {
    return {
      chartsFN:[
        {"name":"模板","icon":"../../../static/img/editPages/tubiao.png"},
        {"name":"背景","icon":"../../../static/img/editPages/charts.png"},
        {"name":"构图","icon":"../../../static/img/editPages/zhibiao.png"},
        {"name":"颜色","icon":"../../../static/img/editPages/fsux_tubiao_dongtaiguijiditu.png"},
        {"name":"字体","icon":"../../../static/img/editPages/wenzi.png"},
        {"name":"媒体","icon":"../../../static/img/editPages/meiti.png"},
        {"name":"边框","icon":"../../../static/img/editPages/sucai.png"}
      ],
      operations:[
        {"name":"保存","icon":"../../../static/img/editPages/baocun.png"},
        {"name":"预览","icon":"../../../static/img/editPages/yulan.png"},
        {"name":"分享","icon":"../../../static/img/editPages/fenxiang.png"},
        {"name":"下载","icon":"../../../static/img/editPages/fabu.png"},
        {"name":"退出","icon":"../../../static/img/editPages/back.png"}
      ],
      layers:[
        {"name":"","icon":"../../../static/img/editPages/topmove.png"},
        {"name":"","icon":"../../../static/img/editPages/bottommove.png"},
        {"name":"","icon":"../../../static/img/editPages/topmove.png"},
        {"name":"","icon":"../../../static/img/editPages/bottommove.png"}
      ],
      known:[
        {"name":"分组","icon":""},
        {"name":"锁定","icon":""},
        {"name":"添加","icon":""},
        {"name":"替换","icon":""}
      ],
      listBoxOnce:[ //后台获取的数据 - 图表选择区
        {"name":"圆环","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"垂直基本柱图","icon":"../../../static/img/editPages/line.png","className":"bar","marks":"垂直基本柱图"},
        {"name":"折线1","icon":"../../../static/img/editPages/line.png","className":"polygonal1","marks":"折线1"},
        {"name":"折线2","icon":"../../../static/img/editPages/line.png","className":"polygonal2","marks":"折线2"},
        {"name":"折线3","icon":"../../../static/img/editPages/line.png","className":"polygonal3","marks":"折线3"},
        {"name":"折线4","icon":"../../../static/img/editPages/line.png","className":"polygonal4","marks":"折线4"},
        {"name":"折线5","icon":"../../../static/img/editPages/line.png","className":"polygonal5","marks":"折线5"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"}
      ],
      value: 80, //滑块
      showIndex: 0,
      items: [
        {
          id:1,
          color:"#F9C09D",
          chartName : "chart0"
        }, {
          id:2,
          color:"#F9D89D",
          chartName : "chart1"
        }, {
          id:3,
          color:"#F8F99D",
          chartName : "chart2"
        }, {
          id:4,
          color:"#C2F99D",
          chartName : "chart3"
        }, {
          id:5,
          color:"#9DF9DA",
          chartName : "chart4"
        }, {
          id:6,
          color:"#9DCDF9",
          chartName : "chart5"
        }, {
          id:7,
          color:"#E49DF9",
          chartName : "chart6"
        }, {
          id:8,
          color:"#F99DAE",
          chartName : "chart7"
        }
      ],
      lastArg:[], //传递后台
      clickIndex: -1,
      parentClass:'', //目标父元素class
      reEdit: false, //再次编辑
      // pageData: []  //传递后台

    }
  },
  //在模板渲染成html前调用
  created() {
    this.initStart(); //初始化页面

    //刷新关闭监听
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
  beforeDestroy() {
    this.initEnd();
  },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
  methods: {

    initStart(){
      let _this = this;
      let url='http://192.168.163.130:8081/ChartParamController/query';//请求地址

      this.$http({
        url: url,
        method: 'post',//请求方式
        // 请求体重发送的数据
        data: {userId:"1"},
      }).then(function (res) {
        // 请求成功回调
        console.log('调用成功');
        if(res.data.data != "[]"){
          console.log(res.data)
          var result = res.data;
          console.log(result);
          //重新渲染页面
          console.log(_this.lastArg)
          _this.renderPage(result);
        }
      }, function () {
        // 请求失败回调
        console.log('调用失败');
      });
    },
    beforeunloadFn(e) {
      console.log('刷新或关闭');
      console.log(e);

      this.initEnd(); //销毁页面-传参
    },
    initEnd(){

      var _this = this;
      var content = {
        "content":JSON.stringify(_this.lastArg),
        "id":1
      };
      console.log(_this.lastArg)
      console.log(content)
      var url='http://192.168.163.130:8080/ChartParamController/insert';//请求地址
      this.$http({
        url: url,
        method: 'post',//请求方式
        data: content,
      }).then(function (res) {
        // 请求成功回调
        // console.log(data.res);
        alert("传值成功！！！");
      }, function () {
        // 请求失败回
        // console.log('调用失败');
        alert("传值失败！！！");
      });
    },
    renderPage(data){
      console.log(data)
      var _this = this;
      if(data.length){
        data.forEach(function (item) {
          item.forEach(function(itemc){
            console.log(item)
            if(itemc.targetFN == "getPie"){
              _this.getPie(itemc.option,1);
            }else if(itemc.targetFN == "getBar"){
              _this.getBar(itemc.option,1);
            }else if(itemc.targetFN == "getPolygonal1"){
              _this.getPolygonal1(itemc.option,1);
            }else if(itemc.targetFN == "getPolygonal2"){
              _this.getPolygonal2(itemc.option,1);
            }
          })

        });
      }
    },
    saveData(parentClass,option,chart){ /*保存参数*/
      console.log(182)
      //后台参数传递模板
      var targets = {"parentClass":parentClass,"option":option,"targetFN":chart,"time":Date.parse(new Date())};
      var _this = this;
      if(this.lastArg!=0){
        _this.lastArg.forEach(function(ind,val){
          if(ind.parentClass == parentClass){
            _this.lastArg.splice(val, 1);
            /* _this.lastArg.push(targets);*/
            return;
          }
          return;
        });
      }
      this.lastArg.push(targets);
      console.log(this.lastArg);
      return;
    },
    delData(parentClass){ /*删除参数*/
      var _this = this;
      this.lastArg.forEach(function(ind,val){
        if(ind.parentClass == parentClass){
          _this.lastArg.splice(val, 1);
          console.log(_this.lastArg);
          return;
        }
        return;
      });
      console.log(this.lastArg);
    },
    showChart(targetClass,marks){
      if(targetClass == 'pie'){
        this.getPie();
      }else if(targetClass == 'bar'){
        this.getBar();
      }else if(targetClass == 'polygonal1'){
        this.getPolygonal1();
      }else if(targetClass == 'polygonal2'){
        this.getPolygonal2();
      }


      //操作画布区域
      this.layerArea(marks);

    },
    layerAreaDel(target){
      var _this = this;
      var oLi = document.querySelectorAll('.menu .menuBox li');
      for (var i = 0; i < oLi.length; i++) {
        if(oLi[i].getAttribute("parentClass") == target){
          oLi[i].remove();
          return;
        }
      }
      return;
    },
    layerArea(marks){
      var _this = this;
      var oLiNum = document.querySelectorAll('.menu .menuBox li').length;
      // if(oLiNum >= this.items.length){
      //
      // }else{
      var target = document.getElementsByClassName('menu')[0].getElementsByClassName('menuBox')[0];

      var p = document.createElement("li"); // 创建一个元素节点
      p.setAttribute("parentClass", this.parentClass);
      var html = '<div class="lock"></div>\n' +
        '                <div class="menu_box">\n' +
        '                  <div class="submenu_title">\n' +
        '                    <i></i>\n' +
        '                    <span>'+marks+'</span>\n' +
        '                  </div>\n' +
        '                </div>';
      p.innerHTML = html;
      target.appendChild( p );

      //样式需重新调用
      var OLi = document.querySelectorAll('.menu .menuBox li');
      for (var i = 0; i < OLi.length; i++) {
        OLi[i].style.cursor = 'pointer';
        OLi[i].style.height = '32px';
        OLi[i].style.lineHeight = '32px';
        OLi[i].style.borderBottom = '1px solid #415062';
      }
      var lock = document.querySelectorAll('.menu .menuBox li .lock');
      for (var i = 0; i < lock.length; i++) {
        lock[i].style.width = '30px';
        lock[i].style.height = '100%';
        lock[i].style.borderRight = '1px solid #415062';
        lock[i].style.float = 'left';
      }
      var menu_box = document.querySelectorAll('.menu .menuBox li .menu_box');
      for (var i = 0; i < menu_box.length; i++) {
        menu_box[i].style.width = 'calc(100% - 30px)';
        menu_box[i].style.height = '100%';
        menu_box[i].style.padding = '0 9px';
        menu_box[i].style.float = 'left';
        menu_box[i].style.letterSpacing = '3px';
      }

      var oLi = document.querySelectorAll('.menu .menuBox li');
      for (var i = 0; i < oLi.length; i++) {
        // console.log(oLi[i]);
        oLi[i].onclick = function(e) {
          // oUl.removeChild(e.target);
          for(var j = 0; j < oLi.length; j++){
            oLi[j].style.background = '';
          }
          this.style.background = '#2483ff';
          var parentClass = this.getAttribute("parentClass");
          _this.svgListBlur(parentClass);
          _this.sessionName(parentClass);
          return;
        }
      }

      // }

    },
    chooseNull(){
      d3.select(".container_right .right_pie")
        .style("display","none");
      d3.select(".container_right .right_bar")
        .style("display","none");
      d3.select(".container_right .initialize")
        .style("display","block");
    },
    chooseChart(){
      console.log(99999999)
      d3.select(".container_right .right_pie")
        .style("display","block");
      d3.select(".container_right .right_bar")
        .style("display","none");
      d3.select(".container_right .initialize")
        .style("display","none");

      var _this = this;
      document.onkeydown = function (event) {
        var e = event ? event : (window.event ? window.event : null);
        if (e.keyCode == 13) {
          /*获取配置参数*/
          _this.getArgument();
        }
      };
      //监听delete键事件
      document.onkeyup = (e) =>{
        if(e.keyCode === 46){
          console.log(1155555)
          _this.delChart();
          d3.select(".container_right .right_bar")
            .style("display","none");
          d3.select(".container_right .right_pie")
            .style("display","none");
          d3.select(".container_right .initialize")
            .style("display","block");
        }
      }
    },
    getArgument(){/*完成配置*/
      var widthInp = document.getElementById("inpW").value;
      var heightInp = document.getElementById("inpH").value;
      var posLInp = document.getElementById("inpL").value;
      var posRInp = document.getElementById("inpT").value;
      var datasetText = document.getElementById("textData").value;
      var colorText = document.getElementById("textColor").value;

      var parentClass = sessionStorage.getItem("key");
      var option = { //配置参数
        className: parentClass, /*获取图表的class值*/
        width: widthInp?widthInp:300,
        height: heightInp?heightInp:190,
        posL: (posLInp?posLInp:0) +'px',
        posT: (posRInp?posRInp:0) +'px',
        dataset: datasetText?datasetText.split(","):[30,20,43,55,13,30],
        innerRadius: 50,
        outerRadius: 90,
        color: colorText?colorText.split(","):["#a54aa5", "#ca5145", "#fe9a87", "#ffed88", "#88ddeb", "#60a9e7", "#d48bfe", "#014e71", "#9f3ea0",
          "#c64739", "#ff947f", "#feeb80", "#82dbec", "#55a4e4"]
      };
      this.getPie(option);
      d3.select(".container_right .right_pie")
        .style("display","none");
      d3.select(".container_right .initialize")
        .style("display","block");
      var oMenu = document.querySelectorAll('.menu .menuBox li');
      for(var j = 0; j < oMenu.length; j++){
        oMenu[j].style.background = '';
      }
      var oLi = document.querySelectorAll('svg');
      for (var i = 0; i < oLi.length; i++) {
        oLi[i].style.border = 0;
        oLi[i].style.zIndex = 0;
      }

    },
    getPie(option,cxxr){/*圆环*/
      var _this = this;
      if(!option){
        _this.reEdit = false;
        var option = { //配置参数
          className:'',
          width: 300,
          height: 190,
          posL: 0+'px',
          posT: 0+'px',
          dataset: [30,20,43,55,13,30],
          innerRadius: 50,
          outerRadius: 90,
          color: ["#a54aa5", "#ca5145", "#fe9a87", "#ffed88", "#88ddeb", "#60a9e7", "#d48bfe", "#014e71", "#9f3ea0",
            "#c64739", "#ff947f", "#feeb80", "#82dbec", "#55a4e4"]
        };
      }else{
        _this.reEdit = true;
        /*清空图表*/
        if(cxxr){
          console.log(44444)

        }else{
          console.log(395)
          document.getElementById(option.className).parentNode.removeChild(document.getElementById(option.className));
        }

      }
      //画布周边的空白
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

      // var pieRadius = 0; //圆环内外径
      // if(option.width > option.height){
      //   pieRadius = (option.height-padding.top-padding.bottom)/2;
      // }else{
      //   pieRadius = (option.width-padding.left-padding.right)/2;
      // }
      // var innerRadius = option.innerRadius = pieRadius*0.7;
      // var outerRadius = option.outerRadius = pieRadius;

      if(cxxr || _this.reEdit){
        _this.parentClass = option.className;
      }else{
        _this.parentClass = 'chart'+this.getRandom(5);
        option.className = _this.parentClass;
      }
      var svg = d3.select(".canvasBox .showArea")
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


      _this.saveData(_this.parentClass,option,'getPie'); //保存数据
      // document.getElementsByTagName("svg")[0].onclick=function(){
      //   _this.sessionName(this.getAttribute("id"))
      // };

      var oLi = document.querySelectorAll('svg');
      for (var i = 0; i < oLi.length; i++) {

        oLi[i].onclick = function(e) {
          for(var j = 0; j < oLi.length; j++){
            oLi[j].style.border = 0;
            oLi[j].style.zIndex = 0;
          }
          _this.sessionName(this.getAttribute("id"));
          _this.menuListBlur(this.getAttribute("id"));
          this.style.border = '1px solid blue';
          this.style.zIndex = '9999';
          return;
        }
      }
      return;



    },
    svgListBlur(id){//
      var oLi = document.querySelectorAll('svg');
      var index = 0;
      for(var j = 0; j < oLi.length; j++){
        index = j;
        var parentClass = oLi[index].getAttribute("id");
        if(parentClass == id){
          oLi[index].style.border = '1px solid blue';
          oLi[index].style.zIndex = '9999';
        }else{
          oLi[index].style.border = 0;
          oLi[index].style.zIndex = 0;
        }
      }
    },
    menuListBlur(id){
      var oLi = document.querySelectorAll('.menu .menuBox li');
      var index = 0;
      for(var j = 0; j < oLi.length; j++){
        index = j;
        var parentClass = oLi[index].getAttribute("parentClass");
        if(parentClass == id){
          oLi[index].style.background = '#2483ff';
        }else{
          oLi[index].style.background = '';
        }
      }
    },
    chooseChartBar(){ /*选择图表 - 删除或重新渲染*/
      d3.select(".container_right .right_bar")
        .style("display","block");
      d3.select(".container_right .right_pie")
        .style("display","none");
      d3.select(".container_right .initialize")
        .style("display","none");

      var _this = this;
      document.onkeydown = function (event) {
        var e = event ? event : (window.event ? window.event : null);
        if (e.keyCode == 13) {
          /*获取配置参数 - 重新渲染图表*/
          _this.getArgumentBar();
        }
      };
      //监听delete键事件
      document.onkeyup = (e) =>{
        if(e.keyCode === 46){
          _this.delChart(); /*删除图表以及存储的数据列表*/
          d3.select(".container_right .right_bar")
            .style("display","none");
          d3.select(".container_right .right_pie")
            .style("display","none");
          d3.select(".container_right .initialize")
            .style("display","block");
        }
      }
    },
    getArgumentBar(){/*完成配置*/
      var barWidth = document.getElementById("barW").value;
      var barHeight = document.getElementById("barH").value;
      var barP = document.getElementById("barP").value;
      var barDataset = document.getElementById("barData").value;
      var barColor = document.getElementById("barColor").value;
      var posLInp = document.getElementById("barL").value;
      var posRInp = document.getElementById("barT").value;

      var parentClass = sessionStorage.getItem("key");
      var option = { //配置参数
        className: parentClass, /*获取图表的class值*/
        width: barWidth?barWidth:400,
        height: barHeight?barHeight:190,
        posL: (posLInp?posLInp:0) +'px',
        posT: (posRInp?posRInp:0) +'px',
        dataset: barDataset?barDataset.split(","):[20,10,30,60,33,24,12,5],
        rectPadding: barP?barP:10,//矩形间距
        color: barColor?barColor.split(","):["#a54aa5", "#ca5145", "#fe9a87", "#ffed88", "#88ddeb", "#60a9e7", "#d48bfe", "#014e71", "#9f3ea0",
          "#c64739", "#ff947f", "#feeb80", "#82dbec", "#55a4e4"]
      };

      this.getBar(option);
      d3.select(".container_right .right_bar")
        .style("display","none");
      d3.select(".container_right .initialize")
        .style("display","block");

      /*优化页面样式*/
      var oMenu = document.querySelectorAll('.menu .menuBox li');
      for(var j = 0; j < oMenu.length; j++){
        oMenu[j].style.background = '';
      }
      var oLi = document.querySelectorAll('svg');
      for (var i = 0; i < oLi.length; i++) {
        oLi[i].style.border = 0;
        oLi[i].style.zIndex = 0;
      }

    },
    chooseChartLine1(){ /*选择图表 - 删除或重新渲染*/
      d3.select(".container_right .right_line1")
        .style("display","block");
      d3.select(".container_right .right_bar")
        .style("display","none");
      d3.select(".container_right .right_pie")
        .style("display","none");
      d3.select(".container_right .initialize")
        .style("display","none");

      var _this = this;
      document.onkeydown = function (event) {
        var e = event ? event : (window.event ? window.event : null);
        if (e.keyCode == 13) {
          /*获取配置参数 - 重新渲染图表*/
          _this.getArgumentLine1();
        }
      };
      //监听delete键事件
      document.onkeyup = (e) =>{
        if(e.keyCode === 46){
          _this.delChart(); /*删除图表以及存储的数据列表*/
          d3.select(".container_right .right_line1")
            .style("display","none");
          d3.select(".container_right .right_bar")
            .style("display","none");
          d3.select(".container_right .right_pie")
            .style("display","none");
          d3.select(".container_right .initialize")
            .style("display","block");
        }
      }
    },
    chooseChartLine2(){ /*选择图表 - 删除或重新渲染*/
      d3.select(".container_right .right_line2")
        .style("display","block");
      d3.select(".container_right .right_line1")
        .style("display","none");
      d3.select(".container_right .right_bar")
        .style("display","none");
      d3.select(".container_right .right_pie")
        .style("display","none");
      d3.select(".container_right .initialize")
        .style("display","none");

      var _this = this;
      document.onkeydown = function (event) {
        var e = event ? event : (window.event ? window.event : null);
        if (e.keyCode == 13) {
          /*获取配置参数 - 重新渲染图表*/
          _this.getArgumentLine2();
        }
      };
      //监听delete键事件
      document.onkeyup = (e) =>{
        if(e.keyCode === 46){
          _this.delChart(); /*删除图表以及存储的数据列表*/
          d3.select(".container_right .right_line2")
            .style("display","none");
          d3.select(".container_right .right_line1")
            .style("display","none");
          d3.select(".container_right .right_bar")
            .style("display","none");
          d3.select(".container_right .right_pie")
            .style("display","none");
          d3.select(".container_right .initialize")
            .style("display","block");
        }
      }
    },
    getArgumentLine1(){/*完成配置*/
      var line1Width = document.getElementById("line1W").value;
      var line1Height = document.getElementById("line1H").value;
      var line1Dataset = document.getElementById("line1Data").value;
      var line1Color = document.getElementById("line1Color").value;
      var posLInp = document.getElementById("line1L").value;
      var posRInp = document.getElementById("line1T").value;

      var parentClass = sessionStorage.getItem("key");
      var option = { //配置参数
        className: parentClass, /*获取图表的class值*/
        width: line1Width?line1Width:400,
        height: line1Height?line1Height:190,
        posL: (posLInp?posLInp:0) +'px',
        posT: (posRInp?posRInp:0) +'px',
        xText : [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019],
        dataset: line1Dataset?line1Dataset.split(","):[
          {colorLine : "#4dcccb",value : [45,55,42,70,50,60,38,57,59,55,46,68]},
          {colorLine : "#57cb73",value : [90,90,76,79,93,81,72,78,88,76,79,78]},
        ]/*,
        color: barColor?barColor.split(","):["#a54aa5", "#ca5145", "#fe9a87", "#ffed88", "#88ddeb", "#60a9e7", "#d48bfe", "#014e71", "#9f3ea0",
          "#c64739", "#ff947f", "#feeb80", "#82dbec", "#55a4e4"]*/
      };

      this.getPolygonal1(option);
      d3.select(".container_right .right_line1")
        .style("display","none");
      d3.select(".container_right .initialize")
        .style("display","block");

      /*优化页面样式*/
      var oMenu = document.querySelectorAll('.menu .menuBox li');
      for(var j = 0; j < oMenu.length; j++){
        oMenu[j].style.background = '';
      }
      var oLi = document.querySelectorAll('svg');
      for (var i = 0; i < oLi.length; i++) {
        oLi[i].style.border = 0;
        oLi[i].style.zIndex = 0;
      }

    },
    getArgumentLine2(){/*完成配置*/
      var line2Width = document.getElementById("line2W").value;
      var line2Height = document.getElementById("line2H").value;
      var line2Dataset = document.getElementById("line2Data").value;
      var line2Color = document.getElementById("line2Color").value;
      var posLInp = document.getElementById("line2L").value;
      var posRInp = document.getElementById("line2T").value;

      var parentClass = sessionStorage.getItem("key");
      var option = { //配置参数
        className: parentClass, /*获取图表的class值*/
        width: line2Width?line2Width:400,
        height: line2Height?line2Height:190,
        posL: (posLInp?posLInp:0) +'px',
        posT: (posRInp?posRInp:0) +'px',
        xText :[2013,2014,2015,2016,2017,2018,2019],
        dataset: line2Dataset?line2Dataset.split(","):[
          {colorLine : "#4dcccb",value : [45,50,100,80,170,160,300]},
          {colorLine : "#9761e5",value : [80,110,100,190,350,120,500]},
        ],/*,
        color: barColor?barColor.split(","):["#a54aa5", "#ca5145", "#fe9a87", "#ffed88", "#88ddeb", "#60a9e7", "#d48bfe", "#014e71", "#9f3ea0",
          "#c64739", "#ff947f", "#feeb80", "#82dbec", "#55a4e4"]*/
      };

      this.getPolygonal2(option);
      d3.select(".container_right .right_line2")
        .style("display","none");
      d3.select(".container_right .initialize")
        .style("display","block");

      /*优化页面样式*/
      var oMenu = document.querySelectorAll('.menu .menuBox li');
      for(var j = 0; j < oMenu.length; j++){
        oMenu[j].style.background = '';
      }
      var oLi = document.querySelectorAll('svg');
      for (var i = 0; i < oLi.length; i++) {
        oLi[i].style.border = 0;
        oLi[i].style.zIndex = 0;
      }

    },
    /*
      option 图表参数
      cxxr 是否从后台获取数据
    * */
    getBar(option,cxxr){
      var _this = this;
      if(!option){
        _this.reEdit = false; /*是否重新编辑*/
        var option = { //配置参数
          className:'',
          width: 400,
          height: 190,
          posL: 0+'px',
          posT: 0+'px',
          dataset: [20,10,30,60,33,24,12,5],
          rectPadding: 10,//矩形间距
          color: ["#a54aa5", "#ca5145", "#fe9a87", "#ffed88", "#88ddeb", "#60a9e7", "#d48bfe", "#014e71", "#9f3ea0",
            "#c64739", "#ff947f", "#feeb80", "#82dbec", "#55a4e4"]
        };
      }else{
        _this.reEdit = true;
        /*清空图表*/
        if(cxxr){}else{
          document.getElementById(option.className).parentNode.removeChild(document.getElementById(option.className));
        }
      }

      var marge = {top:50,bottom:50,left:50,right:50};
      //图表的id名 获取来源
      if(cxxr || _this.reEdit){
        _this.parentClass = option.className;
      }else{
        _this.parentClass = 'chart'+this.getRandom(5);
        option.className = _this.parentClass;
      }
      let svg = d3.select(".canvasBox .showArea")
        .append("svg") //创建svg画布
        .attr("class","barChart")
        .attr("id",_this.parentClass)
        .attr("width",option.width)
        .attr("height",option.height)

        .style("position","absolute")
        .style("left",option.posL)
        .style("top",option.posT)

        /*图表数据需用于下载功能*/
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

      _this.saveData(_this.parentClass,option,"getBar"); //保存数据
      // document.getElementsByTagName("svg")[0].onclick=function(){
      //   _this.sessionName(this.getAttribute("id"))
      // };
      var oLi = document.querySelectorAll('svg');
      for (var i = 0; i < oLi.length; i++) {
        oLi[i].onclick = function(e) {
          for(var j = 0; j < oLi.length; j++){
            oLi[j].style.border = 0;
            oLi[j].style.zIndex = 0;
          }
          _this.sessionName(this.getAttribute("id"));
          _this.menuListBlur(this.getAttribute("id"));
          this.style.border = '1px solid blue';
          this.style.zIndex = '9999';
          return;
        }
      }
      return;

    },
    getPolygonal1(option,cxxr){
      var _this = this;
      if(!option){
        _this.reEdit = false; /*是否重新编辑*/
        var option = { //配置参数
          className:'',
          dataset: [
            {colorLine : "#4dcccb",value : [45,55,42,70,50,60,38,57,59,55,46,68]},
            {colorLine : "#57cb73",value : [90,90,76,79,93,81,72,78,88,76,79,78]},
          ],
          //定义折线图x轴数据
          xText : [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019],
          width : 550,
          height : 268,
          posL:20
        };
      }else{
        _this.reEdit = true;
        /*清空图表*/
        if(cxxr){}else{
          document.getElementById(option.className).parentNode.removeChild(document.getElementById(option.className));
        }
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
      //图表的id名 获取来源
      if(cxxr || _this.reEdit){
        _this.parentClass = option.className;
      }else{
        _this.parentClass = 'chart'+this.getRandom(5);
        option.className = _this.parentClass;
      }
      let svg = d3.select(".canvasBox .showArea")
        .append("svg") //创建svg画布
        .attr("class","getPolygonal1Chart")
        .attr("id",_this.parentClass)
        .attr("width",option.width)
        .attr("height",option.height)
        .style("position","absolute")
        .style("left",option.posL)
        .style("top",option.posT)

        /*图表数据需用于下载功能*/
        .attr("disposeData", option.dataset)
        .attr("disposeColor", option.color)
        .attr("disposeRectPad", option.rectPadding)
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

      _this.saveData(_this.parentClass,option,"getPolygonal1"); //保存数据
      // document.getElementsByTagName("svg")[0].onclick=function(){
      //   _this.sessionName(this.getAttribute("id"))
      // };
      var oLi = document.querySelectorAll('svg');
      for (var i = 0; i < oLi.length; i++) {
        oLi[i].onclick = function(e) {
          for(var j = 0; j < oLi.length; j++){
            oLi[j].style.border = 0;
            oLi[j].style.zIndex = 0;
          }
          _this.sessionName(this.getAttribute("id"));
          _this.menuListBlur(this.getAttribute("id"));
          this.style.border = '1px solid blue';
          this.style.zIndex = '9999';
          return;
        }
      }
      return;

    },
    getPolygonal2(option,cxxr){
      var _this = this;
      if(!option){
        _this.reEdit = false; /*是否重新编辑*/
        var option = {
          dataset : [
            {colorLine : "#4dcccb",value : [45,50,100,80,170,160,300]},
            {colorLine : "#9761e5",value : [80,110,100,190,350,120,500]},
          ],
          xText:[2013,2014,2015,2016,2017,2018,2019],
          width : 550,
          height : 268,
          posL:20,
        };
      }else{
        _this.reEdit = true;
        /*清空图表*/
        if(cxxr){}else{
          document.getElementById(option.className).parentNode.removeChild(document.getElementById(option.className));
        }
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
      //图表的id名 获取来源
      if(cxxr || _this.reEdit){
        _this.parentClass = option.className;
      }else{
        _this.parentClass = 'chart'+this.getRandom(5);
        option.className = _this.parentClass;
      }
      //定义画布
      let svg = d3.select(".canvasBox .showArea")
        .append("svg")
        .attr("class","getPolygonal2Chart")
        .attr("id",_this.parentClass)
        .attr("width",option.width)
        .attr("height",option.height)
        .style("position","absolute")
        .style("left",option.posL)
        .style("top",option.posT)
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
        .ticks(option.xText.length) //自定义刻度
        .tickFormat(d3.format("d")) //显示设置刻度格式
        .tickSizeInner(5)
        .tickSizeOuter(0)
        .tickPadding(10); //设置刻度和标签之间的填充
      //显示x轴
      g.append("g")
        .attr("class","axis1")
        .call(x_axis)
        .attr("transform","translate("+marge.left+","+(option.height-marge.bottom)+")")
        .selectAll("text")
        .text(function (d,i) {
          return option.xText[i];
        })
        .style("font-size","12");
      //创建y轴
      let y_axis = d3.axisLeft(scale_y)
        .ticks(5) //自定义刻度
        .tickFormat(d3.format("d")) //显示设置刻度格式
        .tickSizeInner(-option.width+marge.bottom)    //刻度线长短
        .tickSizeOuter(0)
        .tickPadding(8); //设置刻度和标签之间的填充

      //显示y轴
      g.append("g")
        .attr("class","axis")
        .call(y_axis)
        .style("font-size","12")
        .attr("transform","translate("+marge.right+","+marge.top+")");


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
        .style("stop-color","#4dcccb")
        .attr("stop-opacity","1");
      let stop2 = linearGradient1.append("stop")
        .attr("offset","100%")
        .style("stop-color","#4dcccb")
        .attr("stop-opacity","0.1");

      let defs2 = g.append("defs");
      // 渐变定义
      let linearGradient2 = defs2.append("linearGradient")
        .attr("id","linearColor2")
        .attr("x1","0%")
        .attr("y1","0%")
        .attr("x2","0%")
        .attr("y2","100%");
      let stop21 = linearGradient2.append("stop")
        .attr("offset","0%")
        .style("stop-color","#9761e5")
        .attr("stop-opacity","1");
      let stop22 = linearGradient2.append("stop")
        .attr("offset","100%")
        .style("stop-color","#9761e5")
        .attr("stop-opacity","0.1");
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
        .attr("stroke-width","2")
        .attr("stroke",function(d,i){
          return colorsLine[i]
        })
      //画面积函数
      let area_generator = d3.area()
        .x(function (d,i) {
          return scale_x(i);
        })
        .y0(option.height-marge.top-marge.bottom)
        .y1(function (d,i) {
          return scale_y(d);
        });
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
          if (i == 0) { //关闭
            return "url(#" + linearGradient1.attr("id") + ")";
          }
          if (i == 1){ //发起
            return "url(#" + linearGradient2.attr("id") + ")";
          }
        })

      _this.saveData(_this.parentClass,option,"getPolygonal2"); //保存数据
      // document.getElementsByTagName("svg")[0].onclick=function(){
      //   _this.sessionName(this.getAttribute("id"))
      // };
      var oLi = document.querySelectorAll('svg');
      for (var i = 0; i < oLi.length; i++) {
        oLi[i].onclick = function(e) {
          for(var j = 0; j < oLi.length; j++){
            oLi[j].style.border = 0;
            oLi[j].style.zIndex = 0;
          }
          _this.sessionName(this.getAttribute("id"));
          _this.menuListBlur(this.getAttribute("id"));
          this.style.border = '1px solid blue';
          this.style.zIndex = '9999';
          return;
        }
      }
      return;

    },
    sessionName(id){
      this.showIndex = id;
      sessionStorage.setItem("key",id); //把class名存取sessionstorage

      /*打开配置项*/
      let _this = this;
      var target = document.getElementById(id);
      let svgName = target.getAttribute("class");
      if (svgName == 'pieChart'){
        _this.chooseChart();
      } else if (svgName == 'barChart'){
        _this.chooseChartBar();
      }else if (svgName == 'getPolygonal1Chart'){
        _this.chooseChartLine1();
      }else if (svgName == 'getPolygonal2Chart'){
        _this.chooseChartLine2();
      }

    },
    delChart(){//删除图表
      let value = sessionStorage.getItem("key");
      document.getElementById(value).parentNode.removeChild(document.getElementById(value));

      this.delData(value); //删除保存数据
      this.layerAreaDel(value); //删除画布
    },
    getViewPortHeight(){
      var height = document.documentElement.clientHeight || document.body.clientHeight;
      document.getElementsByClassName("container")[0].style.height=height+'px';
    },
    formatTooltip(val) {
      return val / 100;
    },
    clickHandle(iconName,index){
      if(this.clickIndex != index){
        this.clickIndex = index;
        var target = document.getElementsByClassName('container_middle')[0].getElementsByClassName('listBoxOnce')[0];
        target.style.height = "106px";
        target.style.display = "block";
        var target2 = document.getElementsByClassName('container_middle')[0].getElementsByClassName('layerBoxOnce')[0];
        target2.style.height = "calc(100% - 106px)";
      }else{
        this.clickIndex = -1;
        var target = document.getElementsByClassName('container_middle')[0].getElementsByClassName('listBoxOnce')[0];
        target.style.height = "0";
        target.style.display = "none";
        var target2 = document.getElementsByClassName('container_middle')[0].getElementsByClassName('layerBoxOnce')[0];
        target2.style.height = "100%";
      }
    },
    getRandom(len){//获取随机数给classname 赋值随机不同的
      var pwd = "";
      for(var idx = 0; idx < len; idx ++){
        pwd = pwd + ((Math.random() * 16) & (0x5 | 0x9)).toString(16);
      }
      return pwd;
    },
    selectNav(name,index){
      if(name == '下载'){
        this.exportVUE();
      }else if(name == '保存'){
        this.initEnd();
      }

    },
    exportVUE(){
      /*只生成中间区域的文本VUE*/
      var template = this.$el.getElementsByClassName('showArea')[0].innerHTML;
      let html = `<template>
                      <div class="resume_preview_page">
                          ${template}
                      </div>
                  </template>
                  <style scoped>
                      ${resumecss}
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


      console.log(typeof html)

      let urll='http://192.168.163.130:8080/VueController/insert';//请求地址
      var htmll="22k看了觉得浪费精力扩大解放了大家分厘卡的"
      var arr = '[{"chartName":"visualproject","param":'+html+'},{"chartName":"bar","param":'+html+'},{"chartName":"pie","param";'+html+'}]'
      var arr = JSON.stringify([{chartName:"visualproject",param:html},{chartName:"bar",param:html},{chartName:"pie",param:html}])
      var arr = [{chartName:"visualproject",param:html},{chartName:"bar",param:html},{chartName:"pie",param:html}]
      console.log(arr)
      this.$http({
        url: urll,
        method: 'post',//请求方式
        // 请求体重发送的数据
        data: arr

      }).then(function (res) {
        console.log("调用成功")
        console.log(res.data)
        //console.log(res)
        //console.log(res)
        //var a = document.createElement('a');
        // var url = window.URL.createObjectURL(new Blob([res.data],{ type: "aplication/zip " }));
        //a.href = url;
        //a.download = 'visual.zip'
        //a.click();
        //window.URL.revokeObjectURL(url)
        window.open(res.data.url);
      }, function () {
        // 请求失败回调
        console.log('调用失败');
      });
      /*    a.href = url;
           a.download = 'form.vue';
           a.click();
           window.URL.revokeObjectURL(url);*/
    },

  }

}
