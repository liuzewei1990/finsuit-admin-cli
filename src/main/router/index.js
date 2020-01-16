import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),

    routes: [
        {
            name: 'index',
            path: '/',
            component: require('../view/main').default,
            meta: { title: '首页', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: 'login',
            path: '/login',
            component: require('../view/login').default,
            meta: { title: '登录', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        // {
        //     name: 'error',
        //     path: '/error',
        //     component: ErrorPage,
        //     meta: { title: '错误' }
        // },
        // {
        //     path: '*',
        //     redirect: "/error",
        //     meta: { title: '404' }
        // },
    ]
})
