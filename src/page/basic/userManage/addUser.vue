<template>
    <div>
        <div class="content_title">
            <span class="content_title_title pull-left">新增（标*的为必填项）</span>
        </div>
          <el-form label-position='top' :model="addForm" :rules="rules" ref="addForm" label-width="120px" class="demo-ruleForm">
             <el-row :gutter="20" style="padding-top:1.125rem;">
            <el-col :xs="8" :sm="6" :md="6" :lg="8" :xl="8">
               <div class="userImgContent">
                   <el-upload
                       class=""
                       action="http://180.76.57.168:8767/modules/upload"
                       :show-file-list="false"
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload">
                       <img v-if="imageUrl" :src="imageUrl" class="avatar userImg">
                       <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                   </el-upload>
                  <div class="clickImg">点击上传图片</div>
               </div>
            </el-col>
            <el-col :xs="14" :sm="16" :md="16" :lg="14" :xl="14" >
                    <div class="title_fontSize">账户资料</div>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="用户名" prop="loginName">
                                <el-input placeholder="请输入用户名"  size="small" v-model="addForm.loginName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" placeholder="请输入密码" size="small" v-model="addForm.password"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item prop="companyId" label="所属机构" >
                                <company-select  @company-select="getCompanySelect"></company-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item prop="roleId"  label="所属角色" >
                                <el-cascader
                                    @focus="getFocus(roleSelect)"
                                    @change="setRole"
                                    clearable
                                    placeholder="请输入所属角色"
                                    size="small"
                                    change-on-select
                                    :options="roleSelect"
                                    :show-all-levels="false"
                                    :props="{label:'name',value:'id'}">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item prop="deptId" label="所属部门" >
                                <el-cascader
                                    clearable
                                    @change="setDept"
                                    @focus="getFocus(deptSelect)"
                                    placeholder="请输入所属部门"
                                    size="small"
                                    change-on-select
                                    :options="deptSelect"
                                    :show-all-levels="false"
                                    :props="{label:'name',value:'id'}">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-form-item prop="adminType"  label="是否是管理员" >
                                    <el-select  size="small" v-model="addForm.adminType" clearable  placeholder="请选择是否是管理员">
                                        <el-option label="否" value="0"></el-option>
                                        <el-option label="是" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-form-item prop="status"  label="是否启用" >
                                    <el-select  size="small" v-model="addForm.status" clearable  placeholder="请选择是否启用">
                                        <el-option label="禁用" value="0"></el-option>
                                        <el-option label="启用" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                        </el-col>
                    </el-row>
                    <div class="title_fontSize">个人资料</div>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="姓名" prop="userName">
                                <el-input placeholder="请输入姓名" size="small" v-model="addForm.userName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="身份证" prop="idCardNo">
                                <el-input placeholder="请输入身份证"  size="small" v-model="addForm.idCardNo"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item  label="手机号" prop="telephone">
                                <el-input placeholder="请输入手机号"  size="small" v-model="addForm.telephone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="电话" prop="mobilePhone">
                                <el-input placeholder="请输入电话"  size="small" v-model="addForm.mobilePhone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item class="pull-right">
                        <el-button class="pull-left" type="primary" @click="submitForm('addForm')">提交</el-button>
                        <el-button class="pull-left" @click="cancle()">取消</el-button>
                    </el-form-item>
            </el-col>
        </el-row>
         </el-form>
    </div>
</template>

<script>
    import * as api from '../../../common/commonApis'
    import companySelect from '../../../components/selectData/CompanySelect'
    export default {
        name: "add-user",
        data() {
            return {
                roleSelect:[],
                deptSelect:[],
                imageUrl:'../../../static/img/img.jpg',
                addForm: {
                    loginName: '',
                    password: '123456',
                    companyId: '',
                    roleId: '',
                    deptId:'',
                    adminType:'',
                    status:'',
                    userName:'',
                    idCardNo:'',
                    telephone:'',
                    mobilePhone:'',
                    userImage:''
                },
                rules: {
                    loginName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入用密码', trigger: 'blur'},
                    ],
                    companyId: [
                        {required: true, message: '请选择所属机构', trigger: 'blur'},
                    ],
                    roleId: [
                        {required: true, message: '请选择所属角色', trigger: 'blur'},
                    ],
                    deptId: [
                        {required: true, message: '请选择所属部门', trigger: 'blur'},
                    ],
                    adminType: [
                        {required: true, message: '请选择是否是管理员', trigger: 'blur'},
                    ]
                }
            }
        },
        components: {
            companySelect
        },
        computed:{

        },
        methods: {
            handleAvatarSuccess(res, file) {
                if(file.response.status==200){
                    this.imageUrl = URL.createObjectURL(file.raw);
                    this.addForm.userImage=file.response.data.url
                }else {
                    this.$message({
                        type: 'warning',
                        message: file.response.msg
                    });
                }

            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            //从companySelect子组件传来参数
            getCompanySelect(data) {
                if (data.length > 0) {
                    this.addForm.companyId = data[data.length - 1].toString();
                } else {
                    this.addForm.companyId = ''
                }
                this.getDeptSelect(this.addForm.companyId)
                this.getRoleSelect(this.addForm.companyId)

            },
            //更改所属机构得到机构下的角色
            getRoleSelect(data) {
                api.loadRoleTree(data).then(res=>{
                    this.roleSelect=[]
                    if(res.status==200) {
                        res.data.forEach((value)=>{
                            if(value.pId==data){
                                this.roleSelect.push(value)
                                this.forData(res.data,value)
                            }
                        })
                        return this.roleSelect
                    }
                })
            },
            setRole(data){
                if (data.length > 0) {
                    this.addForm.roleId  = data[data.length - 1].toString();
                } else {
                    this.addForm.roleId = ''
                }
            },
            //更改所属机构得到机构下的部门
            getDeptSelect(data){
                api.loadDeptTree(data).then(res=>{
                    this.deptSelect=[]
                    if(res.status==200) {
                        res.data.forEach(value=>{
                            if(value.pId==data){
                                this.deptSelect.push(value)
                                this.forData(res.data,value)
                            }
                        })
                        return this.deptSelect
                    }
                })
            },
            setDept(data){
                if (data.length > 0) {
                    this.addForm.deptId = data[data.length - 1].toString();
                } else {
                    this.addForm.deptId = ''
                }
            },
            getFocus(data){
                if(!this.addForm.companyId){
                    this.$message({
                        type: 'warning',
                        message: '请先选择所属机构！'
                    });
                }else if(data.length==0){
                    this.$message({
                        type: 'warning',
                        message: '此机构下无数据！'
                    });
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.addOrUpdateUser(this.addForm).then(res => {
                            if(res.status==200){
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.$router.push('/basic/userManage')
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
                this.$router.push('/basic/userManage')
            }
        }
    }
</script>

<style scoped>
.userImg {
    width: 2.083rem;
    height: 2.083rem;
    border-radius: 50%;
    border:1px dashed #ccc
}
    .userImgContent {
        position: relative;
        left:50%
    }
    .clickImg {
        position: absolute;
    }
</style>
