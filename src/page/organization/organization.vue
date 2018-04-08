<template>
    <div class="roleManageClass">
        <div class="content_title">
            <span class="content_title_title pull-left">机构管理</span>
            <span class="pull-right">
                <i class="el-icon-edit" @click="edit"><span>修改</span></i>
               <i class="fa fa-plus" @click="add"><span>添加</span></i>
               <i class="fa fa-trash-o" @click="remove"><span>删除</span></i>
          </span>
        </div>
        <div>
            <el-tree
               :data="dataList"
                node-key="id"
                default-expand-all
                :props="defaultProps"
                @node-drag-start="handleDragStart"
                @node-drag-enter="handleDragEnter"
                @node-drag-leave="handleDragLeave"
                @node-drag-over="handleDragOver"
                @node-drag-end="handleDragEnd"
                @node-drop="handleDrop"
                draggable
                :allow-drop="allowDrop"
                :allow-drag="allowDrag"> 
            </el-tree>
        </div>
    </div>
</template>
<script>
    import * as api from '../../common/commonApis'
    export default {
        name:'organization-manage',
        components:{

        },
        data: function(){
            return{
                    dataList:[],
                    defaultProps: {
                        children: 'children',
                        label: 'name'
                     }
       
            }
        },
        created() {
            this.getData()
        },
        methods: {
            handleDragStart(node, ev) {
                 console.log('drag start', node);
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                console.log('tree drag enter: ', dropNode.label);
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                console.log('tree drag leave: ', dropNode.label);
            },
            handleDragOver(draggingNode, dropNode, ev) {
             console.log('tree drag over: ', dropNode.label);
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
         console.log('tree drag end: ', dropNode && dropNode.label, dropType);
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
             console.log('tree drop: ', dropNode.label, dropType);
             },
            allowDrop(draggingNode, dropNode) {
             return dropNode.data.label !== '二级 3-1';
            },
             allowDrag(draggingNode) {
             return draggingNode.data.label.indexOf('三级 3-1-1') === -1;
             },
            //获取用户 管理列表
            getData(){
                 api.getCompanyList().then(res=>{
                    if(res.status==200){
                     this.dataList.push(res.data)
                    }else {
                        this.$message({
                        type: 'warning',
                        message: res.msg
                    });
                    }
                })
            },
            remove(){

            },
            add(){

            },
            //编辑
            edit(data){
                console.log(data);
            }
        }
    }
</script>
<style scoped>

</style>
