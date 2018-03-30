import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            name:"home",
            path: '/home',
            component: resolve => require(['../components/Home.vue'], resolve),
            children:[
                {
                    name:'roleManage',
                    path: '/roleManage',
                    component: resolve => require(['../page/roleManage.vue'], resolve)
                },
                 {
                    name:"menuManage",
                    path: '/menuManage',
                    component: resolve => require(['../page/menuManage.vue'], resolve)
        },
            ]
        },
        {
            name:"login",
            path: '/login',
            component: resolve => require(['../page/Login.vue'], resolve)
        },
    ]
})
