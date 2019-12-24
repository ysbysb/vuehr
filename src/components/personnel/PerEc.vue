<template>
<!-- 角色管理 -->
  <div>
    <el-container>
      <!-- 上部分  搜索、添加 -->
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
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
      <!-- 表格部分 分页部分-->
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
              width="40">
            </el-table-column>
            <el-table-column
              prop="id"
              width="95"
              align="center"
              label="角色id">
            </el-table-column>
            <el-table-column
              prop="name"
              width="120"
              align="center"
              label="角色名(中文)">
            </el-table-column>
            <el-table-column
              prop="nameZh"
              width="120"
              align="center"
              label="角色名(英文)">
            </el-table-column>
            <el-table-column
              prop="createTime"
              width="180"
              align="center"
              label="创建日期">
               <template slot-scope="scope">{{ scope.row.createTime | formatDate}}</template>
            </el-table-column>
            <el-table-column
              prop="updateTime"
              width="180"
              align="center"
              label="修改日期">
              <template slot-scope="scope">{{ scope.row.updateTime | formatDate}}</template>
            </el-table-column>
            <!-- 三个备用字段 -->
             <el-table-column
              prop="bak01"
              width="180"
              align="center"
              label="备用字段1">
            </el-table-column>
            <el-table-column
              prop="bak02"
              width="180"
              align="center"
              label="备用字段2">
            </el-table-column>
            <el-table-column
              prop="bak03"
              width="180"
              align="center"
              label="备用字段3">
            </el-table-column>

            <!-- <el-table-column
              prop="remark"  
              width="420"
              align="center"
              label="说明">
            </el-table-column> -->
            <el-table-column
              label="操作"
              align="center"
              width="210">
              <template slot-scope="scope">
                <el-button @click="showEditEmpView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button @click="showEditEmpLook(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">查看
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
            <!-- 分页 page-size:每页显示的个数 -->
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
                <el-form-item label="角色(中文名):" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.name" size="mini" style="width: 150px"
                            placeholder="请输入角色(中文名)"></el-input>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="12">
              <div>
                <el-form-item label="角色(英文名):" prop="nameZh">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.nameZh" size="mini" style="width: 150px"
                            placeholder="请输入角色(英文名)"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="备用字段2:" prop="bak02">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.bak02" size="mini" style="width: 200px"
                            placeholder="备用2..."></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="备用字段1:" prop="bak01">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.bak01" size="mini" style="width: 200px"
                            placeholder="备用1..."></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
              <div>
                <el-form-item label="备用字段3:" prop="bak03">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.bak03" size="mini" style="width: 200px"
                            placeholder="备用3..."></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEidt">取 消</el-button>
            <el-button size="mini" type="primary" @click="addEmp('addEmpForm')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
    <!-- 查看 -->
    <el-form :model="emp" ref="addEmpForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <!-- 点击查看按钮弹出的对话框 -->
        <el-dialog
          :title="dialogTitles"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisibles"
          width="50%">


          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="角色(中文名):" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.name" size="mini" style="width: 150px"
                            placeholder="请输入角色(中文名)" disabled="true"></el-input>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="12">
              <div>
                <el-form-item label="角色(英文名):" prop="nameZh">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.nameZh" size="mini" style="width: 150px"
                            placeholder="请输入角色(英文名)" disabled="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="备用字段2:" prop="bak02">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.bak02" size="mini" style="width: 200px"
                            placeholder="备用2..." disabled="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="备用字段1:" prop="bak01">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.bak01" size="mini" style="width: 200px"
                            placeholder="备用1..." disabled="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
              <div>
                <el-form-item label="备用字段3:" prop="bak03">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.bak03" size="mini" style="width: 200px"
                            placeholder="备用3..." disabled="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEidt">取 消</el-button>
            <el-button size="mini" type="primary" @click="lookEmp('addEmpForm')">确 定</el-button>
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
        beginDateScope: '',
        dialogTitle: '',  //对话框的标题，添加或编辑
        dialogTitles: '',  //对话框的标题，查看
        multipleSelection: [],
        depTextColor: '#c0c4cc',
        permissions: [],  //权限
        roles:[], //角色
        totalCount: -1, //分页的总页数
        currentPage: 1, //当前页
        dialogVisible: false, //隐藏对话框
         dialogVisibles: false, //隐藏对话框查看
        tableLoading: false,  //加载效果
        showOrHidePop: false, //所属部门的双向绑定
        emp: {  //表单数据对象
          name: '',
          createTime: '',
          nameZh:'',
          id:'',
          updateTime:'',
         // remark:'',
          role_id:'',
          bak01:'',
          bak02:'',
          bak03:''
        },
        rules: {  //表单规则，prop名
          id: [{required: true, message: '必填:用户id', trigger: 'blur'}],
          name: [{required: true, message: '必填:角色名(中文)', trigger: 'blur'}],
          //createTime: [{required: true, message: '必填:创建日期', trigger: 'blur'}],
          nameZh:[{required: true, message: '必填:角色名(英文)', trigger: 'blur'}],
          //updateTime: [{required: true, message: '必填:修改日期', trigger: 'blur'}],
          role_id:[{required: true, message: '用户id', trigger: 'blur'}],
          //remark: [{required: true, message: '必填:说明', trigger: 'blur'}],
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
      deleteManyEmps() {
        this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var ids = '';
          for (var i = 0; i < this.multipleSelection.length; i++) {
            ids += this.multipleSelection[i].id + ",";
          }
          this.doDelete(ids);
        }).catch(() => {
        });
      },
      deleteEmp(row) {
        this.$confirm('此操作将永久删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.id);
        }).catch(() => {
        });
      },
      keywordsChange(val) {
        if (val == '') {
          this.loadEmps();
        }
      },
      searchEmp() {
        this.loadEmps();
      },
      currentChange(currentChange) {
        this.currentPage = currentChange;
        this.loadEmps();
      },

      doDelete(ids) {
        this.tableLoading = true;
        var _this = this;
        this.delete2Request("/role/deleteById",{id:ids}).then(resp => {
            // console.log(resp)
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data; //里面有删除成功msg
            
            _this.loadEmps();
          }
        })
      },  

      //表单数据对接
      initData() {
        var _this = this;
        this.getRequest("/employee/basic/basicdata").then(resp => {
          if (resp && resp.status == 200) {
            var data = resp.data;
            // _this.nations = data.nations;
            _this.permissions = data.permissions;
            _this.roles = data.roles;
          }
        })
      },
      //表格数据对接
      loadEmps() {
        var _this = this;
        this.tableLoading = true;
        // this.getRequest("/employee/basic/emp?page=" + this.currentPage + "&size=10").then(resp => {
        this.post2Request("/role/findAllByPage",{pageNum:this.currentPage,pageSize:10}).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.emps = data.content;
            _this.totalCount = data.totalSize;
            //_this.emptyEmpData();
            console.log(data)
            // console.log(this.emp)
          }
        })
      },
      //添加员工的按钮展示
      showAddEmpView() {
        this.dialogTitle = "添加员工";
        this.dialogVisible = true;  //显示对话框
        var _this = this;
        // this.getRequest("/employee/basic/maxWorkID").then(resp => { //用户账号
        //   if (resp && resp.status == 200) {
        //      _this.emp.role_id = resp.data;
        //      console.log(_this.emp.role_id)
        //   }
        // })
      },
      //添加员工里面确认按钮的数据对接更新
      addEmp(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.emp.id) {
                //编辑
                this.tableLoading = true;
                  let  params ={
                     "id":this.emp.id,
                    "name":this.emp.name,
                    "nameZh":this.emp.nameZh,
                    "bak01":this.emp.bak01,
                    "bak02":this.emp.bak02,
                    "bak03":this.emp.bak03,
                    "bak04":this.emp.bak04
                    }
                this.post2Request("/role/update",params).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                   console.log(data)
                    debugger
                  _this.dialogVisible = false;
                  _this.emptyEmpData();
                  _this.loadEmps();
                }
              })
            } 
             else {
                this.tableLoading = true;
                  let params = {
                    "name":this.emp.name,
                    "nameZh":this.emp.nameZh,
                    "bak01":this.emp.bak01,
                    "bak02":this.emp.bak02,
                    "bak03":this.emp.bak03,
                    "bak04":this.emp.bak04
                    }
                this.post2Request("/role/add",params).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;

            console.log(data);
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
        lookEmp(formName){
             this.dialogVisible = false;
        this.dialogVisibles = false;
        //this.emptyEmpData();
        },
      //查找
      showEditEmpLook(tree){
        this.dialogVisibles = true;
        this.dialogTitles = "查看角色";   
        this.emp = tree;
         var _this = this;
                //查看
                this.tableLoading = true;
                  let  params ={
                     "id":this.emp.id,
                    }
                this.post2Request("/role/findById",params).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                   // this.emp = data;
                  // console.log(this.emp)
                  //  debugger
                  //_this.dialogVisible = false;
                  //_this.emptyEmpData();
                 // _this.loadEmps();
                }
              })
      },
      
      cancelEidt() {
          this.dialogVisible = false;
        this.dialogVisibles = false;
        this.emptyEmpData();
      },
      showDepTree() {
        this.showOrHidePop = !this.showOrHidePop;
      },
      handleNodeClick(data) {
        this.showOrHidePop = false;
        this.depTextColor = '#606266';
      },
      
      //编辑
      showEditEmpView(row) {
          this.dialogVisible = true;
        console.log(row)
        this.dialogTitle = "编辑员工";   
         this.emp = row;
      },
      
      emptyEmpData() {
        this.emp = {
          name: '',
          id:'',
          nameZh :'',
          createTime: '',
          updateTime:'',
          //remark: '',  
          bak01:'',
          bak02:'',
          bak03:'',         
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
      width: 120px;
  }
</style>

