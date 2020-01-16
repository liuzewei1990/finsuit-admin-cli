/**
 * 页面挂载方法：用于页面挂载拦截使用
 */

import authorityErrorPage from "./authorityErrorPage"
export default function () {

    if (this.$store.getters.isLogin) {
        this.$mount("#app");
    } else {
        authorityErrorPage.$mount("#app");
    }
}