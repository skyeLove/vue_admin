<template>
    <div>
        <div class="content_title">
            <span class="content_title_title pull-left">修改（标*的为必填项）</span>
        </div>
        <el-form label-position='top' :model="Form" :rules="rules" ref="Form" label-width="120px" class="demo-ruleForm">
            <el-row :gutter="20" style="padding-top:1.125rem;">
                <el-col :push="2" :pull="2" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" >
                    <div class="title_fontSize">账户资料</div>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="小区名称" prop="villageName">
                                <el-input placeholder="请输入小区名称"  size="small" v-model="Form.villageName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item prop="companyId" label="所属机构" >
                                <company-select  @company-select="getCompanySelect"></company-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item prop="stationId"  label="所属换热站" >
                                <el-cascader
                                    @focus="getFocus(heatSelect)"
                                    @change="setHeat"
                                    clearable
                                    placeholder="请输入所属换热站"
                                    size="small"
                                    change-on-select
                                    :options="heatSelect"
                                    :show-all-levels="false"
                                    :props="{label:'name',value:'id'}">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="小区楼栋数(栋)" prop="villageName">
                                <el-input placeholder="请输入小区楼栋数(栋)"  size="small" v-model="Form.buildingNo"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="小区使用面积(㎡)" prop="useArea">
                                <el-input placeholder="请输入小区使用面积"  size="small" v-model="Form.useArea"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="小区入网面积(㎡)" prop="netArea">
                                <el-input placeholder="请输入网使用面积"  size="small" v-model="Form.netArea"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="小区建筑面积(㎡)" prop="buildingArea">
                                <el-input placeholder="请输入小区建筑面积"  size="small" v-model="Form.buildingArea"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="小区锁壁面积(㎡)" prop="lockingArea">
                                <el-input placeholder="请输小区锁壁面积"  size="small" v-model="Form.lockingArea"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="小区非供热面积(㎡)" prop="notArea">
                                <el-input placeholder="请输入小区非供热面积"  size="small" v-model="Form.notArea"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item prop="status"  label="是否启用" >
                                <el-select  size="small" v-model="Form.status" clearable  placeholder="请选择是否启用">
                                    <el-option label="启用" :value="1"></el-option>
                                    <el-option label="禁用" :value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="省:" prop="pid">
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
                            <el-form-item label="市:" prop="cid">
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
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="区:" prop="aid" >
                                <el-select   v-model="Form.aid" clearable  placeholder="请选择区">
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
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item label="详细地址" prop="address">
                                <el-input placeholder="请输入详细地址"  size="small" v-model="Form.address"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item class="pull-right">
                        <el-button class="pull-left" type="primary" @click="submitForm('Form')">提交</el-button>
                        <el-button class="pull-left" @click="cancle()">取消</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import * as api from '../../../common/commonApis'
    import companySelect from '../../../components/selectData/CompanySelect'
    export default {
        name: "edit-community",
        data() {
            return {
                heatSelect:[],
                optionsPid:'',
                optionsCid:'',
                optionsAid:'',
                Form: {
                    villageName: '',
                    useArea: '',
                    netArea: '',
                    companyId:'',
                    stationId:'',
                    lockingArea:'',
                    buildingArea:'',
                    buildingNo:'',
                    notArea:'',
                    status:'',
                    address:'',
                    pid:'',
                    cid:'',
                    aid:''
                },
                rules: {
                    villageName: [
                        {required: true, message: '请输入小区名称', trigger: 'blur'},
                    ],
                    companyId: [
                        {required: true, message: '请选择所属机构', trigger: 'blur'},
                    ],
                    stationId: [
                        {required: true, message: '请选择所属换热站', trigger: 'blur'},
                    ],
                    useArea: [
                        {required: true, message: '请输入小区使用面积', trigger: 'blur'},
                    ],
                    netArea: [
                        {required: true, message: '请输入小区入网面积', trigger: 'blur'},
                    ],
                    status: [
                        {required: true, message: '请选择是否启用', trigger: 'blur'},
                    ],
                    pid: [
                        {required: true, message: '请选择省', trigger: 'blur'},
                    ],
                    cid: [
                        {required: true, message: '请选择市', trigger: 'blur'},
                    ],
                    aid: [
                        {required: true, message: '请选择区', trigger: 'blur'},
                    ]
                },
            }
        },
        components: {
            companySelect
        },
        created(){
            //如果没有传过来id返回列表
            if(!this.$route.params.id){
                this.$router.push('/basic/heatTransferManage')
                return false;
            }
            this.init()
            //初始展示省
            this.getProCityDis('optionsPid','grade=2&regionId=')
        },
        methods: {
            init(){
                api.getVillageById(this.$route.params.id).then(res => {
                    if(res.status==200){
                        this.getCid(Number(res.data.pid))
                        this.getAid(Number(res.data.cid))
                        this.Form={
                            villageId:res.data.villageId,
                            villageName:res.data.villageName,
                            useArea: res.data.useArea,
                            netArea: res.data.netArea,
                            companyId:res.data.companyId,
                            stationId:res.data.stationId,
                            lockingArea:res.data.lockingArea,
                            buildingArea:res.data.buildingArea,
                            buildingNo:res.data.buildingNo,
                            notArea:res.data.notArea,
                            status:res.data.status,
                            address:res.data.address,
                            pid:res.data.pid,
                            cid:res.data.cid,
                            aid:res.data.aid,
                        }
                    }
                })
            },
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
            //从companySelect子组件传来参数
            getCompanySelect(data) {
                if (data.length > 0) {
                    this.Form.companyId = data[data.length - 1].toString();
                } else {
                    this.Form.companyId = ''
                }
                this.getHeatSelect(this.Form.companyId)

            },
            //更改所属机构得到机构下的换热站
            getHeatSelect(data) {
                api.loadStationTree(data).then(res=>{
                    this.heatSelect=[]
                    if(res.status==200) {
                        res.data.forEach((value)=>{
                            if(value.pId==data){
                                this.heatSelect.push(value)
                                this.forData(res.data,value)
                            }
                        })
                        return this.heatSelect
                    }
                })
            },
            setHeat(data){
                if (data.length > 0) {
                    this.Form.stationId  = data[data.length - 1].toString();
                } else {
                    this.Form.stationId = ''
                }
            },
            getFocus(data){
                if(!this.Form.companyId){
                    this.$message({
                        type: 'warning',
                        message: '请先选择所属机构！'
                    });
                }else if(data.length==0){
                    this.$message({
                        type: 'warning',
                        message: '此机构下无数据！'
                    });
                }
            },
            //确认添加
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.addOrUpdateVillage(this.Form).then(res => {
                            if(res.status==200){
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });
                                this.$router.push('/basic/communityManage')
                            }else {
                                this.$message({
                                    type: 'warning',
                                    message: res.msg
                                });
                            }

                        })
                    }
                });
            },
            cancle() {
                this.$router.push('/basic/communityManage')
            }
        }
    }
</script>

<style scoped>
    .userImg {
        width: 2.083rem;
        height: 2.083rem;
        border-radius: 50%;
        border:1px dashed #ccc
    }
    .userImgContent {
        position: relative;
        left:50%
    }
    .clickImg {
        position: absolute;
    }
    .el-select{
        display: block;
    }
</style>
