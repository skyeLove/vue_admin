<template>
    <div>
        <div class="content_title">
            <span class="content_title_title pull-left">新增（标*的为必填项）</span>
        </div>
        <el-form label-position='top' :model="Form" :rules="rules" ref="Form" label-width="120px" class="demo-ruleForm">
            <el-row :gutter="20" style="padding-top:1.125rem;">
                <el-col :push="2" :pull="2" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" >
                    <div class="title_fontSize">账户资料</div>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item prop="companyId" label="所属机构" >
                                <company-select  @company-select="getCompanySelect"></company-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item prop="type"  label="类型" >
                                <el-select  size="small" v-model="Form.type" clearable  placeholder="请选择换热站类型">
                                    <el-option label="直管站" value="1"></el-option>
                                    <el-option label="自建站" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="换热站名称" prop="stationName">
                                <el-input placeholder="请输入换热站名称"  size="small" v-model="Form.stationName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="代理公司" prop="proxyCompany">
                                <el-input placeholder="请输入代理公司" size="small" v-model="Form.proxyCompany"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="始供时间" prop="stratDate" >
                                <el-date-picker
                                    v-model="Form.stratDate"
                                    align="right"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    format="yyyy 年 MM 月 dd 日"
                                    :picker-options="pickerOptions"
                                    placeholder="选择始供时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
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
                    </el-row>
                    <el-row :gutter="20">
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
        name: "add-heat-transfer",
        data() {
            return {
                optionsPid:'',
                optionsCid:'',
                optionsAid:'',
                Form: {
                    stationName: '',
                    companyId: '',
                    type: '',
                    proxyCompany:'',
                    stratDate:'',
                    address:'',
                    pid:'',
                    cid:'',
                    aid:''
                },
                rules: {
                    stationName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '请选择换热站类型', trigger: 'blur'},
                    ],
                    companyId: [
                        {required: true, message: '请选择所属机构', trigger: 'blur'},
                    ],
                    stratDate: [
                        {required: true, message: '请选择始供时间', trigger: 'blur'},
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
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },
        components: {
            companySelect
        },
        created(){
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
            //从companySelect子组件传来参数
            getCompanySelect(data) {
                if (data.length > 0) {
                    this.Form.companyId = data[data.length - 1].toString();
                } else {
                    this.Form.companyId = ''
                }

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.addOrUpdateStation(this.Form).then(res => {
                            if(res.status==200){
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.$router.push('/basic/heatTransferManage')
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
                this.$router.push('/basic/heatTransferManage')
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
