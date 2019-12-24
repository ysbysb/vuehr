<!-- 用户信息界面 -->
<template>
    <div style="text-align: left" id="userInformationClose">
      <el-dialog
        title="个人信息"
        style="padding: 20px;"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
        :before-close="handleCloseX"
        width="70%">
        <el-form :model="userInformation" :rules="rules" style="margin: 0px;padding: 0px;">
          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="用户名:">
                  <el-input
                    prefix-icon="el-icon-user"
                    v-model="userInformation.username"
                    size="mini"
                    style="width: 300px;"
                    :disabled="true"
                    placeholder="请输入用户名"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="密码:">
                  <el-input
                    type="password"
                    autocomplete="off"
                    prefix-icon="el-icon-unlock"
                    v-model="userInformation.password"
                    size="mini"
                    style="width: 300px"
                    :disabled="changedDisabled"
                    validate-on-rule-change="true"
                    placeholder="请输入密码"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>
                <el-form-item label="姓名:" prop="name">
                  <el-input
                    prefix-icon="el-icon-user-solid"
                    v-model="userInformation.name"
                    size="mini"
                    style="width: 300px"
                    :disabled="changedDisabled"
                    placeholder="请输入用户名"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>
                <el-form-item label="邮箱:" prop="email">
                  <el-input
                    prefix-icon="el-icon-message"
                    v-model="userInformation.email"
                    size="mini"
                    style="width: 300px"
                    :disabled="changedDisabled"
                    placeholder="请输入邮箱"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="手机号码:" prop="phone">
                  <el-input
                    prefix-icon="el-icon-mobile-phone"
                    v-model.number="userInformation.phone"
                    size="mini"
                    style="width: 300px"
                    :disabled="changedDisabled"
                    placeholder="请输入手机号码"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="住宅电话:" prop="telephone">
                  <el-input
                    prefix-icon="el-icon-phone"
                    v-model.number="userInformation.telephone"
                    size="mini"
                    style="width: 300px"
                    :disabled="changedDisabled"
                    placeholder="请输入住宅电话"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>
                <el-form-item label="联系地址:" prop="address">
                  <el-input
                    prefix-icon="el-icon-location"
                    v-model="userInformation.address"
                    size="mini"
                    style="width: 300px"
                    :disabled="changedDisabled"
                    placeholder="请输入联系地址"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="closeUserInterface">取消</el-button>
          <el-button size="mini" type="primary" @click="changeUserButton">{{textUserInformation}}</el-button>
        </span>
      </el-dialog>
    </div>
    
</template>
    
<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    
    export default {
      //vue文件的唯一名称
      name: '',
      //import引入的组件需要注入到对象中才能使用
      components: {},
      props: ['dialogFormVisible','userInformation'],
      data() {
      //这里存放数据
        return {
          // 修改按钮
          textUserInformation: "修改信息",
          // input是否禁用
          changedDisabled: true,
          // 个人信息
          emp: {
              username: '',
              password: '',
              name: '',
              email: '',
              phone: '',
              telephone: '',
              address: ''
          },
          //非空验证
          rules: {  //表单规则
              name: [{required: true, message: '必填:姓名', trigger: 'blur'}], //组件级别验证
              email: [
                { required: true, message: '必填:邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ], //组件类别验证
              phone: [
                { required: true, message: '必填:手机号码',trigger: 'blur' },
                { type: 'number', message: '手机号码必须为数字值',trigger: 'change' },
                { min: 10,max: 11, message: '手机号码长度为11', trigger: ['blur', 'change'] }
                ],
              telephone: [
                { required: true, message: '必填:住宅电话',trigger: 'blur' },
                { type: 'number', message: '住宅电话必须为数字值',trigger: ['blur', 'change'] }
                ],
              address: [{required: true, message: '必填:联系地址', trigger: 'blur'}]
          }
        };
      },
      //监听属性 类似于data概念
      computed: {},
      //监控data中的数据变化
      watch: {},
      //方法集合
      methods: {
        // 点击关闭窗口
        closeUserInterface(){
          if( this.changedDisabled == false ){
            this.changedDisabled = true;
            this.textUserInformation = '修改信息';
          } else if ( this.changedDisabled == true ){
            this.dialogFormVisible = false;
            this.$emit('update:dialogFormVisible',this.dialogFormVisible);
          }
        },
        // 点击修改信息按钮
        changeUserButton(){
          var _this = this;
          if (this.textUserInformation == '修改信息') {
            this.textUserInformation = "确定修改";
            this.changedDisabled = false;
          } else if (this.textUserInformation == "确定修改") {
            // /asse/findTypeAndLevel
            this.post2Request("user/updateUser",this.userInformation).then(resp => { 
              if (resp && resp.status == 200) {
                _this.open();
                _this.changedDisabled = true;
                _this.textUserInformation = '修改信息';
                var data = resp.data;
                console.log(resp.data);
              }
            })
          }
          
        },
        // 修改成功弹出框
        open() {
          this.$alert('修改成功', '个人信息', {
            confirmButtonText: '确定',
            // callback: action => {
            //   this.$message({
            //     type: 'info',
            //     message: `action: ${ action }`
            //   });
            // }
          });
        },
        // 点击X按钮，用户界面消失
        handleCloseX() {
          if (this.changedDisabled == false) {
            this.changedDisabled = true;
            this.textUserInformation = "修改信息";
          }
          this.dialogFormVisible = false;
          this.$emit('update:dialogFormVisible',this.dialogFormVisible);

          console.log(this.changedDisabled);
          console.log(this.dialogFormVisible);
        }
      },
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {
      
      },
      //生命周期 - 挂载完成（可以访问DOM元素） //el-dialog__headerbtn
      mounted() {

      },
      //生命周期 - 创建之前
      beforeCreate() {},
      //生命周期 - 挂载之前
      beforeMount() {}, 
      //生命周期 - 更新之前
      beforeUpdate() {},
      //生命周期 - 更新之后
      updated() {},
      //生命周期 - 销毁之前
      beforeDestroy() {},
      //生命周期 - 销毁完成
      destroyed() {},
      //如果页面有keep-alive缓存功能，这个函数会触发
      activated() {},
    }
</script>
<style>
    /*@import url(); 引入公共css类*/
    .el-input--mini .el-input__inner {
      height: 40px;
      line-height: 40px;
    }
    .el-form-item__label {
      width: 200px;
    }

    .el-form-item__error {
      padding-left: 200px
    }

</style>