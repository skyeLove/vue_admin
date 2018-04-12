<template>
    <div>
        <el-cascader
            @change="handleChange"
            clearable
            placeholder="请输入所属机构"
            size="small"
            v-model="tempValue"
            change-on-select
            :options="companyTree"
            :show-all-levels="false"
            :props="{label:'name',value:'id'}">
        </el-cascader>
    </div>
</template>

<script>
    import * as api from '../../common/commonApis'
    export default {
        name: "company-tree",
        data(){
            return{
                companyTree:[],
                tempValue:[]
            }
        },
        props:[ "companyModel"],
        created(){
           this.initData()
        },
        watch:{
            companyModel(val){

            }
        },
        methods: {
            initData(){
                api.loadCompanyTree().then(res=>{
                    if(res.status==200) {
                        res.data.forEach((value)=>{
                            if(this.getlocalStorage('companyId')==value.id){
                                this.companyTree.push(value)
                                this.forData(res.data,value)
                            }
                        })
                        return this.companyTree
                    }
                })
            },
            handleChange(value) {
                this.$emit('company-select',value)
            }
        }
    }
</script>

<style scoped>

</style>
