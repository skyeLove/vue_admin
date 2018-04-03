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
 * 获取用户信息
 */
export const getUserById = () => { return axios.get('/apis/api/getUserById?userId=').then(res => res.data); };
/**
 * 角色列表信息
 */
export const systemRoleList = params => { return axios.post('/apis/api/getSystemRoleList', JSON.stringify(params)).then(res => res.data); };

export const loadCompanyTree = params => { return axios.post('/apis/api/loadCompanyTree', JSON.stringify(params)).then(res => res.data); };
/**
 * 角色管理添加
 */
export const addRole = params => { return axios.post('/apis/api/deleteRole?roleId='+params,{}).then(res => res.data); };

export const loadRoleTree = params => { return axios.post('/apis/api/loadRoleTree', JSON.stringify(params)).then(res => res.data); };

export const saveOrUpdateRole = params => { return axios.post('/apis/api/saveOrUpdateRole', JSON.stringify(params)).then(res => res.data); };

