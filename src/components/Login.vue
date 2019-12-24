<template>
  <el-form :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked"
                 label-position="left">记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%" @click="submitClick">登录</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%" @click="registClick">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default{
    created(){
      var _this = this;
      document.onkeydown = function(e) {
        let key = window.event.keyCode;
        if (key == 13 && _this.$route.path == '/') {
          _this.submitClick();
        }
      };
    },
    data(){
      return {
        rules: {
          account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          checkPass: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: 'test',
          password: '123'
        },
        loading: false
      }
    },
    methods: {

      submitClick: function () {
        var _this = this;
        this.loading = true;
        this.postRequest('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        }).then(resp=> {

          _this.loading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            var roleArr = data.obj.roles
            var path = _this.$route.query.redirect;
            console.log(roleArr[0].username)
            if(roleArr[0].name == 'ROLE_user'){
          
              
              _this.$store.commit('login', data.obj);
              _this.$router
                .replace({path: path == '/' || path == undefined ? '/Edit' : path});
            }else{
           
              console.log(data.obj)
              _this.$store.commit('login', data.obj);
              _this.$router
                .replace({path: path == '/' || path == undefined ? '/home' : path});
            }

          }

        });
      },
      registClick: function() {
        var path = this.$route.query.redirect;
        this.$router.replace({path: path == '/' || path == undefined ? '/Register' : path});

      }
    }
  }
</script>
<style>
  body{
    background:url("../../static/img/chartComponent/Login.png") no-repeat center center fixed;
    background-size:cover;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
