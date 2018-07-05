<template>
    <div class="roleManageClass">
        <div class="content_title">
            <span class="content_title_title pull-left">日志管理</span>
        </div>
        <el-row :gutter="8" class="content_search">
            <el-col :sm="6" :md="6" :lg="4" :xl="4" class="hidden-xs-only">
                <el-input
                    size="small"
                    clearable
                    placeholder="请输入操作人账号"
                    v-model="model.account">
                </el-input>
            </el-col>
            <el-col :sm="6" :md="6" :lg="4" :xl="4" class="hidden-xs-only">
                <el-input
                    size="small"
                    clearable
                    placeholder="请输入操作人姓名"
                    v-model="model.name">
                </el-input>
            </el-col>
            <el-col :sm="6" :md="6" :lg="4" :xl="4" class="hidden-xs-only">
                <el-input
                    size="small"
                    clearable
                    placeholder="请输入操作模块名"
                    v-model="model.module">
                </el-input>
            </el-col>
            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <el-button @click="searchResult"  size="small" type="primary" icon="el-icon-search">查询</el-button>
            </el-col>
        </el-row>
        <el-table
            style="width: 100%"
            stripe
            :default-sort = "{prop: 'operateDate', order: 'descending'}"
            :data="dataLists "
            tooltip-effect="dark">
            <el-table-column
                prop="account"
                label="操作人账号"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="name"
                label="操作人姓名"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="module"
                label="操作模块名"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="ip"
                label="操作IP地址"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="description"
                label="详细信息"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                sortable
                prop="operateDate"
                label="操作日期"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.operateDate |dateFormat }}</span>
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
    export default {
        name:'log-manage',
        data: function(){
            return{
                model:{
                    pageNo: 1,
                    pageRow:10,
                    account:'',
                    name:'',
                    module:''
                },
                dataLists:[],
                totalNumber:0,
            }
        },
        created() {
            this.getData()
        },
        methods: {
            //获取用户 管理列表
            getData(){
                api.getSystemLogList(this.model).then(res=>{
                    if(res.status==200) {
                        this.totalNumber=res.data.total;
                        return this.dataLists=res.data.list;
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
                this.getData()
            },
            //分页调用
            handleSizeChange(val) {
                this.model.pageRow = val;
                this.getData()
            },
            handleCurrentChange(val) {
                this.model.pageNo = val;
                this.getData()
            }
        }
    }
</script>
<style scoped>

</style>
