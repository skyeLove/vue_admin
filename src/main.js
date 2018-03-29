import Vue from 'vue';
import App from './App';
import router from './router';
import store from "./apis/store";
import axios from './apis/axios';
import ElementUI from 'element-ui';
import  * as filters from './filter/index';
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';//element-ui 隐藏样式
import './assets/css/common.css';//页面公共样式
import './assets/css/font-awesome.css'//字体图标样式
import "babel-polyfill";

Vue.use(ElementUI);
Vue.prototype.$http = axios
Vue.axios = axios
Vue.http = axios;
// register global utility filter.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
