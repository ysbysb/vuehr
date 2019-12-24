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
        {"name":"发布","icon":"../../../static/img/editPages/fabu.png"},
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
      listBoxOnce:[
        {"name":"圆环","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"垂直基本柱图","icon":"../../../static/img/editPages/line.png","className":"bar","marks":"垂直基本柱图"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"},
        {"name":"图表","icon":"../../../static/img/editPages/line.png","className":"pie","marks":"圆环"}
      ],
      value: 50, //滑块
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
      reEdit: false //再次编辑

    }
  },
  mounted() {
    this.init();
  },
  //在模板渲染成html前调用
  created() {
    this.initStart(); //初始化页面
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
  beforeDestroy() {
    this.initEnd();
  },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
  methods: {
    jump(){
      // console.log(this.$router);
    },
    init(){
      var _this = this;
      var $ul = document.querySelector('#list');
      new Sortable($ul, {
        onUpdate:function(event){
          //修改items数据顺序
          var newIndex = event.newIndex,
            oldIndex = event.oldIndex,
            $li = $ul.children[newIndex],
            $oldLi = $ul.children[oldIndex];
          // 先删除移动的节点
          $ul.removeChild($li);
          // 再插入移动的节点到原有节点，还原了移动的操作
          if(newIndex > oldIndex) {
            $ul.insertBefore($li,$oldLi)
          } else {
            $ul.insertBefore($li,$oldLi.nextSibling)
          }
          // 更新items数组
          var item = _this.items.splice(oldIndex,1);
          _this.items.splice(newIndex,0,item[0]);
          // 下一个tick就会走patch更新
          // console.log(_this.items);
          console.log($li);
        },
        animation: 150,
      });
    },
    initStart(){
      let _this = this;
      let url='http://192.168.157.9:8080/Root/app/sms/save.do';//请求地址

      this.$http({
        url: url,
        method: 'post',//请求方式
        // 请求体重发送的数据
        data: {id:1},
      }).then(function (res) {
        // 请求成功回调
        console.log('调用成功');
        if(res.data.content != "[]"){
          var result = JSON.parse(res.data.content);
          /*
              result = [
                {
                  targetFN:"getPie",
                  option:{

                  }
                }
              ];
          * */
          //重新渲染页面
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

      this.initEnd();
    },
    initEnd(){
      var _this = this;
      var content = {
        "content":JSON.stringify(_this.lastArg),
        "id":1
      };
      var url='http://192.168.157.9:8080/Root/useragreement/saveUpdate.do';//请求地址

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
      var _this = this;
      if(data.length){
        data.forEach(function (item) {
          if(item.targetFN == "getPie"){
            _this.getPie(item.option,1);
          }else if(item.targetFN == "getBar"){
            _this.getBar(item.option,1);
          }
        });
      }
    },
    saveData(parentClass,option,chart){ /*保存参数*/
      var targets = {"parentClass":parentClass,"option":option,"targetFN":chart};
      var _this = this;
      if(this.lastArg!=0){
        _this.lastArg.forEach(function(ind,val){
          if(ind.parentClass == parentClass){
            _this.lastArg.splice(val, 1);
            _this.lastArg.push(targets);
            return;
          }
          return;
        });
      }
      this.lastArg.push(targets);
      console.log(this.lastArg);
      return;
    },
    delData(parentClass){
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
      console.log(targetClass);

      if(targetClass == 'pie'){
        this.getPie();
      }else if(targetClass == 'bar'){
        this.getBar();
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
      if(oLiNum >= this.items.length){

      }else{
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
            var index = Number(parentClass.replace(/[^0-9]/ig, ''));
            _this.sessionName(index);
            return;
          }
        }

      }

    },
    keyFn(){
      alert(1);
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
        if(document.getElementsByClassName(option.className)[0] != undefined && document.getElementsByClassName(option.className)[0].firstElementChild != null){
          document.getElementsByClassName(option.className)[0].firstElementChild.remove();
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
        var svg = d3.select("."+_this.parentClass)
          .append("svg")
          .attr("width", option.width)
          .attr("height", option.height)
          .attr("class", "pieChart")
          // .attr("id",this.items[i].id)
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
        return;

      }else{
        let liAll = document.getElementsByClassName("liAll");
        for (let i = 0;i < liAll.length;i ++) {
          let className = document.getElementsByClassName(this.items[i].chartName)[0];
          if (className.innerHTML == "") {
            _this.parentClass = this.items[i].chartName;
            option.className = _this.parentClass;
            var svg = d3.select("."+_this.parentClass)
              .append("svg")
              .attr("width", option.width)
              .attr("height", option.height)
              .attr("class", "pieChart")
              // .attr("id",this.items[i].id)
              .attr("disposeData", option.dataset)
              .attr("disposeColor", option.color)
              .attr("disposeInnerR", option.innerRadius)
              .attr("disposeOuterR", option.outerRadius)
              .style("cursor", "pointer")
            // .style("position", "absolute")
            // .style("left", option.posL)
            // .style("top", option.posT)
            // .style("background", "rgba(22,222,222,0.3)")
            // .style("border", "1px solid red");
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

            _this.saveData(_this.parentClass,option,'getPie'); //保存数据
            return;
          }
        }
      }

    },
    chooseChartBar(){
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
          /*获取配置参数*/
          _this.getArgumentBar();
        }
      };
      //监听delete键事件
      document.onkeyup = (e) =>{
        if(e.keyCode === 46){
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
    getArgumentBar(){/*完成配置*/
      var barWidth = document.getElementById("barW").value;
      var barHeight = document.getElementById("barH").value;
      var barP = document.getElementById("barP").value;
      var barDataset = document.getElementById("barData").value;
      var barColor = document.getElementById("barColor").value;

      var parentClass = sessionStorage.getItem("key");
      var option = { //配置参数
        className: parentClass, /*获取图表的class值*/
        width: barWidth?barWidth:400,
        height: barHeight?barHeight:190,
        // posL: (posLInp?posLInp:0) +'px',
        // posT: (posRInp?posRInp:0) +'px',
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
    },
    getBar(option,cxxr){
      var _this = this;
      if(!option){
        _this.reEdit = false;
        var option = { //配置参数
          className:'',
          width: 400,
          height: 190,
          // posL: 0+'px',
          // posT: 0+'px',
          dataset: [20,10,30,60,33,24,12,5],
          rectPadding: 10,//矩形间距
          color: ["#a54aa5", "#ca5145", "#fe9a87", "#ffed88", "#88ddeb", "#60a9e7", "#d48bfe", "#014e71", "#9f3ea0",
            "#c64739", "#ff947f", "#feeb80", "#82dbec", "#55a4e4"]
        };
      }else{
        _this.reEdit = true;
        /*清空图表*/
        if(document.getElementsByClassName(option.className)[0] != undefined && document.getElementsByClassName(option.className)[0].firstElementChild != null){
          document.getElementsByClassName(option.className)[0].firstElementChild.remove();
        }
      }

      var parentClass = '';
      var marge = {top:50,bottom:50,left:50,right:50};
      if(cxxr || _this.reEdit){
        parentClass = option.className;
        option.className = parentClass;
        this.parentClass = parentClass;
        let svg = d3.select("."+parentClass)
          .append("svg") //创建svg画布
          .attr("class","barChart")
          .attr("width",option.width)
          .attr("height",option.height)
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

        _this.saveData(parentClass,option,"getBar"); //保存数据
        return;

      }else{
        let liAll = document.getElementsByClassName("liAll");
        for (let i = 0;i < liAll.length;i ++) {
          let className = document.getElementsByClassName(this.items[i].chartName)[0];
          if (className.innerHTML == ""){
            parentClass = this.items[i].chartName;
            option.className = parentClass;
            this.parentClass = parentClass;
            let svg = d3.select("."+this.items[i].chartName)
              .append("svg") //创建svg画布
              .attr("class","barChart")
              .attr("width",option.width)
              .attr("height",option.height)
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

            _this.saveData(parentClass,option,"getBar"); //保存数据
            return;
          }
        }
      }
    },
    sessionName(index){
      this.showIndex = index;
      sessionStorage.setItem("key","chart"+index); //把class名存取sessionstorage

      /*打开配置项*/
      let _this = this;
      var target = document.getElementsByClassName("chart"+index)[0];
      if(target.firstElementChild != null){
        let svgName = target.firstElementChild.getAttribute("class");
        if (svgName == 'pieChart'){
          _this.chooseChart();
        } else if (svgName == 'barChart'){
          _this.chooseChartBar();
        }
      }else{
        _this.chooseNull();
      }
    },
    delChart(){//删除图表
      let value = sessionStorage.getItem("key");
      document.getElementsByClassName(value)[0].firstElementChild.remove();

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

  }

}
