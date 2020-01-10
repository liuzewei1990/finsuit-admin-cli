/* eslint-disable no-new */
import Vue from "vue"
import App from "./user.vue"
// import store from "./store/index"

/* 注册配置文件 */
import config from "./config/config.index.js"
Vue.prototype["$Config"] = config;


/* 注册api接口 */
import * as api from "./apis/index.js"
Vue.prototype["$api"] = api;


/* 注册埋点api接口 */
import * as trackEvents from "./apis/track-events-api.js"
Vue.prototype["$trackEvents"] = trackEvents;


const app = new Vue({
    // store,
    components: { App },
    template: "<App/>"
});



app.$mount("#app")