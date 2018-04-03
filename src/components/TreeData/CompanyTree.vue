<template>
    <div>
        <el-cascader
            @change="handleChange"
            clearable
            placeholder="请输入所属机构"
            size="small"
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
                companyTree:[]
            }
        },
        created(){
           this.initData()
        },
        methods: {
            initData(){
                api.loadCompanyTree().then(res=>{
                    if(res.status==200) {
                        res.data.forEach((value)=>{
                            if(!value.pId){
                                this.companyTree.push(value)
                                this.forData(res.data,value)
                            }
                        })
                        return this.companyTree
                    }
                })
            },
            //过滤树接口
            forData(object,value){
                value.children=[]
                object.forEach((item)=>{
                    if(value.id==item.pId){
                        value.children.push(item)
                        this.forData(object,item)
                    }
                })
                if(value.children.length==0)  delete value.children;
            },
            handleChange(value) {
                this.$emit('company-select',value)
            }
        }
    }
</script>

<style scoped>

</style>
