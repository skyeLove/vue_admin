<template>
    <div>
        <el-cascader
            @change="handleChange"
            clearable
            placeholder="请输入所属角色"
            size="small"
            change-on-select
            :options="roleSelect"
            :show-all-levels="false"
            :props="{label:'name',value:'id'}">
        </el-cascader>
    </div>
</template>

<script>
    import * as api from '../../common/commonApis'
    export default {
        name: "role-select",
        data(){
            return{
                roleSelect:[]
            }
        },
        created(){
            this.initData()
        },
        methods: {
            initData(){
                api.loadRoleTree('').then(res=>{
                    if(res.status==200) {
                        res.data.forEach((value)=>{
                            if(this.getlocalStorage('companyId')==value.id){
                                this.roleSelect.push(value)
                                this.forData(res.data,value)
                            }
                        })
                        return this.roleSelect
                    }
                })
            },
            handleChange(value) {
                this.$emit('role-select',value)
            }
        }
    }
</script>

<style scoped>

</style>
