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
                    name:'role-manage',//角色管理
                    path: '/basic/roleManage',
                    component: resolve => require(['../page/roleManage/roleManage.vue'], resolve)
                },
                {
                    name:'add-role',//角色添加
                    path: '/basic/roleManage/addRole',
                    component: resolve => require(['../page/roleManage/addRole.vue'], resolve)
                },
                {
                    name:'user-manage',//用户管理
                    path: '/basic/userManage',
                    component: resolve => require(['../page/userManage/userManage.vue'], resolve)
                },
                {
                    name:'add-user',//用户添加
                    path: '/basic/userManage/addUser',
                    component: resolve => require(['../page/userManage/addUser.vue'], resolve)
                },
                 {
                    name:'organization-manage',//机构管理
                    path: '/basic/organizationManage',
                    component: resolve => require(['../page/organization/organization.vue'], resolve)
                },
                {
                    name:'depart-manage',//部门管理
                    path: '/basic/departManage',
                    component: resolve => require(['../page/departManage/departManage.vue'], resolve)
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
