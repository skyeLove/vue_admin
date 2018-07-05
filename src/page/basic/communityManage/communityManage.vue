<template>
    <div class="roleManageClass">
        <div class="content_title">
            <span class="content_title_title pull-left">小区管理</span>
            <span class="pull-right">
               <i class="fa fa-plus" @click="add"><span>添加</span></i>
               <i class="fa fa-trash-o" @click="remove"><span>删除</span></i>
          </span>
        </div>
        <el-row :gutter="8" class="content_search">
            <el-col :xs="14" :sm="6" :md="6" :lg="4" :xl="4">
                <company-select @company-select="getCompanySelect">
                </company-select>
            </el-col>
            <el-col :sm="6" :md="6" :lg="4" :xl="4" class="hidden-xs-only">
                <el-input
                    size="small"
                    clearable
                    placeholder="请输入换热站名称"
                    v-model="model.stationName">
                </el-input>
            </el-col>
            <el-col :sm="6" :md="6" :lg="4" :xl="4" class="hidden-xs-only">
                <el-select  size="small" v-model="model.status" clearable  placeholder="请选择供暖情况">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :sm="6" :md="6" :lg="4" :xl="4" class="hidden-xs-only">
                <el-input
                    size="small"
                    clearable
                    placeholder="请输入小区名称"
                    v-model="model.villageName">
                </el-input>
            </el-col>
            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <el-button @click="searchResult"  size="small" type="primary" icon="el-icon-search">查询</el-button>
            </el-col>
        </el-row>
        <el-table
            style="width: 100%"
            stripe
            :default-sort = "{prop: 'createUser', order: 'descending'}"
            :data="dataLists "
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
                prop="villageName"
                label="小区名称"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="companyName"
                label="所属机构"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="stationName"
                label="所属换热站"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="proxyCompany"
                label="代理公司"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="buildingNo"
                label="楼栋数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="netArea"
                label="入网面积"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="buildingArea"
                label="建筑面积"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="useArea"
                label="使用面积"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="status"
                label="供暖状态"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.status==1?'正常':'停供'  }}</span>
                </template>
            </el-table-column>
            <el-table-column
                sortable
                prop="createDate"
                label="创建时间"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.createDate |dateFormat }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="updateUserName"
                label="修改人"
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
    import * as api from '../../../common/commonApis'
    import companySelect from '../../../components/selectData/CompanySelect'
    export default {
        name:'community-manage',
        components:{
            companySelect
        },
        data: function(){
            return{
                dataLists:[],
                options:[{value: '1',
                    label: '正常'},
                    {value: '2',
                        label: '停供'}],
                model:{
                    pageNo: 1,
                    pageRow:10,
                    stationName:'',
                    status:'',
                    companyId:'',
                    villageName:''
                },
                totalNumber:20,
                multipleSelection: [],
                selectDatas:[]
            }
        },
        created() {
            this.getData()
        },
        methods: {
            //从companySelect子组件传来参数
            getCompanySelect(data){
                if(data.length>0){
                    this.model.companyId=data[data.length-1].toString();
                }else {
                    this.model.companyId=''
                }
            },
            //获取管理列表
            getData(){
                api.getVillageList(this.model).then(res=>{
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
            },
            //添加
            add(){
                this.$router.push('/basic/communityManage/addCommunity')
            },
            //删除
            remove(){
                if(this.multipleSelection.length==0){
                    this.$message({
                        type: 'warning',
                        message: '请选择删除数据！'
                    });
                }else{
                    this.selectDatas=[]
                    this.multipleSelection.forEach(value=>{
                        this.selectDatas.push(value.stationId)
                    })
                    this.$confirm('您确认删除'+this.multipleSelection.length+'条信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        api.deleteVillage(this.selectDatas.join(',')).then(res=>{
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
                            this.getData()
                        })
                    })
                }

            },
            //编辑
            eidtClick(data){
                this.$router.push({name:'edit-community',params:{id:data.villageId}})
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
