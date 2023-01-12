/* jshint esversion: 6 */

import router from "./index";

import { getToken } from "@/utils/cookies";

// 全局前置路由导航守卫
router.beforeEach((to, from, next) => {
  // 路由导航到登录页
  if (
    // 检查用户是否已登录
    !getToken() &&
    // ❗️ 避免无限重定向
    to.name !== "Login"
  )
    next({ name: "Login" });
  else next();
});

// 全局后值路由导航守卫
router.afterEach((to, from) => {
  // console.log("全局后值路由导航守卫 to: ", to);
});
