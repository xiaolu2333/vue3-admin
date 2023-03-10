import { createRouter, createWebHashHistory } from "vue-router";

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
      icon: "home",
    },
    component: () => import("../layout/Index.vue"),
    children: [
      {
        path: "/console",
        name: "Console",
        meta: {
          title: "首页",
        },
        component: () => import("../views/console/Index.vue"),
      },
    ],
  },

  // Info
  {
    path: "/info",
    name: "Info",
    meta: {
      title: "信息管理",
      icon: "information",
    },
    component: () => import("../layout/Index.vue"),
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          title: "信息列表",
        },
        component: () => import("../views/info/Index.vue"),
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          title: "信息分类",
        },
        component: () => import("../views/info/Category.vue"),
      },

      {
        path: "/infoDetailed",
        name: "InfoDetailed",
        meta: {
          title: "信息详情",
        },
        component: () => import("../views/info/Detailed.vue"),
        hidden: true,
      },
    ],
  },

  // User
  {
    path: "/user",
    name: "User",
    meta: {
      title: "用户管理",
      icon: "user",
    },
    component: () => import("../layout/Index.vue"),
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          title: "用户列表",
        },
        component: () => import("../views/user/Index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
