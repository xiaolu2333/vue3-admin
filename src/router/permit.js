/* jshint esversion: 6 */

import router from "./index";

// 全局前置路由导航守卫
router.beforeEach((to, from, next) => {
  console.log("全局前置路由导航守卫 to: ", to);
});

// 全局后值路由导航守卫
router.afterEach((to, from) => {
  console.log("全局后值路由导航守卫 to: ", to);
});
