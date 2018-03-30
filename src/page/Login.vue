<template >
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" >
                <div class="manage_tip text-center" >
                    <p>后台管理系统</p>
                </div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm" >
                    <el-form-item prop="loginName">
                        <el-input v-model="loginForm.loginName" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="verifyCode">
                        <el-input @keyup.13="submitForm('loginForm')"  type="text" placeholder="验证码" v-model="loginForm.verifyCode"></el-input>
                        <div class='imgPosition'>
                             <img @click="getCode"  :src="'data:image/jpeg;base64,'+imgSrc"  class="verification">
                        </div>
                    </el-form-item>
                    <el-form-item class='text-center'>
                        <el-button  type="primary"  @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
    import * as api from "../common/commonApis"
    import {mapState, mapActions} from 'vuex'
    export default {
        name: 'login',
        data() {
            return {
                imgSrc:'',
                loginForm: {
                    loginName: '',
                    password: '',
                    verifyCode:'',
                    code:''
                },
                rules: {
                    loginName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    verifyCode: [
                        { required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
            }
        },
        components: {},
        computed: {
            ...mapState(['adminInfo']),
        },
        mounted(){
            if (!this.adminInfo.code) {
                this.getAdminData()
            }
        },
        methods: {
            ...mapActions(['getAdminData']),
            getCode(){
                this.$store.dispatch("getAdminData");
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.LOGIN(this.loginForm).then(res => {
                            let loading=this.$loading({
                                lock: true,
                                text: 'Loading',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            });
                            if(res.status==200){
                                this.$message({
                                    type: 'success',
                                    message: '登录成功'
                                });
                                loading.close();
                                this.$router.push({name:'home'})
                                //得到请求验证
                                window.localStorage.removeItem('Authorization');
                                window.localStorage.setItem('Authorization',res.data);
                                console.log(window.localStorage.getItem('Authorization'));
                            }else {
                                loading.close();
                                this.$message({
                                    type: 'error',
                                    message: res.msg
                                });
                            }
                        })
                    }
                })
            }
        },
        watch: {
            adminInfo: function (newValue){
                if(newValue){
                    this.loginForm.code=newValue.code
                    this.imgSrc=newValue.img
                }else {
                    this.$message({
                        type: 'error',
                        message: '未获取到验证码'
                    });
                }
            }
        }
    }
</script>

<style scoped>
    @import url('../assets/css/login.css');
</style>
