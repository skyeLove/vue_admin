<template>
    <div class="roleManageClass">
        <div class="content_title">
            <span class="content_title_title pull-left">用户管理</span>
            <span class="pull-right">
               <i class="fa fa-plus" @click="addRole"><span>添加</span></i>
               <i class="fa fa-trash-o" @click="removeRole"><span>删除</span></i>
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
                    placeholder="请输入账户名称"
                    v-model="model.loginName">
                </el-input>
            </el-col>
            <el-col :sm="6" :md="6" :lg="4" :xl="4" class="hidden-xs-only">
                <el-select  size="small" v-model="model.status" clearable  placeholder="请选择是否启用">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :xs="14" :sm="6" :md="6" :lg="4" :xl="4">
                <role-select @role-select="getRoleSelect"></role-select>
            </el-col>
            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <el-button @click="searchResult"  size="small" type="primary" icon="el-icon-search">查询</el-button>
            </el-col>
        </el-row>
        <el-table
            style="width: 100%"
            stripe
            :default-sort = "{prop: 'createUser', order: 'descending'}"
            :data="userDatas "
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
                prop="loginName"
                label="账户"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="status"
                label="是否启用"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.status==1?'是':'否'  }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="userName"
                label="姓名"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="companyName"
                label="所属机构"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="roleName"
                label="所属角色"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="deptName"
                label="所属部门"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="telephone"
                label="手机号"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="createUser"
                label="创建人"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                sortable
                label="最后登录时间"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.createDate |dateFormat }}</span>
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
    import * as api from '../../common/commonApis'
    import companySelect from '../../components/selectData/CompanySelect'
    import roleSelect from  '../../components/selectData/roleSelect'
    export default {
        name:'user-manage',
        components:{
            companySelect,roleSelect
        },
        data: function(){
            return{
                userDatas:[],
                roleSelect:[],
                options:[{value: '1',
                    label: '启用'},
                    {value: '0',
                        label: '禁用'}],
                model:{
                    pageNo: 1,
                    pageRow:10,
                    loginName:'',
                    status:'',
                    roleId:'',
                    companyId:''
                },
                totalNumber:20,
                multipleSelection: [],
                selectDatas:[]
            }
        },
        created() {
            this.getUserData()
        },
        methods: {
            //从companySelect子组件传来参数
            getCompanySelect(data){
                if(data.length>0){
                    this.model.roleId=data[data.length-1].toString();
                }else {
                    this.model.roleId=''
                }
            },
            //从roleSelect子组件传来参数
            getRoleSelect(data){
                if(data.length>0){
                    this.model.companyId=data[data.length-1].toString();
                }else {
                    this.model.companyId=''
                }
            },
            //获取用户 管理列表
            getUserData(){
                api.getUserList(this.model).then(res=>{
                    if(res.status==200) {
                        this.totalNumber=res.data.total;
                        return this.userDatas=res.data.list;
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
                this.getUserData()
            },
            //分页调用
            handleSizeChange(val) {
                this.model.pageRow = val;
                this.getUserData()
            },
            handleCurrentChange(val) {
                this.model.pageNo = val;
                this.getUserData()
            },
            //添加用户
            addRole(){
                this.$router.push('/basic/userManage/addUser')
            },
            //删除用户
            removeRole(){
                if(this.multipleSelection.length==0){
                    this.$message({
                        type: 'warning',
                        message: '请选择删除数据！'
                    });
                }else{
                    this.selectDatas=[]
                    this.multipleSelection.forEach(value=>{
                        this.selectDatas.push(value.userId)
                    })
                    this.$confirm('您确认删除'+this.multipleSelection.length+'条信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        api.delUser(this.selectDatas.join(',')).then(res=>{
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
                        this.getUserData()

                    })
                }

            },
            //编辑角色
            eidtClick(data){
                console.log(data);
                this.$router.push({name:'edit-user',params:{id:data.userId}})
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
