import * as d3 from 'd3';
import VueDragResize from 'vue-drag-resize';
export default {
  name: 'app',
  components: {
    VueDragResize
  },
  //需要返回页面的data
  props:['option','cxxr','name','parentclass','mark','parentid','flag',"comtop","comleft","comwidth","comheight"],
  data() {
    return {
      reEdit: false,
      parentClass:'', //目标父元素class
      idx:0,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      resizeleft:this.comleft,
      resizetop:this.comtop,
      resizewidth:this.comwidth,
      resizeheight:this.comheight,
      //记录当前获得焦点的元素id名
      contentItem: null
    }
  },
  mounted(){
    this.getPie(this.option,this.cxxr);
    this.getlaryer()
  },
  //在模板渲染成html前调用
  created() {

  },
  beforeDestroy() {

  },
  destroyed() {

  },
  methods: {

   /* blankClick(){
      this.$parent.clickaa(1);
    },*/
    resizeClick(e){
      //去掉其他焦点
      let that = this;
      this.publicFunction.focus(e,that);
      //向父子间传递选中图形组件id名
      this.$emit('item',this.contentItem);

      /* var _this = this;
       _this.$parent.clickaa();*/
      /*1.点击组件左侧菜单找到相对应的焦点，出现相对应的右侧的配置菜单*/
      this.getLaren(this.parentClass);
      this.$parent.menuListBlur(this.parentClass);
    },
    resizeStop(newRect){

      var option = { //配置参数
        className: this.parentClass,
        width: newRect.width,
        height: newRect.height,
        posL: 0 + 'px',
        posT: 0 + 'px',
        dataset: [30,20,43,55,13,30],
        innerRadius: 50,
        outerRadius: 90,
        color: ["#a54aa5", "#ca5145", "#fe9a87", "#ffed88", "#88ddeb", "#60a9e7", "#d48bfe", "#014e71", "#9f3ea0",
          "#c64739", "#ff947f", "#feeb80", "#82dbec", "#55a4e4"]
      }

      this.getPie(option,0);
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;

      this.resizetop=this.top
      this.resizeleft=this.left

      this.$parent.getResize(this.left, this.top, this.width, this.height);
    },
    getPie(option,cxxr){
      var _this = this;
      if(Object.keys(option).length==0){ //判断是否为空对象
        _this.reEdit = false; /*是否重新编辑*/
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
        if(cxxr ==1){}else{
          document.getElementById(option.className).remove();
        }
      }

      //图表的id名 获取来源
      if(cxxr==1 || _this.reEdit){
        _this.parentClass = option.className;
      }else{
        _this.parentClass = 'chart'+this.getRandom(5);
        option.className = _this.parentClass;
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
      var svg = d3.select("#"+_this.parentid+" ."+_this.parentclass)
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
        .attr("disposeLeft",option.posL)
        .attr("disposeTop",option.posT)
        .attr("disposeInnerR", option.innerRadius)
        .attr("disposeOuterR", option.outerRadius)
        .style("cursor", "pointer");
      var g = svg.append("g")
        .attr("class", "main");

      var dataset = option.dataset;
      var pie = d3.pie()
        .padAngle(0) // padAngle 补白
        .value(function (d) {
          return d;
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
          return computeDelay(i);
        })
        .duration(function(d, i) {
          return 0.55 * time;
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

      _this.$parent.saveData(_this.parentclass,option,_this.parentid,_this.mark,_this.name,_this.resizetop,_this.resizeleft,option.width,option.height); //保存数据
      var oLi = document.querySelectorAll("."+_this.parentclass);
      sessionStorage.getItem("idx")
      sessionStorage.setItem("parentid",_this.parentid);
      var queryid= document.querySelector('#'+_this.parentid)
      /*_this.$parent.clickaa()*/
      return;

    },
    getlaryer(){//调取父组件的左侧部分菜单的功能
      this.$parent.layerArea(this.mark,this.parentClass);
    },
    getLaren(val){//选择图表出现右侧配置菜单
      sessionStorage.setItem("key",val); //把class名存取sessionstorage
      this.chooseChartPie()
    },
    delChart(){//删除图表
      let value = sessionStorage.getItem("key");
      let parentid=this.parentid
      /*document.getElementById(value).parentNode.remove();*/
      document.getElementById(parentid).remove()

      this.$parent.delData(parentid); //删除保存数据
      this.$parent.layerAreaDel(value); //删除画布
    },
    chooseNull(){
      d3.select(".container_right .right_pie")
        .style("display","none");
      d3.select(".container_right .right_bar")
        .style("display","none");
      d3.select(".container_right .right_line1")
        .style("display","none");
      d3.select(".container_right .right_line2")
        .style("display","none");
      d3.select(".container_right .initialize")
        .style("display","block");
    },
    chooseChartPie(){ /*选择图表 - 删除或重新渲染*/
      d3.select(".container_right .right_bar")
        .style("display","none");
      d3.select(".container_right .right_pie")
        .style("display","block");
      d3.select(".container_right .right_line1")
        .style("display","none");
      d3.select(".container_right .right_line2")
        .style("display","none");
      d3.select(".container_right .initialize")
        .style("display","none");
      var _this = this;
      document.onkeydown = function (event) {
        var e = event ? event : (window.event ? window.event : null);
        if (e.keyCode == 13) {
          /*获取配置参数 - 重新渲染图表*/
          _this.getArgumentPie();
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
          d3.select(".container_right .right_line1")
            .style("display","none");
          d3.select(".container_right .right_line2")
            .style("display","none");
          d3.select(".container_right .initialize")
            .style("display","block");
        }
      }
    },
    getArgumentPie(){/*完成配置*/

      var widthInp = document.getElementById("inpW").value;
      var heightInp = document.getElementById("inpH").value;
      var posLInp =0;
      var posRInp =0;
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
      this.resizeleft=parseInt(document.getElementById("inpL").value);
      this.resizetop=parseInt(document.getElementById("inpT").value);
      this.resizewidth=parseInt(document.getElementById("inpW").value);
      this.resizeheight=parseInt(document.getElementById("inpH").value);
      this.getPie(option,0);
      d3.select(".container_right .right_pie")
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
    getRandom(len){//获取随机数给classname 赋值随机不同的
      var pwd = "";
      for(var idx = 0; idx < len; idx ++){
        pwd = pwd + ((Math.random() * 16) & (0x5 | 0x9)).toString(16);
      }
      return pwd;
    },
  }

}
