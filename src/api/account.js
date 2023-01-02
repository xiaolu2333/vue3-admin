/* jshint esversion: 6 */

import service from "@/utils/request"; // 引入拦截器

/**
 * 用户注册
 * @param data {Object} 请求参数,包含用户名username,密码password,验证码code
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function Register(data) {
  "use strict"; // 严格模式，参数必须不能为 data = {}
  return service.request({
    method: "post",
    url: "/register/",
    data,
  });
}

/**
 * 用户登录
 * @param data {Object} 请求参数,包含用户名username,密码password
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function Login(data) {
  "use strict";
  return service.request({
    method: "post",
    url: "/login/",
    data,
  });
}
