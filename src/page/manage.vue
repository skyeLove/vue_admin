<template>
  <div class="fullHeight ">
    <top></top>
    <el-row class="tac fullHeight" >
      <el-col :span="4" class="fullHeight slider-fiex"  >
        <el-menu v-for="(muen,key) in muenList |muenChild" :key="muen.menuId"   background-color="rgba(0,0,0,1)" text-color="#fff" :collapse="showCollapse" :default-active="defaultActive"  theme="dark" router style="min-height: 100%; ">
          <!--<el-menu-item index="./"><i class="el-icon-menu"></i>{{muen.menuName}}</el-menu-item>-->
          <el-submenu :index="muen.menuId">
            <template slot="title"><i class="el-icon-document"></i>{{key}}</template>
            <el-menu-item index="userList">用户列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" class="fullHeight pull-right" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  import top from '../components/top'
  import * as api from "../apis/commonApis"
    export default {
        name: "manage",
        components:{top},
      data(){
          return{
            showCollapse:false,
            muenList:{}
          }
        },
        computed: {
          defaultActive: function(){
              return this.$route.path.replace('/login');
          }
      },
      beforeCreate() {
        this.$http.get(api.MUNElIST)
          .then((res) => {
            if(res.data.status==200){
              this.muenList= res.data.data;
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

      }
    }
</script>

<style lang="less" scoped>

</style>
