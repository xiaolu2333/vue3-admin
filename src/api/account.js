/* jshint esversion: 6 */

import service from "@/utils/request"; // 引入拦截器

export function Register(data) {
  "use strict"; // 严格模式，参数必须不能为 data = {}
  return service.request({
    method: "post",
    url: "/register/",
    data,
  });
}
