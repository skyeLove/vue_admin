<template>
  <div class="roleManageClass">
      <el-table
          style="width: 100%"
          ref="multipleTable"
          stripe
          :data="roleDatas "
          tooltip-effect="dark"
          @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              prop="roleName"
              fixed="left"
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
                totalNumber:20,
                multipleSelection: []
            }
        },
        created(){
            this.getRoleData()
        },
        methods: {
            getRoleData(){
                api.systemRoleList(JSON.stringify(this.model)).then(res=>{
                    if(res.status==200) {
                        this.totalNumber=res.data.total;
                        return this.roleDatas=res.data.list;
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
