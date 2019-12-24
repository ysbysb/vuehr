<template>
  <el-form :rules="rules" class="register-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="register_title">用户注册</h3>
    <el-form-item prop="username">
      <el-input type="text"   v-model="RegisterForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password"  v-model="RegisterForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item class="name">
      <el-input type="text"  v-model="RegisterForm.name"
                auto-complete="off" placeholder="昵称"></el-input>
    </el-form-item>
    <el-form-item class="phone">
      <el-input type="text"  v-model="RegisterForm.phone"
                auto-complete="off" placeholder="电话号码"></el-input>
    </el-form-item>
    <el-form-item class="telephone">
      <el-input type="text"  v-model="RegisterForm.telephone"
                auto-complete="off" placeholder="手机号码"></el-input>
    </el-form-item>
    <el-form-item class="address">
      <el-input type="text"  v-model="RegisterForm.address"
                auto-complete="off" placeholder="家庭住址"></el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%" @click="submitClick">注册</el-button>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%" @click="returnClick">返回登录页面</el-button>
    </el-form-item>

  </el-form>
</template>
<script>
  export default{
    created(){
      var _this = this;
      document.onkeydown = function(e) {
        let key = window.event.keyCode;
        if (key == 13) {
          _this.submitClick();
        }
      };
    },
    data(){
      return {
        rules: {
          name: [{required: true, message: '请输入昵称', trigger: 'blur'}],
          phone:[{required: true, message: '请输入电话号码', trigger: 'blur'}],
          telephone:[{required: true, message: '请输入手机号码', trigger: 'blur'}],
          address:[{required: true, message: '请输入您的住址', trigger: 'blur'}],
          account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          checkPass: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        RegisterForm: {
          username: 'test',
          password: '123',
          name: '测试用户',
          phone: '2697777',
          telephone: '18833334444',
          address: '古村落恒',
        },
        loading: false
      }
    },
    methods: {
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
      returnClick:function () {
        var _this = this;
        this.loading = false;
        var path = _this.$route.query.redirect;
        _this.$router.replace({path: path == '/' || path == undefined ? '/' : path});
      }
    }
  }
</script>
<style>
  body{
    background:url("../../static/img/chartComponent/Login.png") no-repeat center center fixed;
    background-size:cover;
  }
  .register-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgba(255, 255, 255, 0.41);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .register_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .register-container {
    text-align: left;
  }
</style>
