<template>
    <div class="roleManageClass">
        <div class="content_title">
            <span class="content_title_title pull-left">部门管理</span>
            <span class="pull-right">
               <i class="fa fa-plus" @click="add"><span>添加</span></i>
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
                :allow-drop="allowDrop"
                :allow-drag="allowDrag">
                  <span  class="custom-tree-node" slot-scope="{ node, data }">
                      <span style="flex: 1">{{ node.label }}</span>
                        <span class="pull-right" v-if="data.type!=1&&data.id!=0">
                            <el-tooltip  class="item" effect="dark" content="详情" placement="top">
                                <el-button
                                    class="fa fa-info-circle"
                                    type="text"
                                    size="mini"
                                    @click="() => detail(data)">
                                    </el-button>
                            </el-tooltip>
                              <el-tooltip  class="item" effect="dark" content="编辑" placement="top">
                                <el-button
                                    class="fa fa-pencil"
                                    type="text"
                                    size="mini"
                                    @click="() => edit(data)">
                                </el-button>
                            </el-tooltip>
                            <el-tooltip   class="item" effect="dark" content="删除" placement="top">
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


        <el-dialog :title="tempTitle+'部门'" :visible.sync="dialogFormVisible">
            <el-form :rules="rules" ref="Form" :model="Form" :label-width="formLabelWidth">
                <el-row :gutter="20" >
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="所属机构:" prop="companyId">
                            <company-select :companyModel="Form.companyId"  @company-select="getCompanySelect">
                            </company-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="部门名称:" prop="deptName" >
                            <el-input placeholder="请输入部门名称" v-model="Form.deptName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" >
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="联系人:" >
                            <el-input placeholder="请输入联系人" v-model="Form.linkman"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="自定义编码:">
                            <el-input placeholder="请输入自定义编码" v-model="Form.deptCode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" >
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="手机号码:">
                            <el-input placeholder="请输入手机号码" v-model="Form.telephone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="备注:" prop="name">
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
        name:'depart-manage',
        components:{
            companySelect
        },
        data: function(){
            return{
                dataList:[],
                tempTitle:'',//1是添加title  2是编辑title
                Form: {
                    companyId: '',
                    remark: '',
                    linkman:'',
                    deptCode:'',
                    deptName:'',
                    telephone:'',
                    status:"1"
                },
                rules: {
                    companyId:[
                        {required: true, message: '请输入所属部门', trigger: 'blur'},
                    ],
                    deptName: [
                        {required: true, message: '请输入部门名', trigger: 'blur'},
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
            //从companySelect子组件传来参数
            getCompanySelect(data){
                if(data.length>0){
                    this.Form.companyId==data[data.length-1].toString();
                }else {
                    this.Form.companyId=''
                }
            },
            allowDrop(draggingNode,dropNode){
                return dropNode.data.type!=2
            },
            allowDrag(draggingNode){
                return draggingNode.data.type!=1
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                if(draggingNode&&dropNode){
                    if(dropNode.data.id!==draggingNode.data.id){
                        this.Form={}
                        this.Form.deptId=draggingNode.data.id;
                        this.Form.companyId=dropNode.data.id;
                        api.addOrUpdateDept(this.Form).then(res => {
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
                api.getDeptList().then(res=>{
                    if(res.status==200){
                        this.dataList=[{name:'ROOT',id:0,children:[]}]
                        this.dataList[0].children.push(res.data)
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
                this.$confirm('您确认删除部门名称为: '+data.name,' 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    api.deleteDept(data.id).then(res=>{
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
            add(){
                //清空数据 展开弹框
                this.Form={}
                //赋值弹框为添加
                this.tempTitle='添加'
                this.dialogFormVisible=true;
            },
            commitData(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        api.addOrUpdateDept(this.Form).then(res => {
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
                this.Form={}
                //赋值弹框为编辑
                this.tempTitle='编辑'
                api.getDeptById(data.id).then(res => {
                    if(res.status==200){
                        this.dialogFormVisible=true;
                        this.Form={
                            companyId:res.data.companyId,
                            remark: res.data.remark,
                            linkman:res.data.linkman,
                            deptCode:res.data.deptCode,
                            deptName:res.data.deptName,
                            telephone:res.data.telephone,
                            deptId:res.data.deptId,
                            status:"1"
                        }
                        console.log(this.Form.companyId);
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
