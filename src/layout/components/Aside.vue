<template>
  <!--一级菜单-->
  <!--页面加载时默认激活菜单的 index，index 的值可以通过 el-menu-item 的 index 属性设置-->
  <el-menu
    default-active="1"
    background-color="#3290f4"
    text-color="#fd046"
    active-text-color="#fff"
  >
    <template v-for="item in routers" :key="item.path">
      <template v-if="!item.hidden">
        <!--如果路由没有子路由，则作为一级菜单被渲染-->
        <el-menu-item v-if="!item.children" :index="item.path">
          <template #title>{{ item.meta && item.meta.title }}</template>
        </el-menu-item>

        <!--否则继续将子路由作为子级菜单进行渲染-->
        <el-sub-menu v-else :index="item.path">
          <template #title>{{ item.meta && item.meta.title }}</template>
          <template v-for="child in item.children" :key="child.path">
            <template v-if="!child.hidden">
              <el-menu-item :index="child.path">
                {{ child.meta && child.meta.title }}
              </el-menu-item>
            </template>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>

<script>
// 导入 vue-router 路由实例对象
import { useRouter } from "vue-router";

export default {
  name: "LayoutAside",
  setup() {
    console.log(useRouter());

    // // 获取路由实例对象的配置项方式一
    // console.log(useRouter().getRoutes());

    // 获取路由实例对象的配置项方式二
    const { options } = useRouter();
    const routers = options.routes;
    /* routers 对象结构
    [
        {
            "path": "/",
            "name": "Home",
            "meta": {
                "title": "控制台"
            }
        },
        {
            "path": "/news",
            "name": "News",
            "meta": {
                "title": "信息管理"
            }
        },
        {
            "path": "/user",
            "name": "User",
            "meta": {
                "title": "用户管理"
            }
        },
        {
            "path": "/login",
            "name": "Login"
        }
    ]
    */
    console.log(routers);

    return {
      routers,
    };
  },
};
</script>

<style scoped></style>
