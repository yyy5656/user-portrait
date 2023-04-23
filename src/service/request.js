import axios from "axios";
import {BASE_URL} from "@/utils/constant";
import {withRouter} from "next/router";
import Login from "@/pages";
import {message} from "antd";

const HTTP = axios.create({
    baseURL: BASE_URL,
    timeout: 80000, // 请求超时时间
});

// 请求拦截器
HTTP.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem("token");
        // 给分享板块一个单独的token 先这么写着 有问题再说
        if (!config.headers["token"] && token) {
            config.headers["token"] = token;
        } else {
            // 停止发送请求，并立即退出登录
            // withRouter(Login); 
            // 强制跳转到login页面
            // return Promise.reject("退出登录");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 相应拦截器
HTTP.interceptors.response.use(
    (res) => {
        // 如果接口返回新的token，则替换原有的token
        if (res.headers.token) {
            sessionStorage.setItem("token", res.headers.token); // 修改token
        }
        return res;
    },
    (error) => {
        if (error.message) {
            message.error(error.message);
        }
        return Promise.reject(error);
    }
);

export default HTTP;