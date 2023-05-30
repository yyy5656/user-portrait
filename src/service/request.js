import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { message } from "antd";

const HTTP = axios.create({
	baseURL: BASE_URL,
	timeout: 80000, // 请求超时时间
});

export const SHAREDHTTP = axios.create({
	baseURL: BASE_URL,
	timeout: 80000, // 请求超时时间
});

// 请求拦截器
SHAREDHTTP.interceptors.request.use(
	(config) => {
		let token = localStorage.getItem("share_token");
		//let token = localStorage.getItem("token");
		if (token) {
			config.headers["token"] = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 相应拦截器
SHAREDHTTP.interceptors.response.use(
	(res) => {
		// 如果接口返回新的token，则替换原有的token
		/* if (res.headers.token) {
			sessionStorage.setItem("share_token", res.headers.token); // 修改token
		} */
		return res;
	},
	(error) => {
		if (error.message) {
			message.error(error.message);
		}
		return Promise.reject(error);
	}
);

// 请求拦截器
HTTP.interceptors.request.use(
	(config) => {
		let token = localStorage.getItem("token");
		if (token) {
			config.headers["token"] = token;
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
