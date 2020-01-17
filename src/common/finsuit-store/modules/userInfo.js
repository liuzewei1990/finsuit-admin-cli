/**
 * 用户信息相关store模块
 */

export default {
    state: {
        // iframe共享的用户信息
        userInfo: {},
    },
    getters: {
        isLogin: state => {
            if (state.userInfo.token) return true;
            else return false;
        }
    },
    mutations: {
        ["USER_INFO"] (state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        test ({ commit, dispatch, state, rootState }) { }
    }
}