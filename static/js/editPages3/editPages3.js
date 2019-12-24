import getBar from "../../../src/pages/editPages3/editPages3chartbar"
import getPie from "../../../src/pages/editPages3/editPages3chartpie"
import VueDragResize from 'vue-drag-resize';
import mytemplate from '../../../src/pages/editPages3/htmlChild/mytemplate'
import userInterface from '../../../src/pages/editPages3/htmlChild/userInterface'
import {resumecss} from './index.js'
import * as d3 from "d3";
import {exportVUE} from './exportvue.js'


export default {

  name: 'parent',

  //需要返回页面的data
  data() {
    return {
      //userid
      userId:'1',
      /*屏幕宽度*/
      widthvalue:1920,
      heightvalue:1080,
      /*屏幕背景颜色*/
      bgcolor: '',
      barWidth: 400,
      barHeight: 190,
      barTop: 0,
      barLeft: 0,
      chartsFN: [
        //
        {"name": "新建模板", "icon": "../../../static/img/editPages/tubiao.png"},
        {"name": "组件", "icon": "../../../static/img/editPages/tubiao.png"},
        {"name": "背景", "icon": "../../../static/img/editPages/charts.png"},
        {"name": "构图", "icon": "../../../static/img/editPages/zhibiao.png"},
        {"name": "颜色", "icon": "../../../static/img/editPages/fsux_tubiao_dongtaiguijiditu.png"},
        {"name": "字体", "icon": "../../../static/img/editPages/wenzi.png"},
        {"name": "媒体", "icon": "../../../static/img/editPages/meiti.png"},
        {"name": "边框", "icon": "../../../static/img/editPages/sucai.png"}
      ],
      operations: [
        {"name": "保存", "icon": "../../../static/img/editPages/baocun.png","id":"save"},
        {"name": "预览", "icon": "../../../static/img/editPages/yulan.png","id":"preview"},
        {"name": "分享", "icon": "../../../static/img/editPages/fenxiang.png","id":"share"},
        {"name": "下载", "icon": "../../../static/img/editPages/fabu.png","id":"download"},
        {"name": "退出", "icon": "../../../static/img/editPages/back.png","id":"exit"}
      ],
      layers: [
        {"name": "", "icon": "../../../static/img/editPages/topmove.png"},
        {"name": "", "icon": "../../../static/img/editPages/bottommove.png"},
        {"name": "", "icon": "../../../static/img/editPages/topmove.png"},
        {"name": "", "icon": "../../../static/img/editPages/bottommove.png"}
      ],
      known: [
        {"name": "分组", "icon": ""},
        {"name": "锁定", "icon": ""},
        {"name": "添加", "icon": ""},
        {"name": "替换", "icon": ""}
      ],
      listBoxOnce: [ //后台获取的数据 - 图表选择区
        {"name": "圆环", "icon": "../../../static/img/editPages/line.png", "className": "pie", "marks": "圆环"},
        {"name": "垂直基本柱图", "icon": "../../../static/img/editPages/line.png", "className": "bar", "marks": "垂直基本柱图"},
        {"name": "折线1", "icon": "../../../static/img/editPages/line.png", "className": "polygonal1", "marks": "折线1"},
        {"name": "折线2", "icon": "../../../static/img/editPages/line.png", "className": "polygonal2", "marks": "折线2"},
        {"name": "折线3", "icon": "../../../static/img/editPages/line.png", "className": "polygonal3", "marks": "折线3"},
        {"name": "折线4", "icon": "../../../static/img/editPages/line.png", "className": "polygonal4", "marks": "折线4"},
        {"name": "折线5", "icon": "../../../static/img/editPages/line.png", "className": "polygonal5", "marks": "折线5"},
        {"name": "图表", "icon": "../../../static/img/editPages/line.png", "className": "pie", "marks": "圆环"},
        {"name": "图表", "icon": "../../../static/img/editPages/line.png", "className": "pie", "marks": "圆环"},
        {"name": "图表", "icon": "../../../static/img/editPages/line.png", "className": "pie", "marks": "圆环"},
        {"name": "图表", "icon": "../../../static/img/editPages/line.png", "className": "pie", "marks": "圆环"},
        {"name": "图表", "icon": "../../../static/img/editPages/line.png", "className": "pie", "marks": "圆环"}
      ],
      value: 80, //滑块
      showIndex: 0,
      items: [
        {
          id: 1,
          color: "#F9C09D",
          chartName: "chart0"
        }, {
          id: 2,
          color: "#F9D89D",
          chartName: "chart1"
        }, {
          id: 3,
          color: "#F8F99D",
          chartName: "chart2"
        }, {
          id: 4,
          color: "#C2F99D",
          chartName: "chart3"
        }, {
          id: 5,
          color: "#9DF9DA",
          chartName: "chart4"
        }, {
          id: 6,
          color: "#9DCDF9",
          chartName: "chart5"
        }, {
          id: 7,
          color: "#E49DF9",
          chartName: "chart6"
        }, {
          id: 8,
          color: "#F99DAE",
          chartName: "chart7"
        }
      ],
      lastArg: [], //传递后台
      clickIndex: -1,
      parentClass: '', //目标父元素class
      reEdit: false, //再次编辑
      lastArgLsit: [],//遍历所有点击的图表缩略图并生成子组件
      lastArgLsits: [],//用来存取给后台发送数据的
      idx: 0,//柱形图的索引值
      idxp: 0,
      // pageData: []  //传递后台,
      resizeData: {"left": "", "top": "", "width": "", "height": "","dataset":"","rectpadding":"",'rectcolor':"","xtext":""},
      //被选中的图形组件id名
      contentItem: null,
      // 用户头像点击出现用户信息界面状态
      dialogFormVisible: false, //显示消失
      // 用户的信息
      userInformation: {
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        telephone: '',
        address: ''
      },
      dialogTemVisible: false, //我的场景的dialog显示消失
      temid: "", //场景id
      senceName:""//场景名称
    }
  },
  components: {
    getBar,
    getPie,
    mytemplate,
    userInterface,
    VueDragResize,
  },
  //在模板渲染成html前调用
  created() {

    // this.initStart(); //初始化页面

    this.userId=this.$store.state.user.username;
    // console.log(this.userId);
    this.reload();
    var _this=this
    document.onkeydown = function (event) {
      var e = event ? event : (window.event ? window.event : null);
      if (e.keyCode == 13) {
        // console.log(_this.widthvalue,_this.heightvalue,_this.color)
        document.getElementsByClassName("showArea")[0].style.width=_this.widthvalue+'px';
        document.getElementsByClassName("showArea")[0].style.height=_this.heightvalue+'px';
        document.getElementsByClassName("showArea")[0].style.backgroundColor=_this.bgcolor;
      }
    };
    

    //刷新关闭监听
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
  beforeDestroy() {
    //this.initEnd();
  },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
  mounted(){

    let aaaaaaaa = document.getElementsByClassName("getmychart");
    let bbbbbbbb = document.getElementsByClassName("vdr-stick");
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",aaaaaaaa);
    // console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb",bbbbbbbb);
  },
  methods: {
    // 点击用户头像接收个人信息数据
    getUserInformation() {
      this.dialogFormVisible = true;
      var _this = this;
      // http://localhost:8082/user/findUser?userName=hanyu
      this.getRequest("/user/findUser?userName="+ this.userId).then(resp => { // /employee/basic/basicdata
        if (resp && resp.status == 200) {
          var data = resp.data;
          this.userInformation = data.data;
        //   console.log(this.userInformation);
        }
      })
    },
    getmytemplate() {
      
    //   console.log(this.userId)
      var _this = this;
      _this.dialogTemVisible = true;
    },

    //接收子组件传过来的选中图形组件的id名
    itemId(val){
      this.contentItem = val;
    },
    //点击右边控制图表菜单栏
    rightMenu(e){
      let focusOne = document.getElementById(this.contentItem);
      if (e.currentTarget.getAttribute('class') == 'container_right') {
        focusOne.classList.remove('inactive');
        focusOne.classList.add('active');
      } else {
        focusOne.classList.remove('active');
        focusOne.classList.add('inactive');
      }
    },

    //解决页面第一次加载样式错乱的办法
    reload(){
      if(location.href.indexOf('#reloaded')==-1){
        location.href=location.href+"#reloaded"
        location.reload()
        //this.initEnd
      }
    },
    //接收数据 进入编辑页面
    getDataMytemp(data){
    //   console.log(data)
      this.lastArgLsit=data.content
      this.temid=data.id
      this.senceName=data.sceneName
      var _this=this;

    //   console.log(data.userBgColor.bgcolor)
      if(typeof (data.userBgColor.bgcolor) =="undefined"){
        // console.log(typeof (res.data.bgcolor))
        document.getElementsByClassName("showArea")[0].style.backgroundColor="";
      }else{
        _this.bgcolor=data.userBgColor.bgcolor
        document.getElementsByClassName("showArea")[0].style.backgroundColor=_this.bgcolor;
      }
      if(typeof (data.userBgColor.greensize)=="undefined"){
        // console.log(typeof (res.data.greensize))
      }else{
        _this.widthvalue=data.userBgColor.greensize.width
        _this.heightvalue=data.userBgColor.greensize.height
        document.getElementsByClassName("showArea")[0].style.width=_this.widthvalue+'px';
        document.getElementsByClassName("showArea")[0].style.height=_this.heightvalue+'px';
      }

    },
    beforeunloadFn(e) {
      console.log('刷新或关闭');
      //this.initEnd(); //销毁页面-传参
    },
    //网站的保存功能
    initEnd() {
      var _this = this;
    //   console.log(_this.temid)
      if(_this.temid==""){
        _this.$prompt('请输入场景名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '场景名称不能为空'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的场景名称是: ' + value
          });
          _this.senceName=value
  
          var content = {
            "content": _this.lastArgLsits,
            "time": Date.parse(new Date()),
            "id": _this.temid,
            "userId": _this.userId,
            "sceneName":value,
            "userBgColor":{
              "bgcolor":_this.bgcolor,
              "greensize":{
                "width":_this.widthvalue,
                "height":_this.heightvalue
              }
            }
          };
        //   console.log(content)
        //   console.log(JSON.stringify(content))
          var url = '/chart/insertOrUpdate';//请求地址
          _this.$http({
            url: url,
            method: 'post',//请求方式
            data: content,
          }).then(function (res) {
            // 请求成功回调
            _this.$message.success("保存成功")
            //alert("传值成功！！！");
            _this.$refs.paresll.loadTem()
  
          }, function () {
            // 请求失败回
            // console.log('调用失败');
            _this.$message.error("保存失败！")
          });
  
  
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });

      }else{

        var content = {
          "content": _this.lastArgLsits,
          "time": Date.parse(new Date()),
          "id": _this.temid,
          "userId": _this.userId,
          "sceneName":_this.senceName,
          "userBgColor":{
            "bgcolor":_this.bgcolor,
            "greensize":{
              "width":_this.widthvalue,
              "height":_this.heightvalue
            }
          }
        };
        // console.log(content)
        // console.log(JSON.stringify(content))
        var url = '/chart/insertOrUpdate';//请求地址
        _this.$http({
          url: url,
          method: 'post',//请求方式
          data: content,
        }).then(function (res) {
          // 请求成功回调
          _this.$message.success("保存成功")
          //alert("传值成功！！！");
          _this.$refs.paresll.loadTem()

        }, function () {
          // 请求失败回
          // console.log('调用失败');
          _this.$message.error("保存失败！")
        });      
      }
      
    },
    saveData(parentClass, option, parentid, mark, name,comtop,comleft,comwidth,comheight) { /*保存参数*/
      // console.log(parentClass, option, parentid, mark, name,comtop,comleft,comwidth,comheight)
      //后台参数传递模板
      var targets = {
        "name": parentClass,
        "optionData": option,
        "cxxr": 1,
        "parentclass": parentClass,
        "parentid": parentid,
        "comname": name,
        "mark": mark,
        "comtop":comtop,
        "comleft":comleft,
        "comwidth":comwidth,
        "comheight":comheight
      };
      var _this = this;

      if (this.lastArgLsits != 0) {
        _this.lastArgLsits.forEach(function (ind, val) {
          if (ind.parentid == parentid) {
            _this.lastArgLsits.splice(val, 1);
            return;
          }
          return;
        });
      }
      this.lastArgLsits.push(targets);
      return;
    },
    delData(parentid) { /*删除参数*/
      var _this = this;
      this.lastArgLsits.forEach(function (ind, val) {
        if (ind.parentid == parentid) {
          _this.lastArgLsits.splice(val, 1);
          return;
        }
        return;
      });
      var url = '/chart/delete';//请求地址
      this.$http({
        url: url,
        method: 'post',//请求方式
        data: {"parentid":parentid,"userId":_this.userId},
      }).then(function (res) {
        // 请求成功回调
        _this.$message.success("删除成功")
        //alert("传值成功！！！");
      }, function () {
        // 请求失败回
        // console.log('调用失败');
        _this.$message.error("保存失败！")
      });
    },
    showChart(targetClass, marks) {
      var listoption = {}
      if (targetClass == 'pie') {
        this.idxp = this.idxp + 1
        listoption = {
          name: "getPie",
          optionData: {},
          cxxr: 0,
          parentclass: "getPie",
          parentid: "",
          mark: marks,
          comname: "getPie" + this.idxp,
          comtop:0,
          comleft:0,
          comwidth:400,
          comheight:190
        }
      } else if (targetClass == 'bar') {
        this.idx = this.idx + 1
        listoption = {
          name: "getBar",/*组件的类型名*/
          optionData: {},/*图表的数据*/
          cxxr: 0,
          parentclass: "getBar",/*图表的class名*/
          parentid: "",/*拖拽组件的id*/
          mark: marks,/*图表的中文名称*/
          comname: "getBar" + this.idx, //下载文件名
          comtop:0,
          comleft:0,
          comwidth:400,
          comheight:190
        }
      } else if (targetClass == 'polygonal1') {
        this.getPolygonal1();
      } else if (targgetResizeetClass == 'polygonal2') {
        this.getPolygonal2();
      }
      this.lastArgLsit.push(listoption)
      //操作画布区域
    },
    //删除图表的同时删除左侧相对应的菜单
    layerAreaDel(target) {
      var _this = this;
      var oLi = document.querySelectorAll('.menu .menuBox li');
      for (var i = 0; i < oLi.length; i++) {
        if (oLi[i].getAttribute("parentClass") == target) {
          oLi[i].remove();
          return;
        }
      }
      return;
    },
    //左侧菜单栏
    layerArea(marks, val) {
      this.parentClass = val
      var _this = this;
    //   var oLiNum = document.querySelectorAll('.menu .menuBox li').length;
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
        '                    <span>' + marks + '</span>\n' +
        '                  </div>\n' +
        '                </div>';
      p.innerHTML = html;
      target.appendChild(p);

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
      for (let i = 0; i < oLi.length; i++) {
        // var bian = i;
        
        oLi[i].onclick = function (e) {
          // oUl.removeChild(e.target);
          for (var j = 0; j < oLi.length; j++) {
            oLi[j].style.background = '';
          };
          this.style.background = '#2483ff';
          var val = this.getAttribute("parentClass");
          //调用子组件中的方法
          _this.$refs.parentclasschild[0].getLaren(val);          
         
          //图表的获得焦点
          _this.svgListBlur(val);
          return;
        }
      }

    },
    //图表的获得焦点
    svgListBlur(id) {
      var oLi = document.querySelectorAll('svg');
      var index = 0;
      for (var j = 0; j < oLi.length; j++) {
        index = j;
        var parentClass = oLi[index].getAttribute("id");
        if (parentClass == id) {
          oLi[index].style.border = '1px solid blue';
          oLi[index].style.zIndex = '9999';
        } else {
          oLi[index].style.border = 0;
          oLi[index].style.zIndex = 0;
        }
      }
    },
    //左侧菜单栏的获得焦点
    menuListBlur(id) {
      var oLi = document.querySelectorAll('.menu .menuBox li');
      var index = 0;
      for (var j = 0; j < oLi.length; j++) {
        index = j;
        var parentClass = oLi[index].getAttribute("parentClass");
        if (parentClass == id) {
          oLi[index].style.background = '#2483ff';
        } else {
          oLi[index].style.background = '';
        }
      }
    },
    //图表选择区域点击事件 clickHandle
    clickHandle(iconName, index) {
      if(iconName=="组件"){
        if (this.clickIndex != index) {
          this.clickIndex = index; //背景色变色
          //显示选择图表框
          var target = document.getElementsByClassName('container_middle')[0].getElementsByClassName('listBoxOnce')[0];
          target.style.height = "106px";
          target.style.display = "block";
          //下移画布面板
          var target2 = document.getElementsByClassName('container_middle')[0].getElementsByClassName('layerBoxOnce')[0];
          target2.style.height = "calc(100% - 106px)";
        } else {
          this.clickIndex = -1; //再次点击还原背景色
          //关闭选择图表框
          var target = document.getElementsByClassName('container_middle')[0].getElementsByClassName('listBoxOnce')[0];
          target.style.height = "0";
          target.style.display = "none";
          //还原画布面板
          var target2 = document.getElementsByClassName('container_middle')[0].getElementsByClassName('layerBoxOnce')[0];
          target2.style.height = "100%";
        }

      }else if(iconName=="新建模板"){
        //清空画板数据
        this.lastArgLsit = [];
        //清空左侧菜单栏
        document.getElementById('menuBox').innerHTML = "";
        //更改右边菜单栏
        var oLi2=document.getElementById('initialize');
        oLi2.style.display=`block`;
        var oLi3 = document.querySelectorAll('.thubs');
        for(var i=0;i<oLi3.length;i++){
          oLi3[i].style.display=`none`;
        }
        // 还原data
        this.widthvalue = 1920; /*屏幕宽度*/
        this.heightvalue = 1080;
        this.bgcolor = ''; /*屏幕背景颜色*/
        this.barWidth = 400;
        this.barHeight = 190;
        this.barTop = 0;
        this.barLeft = 0;
        this.value = 80; //滑块
        this.showIndex = 0;
        this.lastArg = []; //传递后台
        this.clickIndex = -1;
        this.parentClass = ''; //目标父元素class
        this.reEdit = false; //再次编辑
        this.lastArgLsit = [];//遍历所有点击的图表缩略图并生成子组件
        this.lastArgLsits = [];//用来存取给后台发送数据的
        this.idx = 0;//柱形图的索引值
        this.idxp = 0;
        // pageData = []  //传递后台;
        this.resizeData = {"left": "", "top": "", "width": "", "height": "","dataset":"","rectpadding":"",'rectcolor':"","xtext":""};
        //被选中的图形组件id名
        this.contentItem = null;
        this.temid = ""; //场景id
        this.senceName = ""; //场景名称
        document.getElementsByClassName("showArea")[0].style.backgroundColor="";
      }
      
    },
    getRandom(len) {//获取随机数给classname 赋值随机不同的
      var pwd = "";
      for (var idx = 0; idx < len; idx++) {
        pwd = pwd + ((Math.random() * 16) & (0x5 | 0x9)).toString(16);
      }
      return pwd;
    },
    //网站的保存、浏览、分享、下载、退出功能点击事件
    selectNav(name, index) {
      if (name == '下载') {
        this.exportvues();
      } else if (name == '保存') {
        this.initEnd();
      }

    },
    //网站下载功能
    exportvues() {
        var _this = this;
        var aa = this.$el;
      //   console.log( _this.senceName)
        if(_this.temid !== ""){   //有id，编辑页面
            var content = {
              "content": _this.lastArgLsits,
              "time": Date.parse(new Date()),
              "id": _this.temid,
              "userId": _this.userId,
              "sceneName": _this.senceName,
              "userBgColor":{
                "bgcolor":_this.bgcolor,
                "greensize":{
                  "width":_this.widthvalue,
                  "height":_this.heightvalue
                }
              }
            };
            var url = '/chart/insertOrUpdate';//请求地址
              _this.$http({
                url: url,
                method: 'post',//请求方式
                data: content,
              }).then(function (res) {
                // 请求成功回调
                _this.$message.success("保存成功")
                _this.$refs.paresll.loadTem();
                exportVUE(_this,_this.widthvalue,_this.heightvalue,_this.bgcolor);
      
              }, function () {
                // 请求失败回
                _this.$message.error("保存失败！")
              });
        }else{    //新建，先出弹出框
          _this.$prompt('请输入场景名称', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /\S/,
              inputErrorMessage: '场景名称不能为空'
            }).then(({ value }) => {
              this.$message({
                type: 'success',
                message: '你的场景名称是: ' + value
              });
              _this.senceName=value
      
              var content = {
                "content": _this.lastArgLsits,
                "time": Date.parse(new Date()),
                "id": _this.temid,
                "userId": _this.userId,
                "sceneName":value,
                "userBgColor":{
                  "bgcolor":_this.bgcolor,
                  "greensize":{
                    "width":_this.widthvalue,
                    "height":_this.heightvalue
                  }
                }
              };
              var url = '/chart/insertOrUpdate';//请求地址
              _this.$http({
                url: url,
                method: 'post',//请求方式
                data: content,
              }).then(function (res) {
                // 请求成功回调
                // _this.$message.success("保存成功")
                _this.$refs.paresll.loadTem();
                exportVUE(_this,_this.widthvalue,_this.heightvalue,_this.bgcolor);
      
              }, function () {
                // 请求失败回
                _this.$message.error("保存失败！")
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });       
            });
        }
        
     
    },
    getResize(left, top, width, height,dataset,rectpadding,rectcolor,xtext) {
      this.resizeData.left = left;
      this.resizeData.top = top;
      this.resizeData.width = width;
      this.resizeData.height = height;
      this.resizeData.dataset=dataset; 
      this.resizeData.rectpadding=rectpadding;
      this.resizeData.rectcolor=rectcolor;
      this.resizeData.xtext=xtext;
      // console.log(left,top,width,height,dataset,rectpadding,rectcolor,xtext)
    },
    //点击除图表之外的空白画布产生点击事件
    clickEsp(){
      this.reload();
      var _this=this;
      _this.$refs.parentclasschild[0].getLaren()
      document.onkeydown = function (event) { 
        var e = event ? event : (window.event ? window.event : null);
        if (e.keyCode == 13) {
          // console.log(_this.widthvalue,_this.heightvalue,_this.color)
          document.getElementsByClassName("showArea")[0].style.width=_this.widthvalue+'px';
          document.getElementsByClassName("showArea")[0].style.height=_this.heightvalue+'px';
          document.getElementsByClassName("showArea")[0].style.backgroundColor=_this.bgcolor;
        }
      };
        // let url = '/query/bgColorAndSize';//请求地址
        // this.$http({
        //   url: url,
        //   method: 'post',//请求方式
        //   // 请求体重发送的数据
        //   data: {userId: _this.userId},
        // }).then(function (res) {
        //   // 请求成功回调
        //   if(typeof (res.data.bgcolor) =="undefined"){
        //     // console.log(typeof (res.data.bgcolor))
        //     document.getElementsByClassName("showArea")[0].style.backgroundColor="";
        //   }else{
        //     _this.bgcolor=res.data.bgcolor
        //     document.getElementsByClassName("showArea")[0].style.backgroundColor=_this.bgcolor;
        //   }
        //   if(typeof (res.data.greensize)=="undefined"){
        //     // console.log(typeof (res.data.greensize))
        //   }else{
        //     _this.widthvalue=res.data.greensize.width
        //     _this.heightvalue=res.data.greensize.height
        //     document.getElementsByClassName("showArea")[0].style.width=_this.widthvalue+'px';
        //     document.getElementsByClassName("showArea")[0].style.height=_this.heightvalue+'px';
        //   }
        //   })
        // var _this = this;
      var oLi = document.querySelectorAll('.menu .menuBox li');
      for (var i = 0; i < oLi.length; i++) {
        oLi[i].style.background = 'transparent';
      };
      var oLi2=document.getElementById('initialize');
      oLi2.style.display=`block`;
      var oLi3 = document.querySelectorAll('.thubs');

      for(var i=0;i<oLi3.length;i++){
        oLi3[i].style.display=`none`;
      }
    },
  }
}
