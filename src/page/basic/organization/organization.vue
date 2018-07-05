<template>
    <div class="roleManageClass">
        <div class="content_title">
            <span class="content_title_title pull-left">机构管理</span>
        </div>
        <div style="padding:0.625rem;">
            <el-tree
               :data="dataList"
                node-key="id"
                default-expand-all
                :props="defaultProps"
                @node-drag-end="handleDragEnd"
                draggable>
                  <span  class="custom-tree-node" slot-scope="{ node, data }">
                      <span style="flex: 1">{{ node.label }}</span>
                        <span class="pull-right" v-if="data.id!=0">
                             <el-tooltip class="item" effect="dark" content="添加" placement="top">
                                <el-button
                                    class="fa fa-plus"
                                    type="text"
                                    size="mini"
                                    @click="() => add(data)">
                              </el-button>
                             </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="详情" placement="top">
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
                            <el-tooltip class="item" effect="dark" content="删除" placement="top">
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


        <el-dialog :title="tempTitle+'机构'" :visible.sync="dialogFormVisible">
            <el-form :rules="rules" ref="Form" :model="Form" :label-width="formLabelWidth">
                <el-row :gutter="20" >
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="机构名称:" prop="companyName">
                            <el-input v-model="Form.companyName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="客户类型:" >
                            <el-select v-model="Form.type" placeholder="请选择客户类型">
                                <el-option label="公司" value="1"></el-option>
                                <el-option label="部门" value="2"></el-option>
                            </el-select>
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
                        <el-form-item label="手机号:">
                            <el-input placeholder="请输入手机号" v-model="Form.telephone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" >
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="省:">
                            <el-select @change="getCid(Form.pid)"   v-model="Form.pid" clearable  placeholder="请选择省">
                                <el-option
                                    :key="0"
                                    label="请选择"
                                    :value="0">
                                </el-option>
                                <el-option
                                    v-for="item in optionsPid"
                                    :key="item.regionId"
                                    :label="item.regionName"
                                    :value="item.regionId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="市:">
                            <el-select  @change="getAid(Form.cid)"  v-model="Form.cid" clearable  placeholder="请选择市">
                                <el-option
                                    :key="0"
                                    label="请选择"
                                    :value="0">
                                </el-option>
                                <el-option
                                    v-for="item in optionsCid"
                                    :key="item.regionId"
                                    :label="item.regionName"
                                    :value="item.regionId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" >
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="区:" >
                            <el-select  v-model="Form.aid" clearable  placeholder="请选择区">
                                <el-option
                                    :key="0"
                                    label="请选择"
                                    :value="0">
                                </el-option>
                                <el-option
                                    v-for="item in optionsAid"
                                    :key="item.regionId"
                                    :label="item.regionName"
                                    :value="item.regionId">
                                </el-option>
                            </el-select>
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
    export default {
        name:'organization-manage',
        components:{

        },
        data: function(){
            return{
                    dataList:[],
                    optionsPid:'',
                    optionsCid:'',
                    optionsAid:'',
                    tempTitle:'',//1是添加title  2是编辑title
                    Form: {
                        companyName: '',
                        remark: '',
                        linkman:'',
                        telephone:'',
                        parentId:'',
                        type:'',
                        pid:'',
                        cid:'',
                        aid:''
                    },
                    rules: {
                        companyName: [
                            {required: true, message: '请输入机构名', trigger: 'blur'},
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
            //初始展示省
            this.getProCityDis('optionsPid','grade=2&regionId=')
        },
        methods: {
            //省市区三级联动接口
            getProCityDis(array,url){
                api.getProCityDis(url).then(res => {
                    this[array]=res.data
                })
            },
            //得到市
            getCid(item){
                this.getProCityDis('optionsCid','grade=3&regionId='+item)
            },
            //得到区
            getAid(item){
                this.getProCityDis('optionsAid','grade=4&regionId='+item)
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                if(dropNode.data.id!=draggingNode.data.id){
                    this.Form={}
                    this.Form.parentId=dropNode.data.id;
                    this.Form.companyId=draggingNode.data.id;
                    api.addOrUpdateCompany(this.Form).then(res => {
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

            },
            //获取用户 管理列表
            getData(){
                 api.getCompanyList().then(res=>{
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
                this.$confirm('您确认删除机构名称为: '+data.name,' 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    api.deleteCompany(data.id).then(res=>{
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
                this.Form.parentId=data.id;
            },
            commitData(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        api.addOrUpdateCompany(this.Form).then(res => {
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
                api.getCompanyById(data.id).then(res => {
                    if(res.status==200){
                        this.dialogFormVisible=true;
                        this.getCid(res.data.pid)
                        this.getAid(res.data.cid)
                        this.Form={
                            companyName: res.data.companyName,
                            remark:res.data.remark,
                            linkman:res.data.linkman,
                            telephone:res.data.telephone,
                            companyId:res.data.companyId,
                            type:res.data.type,
                            pid:res.data.pid,
                            cid:res.data.cid,
                            aid:res.data.aid
                        }
                    }else {
                        this.$message({
                            type: 'warning',
                            message: res.msg
                        });
                    }
                })
            }
        },
        watch:{

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
