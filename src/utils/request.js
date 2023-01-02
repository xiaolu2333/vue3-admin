/* jshint esversion: 6 */

/* 封装 axios 拦截器 */

import axios from "axios";
import { ElMessage } from "element-plus";

// 通过 process.env 来获取环境变量
// console.log(process.env.NODE_ENV + "环境: " + process.env.VUE_APP_API);
// 执行 npm run serve 时，默认读取 .env.development 中的环境变量，输出 development环境: /devApi
// 执行 npm run build 时，默认读取 .env.production 中的环境变量，输出 production环境: /productionApi
// 我们就可以使用不同的环境变量来区分不同的环境，具体就是在API前添加环境变量值，从而请求不同环境下的接口
// 然后就可以用环境变量来替换 axios 中的 baseURL，从而实现不同环境下的接口请求。

// 创建实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API, // api 的 base_url
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
  // 响应成功后回调
  function (response) {
    "use strict";
    // 对响应数据做点什么
    // 比如：根据响应状态码，做不同的响应处理
    // console.log(response);
    const data = response.data;
    if (data.resCode === 0) {
      return Promise.resolve(data); // 返回接口相应成功的时的Promise对象
    } else {
      ElMessage.success(data.message);
      return Promise.reject(data); // 返回接口响应的时的Promise对象
    }
  },
  // 响应失败后回调
  function (error) {
    "use strict";
    // 对响应错误做点什么
    // 比如：根据响应状态码，做不同的响应处理
    console.log(error);
    const errorData = JSON.parse(error.request.response); // 将String类型的JSON对象转换为JSON对象
    // 判断响应的后端数据中是否有message属性
    if (errorData.message) {
      ElMessage({
        message: errorData.message,
        type: "error",
      });
    }
    return Promise.reject(errorData); // 返回接口响应失败的时的Promise对象
  }
);

// 导出 service，此时可将全局配置的 axios 从 main.js 中移除
export default service;
