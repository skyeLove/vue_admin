/**
 * 所有接口
 */
import axios from './axios'

/**
 * 登陆
 */
export const LOGIN = params => { return axios.post('/apis/login', params).then(res => res.data); };
// export const LOGIN = '/login';
/**
 * 获取用户信息
 */
export const MUNElIST = '/apis/api/indexMenu';
/**
 * 角色列表信息
 */
export const systemRoleList = params => { return axios.post('/apis/api/getSystemRoleList', params).then(res => res.data); };

