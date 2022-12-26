/* jshint esversion: 6 */

/* 存放各种校验规则 */

// 校验邮箱
export function isEmail(value) {
  "use strict";
  let regEmail = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return regEmail.test(value);
}
// 校验密码
export function isPassword(value) {
  "use strict";
  let regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
  return regPassword.test(value);
}
// 校验验证码
export function isCode(value) {
  "use strict";
  let regCode = /^[a-z0-9]{6}$/;
  return regCode.test(value);
}
