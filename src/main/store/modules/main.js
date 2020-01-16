// 默认为首页tab
let homeTab = {
    href: "home/index.html",
    icon: "icon-text",
    spread: false,
    title: "首页"
}
export default {
    state: {
        // 左侧导是否收起
        isCollapse: false,
        // 当前显示的tab
        activeIndex2: '首页',
        // 所有打开的tab
        menuTabs: [homeTab]
    },

    mutations: {
        IS_COLLAPSE: (state, isCollapse) => {
            state.isCollapse = isCollapse;
        },

        SET_TABS: (state, tabs) => {
            state.menuTabs = tabs;
        },

        ADD_TAB: (state, tabObj) => {
            state.menuTabs.push(tabObj);
        },

        SWITCH_TAB: (state, tabTitle) => {
            state.activeIndex2 = tabTitle;
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

        /**
         * 添加tab 接收tab对象
         */
        addTab ({ commit, dispatch, state, rootState }, tabObj = {}) {

            let tabTitle = tabObj.title;
            let tabs = state.menuTabs;
            // 没有则添加到menuTabs中
            if (!tabs.find(item => item.title === tabTitle)) commit('ADD_TAB', tabObj);
            dispatch('switchTab', tabTitle);
        },

        /**
         * 关闭tab
         * tabTitle:要删除的tab标题
         */
        removeTab ({ commit, dispatch, state, rootState }, tabTitle) {
            let tabs = state.menuTabs;
            if (tabTitle === state.activeIndex2) {
                let currTabIndex = state.menuTabs.findIndex(item => item.title === tabTitle);
                let newTabTitle = state.menuTabs[--currTabIndex].title;
                dispatch('switchTab', newTabTitle);
            }
            commit('SET_TABS', tabs.filter(item => item.title !== tabTitle));
        },

        /**
         * 关闭全部tab
         */
        removeAllTab ({ commit, dispatch, state, rootState }) {
            let tabs = state.menuTabs;
            commit('SET_TABS', tabs.filter(item => item.title === homeTab.title));
            dispatch('switchTab', homeTab.title);
        },

        /**
         * 关闭其他tab
         */
        removeOutTab ({ commit, dispatch, state, rootState }) {
            let tabs = state.menuTabs;
            commit('SET_TABS', tabs.filter(item => (item.title === homeTab.title || item.title === state.activeIndex2)));
            dispatch('switchTab', state.activeIndex2);
        },

        /**
         * 切换tab
         * tabTitle:要切换的tab标题
         */
        switchTab ({ commit, dispatch, state, rootState }, tabTitle) {
            commit("SWITCH_TAB", tabTitle || homeTab.title);
        },
    }
}