import axios from "axios"

const axiosFinsuit = axios.create();
const axiosPoint = axios.create();
/**
 * 版本注意问题：
 * 1、当前使用axios@0.18.0版本.
 * 2、目前最新版本axios@0.19.0不支持自定义配置参数，会导致isLoading和isGetCode无效,获取不到。
 */

//全局请求拦截器
axiosFinsuit.interceptors.request.use(function (config) {

    if (config.isLoading) {
        // 显示loading...
    }

    return config;
}, function (error) {
    return Promise.reject(error);
})

//全局响应拦截器
axiosFinsuit.interceptors.response.use(function (response) {
    let config = response.config;

    // 关闭loading...
    //如果HTTP状态码不正常直接return reject错误
    if (!(response.status === 200 || response.status === 201)) {
        return Promise.reject(new Error("HTTP状态码：" + response.status + "异常"));
    }

    const responseData = response.data;

    if (config.urlTypeDesc && config.urlType) {
        console.debug(`🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎\n`, `接口描述【${config.urlTypeDesc}】\n`, `接口类型【${config.urlType}】\n`, responseData);
    }

    return responseData;

}, function (error) {
    // 关闭loading...
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = "请求错误";
                break;

            case 401:
                error.message = "未授权，请登录";
                break;

            case 403:
                error.message = "拒绝访问";
                break;

            case 404:
                error.message = "请求错误，未找到该资源";
                break;

            case 408:
                error.message = "请求超时";
                break;

            case 500:
                error.message = "服务器内部错误";
                break;

            case 501:
                error.message = "服务未实现";
                break;

            case 502:
                error.message = "网关错误";
                break;

            case 503:
                error.message = "服务不可用";
                break;

            case 504:
                error.message = "网关超时";
                break;

            case 505:
                error.message = "HTTP版本不受支持";
                break;

            default:
        }
        error.code = error.response.status;

    } else if (error.code == "ECONNABORTED") {
        error.code = 601;
        error.message = '请求超时,请重试';

    } else if (error.code == undefined) {
        error.code = 602;
        error.message = "网络异常";
        Toast({ message: error.message });
        return Promise.reject(error);

    } else {
        error.code = 603;
        error.message = "未知错误";
    }

    // router.push(`/error?statusCode=${error.code}&msg=${error.message}`);
    Toast({ message: error.message, iconClass: "icon-tip" });
    return Promise.reject(error);
})

export default {
    postJson: function (baseURL, url, data, headers) {
        return axiosFinsuit({
            method: "post",
            url: url,
            baseURL: baseURL,
            data: data,
            timeout: 10000,
            headers: {
                // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/json",
                ...headers
            }
        })
    },
    post: function (baseURL, url, data, headers) {
        return axiosFinsuit({
            method: "post",
            url: url,
            baseURL: baseURL,
            data: qs.stringify(data),
            timeout: 10000,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
                ...headers
            }
        })
    },
    get: function (baseURL, url, params, headers) {
        return axiosFinsuit({
            method: "GET",
            url: url,
            baseURL: baseURL,
            params: params,
            timeout: 10000,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                ...headers
            }
        })
    },
    delete: function (baseURL, url, params) {
        return axiosFinsuit({
            method: "DELETE",
            url: url,
            baseURL: baseURL,
            params: params,
            timeout: 30000,
            // headers: {
            //           "X-requested-With": "XMLHttpRequest"
            // }
        })
    },
    patch: function (baseURL, url, params) {
        return axiosFinsuit({
            method: "PATCH",
            url: url,
            baseURL: baseURL,
            // params: params,
            data: qs.stringify(params),
            timeout: 30000,
            // headers: {
            //     "Content-Type": ""
            // }
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            //使用form表单进行数据交互
            // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            // "Content-Type": "application/json;charset=UTF-8"
            // },
        })
    },
}
