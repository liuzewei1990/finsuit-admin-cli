/**
 * store持久化储存插件，对共享module永久储存
 */

import createPersistedState from 'vuex-persistedstate'

// 需要持久化的module
export default createPersistedState({
    key: "@finsuit-admin",
    storage: window.localStorage,
    reducer: (state) => ({
        config: state.config,
        userInfo: state.userInfo,
        menuList: state.menuList,
        menuTabs: state.menuTabs
    }),
});