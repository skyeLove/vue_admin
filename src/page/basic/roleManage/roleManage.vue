<template>
  <div class="roleManageClass">
      <div class="content_title">
          <span class="content_title_title pull-left">角色管理</span>
          <span class="pull-right">
               <i class="fa fa-plus" @click="addRole"><span>添加</span></i>
               <i class="fa fa-trash-o" @click="removeRole"><span>删除</span></i>
          </span>
      </div>
      <el-row :gutter="8" class="content_search">
          <el-col :xs="14" :sm="6" :md="6" :lg="4" :xl="4">
              <company-tree @company-select="getCompanyTree"></company-tree>
          </el-col>
          <el-col :sm="6" :md="6" :lg="4" :xl="4" class="hidden-xs-only">
              <el-input
                  size="small"
                  clearable
                  placeholder="请输入角色名称"
                  v-model="model.roleName">
              </el-input>
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
              <el-button @click="searchResult"  size="small" type="primary" icon="el-icon-search">查询</el-button>
          </el-col>
      </el-row>
      <el-table
          style="width: 100%"
          stripe
          :default-sort = "{prop: 'updateDate', order: 'descending'}"
          :data="roleDatas "
          tooltip-effect="dark"
          @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              fixed="left"
              label="操作"
              width="55">
              <template slot-scope="scope">
                  <i class="el-icon-edit edit" @click="eidtClick(scope.row)" size="small"></i>
              </template>
          </el-table-column>
          <el-table-column
              prop="roleName"
              label="角色名称"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="companyName"
              label="所属机构"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="status"
              label="是否是管理员"
              show-overflow-tooltip>
              <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.status==1?'是':'否'  }}</span>
              </template>
          </el-table-column>
          <el-table-column
              sortable
              label="创建时间"
              prop="createDate"
              show-overflow-tooltip>
              <template slot-scope="scope">
              <span>{{ scope.row.createDate |dateFormat }}</span>
          </template>
          </el-table-column>
          <el-table-column
              sortable
              label="修改时间"
              prop="updateDate"
              show-overflow-tooltip>
              <template slot-scope="scope">
                  <span>{{ scope.row.updateDate |dateFormat }}</span>
              </template>
          </el-table-column>
      </el-table>
      <div class="pagination">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="model.pageNo"
              :page-sizes="[10, 50, 80, 100]"
              :page-size="model.pageRow"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNumber">
          </el-pagination>
      </div>
  </div>
</template>
<script>
    import * as api from '../../../common/commonApis'
    import companyTree from '../../../components/selectData/CompanySelect'
    export default {
        name:'role-manage',
        components:{
            companyTree
        },
        data: function(){
            return{
                roleDatas:[],
                model:{
                    pageNo: 1,
                    pageRow:10,
                    roleName:'',
                    companyId:''
                },
                totalNumber:20,
                multipleSelection: [],
                selectDatas:[]
            }
        },
        created() {
            this.getRoleData()
        },
        methods: {
            getCompanyTree(data){
                if(data.length>0){
                    this.model.companyId=data[data.length-1].toString();
                }else {
                    this.model.companyId=''
                }
            },
            //获取角色管理列表
            getRoleData(){
                api.systemRoleList(this.model).then(res=>{
                    if(res.status==200) {
                        this.totalNumber=res.data.total;
                        return this.roleDatas=res.data.list;
                    }else {
                        this.$message({
                            type: 'warning',
                            message:res.msg
                        });
                    }
                })
            },

            //条件查询
            searchResult(){
                this.getRoleData()
            },
            //分页调用
            handleSizeChange(val) {
                this.model.pageRow = val;
                this.getRoleData()
            },
            handleCurrentChange(val) {
                this.model.pageNo = val;
                this.getRoleData()
            },
            //添加角色
            addRole(){
                this.$router.push('/basic/roleManage/addRole')
            },
            //删除角色
            removeRole(){
                if(this.multipleSelection.length==0){
                    this.$message({
                        type: 'warning',
                        message: '请选择删除数据！'
                    });
                }else{
                    this.selectDatas=[]
                    this.multipleSelection.forEach(value=>{
                        this.selectDatas.push(value.roleId)
                    })
                    this.$confirm('您确认删除'+this.multipleSelection.length+'条信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        api.deleteRole(this.selectDatas.join(',')).then(res=>{
                            if(res.status==200){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }else {
                                this.$message({
                                    type: 'warning',
                                    message:res.msg
                                });
                            }
                        })
                        this.getRoleData()

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }

            },
            //编辑角色
            eidtClick(data){
                console.log(data);
            },
            //复选框改变是调用函数
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>
<style scoped>

</style>
