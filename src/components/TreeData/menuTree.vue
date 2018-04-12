<template>
    <div>
        <el-tree
            :props="props"
            :data="menuData"
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
        name: "menu-tree",
        data(){
            return{
                menuData:[],
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
                console.log(data)
                   console.log(checkeds)
                this.$emit('menu-select',checkeds)
            },
            loadNode() {
                api.getRoleMenuJson().then(res=>{
                    res.data.forEach((value)=>{
                        if(!value.pId){
                            this.menuData.push(value)
                            this.forData(res.data,value)
                        }
                    })
                    return this.menuData
                })
            },
        }
    }
</script>

<style scoped>

</style>
