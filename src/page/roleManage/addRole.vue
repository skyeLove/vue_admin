<template>
    <div class="roleManageClass">
        <div class="content_title">
            <span class="content_title_title pull-left">新增（标*的为必填项）</span>
        </div>
        <el-row style="left:20%;padding-top:4%">
            <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14" class="text-center">
                <el-form label-position='left' :model="addForm" :rules="rules" ref="addForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item prop="companyId" label="所属机构" >
                        <company-tree  @company-select="getCompanyTree"></company-tree>
                    </el-form-item>
                    <el-form-item prop="roleName" label="角色名称" >
                        <el-input
                            size="small"
                            clearable
                            v-model="addForm.roleName"
                            placeholder="请输入角色名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="ckIds" label="配置菜单权限" >
                        <role-tree @role-select="getRoleTree"></role-tree>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="pull-left" type="primary" @click="submitForm('addForm')">提交</el-button>
                        <el-button class="pull-left" @click="cancle()">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import * as api from '../../common/commonApis'
    import companyTree from '../../components/selectData/CompanySelect'
    import roleTree from '../../components/TreeData/roleTree'
    export default {
        name: "add-role",
        data(){
            return{
                addForm:{
                    roleName:'',
                    companyId:'',
                    ckIds:'',
                    ckStatus:''
                },
                rules: {
                    roleName: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                    ],
                    companyId:[
                        { required: true, message: '请选择所属机构', trigger: 'blur' },
                    ],
                    ckIds:[
                        { required: true, message: '请选择菜单权限', trigger: 'blur' },
                    ]
                }
            }
        },
        components:{
            companyTree,roleTree
        },
        methods:{
            //从 companyTree 子组件传来参数
            getCompanyTree(data){
                if(data.length>0){
                    this.addForm.companyId=data[data.length-1].toString();
                }else {
                    this.addForm.companyId=''
                }
            },
            //从roleTree子组件传来参数
            getRoleTree(data){
                this.addForm.ckIds=data.checkedKeys.join(',')
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.saveOrUpdateRole(this.addForm).then(res => {
                            if(res.status==200){
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.$router.push('/basic/roleManage')
                            }else {
                                this.$message({
                                    type: 'warning',
                                    message: res.msg
                                });
                            }

                        })
                    }
                });
            },
            cancle() {
                this.$router.push('/basic/roleManage')
            }
        }
    }
</script>

<style scoped>

</style>
