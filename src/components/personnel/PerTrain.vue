<template>
<!-- 用户管理 -->
  <div>
    <el-container>
      <!-- 上部分  搜索、添加 -->
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center" @click.stop>
        <div style="display: inline" @enter.native.prevent>
          <el-input
            placeholder="通过用户名查询用户"
            clearable
            @change="keywordsChange"
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            @keyup.enter.native="searchEmp"
            prefix-icon="el-icon-search"
            v-model="keywords">
          </el-input>

          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchEmp">查询
          </el-button>
        </div>
        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <el-button type="primary" size="mini" icon="el-icon-plus"
                     @click="showAddEmpView">
            添加员工
          </el-button>
        </div>
      </el-header>
      <!-- 表格、分页部分-->
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <!-- 表格 -->
          <el-table
            :data="emps"
            v-loading="tableLoading"
            border
            stripe
            @selection-change="handleSelectionChange"
            size="mini"
            style="width: 100%">
            <el-table-column
              type="selection"
              align="center"
              fixed
              width="50">
            </el-table-column>
            <el-table-column
              prop="id"
              align="center"
              fixed
              label="ID"
              width="70">
            </el-table-column>
            <el-table-column
              prop="name"
              width="100"
              align="center"
              label="用户姓名">
            </el-table-column>
            <el-table-column
              prop="phone"
              width="150"
              align="center"
              label="住宅电话">
            </el-table-column>
            <el-table-column
              prop="telephone"
              width="150"
              align="center"
              label="手机号码">
            </el-table-column>
            <el-table-column
              prop="address"
              width="208"
              align="center"
              label="联系地址">
            </el-table-column>
            <el-table-column
              prop="username"
              width="100"
              align="center"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="password"
               align="center"
              label="密码"
              width="150">
            </el-table-column>
            <el-table-column
              prop="email"
              width="160"
              align="center"
              label="邮箱">
            </el-table-column>
            <el-table-column
              width="130"
              prop="roles"  
              align="center"
              label="角色">
            </el-table-column>
            <el-table-column
              width="130"
              prop="juriId"
              align="center"
              label="与数据权限表id关联">
            </el-table-column>        
            <el-table-column
              prop="remark"  
              width="140"
              align="center"
              label="说明">
            </el-table-column>
            <el-table-column
              fixed='right'
              label="操作"
              align="center"
              width="211">
              <template slot-scope="scope">
                <el-button @click="showEditEmpView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button @click="checkDel(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" 
                           size="mini">查看资料
                </el-button>
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                          @click="deleteEmp(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-button type="danger" size="mini" v-if="emps.length>0" :disabled="multipleSelection.length==0"
                       @click="deleteManyEmps">批量删除
            </el-button>
            <!-- 分页 -->
            <el-pagination
              background
              :page-size="10"
              :current-page="currentPage"
              @current-change="currentChange"
              layout="prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-form :model="emp" :rules="rules" ref="addEmpForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <!-- 点击添加、编辑按钮弹出的对话框 -->
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="50%">
          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="用户姓名:" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.name" size="mini" style="width: 150px"
                            placeholder="请输入用户账号"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="住宅电话:" prop="phone">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.phone" size="mini" style="width: 150px"
                            placeholder="请输入住宅电话"></el-input>
                </el-form-item>
              </div>
            </el-col>
            
          </el-row>
          <el-row>
            
            <el-col :span="12">
              <div>
                <el-form-item label="手机号码:" prop="telephone">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.telephone" size="mini" style="width: 150px"
                            placeholder="请输入手机号码"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="联系地址:" prop="address">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.address" size="mini" style="width: 150px"
                            placeholder="请输入联系地址"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>          
            <el-col :span="12">
                <div>
                    <el-form-item label="enabled:" prop="enabled">
                    <el-radio-group v-model="emp.enabled">
                        <el-radio :label="true">true</el-radio>
                        <el-radio style="margin-left: 15px" :label="false">false</el-radio>
                    </el-radio-group>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="用户名:" prop="username">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.username" size="mini" style="width: 150px"
                            placeholder="请输入用户名"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="密码:" prop="password">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.password" size="mini" style="width: 150px"
                            placeholder="请输入用户密码"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="邮箱:" prop="email">
                  <el-input prefix-icon="el-icon-message" v-model="emp.email" size="mini" style="width: 150px"
                            placeholder="电子邮箱地址..."></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">  <!--邮箱-->
              <div>
                <el-form-item label="角色:" prop="roles">
                  <el-select v-model="emp.roles" style="width: 120px" size="mini" placeholder="请选择角色">
                    <el-option
                      v-for="item in rolesVal"
                      :key="item.id"
                      :label="item.nameZh"
                      :value="item.nameZh">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="权限:" prop="juriId">
                  <el-select v-model="emp.juriId" style="width: 120px" size="mini" placeholder="请选择权限">
                    <el-option
                      v-for="item in juriIdVal"
                      :key="item.id"
                      :label="item.nameZh"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="说明:" prop="remark">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.remark" size="mini" style="width: 200px"
                            placeholder="说明..."></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">

            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEidt">取 消</el-button>
            <el-button size="mini" type="primary" @click="addEmp('addEmpForm')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
    <el-form :model="emp" :rules="rules" ref="addEmpForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <!-- 点击添加、编辑按钮弹出的对话框 -->
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible2"
          width="50%">
          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="用户姓名:" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.name" size="mini" style="width: 150px"
                            placeholder="请输入用户账号" :readonly="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="住宅电话:" prop="phone">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.phone" size="mini" style="width: 150px"
                            placeholder="请输入住宅电话" :readonly="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
            
          </el-row>
          <el-row>
            
            <el-col :span="12">
              <div>
                <el-form-item label="手机号码:" prop="telephone">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.telephone" size="mini" style="width: 150px"
                            placeholder="请输入手机号码" :readonly="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="联系地址:" prop="address">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.address" size="mini" style="width: 150px"
                            placeholder="请输入联系地址" :readonly="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>          
            <el-col :span="12">
                <div>
                    <el-form-item label="enabled:" prop="enabled">
                    <el-radio-group v-model="emp.enabled">
                        <el-radio disabled :label="true">true</el-radio>
                        <el-radio disabled style="margin-left: 15px" :label="false">false</el-radio>
                    </el-radio-group>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="用户名:" prop="username">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.username" size="mini" style="width: 150px"
                            placeholder="请输入用户名" :readonly="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="密码:" prop="password">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.password" size="mini" style="width: 150px"
                            placeholder="请输入用户密码" :readonly="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="邮箱:" prop="email">
                  <el-input prefix-icon="el-icon-message" v-model="emp.email" size="mini" style="width: 150px"
                            placeholder="电子邮箱地址..." :readonly="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">  <!--邮箱-->
              <div>
                <el-form-item label="角色:" prop="roles">
                  <el-select disabled v-model="emp.roles" style="width: 120px" size="mini" placeholder="请选择角色" :readonly="true">
                    <el-option
                      v-for="item in rolesVal"
                      :key="item.id"
                      :label="item.nameZh"
                      :value="item.nameZh">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="权限:" prop="juriId">
                  <el-select disabled v-model="emp.juriId" style="width: 120px" size="mini" placeholder="请选择权限" :readonly="true">
                    <el-option
                      v-for="item in juriIdVal"
                      :key="item.id"
                      :label="item.nameZh"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="说明:" prop="remark">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.remark" size="mini" style="width: 200px"
                            placeholder="说明..." :readonly="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">

            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelSee">取 消</el-button>
            <el-button size="mini" type="primary" @click="seeEmp()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        emps: [], //表格数据，后台传
        keywords: '',
        dialogTitle: '',  //对话框的标题，添加或编辑
        multipleSelection: [],
        depTextColor: '#c0c4cc',
        juriIdVal: [],  //权限
        rolesVal:[], //角色
        totalCount: -1, //分页的总条数
        currentPage: 1, //当前页
        dialogVisible: false, //隐藏对话框
        dialogVisible2:false,
        tableLoading: false,  //加载效果
        showOrHidePop: false, //所属部门的双向绑定
        //表单数据对象
        emp: {  
          id:'',
          name:'',
          password: '',
          phone: '',
          telephone:'',
          address:'',
          enabled:'',
          username: '',
          email: '',
          remark: '',
          juriId: '',   //权限
          roles:''  //角色
        },
        rules: {  //表单规则，prop名
          name: [{required: true, message: '必填:用户名', trigger: 'blur'}],
          password: [{required: true, message: '必填:密码', trigger: 'blur'}],
          phone: [{required: false, message: '必填:住宅电话', trigger: 'blur'}],
          telephone: [{required: false, message: '必填:手机号码', trigger: 'blur'}],
          address: [{required: false, message: '必填:联系地址', trigger: 'blur'}],
          enabled: [{required: false, message: '必填:enabled', trigger: 'blur'}],
          username: [{required: false, message: '必填:用户名', trigger: 'blur'}],
          email: [{required: true, message: '必填:电子邮箱', trigger: 'blur'}, {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }],
          remark: [{required: false, message: '必填:说明', trigger: 'blur'}],
          juriId: [{required: false, message: '必填:权限', trigger: 'change'}],
          roles: [{required: false, message: '必填:角色', trigger: 'change'}]
        }
      };
    },
    mounted: function () {
      this.initData();
      this.loadEmps();
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
        //批量删除
      deleteManyEmps() {
        this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var ids = '';
          for (var i = 0; i < this.multipleSelection.length; i++) {
            ids += this.multipleSelection[i].id + ",";
            // console.log(ids)  //第几个
          }
          this.doDelete(ids);
        }).catch(() => {
        });
      },

      //删除点击事件
      deleteEmp(row) {
        this.$confirm('此操作将永久删除[' + row.username + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.id);
        
        }).catch(() => {
        });
      },
      //删除
      doDelete(ids) {
        this.tableLoading = true;
        var _this = this;
        this.delete2Request("/user/deleteById",{id:ids}).then(resp => {
            // console.log(resp)
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data; //里面有删除成功msg
            
            _this.loadEmps();
          }
        })
      },
      //查看按钮
      checkDel(row){
        this.dialogVisible2 = true;
        this.dialogTitle = "查看资料";
        this.emp = row;
        // console.log(row.id)
      },
      //查看 ->确定 
      seeEmp(){
        this.dialogVisible2 = false;
        this.tableLoading = true;
        var _this = this;
        this.getRequest("/user/findById?id="+this.emp.id).then(resp => {
            _this.tableLoading = false;
            if (resp && resp.status == 200) {
                var data = resp.data;
                _this.dialogVisible2 = false;
                _this.loadEmps();
            }
        })
      },
      //监听查询用户输入框
      keywordsChange(val) {
          this.currentPage = 1;
        if (val == '') {
          this.loadEmps();
        }
      },
      //查询按钮
      searchEmp() {
        this.currentPage = 1;
        this.loadEmps()
      },
      //当前页发生变动时触发
      currentChange(currentChange) {
        this.currentPage = currentChange;
        this.loadEmps();
      },
      //刷新表格数据
      loadEmps() {
        var _this = this;
        this.tableLoading = true;
        this.post2Request("/user/searchForPage",{username:_this.keywords,pageNum:_this.currentPage,pageSize:10}).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.emps = data.content;
            _this.totalCount = data.totalSize;

          }
        })
      },
      //模糊查询
    //   loadEmpsname(){
    //     // console.log(this.emp)
    //     var _this = this;
    //     this.tableLoading = true;
    //     this.post2Request("/user/searchForPage",{username:_this.keywords,pageNum:_this.currentPage,pageSize:10}).then(resp => {
    //         // console.log(resp)
    //         this.tableLoading = false;
    //         if (resp && resp.status == 200) {
    //             var data = resp.data; 
    //             _this.emps = data.content;
    //             _this.totalCount = data.totalSizes;
    //         }
    //     })
    //   },
      //表单确认按钮(编辑、添加)
      addEmp(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.emp.id) {
                //编辑-------------------------------
                this.tableLoading = true;
                this.post2Request("/user/update", this.emp).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  _this.dialogVisible = false;
                  _this.emptyEmpData();
                  _this.loadEmps();
                }
              })
            } else {
                //添加-------------------------------
                this.tableLoading = true;
                let params = {
                    "name":this.emp.name,
                    "phone":this.emp.phone,
                    "telephone":this.emp.telephone,
                    "address":this.emp.address,
                    "enabled":true,
                    "username":this.emp.username,
                    "password":this.emp.password,
                    "remark":this.emp.remark,
                    "roles":this.emp.roles,
                    "email":this.emp.email,
                    "juriId":this.emp.juriId
                }
                this.post2Request("/user/add",params).then(resp => {
                    this.tableLoading = false;
                    if (resp && resp.status == 200) {
                        var data = resp.data;
                        // console.log(data);   //插入成功
                        _this.dialogVisible = false;
                        _this.emptyEmpData();
                        _this.loadEmps();
                    }
                })
            }
          } else {
            return false;
          }
        });
      },
      //取消按钮
      cancelEidt() {
        this.dialogVisible = false;
        this.emptyEmpData();
      },
      cancelSee(){
        this.dialogVisible2 = false;
      },
      //下拉框数据
      initData() {
        // var _this = this;
        // this.getRequest("/role/findAll").then(resp => { //????????????????
        //   if (resp && resp.status == 200) {
        //     var data = resp.data;
        //     // console.log(data.data)
        //     // _this.juriIdVal = data.data;
        //     _this.rolesVal = data.data;
        //   }
        // })
      },
      //编辑按钮
      showEditEmpView(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑用户";
        this.emp = row;
      },
      //添加按钮
      showAddEmpView() {
        this.dialogTitle = "添加用户";
        this.dialogVisible = true;  //显示对话框
        var _this = this;

      },
      emptyEmpData() {
        this.emp = {
          id:'',
          name:'',
          password: '',
          phone: '',
          telephone:'',
          address:'',
          enabled:'',
          username: '',
          email: '',
          remark: '',  //说明
          juriId: '', //权限
          roles:''  //角色
        }
      }
    }
  };
</script>
<style>
  .el-dialog__body {
    padding: 0px 50px;
    padding-bottom: 0px;
  }
  .el-dialog__header {
    padding: 30px 50px 20px;
  }
  .el-dialog__footer {
    padding: 10px 50px 20px;
  }
  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
  .el-form-item__label{
      width: 120px
  }
   .el-form-item__error{
      padding-left: 120px;
  }

</style>
