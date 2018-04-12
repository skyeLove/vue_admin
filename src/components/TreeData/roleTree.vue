<template>
    <div>
        <el-tree
            :props="props"
            :data="roleData"
            show-checkbox
            node-key="id"
            accordion
            @check="handleCheckChange">
        </el-tree>
    </div>
</template>

<script>
    import * as api from '../../common/commonApis'
    export default {
        name: "role-tree",
        data(){
            return{
                roleData:[],
                props:{
                    label: 'name',
                    children: 'children'
                }
            }
        },
        created(){
            this.loadNode()
        },
        methods: {
            handleCheckChange(data,checkeds) {
                this.$emit('role-select',checkeds)
            },
            loadNode() {
                api.loadRoleTree('').then(res=>{
                    res.data.forEach((value)=>{
                        if(!value.pId){
                            this.roleData.push(value)
                            this.forData(res.data,value)
                        }
                    })
                    return this.roleData
                })
            },
        }
    }
</script>

<style scoped>

</style>
