<template>
    <el-container class="top-fiex">
        <el-header>
            <div class="top">
                <span>{{$t("xwhead.title")}}</span>
            </div>
            <div class="user-info">
               <div class="pull-left" style="margin-right:20px;">
                   <el-dropdown trigger="click" @command="changeLang">
                <span class="el-dropdown-link">
                    <span class="header_name">{{lang}} <i class="el-icon-caret-bottom el-icon--right"></i></span>
                </span>
                       <el-dropdown-menu slot="dropdown">
                           <el-dropdown-item command="changeCN">中文</el-dropdown-item>
                           <el-dropdown-item command="changeEN">English</el-dropdown-item>
                       </el-dropdown-menu>
                   </el-dropdown>
               </div>
                <div class="pull-left">
                    <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            <img  class="user-logo hidden-xs-only" :src="srcImg">
                            <span class="header_name">{{username}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
                         </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                            <el-dropdown-item command="loginout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-header>
    </el-container>
</template>
<script>
    import * as api from '../../common/commonApis'
    export default {
        name:'v-header',
        data() {
            return {
                username: '',
                srcImg:'',
                lang:'中文'
            }
        },
        computed:{

        },
        created(){
            this.getUserData()
        },
        methods:{
            getUserData(){
                api.getUserById('').then(res=>{
                    if(res.status==200){
                        this.username=res.data.userName;
                        this.setlocalStorage('companyId',res.data.companyId)
                        this.srcImg='http://180.76.57.168:8080'+res.data.userImage
                    }else {
                        this.$message({
                            type: 'warning',
                            message: res.msg
                        });
                        localStorage.removeItem('Authorization')
                        this.$router.push('/login');
                    }

                })
            },
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('Authorization')
                    this.$router.push('/login');
                }
            },
            changeLang(lang){
                if(lang=='changeCN'){
                    this.lang='中文'
                    this.$i18n.locale='cn'
                }else if(lang=='changeEN'){
                    this.lang='English'
                    this.$i18n.locale='en'
                }
            }
        }
    }
</script>
<style scoped>
    .top-fiex .top{
        color:#fff;
        float: left;
        font-size: 0.66rem;
        display: inline-block;
        padding-left:1.04rem;
        height:60px;
        line-height:60px;
    }
    .user-info {
        float: right;
        padding-right: 1.04rem;
        font-size: 0.33rem;
        color: #fff;
    }
    .user-info {
        position: relative;
        display: inline-block;
        padding-left: 1.04rem;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .el-dropdown-link .user-logo{
        width:40px;
        height:40px;
        border-radius: 50%;
        vertical-align: middle;
    }
    .header_name {
        height: 60px;
        font-size: 0.33rem;
        line-height: 60px;
        color:#fff
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
