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
                    name:'user_manage',
                    path: '/basic/userManage',
                    component: resolve => require(['../page/userManage/userManage.vue'], resolve)
                },
                {
                    name:'add-user',
                    path: '/basic/userManage/addUser',
                    component: resolve => require(['../page/userManage/addUser.vue'], resolve)
                },
                 {
                    name:'organization_manage',
                    path: '/basic/organizationManage',
                    component: resolve => require(['../page/organization/organization.vue'], resolve)
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
