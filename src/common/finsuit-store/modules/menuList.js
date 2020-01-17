
/**
 * 左侧菜单相关store模块
 */
export default {
    state: {
        // 当前菜单模块code
        menuListCode: "contentManagement1",
        // menu菜单默认选中 index 对应组件的index属性
        defaultActive: 0,
        // 左侧菜单
        menuList: []
    },
    getters: {

    },
    mutations: {
        ["SET_MENU_LIST"] (state, menuList) {
            state.menuList = menuList;
        }
    },
    actions: {
        test ({ commit, dispatch, state, rootState }) { }
    }
}