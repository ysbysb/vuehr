<!-- 用户信息界面 -->
<template>
    
      <div style="text-align: left" id="mytemplateclose">
        <el-dialog
          title="我的模板"
          style="padding: 20px;"
          :before-close="closeUserInterface"
          :close-on-click-modal="true"
          :visible.sync="dialogTemVisible"
          width="70%">
          <div>
          <el-table
            :data="mytemInformation"
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
              prop="sceneName"
              label="场景名称"
              align="center"
              width="249">
            </el-table-column>
            <el-table-column
              prop="sceneStatus"
              width="249"
              align="center"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              align="center"
              width="249">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间"
              align="center"
              width="249">
            </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="249">
              <template slot-scope="scope">
                <el-button type="primary" @click="showEditMyTemp(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                           @click="deleteEmp(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: flex-end;margin: 2px">
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
      props: ['dialogTemVisible','userId'],
      data() {
      //这里存放数据
        return {
            //接收后台数据
      mytemInformation:[],
       tableLoading: false,//v-loading 加载效果
        multipleSelection: [],//是否批量删除
         totalCount: -1,//总页数
        currentPage: 1,//当前页
        temp:{
          sceneId:'',
          sceneName:''


        }
      
        };
      },
      //监听属性 类似于data概念
      computed: {},
      //监控data中的数据变化
      watch: {},
      //方法集合
      methods: {
         handleSelectionChange(val) {
        this.multipleSelection = val;
      },
        // 点击X关闭窗口
        closeUserInterface(){

          this.dialogTemVisible = false;
          this.$emit('update:dialogTemVisible',this.dialogTemVisible);
        },
     
        //加载数据
        loadTem() {
          console.log(this.currentPage,this.userId)
     this.tableLoading = true;
     var _this=this
        _this.post2Request("/scene/getByUser",{pageNum:_this.currentPage,pageSize:10,sceneUser:_this.userId}).then(resp => {

         console.log(resp)
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
             
            _this.mytemInformation = data.content;
            _this.totalCount = data.totalSize;
            
           // _this.emptyEmpData();
          }
        })
      },
      //点击编辑按钮进入展示页面
      showEditMyTemp(row){
        console.log(row)
        var _this=this;
         this.temp = row;
         this.temp.sceneId = row.sceneId

          this.dialogTemVisible = false;
          this.$emit('update:dialogTemVisible',this.dialogTemVisible);
          _this.post2Request("/chart/findById",{Id:_this.temp.sceneId}).then(resp => {

         console.log(resp)
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.$parent.getDataMytemp(data)
             
           // _this.mytemInformation = data.content;
            //_this.totalCount = data.totalSize;
            
           // _this.emptyEmpData();
          }
        })

      },
      //删除
      deleteEmp(row) {
         console.log(row)
        this.$confirm('此操作将永久删除[' + row.asseName + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row)
          this.doDelete(row.sceneId);
        }).catch(() => {
        });
      },
      doDelete(ids) {

        this.tableLoading = true;
        var _this = this;
        this.getRequest("/scene/delete?sceneId=" +ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;

            _this.loadTem();
          }
        })
      },
         //点击当前页
      currentChange(currentChange) {
        this.currentPage = currentChange;
        this.loadTem()
      },
      },
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {
      
      
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
      
        this.loadTem()
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
<style scoped>
    /*@import url(); 引入公共css类*/
    .el-form-item__label {
        width: 200px;
    }

    .el-form-item__error {
        padding-left: 200px
    }

</style>