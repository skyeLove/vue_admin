<template>
    <div >
        <v-head></v-head>
        <el-row  style="position: inherit;">
            <el-col class="slider-fiex" :xs="4" :sm="4" :md="4" :lg="3" :xl="4"  >
                <v-sidebar></v-sidebar>
            </el-col>
            <el-col :xs="20" :sm="20" :md="20" :lg="21" :xl="20"  class=" content_fiex">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        name:'home',
        components:{
            vHead, vSidebar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/home.css";
</style>
