import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production', 直接修改state 抛出异常

  getters: {

  },
  state: {
    adminInfo: {
      avatar: ''
    },
      optionsPid:'',
      optionsCid:'',
      optionsAid:'',
  },
  mutations: {
    //只能同步的函数
    saveAdminInfo(state, adminInfo){
      state.adminInfo = adminInfo;
    }
  },
  actions: {
    getAdminData({commit}){
      Vue.axios.get('/apis/verifyCodeImage').then(res => {
        commit('saveAdminInfo', res.data);
      }).catch(exp => console.log('您尚未登陆或者验证失效'))
    }
  }
})

export default store
