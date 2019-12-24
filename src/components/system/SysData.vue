<template>
  <!--组件管理-->
  <div>
    <!--当前页面显示内容-->
    <el-container>
      <!--上面部分：搜索 添加功能-->
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <!--搜索功能-->
        <div style="display: inline">
          <el-input
            placeholder="通过员工名搜索员工"
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
        </div>
        <!--添加功能-->
        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <el-button type="primary" size="mini" icon="el-icon-plus"
                     @click="showAddEmpView">
            添加组件
          </el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <!--表格部分-->
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
              width="40">
            </el-table-column>
            <el-table-column
              prop="asseVueId"
              align="center"
              fixed
              label="组件ID"
              width="150">
            </el-table-column>
            <el-table-column
              prop="asseName"
              width="250"
              align="center"
              label="组件名称">
            </el-table-column>
            <el-table-column
              prop="asseLevelName"
              align="center"
              label="组件级别"
              width="150">
            </el-table-column>
            <el-table-column
              prop="asseTypeName"
              width="250"
              align="center"
              label="组件类别">
            </el-table-column>
            <el-table-column
              prop="remark"
              width="250"
              align="center"
              label="说明">
            </el-table-column>
            <el-table-column
              width="250"
              align="center"
              label="创建时间">
              <template slot-scope="scope">{{ scope.row.createTime | formatDate}}</template> 
              <!-- formatDate 没数据时会写时间戳最初时间 -->
            </el-table-column>
            <el-table-column
              width="250"
              align="center"
              label="更新时间">
              <template slot-scope="scope">{{ scope.row.updateTime | formatDate}}</template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="195">
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

          <!--表格下边的内容批量删除、分页功能-->
          <div style="display: flex;justify-content: flex-end;margin: 2px">
            <!-- <el-button type="danger" size="mini" v-if="emps.length>0" :disabled="multipleSelection.length==0"
                       @click="deleteManyEmps">批量删除
            </el-button> -->
            <!--分页-->
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
    <!--点击添加或编辑按钮弹出的对话框-->
    <el-form :model="emp" :rules="rules" ref="addEmpForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 20px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="50%">
          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="组件ID:" prop="asseVueId">
                  <el-input
                    prefix-icon="el-icon-edit"
                    v-model="emp.asseVueId"
                    size="mini"
                    style="width: 150px"
                    placeholder="请输入组件ID"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="组件名称:" prop="asseName">
                  <el-input
                    prefix-icon="el-icon-edit"
                    v-model="emp.asseName"
                    size="mini"
                    style="width: 150px"
                    placeholder="请输入组件名称"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="组件级别:" prop="asseLevelId">
                  <el-select v-model="emp.asseLevelId" style="width: 150px" size="mini" placeholder="请选择组件级别">
                    <el-option
                      v-for="item in asseLevelName"
                      :key="item.id"
                      :label="item.asseLevelName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="组件类别:" prop="asseTypeId">
                  <el-select v-model="emp.asseTypeId" style="width: 150px" size="mini" placeholder="请选择组件类别">
                    <el-option
                      v-for="item in asseTypeName"
                      :key="item.id"
                      :label="item.asseTypeName"
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
                  <el-input
                    prefix-icon="el-icon-edit"
                    v-model="emp.remark"
                    size="mini"
                    style="width: 150px"
                    placeholder="请输入组件说明"></el-input>
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
        emps: [],//表格数据，后台传
        keywords: '', //绑定搜索员工输入框
        // fileUploadBtnText: '导入数据',
        dialogTitle: '',  //对话框的标题
        multipleSelection: [],// 判断批量删除是否禁用
        depTextColor: '#c0c4cc',
        asseLevelName: [],  //组件级别下拉框内容
        asseTypeName: [], //组件类别下拉框内容
        positions: [],  //职位
        totalCount: -1, //总条数
        currentPage: 1, //当前页
        dialogVisible: false, //是否隐藏对话框
        tableLoading: false,  //v-loading 加载效果
        advanceSearchViewVisible: false,  //搜索内容的禁用
        showOrHidePop: false,
        showOrHidePop2: false, //高级搜索中的
        emp: {  //对话框中表单数据对象
          asseId: '', //
          asseName: '', //组件名称
          asseLevelId: '', //组件级别id
          asseLevelName: '', //组件级别名称
          asseTypeId: '', //组件类别id
          asseTypeName: '', //组件类别名称
          asseVueId: '', //组件id
          createTime: '',
          updateTime: '',
          remark: ''
        },
        rules: {  //表单规则
          asseName: [{required: true, message: '必填:组件名称', trigger: 'blur'}],
          asseLevelId: [{required: true, message: '必填:组件级别', trigger: 'change'}], //组件级别验证
          asseTypeId: [{required: true, message: '必填:组件类别', trigger: 'change'}], //组件类别验证
          asseVueId: [{required: true, message: '必填:组件id', trigger: 'blur'}],
          remark: [{required: true, message: '必填:组件说明', trigger: 'blur'}],
        }
      };
    },

    mounted: function () {
      this.initData();
      this.loadEmps();
    },
    methods: {
      //被选中多选框集合
      handleSelectionChange(val) {
        //val 为选中数据的集合
        //通过this.multipleSelection.prop字段 取得每一个选项的值，prop字段就是表格里面子项的prop值。
        //this.multipleSelection.length为选择了多少项。
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
            ids += this.multipleSelection[i].asseId + ",";
          }
          this.doDelete(ids);
        }).catch(() => {
        });
      },
      //删除信息功能
      deleteEmp(row) {
        this.$confirm('此操作将永久删除[' + row.asseName + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.asseId);
        }).catch(() => {
        });
      },
      doDelete(ids) {
        this.tableLoading = true;
        var _this = this;
        this.getRequest("/asse/delete?asseId=" + ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;

            _this.loadEmps();
          }
        })
      },
      //搜索框内容改变事件
      keywordsChange(val) {
         this.currentPage = 1;
        // 为空，重新执行分页显示内容
        if (val == '') {
          this.loadEmps();
        }
      },
      // 点击搜索按钮
      searchEmp() {
        this.currentPage = 1;
        this.loadEmps();
      },
      // 当前页变动时候触发的事件
      currentChange(currentChange) {
        this.currentPage = currentChange;

        this.loadEmps();
      },
      // 分页显示当前页内容
      loadEmps() {
        var _this = this;
        this.tableLoading = true;//未加载内容之前显示加载过程效果
        // this.getRequest("/employee/basic/emp?page=" + this.currentPage + "&size=10&keywords=" + this.keywords + "&asseLevelId=" + this.emp.asseLevelId + "&asseTypeId=" + this.emp.asseTypeId).then(resp => {
        // http://localhost:8082/asse/getPage     /employee/basic/emp
        this.post2Request("/asse/getPage",{bak01:this.keywords,pageNum:this.currentPage,pageSize:10}).then(resp => {
          console.log(resp);
          this.tableLoading = false;//获取到数关闭加载过程效果
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.emps = data.content; //当页显示数据
            _this.totalCount = data.totalSize; //总数据条数
           _this.emptyEmpData();
          }
        })
      },
      // 模糊查询
      searchLoadEmps() {
        var _this = this;
        this.tableLoading = true;//未加载内容之前显示加载过程效果
        // this.getRequest("/employee/basic/emp?page=" + this.currentPage + "&size=10&keywords=" + this.keywords + "&asseLevelId=" + this.emp.asseLevelId + "&asseTypeId=" + this.emp.asseTypeId).then(resp => {
        // http://localhost:8082/asse/getPage     /employee/basic/emp
        this.post2Request("/asse/find",{bak01:this.keywords,pageNum:this.currentPage,pageSize:10}).then(resp => {
          console.log(resp);
          this.tableLoading = false;//获取到数关闭加载过程效果
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.emps = data.content; //当页显示数据
            _this.totalCount = data.totalSize; //总数据条数
            _this.emptyEmpData();
          }
        })
      },
      //确认添加或确定编辑
      addEmp(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.emp.asseId) {
              //更新
              this.tableLoading = true;
              // /employee/basic/emp
              console.log(this.emp);
              this.putRequest("/asse/update", this.emp).then(resp => {
                _this.tableLoading = false;
                console.log(resp);   
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  _this.dialogVisible = false; //隐藏对话框
                  _this.emptyEmpData(); //清空this.emp
                  _this.loadEmps(); //分页加载显示内容
                }
              })
            } else {
              //添加
              this.tableLoading = true;
              // /employee/basic/emp
              console.log(this.emp);
              this.post2Request("/asse/add", this.emp).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  _this.dialogVisible = false; //隐藏对话框
                  _this.emptyEmpData(); //清空this.emp
                  _this.loadEmps(); //分页加载显示内容
                }
              })
            }
          } else {
            return false;
          }
        });
      },
      //添加取消或编辑取消
      cancelEidt() {
        this.dialogVisible = false;
        this.emptyEmpData();
      },
      // 加载页面获取数据
      initData() {
        var _this = this;
        // /asse/findTypeAndLevel
        this.getRequest("/asse/findTypeAndLevel").then(resp => { // /employee/basic/basicdata
          if (resp && resp.status == 200) {
            var data = resp.data;
            console.log(resp.data);
            _this.asseLevelName = data.asseLevelName; //组件级别下拉框内容
            _this.asseTypeName = data.asseTypeName; //组件类别下拉框内容
            // _this.deps = data.deps;
            // _this.positions = data.positions;
            // _this.emp.asseVueId = data.asseVueId;
          }
        })
      },
      //点击重新编辑信息按钮
      showEditEmpView(row) {
        console.log(row)
        this.dialogTitle = "编辑组件";
        this.emp = row;
        this.emp.createTime = this.formatDate(row.createTime);
        this.emp.updateTime = this.formatDate(row.updateTime);
        this.emp.asseLevelId = row.asseLevelId; // 组件级别id
        this.emp.asseTypeId = row.asseTypeId; // 组件类别id
//        delete this.emp.jobLevel;
//        delete this.emp.position;
//        delete this.emp.nation;
        this.dialogVisible = true;//显示对话框
        console.log(this.emp);
      },
      //点击重新添加组件按钮
      showAddEmpView() {
        this.dialogTitle = "添加组件";
        this.dialogVisible = true; //显示对话框
        // var _this = this;
        // /employee/basic/maxWorkID
        // this.getRequest("/asse/add").then(resp => {
        //   if (resp && resp.status == 200) {
        //     console.log(resp)
        //     _this.emp.asseVueId = resp.data;
        //   }
        // })
      },
      // 清空this.emp
      emptyEmpData() {
        this.emp = {
          asseId: "",
          asseName: '', //组件名称
          asseLevelId: '', //组件级别id
          asseLevelIName: '', //组件级别名称
          asseTypeId: '', //组件类别id
          asseTypeName: '', //组件类别名称
          asseVueId: '', //组件id
          createTime: '',
          updateTime: '',
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

  .el-form-item__label {
    width: 120px;
  }

  .el-form-item__error {
    padding-left: 120px
  }

</style>
