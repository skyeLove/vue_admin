import Vue from 'vue';
import App from './App';
import router from './router';
import store from "./common/store";
import axios from './common/axios';
import ElementUI from 'element-ui';
import  * as filters from './filter';
import base from './common/base'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';//element-ui 隐藏样式
import './assets/css/common.css';//页面公共样式
import './assets/css/font-awesome.css'//字体图标样式
import "babel-polyfill";
import VueI18n from 'vue-i18n'
import cn from './I18N/cn'
import en from './I18N/en'

Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'cn',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
        'cn': cn,   // 中文语言包
        'en': en    // 英文语言包
    }
})
Vue.use(base);
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
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
