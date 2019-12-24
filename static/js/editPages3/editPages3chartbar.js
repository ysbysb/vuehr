import * as d3 from 'd3';
import VueDragResize from 'vue-drag-resize';
export default {
  name: 'child',
  components: {
    VueDragResize
  },
  //需要返回页面的data
  props:['option','cxxr','name','parentclass','mark','parentid',"parentdragid","flag","comtop","comleft","comwidth","comheight"],
  data() {
    return {
      reEdit: false,
      parentClass: '', //目标父元素class
      idx: 0,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      barWidth:400,
      barHeight:190,
      barTop:'',
      barLeft:'',
      resizeleft:this.comleft,
      resizetop:this.comtop,
      resizewidth:this.comwidth,
      resizeheight:this.comheight,
      dataset:[20, 10, 30, 60, 33, 24, 12, 5],
      rectpadding:10,
      rectcolor:["#a54aa5", "#ca5145", "#fe9a87", "#ffed88", "#88ddeb", "#60a9e7", "#d48bfe", "#014e71"],
      xtext:["11/1","11/2","11/3","11/4","11/5","11/6","11/7","11/8"],
      //记录当前获得焦点的元素id名
      contentItem: null
    }
  },
  mounted(){

    // console.log(this.comwidth,this.comheight)
    this.getBar(this.option,this.cxxr);
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
    //点击非组件的画布区域
   /* blankClick(){
      this.$parent.clickaa(1);
    },*/
    clicklaren(){
      console.log(33)
    },
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
        dataset: this.dataset,
        xtext:this.xtext,
        rectPadding: this.rectpadding,//矩形间距
        color: this.rectcolor
      }
  /*    this.barTop=newRect.top
      this.barLeft=newRect.left*/
      this.getBar(option,0);
    },

      resize(newRect) {
        // console.log(this.width,this.height,this.top,this.left)
        this.width = newRect.width;
        this.height = newRect.height;
        this.top = newRect.top;
        this.left = newRect.left;

        this.resizetop=this.top
        this.resizeleft=this.left
        // console.log(this.width,this.height,this.top,this.left)
        // console.log(newRect.width,newRect.height,newRect.top,newRect.left)
       /* var option = { //配置参数
          className: this.parentClass,
          width: newRect.width,
          height: newRect.height,
          posL: 0 + 'px',
          posT: 0 + 'px',
          dataset: [20, 10, 30, 60, 33, 24, 12, 5],
          rectPadding: 10,//矩形间距
          color: ["#a54aa5", "#ca5145", "#fe9a87", "#ffed88", "#88ddeb", "#60a9e7", "#d48bfe", "#014e71", "#9f3ea0",
            "#c64739", "#ff947f", "#feeb80", "#82dbec", "#55a4e4"]
        }
        this.getBar(option,0);*/
        this.$parent.getResize(this.left, this.top, this.width, this.height,JSON.stringify(this.dataset),this.rectpadding,JSON.stringify(this.rectcolor),JSON.stringify(this.xtext));
      },

    getBar(option,cxxr){
      var _this = this;
      if(Object.keys(option).length==0){ //判断是否为空对象

        _this.reEdit = false; /*是否重新编辑*/
        var option = { //配置参数
          className:'',
          width: 400,
          height: 190,
          posL: 0+'px',
          posT: 0+'px',
          dataset: this.dataset,
          rectPadding: this.rectpadding,//矩形间距
          color: this.rectcolor,
          xtext:this.xtext
        };
      }else{
        _this.reEdit = true;
        /*清空图表*/
        if(cxxr ==1){

        }else{
          document.getElementById(option.className).remove();
        }

      }

      var marge = {top:50,bottom:50,left:50,right:50};
      //图表的id名 获取来源
      if(cxxr==1 || _this.reEdit){
        _this.parentClass = option.className;
      }else{
        _this.parentClass = 'chart'+this.getRandom(5);
        option.className = _this.parentClass;
      }
      _this.dataset=option.dataset
      _this.rectpadding=option.rectPadding
      _this.rectcolor=option.color
      _this.xtext=option.xtext
      let svg = d3.select("#"+_this.parentid +" ."+_this.parentclass)
        .append("svg") //创建svg画布
        .attr("class","barChart")
        .attr("id",_this.parentClass)
        .attr("width",option.width)
        .attr("height",option.height)
        .style("position","absolute")
        .style("left",option.posL)
        .style("top",option.posT)

        /*图表数据需用于下载功能*/
        .attr("disposeLeft", option.posL)
        .attr("disposeTop", option.posT)
        .attr("disposeData", option.dataset)
        .attr("disposexData", option.xtext)
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
        .call(xAxis)
        .selectAll("text")
        .text(function(d,i){
          return option.xtext[i]
        })//为柱状图添加x坐标轴
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
        // .attr("y",function (d) { //生成的矩形距离画布顶部的距离
        //   var min = yScale.domain()[0];
        //   return yScale(min);//可以得知，这里返回的是最大值
        // })
        .attr("width",function () { //根据比例尺来计算出矩形的宽度
          return xScale.bandwidth()-option.rectPadding;
        })
        // .attr("height",function (d) { //画布高度-距离顶部-距离底部-矩形距离顶部的高算出矩形的高度
        //   return 0;
        // })
        .attr("fill",function (d,i) {
          if (option.color.length > 1){
            return option.color[i];
          } else {
            return option.color[0];
          }
        })
        // .transition()//添加过渡
        // .duration(2000)//持续时间
        // .delay(function(d,i){//延迟
        //   return i*300;
        // })
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

      // console.log(_this.parentclass,option,_this.parentid,_this.mark,_this.name,_this.resizetop,_this.resizeleft)
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
      console.log(val)
      if(val){
        sessionStorage.setItem("key",val); //把class名存取sessionstorage
        this.chooseChartBar()
      }else{
    
      }




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
    chooseChartBar(){ /*选择图表 - 删除或重新渲染*/
      d3.select(".container_right .right_bar")
        .style("display","block");
      d3.select(".container_right .right_pie")
        .style("display","none");
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
          d3.select(".container_right .right_line1")
            .style("display","none");
          d3.select(".container_right .right_line2")
            .style("display","none");
          d3.select(".container_right .initialize")
            .style("display","block");
        }
      }
    },
    getArgumentBar(){/*完成配置*/

      var barWidth =document.getElementById("barW").value;
      var barHeight =document.getElementById("barH").value;
      var barP = document.getElementById("barP").value;
      var barDataset = document.getElementById("barData").value;
      var barDatax=document.getElementById("barxData").value;
      var barColor = document.getElementById("barColor").value;
      var posLInp = 0;
      var posRInp = 0;
      var parentClass = sessionStorage.getItem("key");
      this.dataset=JSON.parse(barDataset)
      this.rectpadding=parseInt(barP)
      this.rectcolor=JSON.parse(barColor)
      this.xtext=JSON.parse(barDatax)
      var option = { //配置参数
        className: parentClass, /*获取图表的class值*/
        width: barWidth?barWidth:400,
        height: barHeight?barHeight:190,
        posL: (posLInp?posLInp:0) +'px',
        posT: (posRInp?posRInp:0) +'px',
        dataset: barDataset?JSON.parse(barDataset):[20,10,30,60,33,24,12,5],
        rectPadding: barP?parseInt(barP):10,//矩形间距
        color: barColor?JSON.parse(barColor):["#a54aa5", "#ca5145", "#fe9a87", "#ffed88", "#88ddeb", "#60a9e7", "#d48bfe", "#014e71"],
        xtext:barDatax?JSON.parse(barDatax):['11/1','11/2','11/3','11/4','11/5','11/6','11/7','11/8']
      };
      this.resizeleft=parseInt(document.getElementById("barL").value);
      this.resizetop=parseInt(document.getElementById("barT").value);
      this.resizewidth=parseInt(document.getElementById("barW").value);
      this.resizeheight=parseInt(document.getElementById("barH").value)
      this.getBar(option,0);


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
    getRandom(len){//获取随机数给classname 赋值随机不同的
      var pwd = "";
      for(var idx = 0; idx < len; idx ++){
        pwd = pwd + ((Math.random() * 16) & (0x5 | 0x9)).toString(16);
      }
      return pwd;
    },
  }

}
