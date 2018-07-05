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
                    component: resolve => require(['../page/basic/roleManage/roleManage.vue'], resolve)
                },
                {
                    name:'add-role',//角色添加
                    path: '/basic/roleManage/addRole',
                    component: resolve => require(['../page/basic/roleManage/addRole.vue'], resolve)
                },
                {
                    name:'user-manage',//用户管理
                    path: '/basic/userManage',
                    component: resolve => require(['../page/basic/userManage/userManage.vue'], resolve)
                },
                {
                    name:'add-user',//用户添加
                    path: '/basic/userManage/addUser',
                    component: resolve => require(['../page/basic/userManage/addUser.vue'], resolve)
                },
                {
                    name:'edit-user',//用户编辑
                    path: '/basic/userManage/editUser',
                    component: resolve => require(['../page/basic/userManage/editUser.vue'], resolve)
                },
                 {
                    name:'organization-manage',//机构管理
                    path: '/basic/organizationManage',
                    component: resolve => require(['../page/basic/organization/organization.vue'], resolve)
                },
                {
                    name:'depart-manage',//部门管理
                    path: '/basic/departManage',
                    component: resolve => require(['../page/basic/departManage/departManage.vue'], resolve)
                },
                {
                    name:'menu-manage',//菜单管理
                    path: '/basic/menuManage',
                    component: resolve => require(['../page/basic/menuManage/menuManage.vue'], resolve)
                },
                {
                    name:'heat-transfer-manage',//换热站管理
                    path: '/basic/heatTransferManage',
                    component: resolve => require(['../page/basic/heatTransferManage/heatTransferManage.vue'], resolve)
                },
                {
                    name:'add-heat-transfer',//添加换热站
                    path: '/basic/heatTransferManage/addHeatTransfer',
                    component: resolve => require(['../page/basic/heatTransferManage/addHeatTransfer.vue'], resolve)
                },
                {
                    name:'edit-heat-transfer',//修改换热站管理
                    path: '/basic/heatTransferManage/editHeatTransfer',
                    component: resolve => require(['../page/basic/heatTransferManage/editHeatTransfer.vue'], resolve)
                },
                {
                    name:'community-manage',//小区管理
                    path: '/basic/communityManage',
                    component: resolve => require(['../page/basic/communityManage/communityManage.vue'], resolve)
                },
                {
                    name:'add-community',//添加小区
                    path: '/basic/communityManage/addCommunity',
                    component: resolve => require(['../page/basic/communityManage/addCommunity.vue'], resolve)
                },
                {
                    name:'edit-community',//修改小区
                    path: '/basic/communityManage/editCommunity',
                    component: resolve => require(['../page/basic/communityManage/editCommunity.vue'], resolve)
                },
                {
                    name:'log-manage',//日志管理
                    path: '/basic/logManage',
                    component: resolve => require(['../page/basic/logManage/logManage.vue'], resolve)
                },
                {
                    name:'pay-manage',//标准缴费
                    path: '/pay/payManage',
                    component: resolve => require(['../page/pay/payManage/payManage.vue'], resolve)
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
