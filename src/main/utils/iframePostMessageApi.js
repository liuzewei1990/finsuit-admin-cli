export default function () {

    let exportApi = {};

    // 添加一个tab
    exportApi.addTab = (tabObj = {}) => {
        this.$store.dispatch("addTab", tabObj);
    }

    // 移除一个tab
    exportApi.removeTab = (tabTitle) => {
        this.$store.dispatch("removeTab", tabTitle);
    }

    // 切花到指定tab
    exportApi.switchTab = (tabTitle) => {
        this.$store.dispatch("switchTab", tabTitle);
    }

    // 跳转到登录页
    exportApi.toLogin = () => {
        this.$router.push({ path: "/login" });
    }

    window.addEventListener("message", function (e) {
        let { message, data } = e.data;
        if (!message) return;
        exportApi[message](data);
    });

    window.exportApi = exportApi;

}