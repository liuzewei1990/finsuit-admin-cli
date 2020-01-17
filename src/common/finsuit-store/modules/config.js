
/**
 * 配置相关 store
 */

export default {
    state: {
        // 左侧导是否收起
        isCollapse: false,
    },
    getters: {

    },
    mutations: {
        IS_COLLAPSE: (state, isCollapse) => {
            state.isCollapse = isCollapse;
        },
    },
    actions: {
        /**
         * 菜单收起活展开
         */
        switchCollapse ({ commit, dispatch, state, rootState }) {
            let isCollapse = !state.isCollapse;
            commit('IS_COLLAPSE', isCollapse);
        },
    }
}