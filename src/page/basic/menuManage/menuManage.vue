<template>
    <div class="roleManageClass">
        <div class="content_title">
            <span class="content_title_title pull-left">菜单管理</span>
            <span class="pull-right">
          </span>
        </div>
        <div style="padding:0.625rem;">
            <el-tree
                :data="dataList"
                node-key="id"
                default-expand-all
                :props="defaultProps"
                @node-drag-end="handleDragEnd"
                draggable
                :allow-drag="allowDrag">
                  <span  class="custom-tree-node" slot-scope="{ node, data }">
                      <span style="flex: 1">{{ node.label }}</span>
                        <span class="pull-right" >
                             <el-tooltip v-if="data.type!=2" class="item" effect="dark" content="添加" placement="top">
                                <el-button
                                    class="fa fa-plus"
                                    type="text"
                                    size="mini"
                                    @click="() => add(data)">
                              </el-button>
                             </el-tooltip>
                            <el-tooltip v-if="data.menuId!=''" class="item" effect="dark" content="详情" placement="top">
                                <el-button
                                    class="fa fa-info-circle"
                                    type="text"
                                    size="mini"
                                    @click="() => detail(data)">
                                    </el-button>
                            </el-tooltip>
                              <el-tooltip v-if="data.menuId!=''" class="item" effect="dark" content="编辑" placement="top">
                                <el-button
                                    class="fa fa-pencil"
                                    type="text"
                                    size="mini"
                                    @click="() => edit(data)">
                                </el-button>
                            </el-tooltip>
                            <el-tooltip v-if="data.menuId!=''"  class="item" effect="dark" content="删除" placement="top">
                                 <el-button
                                     class="fa fa-trash-o"
                                     type="text"
                                     size="mini"
                                     @click="() => remove(node, data)">
                                </el-button>
                            </el-tooltip>
                    </span>
                  </span>
            </el-tree>
        </div>


        <el-dialog :title="tempTitle+'菜单'" :visible.sync="dialogFormVisible">
            <el-form :rules="rules" ref="Form" :model="Form" :label-width="formLabelWidth">
                <el-row :gutter="20" >
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="类型:" prop="type">
                            <el-select  v-model="Form.type" clearable  placeholder="请选择类型">
                                <el-option
                                    :key="1"
                                    label="菜单"
                                    :value="1">
                                </el-option>
                                <el-option
                                    :key="2"
                                    label="按钮"
                                    :value="2">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="菜单名称:" prop="menuName" >
                            <el-input placeholder="请输入菜单名称" v-model="Form.menuName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" >
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="请求的url:" >
                            <el-input placeholder="请输入url" v-model="Form.url"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="图标:">
                            <el-input placeholder="请输入图标样式" v-model="Form.icon"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" >
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="状态:" prop="status">
                            <el-select  v-model="Form.status" clearable  placeholder="请选择状态">
                                <el-option
                                    :key="1"
                                    label="有效"
                                    :value="1">
                                </el-option>
                                <el-option
                                    :key="2"
                                    label="无效"
                                    :value="2">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="备注:" >
                            <el-input v-model="Form.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" >
                    <el-form-item class="pull-right">
                        <el-button class="pull-left" type="primary" @click="commitData('Form')">提交</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false" class="pull-left" >取消</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import * as api from '../../../common/commonApis'
    import companySelect from '../../../components/selectData/CompanySelect'
    export default {
        name:'menu-manage',
        components:{
            companySelect
        },
        data: function(){
            return{
                dataList:[],
                tempTitle:'',//1是添加title  2是编辑title
                Form: {
                    type: 1,
                    menuName: '',
                    url:'',
                    icon:'',
                    status:1,
                    remark:'',
                    parentId:''
                },
                rules: {
                    type:[
                        {required: true, message: '请选择菜单类型', trigger: 'blur'},
                    ],
                    menuName: [
                        {required: true, message: '请输入菜单名', trigger: 'blur'},
                    ],
                    status: [
                        {required: true, message: '请输选择菜单状态', trigger: 'blur'},
                    ]
                },
                formLabelWidth: '80px',
                dialogFormVisible:false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }

            }
        },
        created() {
            this.getData();
        },
        methods: {
            allowDrag(draggingNode){
                return draggingNode.data.type!=2
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                if(draggingNode&&dropNode){
                    if(dropNode.data.id!==draggingNode.data.id){
                        this.Form={}
                        this.Form.parentId=dropNode.data.id;
                        api.saveOrUpdateMenu(this.Form).then(res => {
                            if(res.status==200){
                                this.$message({
                                    type: 'success',
                                    message: '拖拽成功'
                                });
                            }else {
                                this.$message({
                                    type: 'warning',
                                    message: res.msg
                                });
                            }
                            this.getData()
                        })
                    }
                }
            },
            //获取管理列表
            getData(){
                api.findAllMenuAndButton().then(res=>{
                    if(res.status==200){
                        this.dataList=[{name:'ROOT',menuId:'',children:res.data}]
                    }else {
                        this.$message({
                            type: 'warning',
                            message: res.msg
                        });
                    }
                })
            },
            detail(data){
                // console.log(data);
            },
            remove(node,data){
                this.$confirm('您确认删除菜单名称为: '+data.name,' 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    api.deleteMenu(data.menuId).then(res=>{
                        if(res.status==200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else {
                            this.$message({
                                type: 'warning',
                                message:res.msg
                            });
                        }
                        this.getData()
                    })
                })
            },
            add(data){
                //清空数据 展开弹框
                this.Form={}
                //赋值弹框为添加
                this.tempTitle='添加'
                this.dialogFormVisible=true;
                this.Form.parentId=data.menuId;
            },
            commitData(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        api.saveOrUpdateMenu(this.Form).then(res => {
                            if(res.status==200){
                                this.$message({
                                    type: 'success',
                                    message: this.tempTitle+'成功！'
                                });
                                this.dialogFormVisible=false;
                            }else {
                                this.$message({
                                    type: 'warning',
                                    message: res.msg
                                });
                            }
                            this.getData()
                        })
                    }
                });
            },
            //编辑
            edit(data){
                console.log(data);
                this.Form={}
                //赋值弹框为编辑
                this.tempTitle='编辑'
                api.getMenuOrButtonById(data.menuId).then(res => {
                    if(res.status==200){
                        this.dialogFormVisible=true;
                        this.Form={
                            type:res.data.type,
                            menuName:res.data.menuName,
                            url:res.data.url,
                            icon:res.data.icon,
                            status:res.data.status,
                            remark:res.data.remark,
                            parentId:res.data.parentId,
                            menuId:res.data.menuId
                        }
                    }else {
                        this.$message({
                            type: 'warning',
                            message: res.msg
                        });
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 100px;
    }
    .el-select{
        display: block;
    }
    .el-button.fa{
        font-size: 0.458rem;
    }
</style>
