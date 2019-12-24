<template>
  <div class="back">
  <el-form :rules="rules" class="userInfo-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h1 class="userInfo_title">用户信息</h1>
    <div class="line_01" />
    <div><img src="../../../static/img/editPages/userDefault.jpg" class="userDefault"/></div>
    <div class="line_01" />
    <div><button class="updatePhoto" @click="updatePhoto">修改头像</button></div>
    <ul class="userfrom">
      <li class="fromLi">用户昵称</li>
      <li class="fromLi">公司地址</li>
      <li class="fromLi">个人手机</li>
      <li class="fromLi">我的性别</li>
      <li class="fromLi">我的职业</li>
      <li class="fromLi">我的简介</li>
      <div class="from_input">
        <el-input v-model="username" class="elInput" ></el-input>
        <el-input v-model="address"  class="elInput"></el-input>
        <el-input v-model="phone"  class="elInput"></el-input>
        <el-input v-model="sex"  class="elInput"></el-input>
        <el-input v-model="profession"  class="elInput"></el-input>
        <el-input v-model="intro"  class="elInput"></el-input>
      </div>
    </ul>

<!--    <el-form-item style="width: 100%">-->
<!--      <el-button type="primary" style="width: 100%" @click="submitClick">修改密码</el-button>-->
<!--    </el-form-item>-->
  </el-form>
  </div>
</template>
<script>
  export default{
    created(){
    /*  var _this = this;
      document.onkeydown = function(e) {
        let key = window.event.keyCode;
        if (key == 13) {
          _this.submitClick();
        }
      };*/
    },
    data(){
      return{
        username: '未设置',
        address: '未设置',
        phone: '未设置',
        sex: '未设置',
        profession: '未设置',
        intro: '未设置',
      }
    },
    methods: {
      updatePhoto(){
        alert(123);
      },
      submitClick: function () {
        var _this = this;
        this.loading = true;
        this.postRequest('/system/hr/hr/reg', {
          name: this.RegisterForm.name,
          phone: this.RegisterForm.phone,
          telephone: this.RegisterForm.telephone,
          address: this.RegisterForm.address,
          username: this.RegisterForm.username,
          password: this.RegisterForm.password,
        }).then(resp=> {
          _this.loading = false;
          if (resp && resp.status == 200) {
            var path = _this.$route.query.redirect;
            _this.$router.replace({path: path == '/' || path == undefined ? '/' : path});
          }
        });
      },

    }
  }
</script>
<style>
  .el-input__inner{
    background: rgba(255, 255, 255, 0.41);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .elInput{
    padding-bottom: 3px;
  }
  .from_input{
    width:200px;
    float: right;
    /*margin-top: 0;*/
    position: relative;
    left: -300px;
    top:-260px;
  }
  .fromLi{
    font-size: 18px;
    line-height: 45px;
    width:120px;
  }
  .userfrom{
    height: 300px;
    /*width: 100px;*/
    margin-left: 180px;
    color: #131313;
  }
  .line_01{
    width: 100%;
    height: 1px;
    border-top: solid rgba(0, 0, 0, 0.99) 1px;
  }
  .userDefault{
    margin-left: 0px;
  }
  .updatePhoto{
    border-radius: 15px;
    background-clip: padding-box;
    margin-left: 15px;
    margin-top: 3px;
    width: 120px;
    padding: 12px 35px 12px 35px;
    background: rgba(255, 255, 255, 0.41);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .back{
    background-color: #646464;
    height: 100%;
    padding-top: 120px;
  }
  .userDefault{
    height: 150px;
    width: 150px;
  }
  .userInfo-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: auto;
    width: 850px;
    padding: 35px 35px 15px 35px;
    background: rgba(255, 255, 255, 0.41);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    text-align: left;
  }
  .userInfo_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
    font-size: 25px;
  }

</style>
