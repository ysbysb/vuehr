<template>
  <!--模板级别管理-->
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <!-- <div style="display: inline">
          <el-input
            placeholder="通过模板级别搜索,记得回车哦..."
            clearable
            @change="keywordsChange"
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            :disabled="advanceSearchViewVisible"
            @keyup.enter.native="searchEmp"
            prefix-icon="el-icon-search"
            v-model="keywords">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchEmp">查询
          </el-button>
        </div> -->
        <div style="margin-left: 5px;margin-right: 20px;display: inline">

          <el-button type="primary" size="mini" icon="el-icon-plus"
                     @click="showAddEmpView">
            添加模板级别
          </el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
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
              align="left"
              width="30">
            </el-table-column>
            <el-table-column
              prop="tempLevelName"
              label="模板级别"
              align="center"
              width="325">
            </el-table-column>
            <el-table-column
              prop="remark"
              width="325"
              align="center"
              label="说明">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              align="center"
              width="325">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间"
              align="center"
              width="325">
            </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="325">
              <template slot-scope="scope">
                <el-button @click="showEditEmpView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                           @click="deleteEmp(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: flex-end;margin: 2px">
            <!-- <el-button type="danger" size="mini" v-if="emps.length>0" :disabled="multipleSelection.length==0"
                       @click="deleteManyEmps">批量删除
            </el-button> -->
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
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="50%">
          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="模板级别:" prop="tempLevelName">
                   <el-input prefix-icon="el-icon-edit" v-model="emp.tempLevelName" size="mini" style="width: 150px"
                            placeholder="请输入模板级别"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="说明:" prop="remark">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.remark" size="mini" style="width: 250px"
                            placeholder="请输入说明"></el-input>
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
  </div>
</template>
<script>
  export default {
    data() {
      return {
        emps: [],//传过来的数据
        keywords: '',//绑定输入框
        dialogTitle: '',//对话框标题
        multipleSelection: [],//是否批量删除
        depTextColor: '#c0c4cc',
        totalCount: -1,//总页数
        currentPage: 1,//当前页
        dialogVisible: false,//隐藏对话框
        tableLoading: false,//v-loading 加载效果
        advanceSearchViewVisible: false,//搜索内容的禁用
        emp: {//对话框中表单数据对象
         tempLevelName:'',
         remark:'',
         tempLevelId:''

        },
        rules: {
          tempLevelName: [{required: true, message: '必填:模板级别', trigger: 'blur'}]

        }
      };
    },
    mounted: function () {
      //刷新数据
      this.loadEmps();
    },
    methods: {
      //被选中多选框集合
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // //批量删除
      // deleteManyEmps() {
      //   this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     var ids = '';
      //     for (var i = 0; i < this.multipleSelection.length; i++) {
      //       ids += this.multipleSelection[i].id + ",";
      //     }
      //     this.doDelete(ids);
      //   }).catch(() => {
      //   });
      // },
      //单条删除
      deleteEmp(row) {
        this.$confirm('此操作将永久删除[' + row.tempLevelName + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.tempLevelId);
        }).catch(() => {
        });
      },
      //删除的方法以及接口
      doDelete(ids) {
        this.tableLoading = true;
        var _this = this;
        this.delete2Request("/templateLevel/del/",{tempLevelId:ids}).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;

            _this.loadEmps();
          }
        })
      },
      //输入框输入调用的方法
      keywordsChange(val) {
        if (val == '') {
          this.loadEmps();
        }
      },
      //点击查询按钮查询的方法
      searchEmp() {
        this.loadEmps();
      },
      //点击当前页
      currentChange(currentChange) {
        this.currentPage = currentChange;
        this.loadEmps();
      },
      //刷新数据
      loadEmps() {
        console.log(this.emp)
        var _this = this;
        this.tableLoading = true;
        this.post2Request("/templateLevel/getPage",{pageNum:_this.currentPage,pageSize:10}).then(resp => {

         console.log(resp)
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
             
            _this.emps = data.content;
            _this.totalCount = data.totalSize;
            
           // _this.emptyEmpData();
          }
        })
      },
      //提交表单 添加 编辑
      addEmp(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.emp.tempLevelId) {
              //更新
              this.tableLoading = true;
              this.putRequest("/templateLevel/update", this.emp).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  _this.dialogVisible = false;
                  _this.emptyEmpData();
                  _this.loadEmps();
                }
              })
            } else {
              //添加
              this.tableLoading = true;
              this.post2Request("/templateLevel/add", this.emp).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;

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
      //取消
      cancelEidt() {
        this.dialogVisible = false;
        this.emptyEmpData();
      },
      //编辑按钮执行的方法
      showEditEmpView(row) {
        console.log(row)
        this.dialogTitle = "编辑模板";
        this.emp = row;
        /*        this.emp.nationId = row.nation.id;
                this.emp.politicId = row.politicsStatus.id;
                this.emp.departmentId = row.department.id;
                this.emp.departmentName = row.department.name;
                this.emp.jobLevelId = row.jobLevel.id;
                this.emp.posId = row.position.id;

                delete this.emp.salary;
                delete this.emp.workAge;
                delete this.emp.notWorkDate;*/
        this.dialogVisible = true;
        console.log(this.emp)
      },
      //点击添加按钮执行的方法
      showAddEmpView() {
        this.dialogTitle = "添加模板级别";
        this.dialogVisible = true;
        var _this = this;
        // this.getRequest("/employee/basic/maxWorkID").then(resp => {
        //   if (resp && resp.status == 200) {
        //     /*_this.emp.workID = resp.data;*/
        //   }
        // })
      },
      //表单数据置空
      emptyEmpData() {
        this.emp = {
          moulevel:'',
          mouexplain:''
        }
      }
    }
  };
</script>
<style>
  .el-dialog__header {
    padding-top: 30px;
    padding-bottom: 20px;
    padding-left:50px;
    padding-right:50px;
  }
  .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left:50px;
    padding-right:50px;
  }
  .el-dialog__footer{
    padding:10px 50px 20px;
  }
  .el-form-item__label{
    width:120px;
  }
   .el-form-item__error{
    padding-left:120px;
  }


</style>
