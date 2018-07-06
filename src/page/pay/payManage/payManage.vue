<template>
    <div >
        <div class="content_title">
            <span class="content_title_title pull-left">标准缴费</span>
        </div>
        <el-row :gutter="8" class="content_search">
            <el-col :sm="6" :md="6" :lg="4" :xl="4" class="hidden-xs-only">
                <el-input
                    size="small"
                    clearable
                    placeholder="请输入热力卡号"
                    v-model="model.userCardNumber">
                </el-input>
            </el-col>
            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <el-button @click="searchResult"  size="small" type="primary" icon="el-icon-search">查询</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import * as api from '../../../common/commonApis'
    export default {
        name: "pay-manage",
        data(){
            return{
                model:{
                    userCardNumber:'',
                    isPayment:'Y',
                },
            }
        },
        created(){
            this.getData()
        },
       methods:{
            //获取标准缴费信息
           getData(){
                api.getpayList(this.model).then(res=>{
                    if(res.status==200){

                    }else {
                        this.$message({
                            type: 'warning',
                            message:res.msg
                        });
                    }
                })
           },
           searchResult(){
               // this.getData()
               location.href="/files/file/template/roomInfoTemplate.xlsx";
           },
           //分页调用
           handleSizeChange(val){
               this.model.pageRow=val
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
