// 组装模块并导出 store 的文件
import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import { state, getters, mutations } from '@common/finsuit-store/index.js'
import main from "./modules/main.js"

Vue.use(Vuex);

const persistedstate = createPersistedState({
    key: "@finsuit-admin",
    storage: window.localStorage,
    reducer: (state) => ({ main: state.main }),
});

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    modules: { main },
    plugins: [persistedstate]
});