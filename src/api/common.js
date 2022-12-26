/* jshint esversion: 6 */

/* 封装公共请求接口 */
import instance from "@/utils/request";

/**
 * 获取验证码
 */
export function GetCode(data) {
  "use strict";
  return instance.request({
    method: "post",
    url: "/getCode/",
    data, // 即 ES6 中 data: data 的简写，需要在使用时传入该参数
  });
}
