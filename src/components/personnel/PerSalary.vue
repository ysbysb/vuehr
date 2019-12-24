<template>
<!-- 数据权限 -->
  <div>
    <el-container>
      <!-- 上部分  搜索、添加 -->
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center" @click.stop>
        <div style="display: inline" @enter.native.prevent>
          <el-input
            placeholder="通过权限名称查询"
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
            添加
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
              prop="tempLevel"
              width="300"
              align="center"
              label="模板级别">
            </el-table-column>
            <el-table-column
              prop="asseLevel"
              width="300"
              align="center"
              label="组件级别">
            </el-table-column>
            <el-table-column
              prop="createTime"
              width="180"
              align="center"
              label="创建时间">
              <template slot-scope="scope">{{ scope.row.createTime | formatDate}}</template>
            </el-table-column>
            <el-table-column
              prop="updateTime"
              width="200"
              align="center"
              label="修改时间">
              <template slot-scope="scope">{{ scope.row.updateTime | formatDate}}</template>
            </el-table-column>
            <el-table-column
              prop="juriName"
              width="200"
              align="center"
              label="权限名称">
            </el-table-column>   
            <!-- <el-table-column
              prop="juriId"
              width="200"
              align="center"
              label="权限ID">
            </el-table-column>      -->
            <el-table-column
              prop="remark"  
              width="219"
              align="center"
              label="说明">
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              align="center"
              width="230">
              <template slot-scope="scope">
                <el-button @click="showEditEmpView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button @click="checkDel(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" 
                           size="mini">查看
                </el-button>
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                          @click="deleteEmp(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content:flex-end;margin: 2px">
            <!-- <el-button type="danger" size="mini" v-if="emps.length>0" :disabled="multipleSelection.length==0"
                       @click="deleteManyEmps">批量删除
            </el-button> -->
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
                <el-form-item label="模板级别:" prop="tempLevel">
                  <el-select v-model="emp.tempLevel" multiple filterable allow-create default-first-option 
                  placeholder="请选择">
                    <el-option
                    v-for="item in temList"
                    value-key="item.tempLevelId"
                    :key="item.tempLevelId"
                    :label="item.tempLevelName"
                    :value="item.tempLevelName">
                    </el-option>
                  </el-select>
                </el-form-item> 
                 
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="组件级别:" prop="asseLevel">
                  <el-select v-model="emp.asseLevel" multiple placeholder="请选择">
                    <el-option
                    v-for="item in comList"
                    value-key="item.asseLevelId"
                    :key="item.asseLevelId"
                    :label="item.asseLevelName"
                    :value="item.asseLevelName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>   
          </el-row>
          <el-row>          
            <el-col :span="12">
                <div>
                <el-form-item label="权限名称:" prop="juriName">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.juriName" size="mini" style="width: 150px"
                            placeholder="请输入权限名称"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="说明:" prop="remark">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.remark" size="mini" style="width: 200px"
                            placeholder="说明..."></el-input>
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
    <el-form :model="emp" :rules="rules" ref="addEmpForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <!-- 查看对话框 -->
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible2"
          width="50%">
          <el-row>
            <el-col :span="12">
              <div>
                <el-form-item label="模板级别:" prop="tempLevel">
                  <el-select v-model="emp.tempLevel" disabled multiple placeholder="请选择">
                    <el-option
                    v-for="item in temList"
                    value-key="item.tempLevelId"
                    :key="item.tempLevelId"
                    :label="item.tempLevelName"
                    :value="item.tempLevelName">
                    </el-option>
                  </el-select>
                </el-form-item> 
                 
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="组件级别:" prop="asseLevel">
                  <el-select v-model="emp.asseLevel" disabled multiple placeholder="请选择">
                    <el-option
                    v-for="item in comList"
                    value-key="item.asseLevelId"
                    :key="item.asseLevelId"
                    :label="item.asseLevelName"
                    :value="item.asseLevelName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>   
          </el-row>
          <el-row>          
            <el-col :span="12">
                <div>
                <el-form-item label="权限名称:" prop="juriName">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.juriName" size="mini" style="width: 150px"
                            placeholder="请输入权限名称" :readonly="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="说明:" prop="remark">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.remark" size="mini" style="width: 200px"
                            placeholder="说明..." :readonly="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
         
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelSee">取 消</el-button>
            <el-button size="mini" type="primary" @click="seeEmp('addEmpForm')">确 定</el-button>
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
          juriId:'',
          tempLevel:[],
          asseLevel:[],
          juriName: '',
          remark: ''
        },
        rules: {  //表单规则，prop名
          tempLevel: [{required: true, message: '必填:模板级别', trigger: 'blur'}],
          asseLevel: [{required: true, message: '必填:组件级别', trigger: 'blur'}],
          juriName: [{required: true, message: '必填:权限名称', trigger: 'blur'}],
          remark: [{required: false, message: '必填:说明', trigger: 'blur'}]
        },
        temList:[],
        comList:[]
      };
    },
    mounted: function () {
      this.initTemData();
      this.initComData();
      this.loadEmps();
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    //批量删除
    //   deleteManyEmps() {
    //     this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       var ids = '';
    //       for (var i = 0; i < this.multipleSelection.length; i++) {
    //         ids += this.multipleSelection[i].id + ",";
    //         // console.log(ids)  //第几个
    //       }
    //       this.doDelete(ids);
    //     }).catch(() => {
    //     });
    //   },

      //删除点击事件
      deleteEmp(row) {
        this.$confirm('此操作将永久删除[' + row.juriName + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.juriId);
        
        }).catch(() => {
        });
      },
      //删除
      doDelete(ids) {
        this.tableLoading = true;
        var _this = this;
        this.getRequest("/juri/delete?id="+ids).then(resp => {
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
        this.dialogTitle = "查看";
        this.emp = row;
        let temps=this.emp.tempLevel.toString();
        let temData=temps.split(',');
        this.emp.tempLevel=temData;

        let coms=this.emp.asseLevel.toString();
        let comData=coms.split(',');
        this.emp.asseLevel=comData;   
      },
      //查看 ->确定 
      seeEmp(){
        this.dialogVisible2 = false;
        this.tableLoading = true;
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
        this.post2Request("/juri/findByPage",{name:_this.keywords,pageNum:_this.currentPage,pageSize:10}).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.emps = data.content;
            // console.log(_this.emps)
            _this.totalCount = data.totalSize;

          }
        })
      },
      //表单确认按钮(编辑、添加)
      addEmp(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.emp.juriId) {
                //编辑-------------------------------
                this.tableLoading = true;
                let params = {
                    "tempLevel":(this.emp.tempLevel).toString(),
                    "asseLevel":(this.emp.asseLevel).toString(),
                    "juriName":this.emp.juriName,
                    "remark":this.emp.remark,
                    "juriId":this.emp.juriId
                }
                this.post2Request("/juri/update",params).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                //   console.log(resp)
                  _this.dialogVisible = false;
                  _this.emptyEmpData();
                  _this.loadEmps();
                }
              })
            } else {
                //添加-------------------------------
                this.tableLoading = true;
                let params = {
                    "tempLevel":(this.emp.tempLevel).toString(),
                    "asseLevel":(this.emp.asseLevel).toString(),
                    "juriName":this.emp.juriName,
                    "remark":this.emp.remark
                }
                this.post2Request("/juri/add",params).then(resp => {
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
      //模板下拉框数据
      initTemData() {
        var _this = this;
        this.getRequest("/templateLevel/getAll").then(resp => { 
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.temList = data.data;
          }
        })
      },
      //组件下拉框数据
      initComData(){
        var _this = this;
        this.getRequest("/asseLevel/findAll").then(resp => { 
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.comList = data;
          }
        })
      },
      //编辑按钮
      showEditEmpView(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑";
        var _this = this;
        this.emp = row;

        let temps=this.emp.tempLevel.toString();
        let temData=temps.split(',');
        this.emp.tempLevel=temData;

        let coms=this.emp.asseLevel.toString();
        let comData=coms.split(',');
        this.emp.asseLevel=comData;        

      },
      //添加按钮
      showAddEmpView() {
        this.dialogTitle = "添加";
        this.dialogVisible = true;  //显示对话框
      },
      emptyEmpData() {
        this.emp = {
          juriId:'',
          tempLevel:[],
          asseLevel:[],
          createTime:'',
          updateTime:'',
          juriName: '',
          remark: '',  //说明
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
      width: 100px
  }
   .el-form-item__error{
      padding-left: 120px;
  }

</style>
