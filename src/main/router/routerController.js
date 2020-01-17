
import router from './index.js'
import store from "../store/index.js";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.path === '/login' && store.getters.isLogin) {
        next({ path: '/' })
        NProgress.done()
        return;
    }

    if (to.matched.some(m => m.meta.requiresAuth)) {
        //判断是否登录
        if (store.getters.isLogin) {
            next()
            NProgress.done()
        } else {
            next({ path: '/login' })
            NProgress.done()
        }
    } else {
        next()
        NProgress.done()
    }

})

router.afterEach((to) => {
    NProgress.done()
})
