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

