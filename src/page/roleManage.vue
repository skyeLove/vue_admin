<template>
  <div class="roleManageClass">
      <div class="content_title">
          <span class="content_title_title pull-left">角色管理</span>
          <span class="pull-right">
               <i class="fa fa-plus"><span>添加</span></i>
               <i class="fa fa-trash-o"><span>删除</span></i>
          </span>
      </div>
      <div class="content_search">
          <el-cascader
              clearable
              :filterable=true
              :options="companyTree"
              :show-all-levels="false"
              :props="{label:'name',value:'id'}">
          </el-cascader>
          <el-cascader
              clearable
              :filterable=true
              :options="companyTree"
              :show-all-levels="false"
              :props="{label:'name',value:'id'}">
          </el-cascader>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
      </div>
      <el-table
          style="width: 100%"
          ref="multipleTable"
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
                  <i class="el-icon-edit edit" @click="handleClick(scope.row)" size="small"></i>
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
              show-overflow-tooltip>
              <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.createDate  }}</span>
          </template>
          </el-table-column>
          <el-table-column
              sortable
              prop="updateDate"
              label="修改时间"
              show-overflow-tooltip>
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
    import * as api from '../common/commonApis'
    export default {
        name:'roleManage',
        data: function(){
            return{
                roleDatas:[],
                model:{
                    pageNo: 1,
                    pageRow:10,
                    roleName:'',
                    companyId:''
                },
                companyTree:[],
                totalNumber:20,
                multipleSelection: []
            }
        },
        created(){
            this.getRoleData()
        },
        methods: {
            //过滤树接口
            forData(object,value){
                value.children=[]
                let i=1
                object.forEach((item)=>{
                    if(value.id==item.pId){
                        i++
                        value.children.push(item)
                        this.forData(object,item)
                    }
                })
                if(value.children.length==0)  delete value.children;
            },
            //页面初始调用
            getRoleData(){
                api.systemRoleList(this.model).then(res=>{
                    if(res.status==200) {
                        this.totalNumber=res.data.total;
                        return this.roleDatas=res.data.list;
                    }
                })
                api.loadCompanyTree().then(res=>{
                    if(res.status==200) {
                        res.data.forEach((value)=>{
                            if(!value.pId){
                                this.companyTree.push(value)
                                this.forData(res.data,value)
                            }
                        })
                        return this.companyTree
                    }
                })

            },
            handleSizeChange(val) {
                this.model.pageRow = val;
                this.getRoleData()
            },
            handleCurrentChange(val) {
                this.model.pageNo = val;
                this.getRoleData()
            },
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
            }
        }
    }
</script>
<style scoped>

</style>
