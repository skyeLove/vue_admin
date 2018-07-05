/**
 * 所有接口
 */
import axios from './axios'
/**
 * 登陆
 */
export const LOGIN = params => { return axios.post('/apis/login', JSON.stringify(params)).then(res => res.data); };
// export const LOGIN = '/login';
/**
 * 获取菜单列表
 */
export const MUNElIST = '/apis/api/indexMenu';
/**
 * 获取tree
 */
export const loadCompanyTree = params => { return axios.post('/apis/api/loadCompanyTree', JSON.stringify(params)).then(res => res.data); };

export const loadRoleTree = params => { return axios.post('/apis/api/loadRoleTree?companyId='+params).then(res => res.data); };

export const loadDeptTree = params => { return axios.post('/apis/api/loadDeptTree?companyId='+params).then(res => res.data); };

export const getRoleMenuJson = params => { return axios.post('/apis/api/getRoleMenuJson').then(res => res.data); };

export const loadStationTree = params => { return axios.post('/apis/api/loadStationTree?companyId='+params).then(res => res.data); };


/**
 * 公共接口 省市区
 */
export const getProCityDis = params => { return axios.get('/apis/api/getProCityDis?'+params).then(res => res.data); };

/**
 * 角色列表信息
 */
export const systemRoleList = params => { return axios.post('/apis/api/getSystemRoleList', JSON.stringify(params)).then(res => res.data); };
/**
 * 角色管理添加
 */
export const deleteRole = params => { return axios.post('/apis/api/deleteRole?roleId='+params,{}).then(res => res.data); };



export const saveOrUpdateRole = params => { return axios.post('/apis/api/saveOrUpdateRole', JSON.stringify(params)).then(res => res.data); };

/**
 * 用户管理
 */
export const getUserList = params => { return axios.post('/apis/api/getUserList',JSON.stringify(params)).then(res => res.data); };

export const delUser = params => { return axios.get('/apis/api/delUser?userId='+params).then(res => res.data); };

export const getUserById = params => { return axios.get('/apis/api/getUserById?userId='+params).then(res => res.data); };

export const addOrUpdateUser = params => { return axios.post('/apis/api/addOrUpdateUser',JSON.stringify(params)).then(res => res.data); };
/**
 * 机构管理
 */
export const addOrUpdateCompany = params => { return axios.post('/apis/api/addOrUpdateCompany',JSON.stringify(params)).then(res => res.data); };

export const deleteCompany = params => { return axios.post('/apis/api/deleteCompany?companyId='+params).then(res => res.data); };

export const getCompanyById = params => { return axios.post('/apis/api/getCompanyById?companyId='+params).then(res => res.data); };

export const getCompanyList = params => { return axios.post('/apis/api/getCompanyList').then(res => res.data); };
/**
 * 部门管理
 */
export const getDeptList = params => { return axios.post('/apis/api/getDeptList').then(res => res.data); };

export const addOrUpdateDept = params => { return axios.post('/apis/api/addOrUpdateDept',JSON.stringify(params)).then(res => res.data); };

export const deleteDept = params => { return axios.post('/apis/api/deleteDept?deptId='+params).then(res => res.data); };

export const getDeptById = params => { return axios.post('/apis/api/getDeptById?deptId='+params).then(res => res.data); };


/**
 * 菜单管理
 */
export const findAllMenuAndButton = params => { return axios.post('/apis/api/findAllMenuAndButton',JSON.stringify(params)).then(res => res.data); };

export const deleteMenu = params => { return axios.post('/apis/api/deleteMenu?menuId='+params).then(res => res.data); };

export const saveOrUpdateMenu = params => { return axios.post('/apis/api/saveOrUpdateMenu',JSON.stringify(params)).then(res => res.data); };

export const getMenuOrButtonById = params => { return axios.post('/apis/api/getMenuOrButtonById?id='+params).then(res => res.data); };
/**
 * 换热站管理
 */
export const getStationList = params => { return axios.post('/apis/api/getStationList',JSON.stringify(params)).then(res => res.data); };

export const delStation = params => { return axios.get('/apis/api/delStation?stationIds='+params).then(res => res.data); };

export const addOrUpdateStation = params => { return axios.post('/apis/api/addOrUpdateStation',JSON.stringify(params)).then(res => res.data); };

export const getStationInfo = params => { return axios.get('/apis/api/getStationInfo?stationId='+params).then(res => res.data); };
/**
 * 换热站管理
 */
export const getVillageList = params => { return axios.post('/apis/api/getVillageList',JSON.stringify(params)).then(res => res.data); };

export const deleteVillage = params => { return axios.post('/apis/api/deleteVillage?villageId='+params).then(res => res.data); };

export const addOrUpdateVillage = params => { return axios.post('/apis/api/addOrUpdateVillage',JSON.stringify(params)).then(res => res.data); };

export const getVillageById = params => { return axios.post('/apis/api/getVillageById?villageId='+params).then(res => res.data); };
/**
 * 日志管理
 */
export const getSystemLogList = params => { return axios.post('/apis/api/getSystemLogList',JSON.stringify(params)).then(res => res.data); };
/**
 * 标准缴费
 */
export const getpayList = params => { return axios.post('/apis/api/payRecordList',JSON.stringify(params)).then(res => res.data); };
