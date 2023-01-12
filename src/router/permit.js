/* jshint esversion: 6 */

import router from "./index";

import { getToken } from "@/utils/cookies";

// 全局前置路由导航守卫
router.beforeEach((to, from, next) => {
  console.log("全局前置路由导航守卫 to: ", to);
  // 如果 token 不存在，则跳转到登录页
  if (!getToken()) {
    next("/login"); // 回报错，造成所谓白屏问题。
    // [Vue Router warn]: Detected an infinite redirection in a navigation guard when going from "/" to "/login".
    // Aborting to avoid a Stack Overflow. This will break in production if not fixed.
  }
});

// 全局后值路由导航守卫
router.afterEach((to, from) => {
  console.log("全局后值路由导航守卫 to: ", to);
});
