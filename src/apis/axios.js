import axios from "axios";
import router from '../router/index'
import {MessageBox} from 'element-ui'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.baseURL = 'http://180.76.57.168:8767';
axios.defaults.headers.common[ 'Authorization' ] = window.localStorage.getItem('Authorization');

//POST传参序列化 添加一个请求拦截器
axios.interceptors.request.use((config) => {
  if (window.localStorage.getItem('Authorization')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = window.localStorage.getItem('Authorization');
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

//返回状态判断 添加一个响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data && response.data.code) {
      if (response.data.code === '2001') {

      }
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.data.status) {
        case 30006:
          //返回 30006 无效凭证
        router.replace({
            name: 'login'
          })
      }
      //全局ajax错误信息提示
      MessageBox({type:"error",message:error.response.data.msg,title:"温馨提示",});
    }
    return Promise.reject(error);
  });

export function fetch (url, config = { method: 'get' }) {
  return axios.request({ ...config, url })
  // return new Promise((resolve, reject) => {
  //   axios.request({ ...config, url })
  //     .then(response => {
  //       resolve(response.data);
  //     }, err => {
  //       reject(err);
  //     })
  //     .catch((error) => {
  //       reject(error)
  //     })
  // })
}

export default axios
