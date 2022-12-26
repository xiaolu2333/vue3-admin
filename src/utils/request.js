/* jshint esversion: 6 */

/* 封装 axios 拦截器 */

import axios from "axios";

// 创建实例
const service = axios.create({
  baseURL: "/devApi", // api 的 base_url
  timeout: 5000, // 请求超时时间
});

// 创建请求拦截器
service.interceptors.request.use(
  function (config) {
    "use strict";
    // 在发送请求之前做些什么
    // 比如：添加token，添加请求头等
    return config;
  },
  function (error) {
    "use strict";
    // 对请求错误做些什么
    // 比如：请求超时，请求失败等提示
    return Promise.reject(error);
  }
);

// 创建响应拦截器
service.interceptors.response.use(
  function (response) {
    "use strict";
    // 对响应数据做点什么
    // 比如：根据响应状态码，做不同的响应处理
    return response;
  },
  function (error) {
    "use strict";
    // 对响应错误做点什么
    // 比如：根据响应状态码，做不同的响应处理
    return Promise.reject(error);
  }
);

// 导出 service，此时可将全局配置的 axios 从 main.js 中移除
export default service;
