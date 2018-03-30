<template>
    <div class="rlb-sidebar">
        <i class="fa fa-align-justify icon-collapse" @click="getCollapse"></i>
        <el-menu :unique-opened=true v-for="(muen,key) in muenList " :key="muen.menuId"   background-color="rgba(0,0,0,1)" text-color="#fff"  :default-active="defaultActive" :collapse="showCollapse"  theme="dark" router style="min-height: 100%">
            <!--<el-menu-item index="./"><i class="el-icon-menu"></i>{{muen.menuName}}</el-menu-item>-->
            <el-submenu :index="muen.menuId">
                <template slot="title"><i class="fa fa-align-justify" style="color:#fff"></i><span class="hidden-xs-only parentMenuName">{{muen.menuName}}</span></template>
                <el-menu-item v-for="item in muen.children" :key="item.menuId" index="roleManage"><span >{{item.menuName}}</span></el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
    import * as api from "../common/commonApis"
    export default {
        name: "sidebar",
        components:{top},
        data(){
            return{
                showCollapse:false,
                muenList:[],
                goRouter:''
            }
        },
        computed: {
            defaultActive(){
                return this.$route.path.replace('/login');
            }

        },
        beforeCreate() {
            this.$http.get(api.MUNElIST)
                .then((res) => {
                    if(res.data.status==200){
                        // console.log(this.$router);
                        res.data.data.sort((a,b)=>a.sort - b.sort).forEach((value)=>{
                            if(!value.parentId){
                                this.muenList.push(value)
                                value.children=[]
                                res.data.data.forEach((item)=>{
                                    if(value.menuId==item.parentId){
                                        value.children.push(item)
                                    }
                                })
                            }
                        })
                    }else {
                        this.$message({
                            type: 'error',
                            message:res.data.msg
                        });
                        this.$router.push({name:'login'})
                    }

                })
        },
        methods:{
            getCollapse(){
                this.showCollapse=!this.showCollapse
            },
            handleOpen(key, keyPath) {
                this.handleClose()
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            }
        },
        filters:{

        }
    }
</script>

<style  scoped>
.parentMenuName {
    font-size: 0.33rem;
    margin-left:0.29rem;
}
    .icon-collapse {
        color:#fff;
        font-size: 0.66rem;
        position: relative;
        left:18px;
        top:2px;
    }
</style>
