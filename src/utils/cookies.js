/* jshint esversion: 6 */

// js-cookie 是一个轻量级的操作 cookie 的插件，它可以方便的设置、获取、删除 cookie。
import Cookies from "js-cookie";

const tokenKey = "tokenAdmin";
// 设置 token
export function setToken(token) {
  return Cookies.set(tokenKey, token);
}
// 获取 token，如果没有则说明用户没有登录，返回空字符串
export function getToken() {
  return Cookies.get(tokenKey);
}
// 移除 token
export function removeToken() {
  return Cookies.remove(tokenKey);
}

const userNameKey = "username";
// 设置 userName
export function setUserName(userName) {
  return Cookies.set(userNameKey, userName);
}
// 获取 userName
export function getUserName() {
  return Cookies.get(userNameKey);
}
// 移除 userName
export function removeUserName() {
  return Cookies.remove(userNameKey);
}
