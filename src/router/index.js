import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

const routes = [
  // /
  {
    path: "/",
    redirect: "Login",
    hidden: true, // 用于隐藏layout中的导航
  },

  // Login
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/account/Login.vue"),
    hidden: true, // 用于隐藏layout中的导航
  },

  // Home
  {
    path: "/home",
    name: "Home", // 命名路由。这样我们就可以在任何组件中使用 $router.push({ name: 'Home' }) 来导航到这个路由，或者使用 <router-link :to="{ name: 'Home' }">Home</router-link> 来创建一个指向这个路由的链接
    meta: {
      title: "控制台",
    },
    component: () => import("../layout/index.vue"),
  },

  // News
  {
    path: "/news",
    name: "News",
    meta: {
      title: "新闻管理",
    },
    component: () => import("../layout/index.vue"),
  },

  // User
  {
    path: "/user",
    name: "User",
    meta: {
      title: "用户管理",
    },
    component: () => import("../layout/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
