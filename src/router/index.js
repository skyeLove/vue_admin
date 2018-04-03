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
            component: resolve => require(['../components/layOut/Home.vue'], resolve),
            children:[
                {
                    name:'role-manage',
                    path: '/basic/roleManage',
                    component: resolve => require(['../page/roleManage/roleManage.vue'], resolve)
                },
                {
                    name:'add-role',
                    path: '/basic/roleManage/addRole',
                    component: resolve => require(['../page/roleManage/addRole.vue'], resolve)
                },
                 {
                    name:"menu-manage",
                    path: '/basic/menuManage',
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
