<template>
  <!--添加 router 属性以激活菜单，将 :index 属性的值作为路径进行跳转-->
  <el-menu
    default-active="1"
    background-color="#344a5f"
    text-color="#fff"
    active-text-color="#ffffff"
    router
  >
    <template v-for="item in routers" :key="item.path">
      <template v-if="!item.hidden">
        <!-- 一级菜单 -->
        <template v-if="hasOnlyOneChild(item.children)">
          <el-menu-item :index="item.children[0].path">
            <svg-icon
              :icon-name="item.children[0].meta.icon"
              class-name="aside-menu-svg"
            ></svg-icon>
            <template #title>
              {{ item.children[0].meta && item.children[0].meta.title }}
            </template>
          </el-menu-item>
        </template>

        <!-- 子级菜单 -->
        <template v-else>
          <el-sub-menu
            v-if="item.children && item.children.length > 0"
            :index="item.path"
          >
            <template #title>
              <svg-icon
                :icon-name="item.meta.icon"
                class-name="aside-menu-svg"
              ></svg-icon>
              {{ item.meta && item.meta.title }}
            </template>
            <template v-for="child in item.children" :key="child.path">
              <el-menu-item v-if="!child.hidden" :index="child.path">
                {{ child.meta && child.meta.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </template>
  </el-menu>
</template>

<script>
// 导入 vue-router 路由实例对象
import { useRouter } from "vue-router";

import SvgIcon from "@/components/svgIcon/Index.vue";

export default {
  name: "LayoutAside",
  components: { SvgIcon },
  setup() {
    // 获取路由实例对象的配置项
    const { options } = useRouter();
    const routers = options.routes;

    // 判断一级路由是否只有一个子路由，如果只有一个子路由，则将该子路由作为一级路由渲染
    const hasOnlyOneChild = (children) => {
      // 不存在子路由
      if (!children) return false;
      // 过滤路由中的 hidden 属性为 true 的路由
      const filterChildren = children.filter((item) => {
        return item.hidden ? false : true;
      });

      // 如果过滤后的子路由只有一个，则返回 true
      if (filterChildren.length === 1) {
        return true;
      }
      // 否则返回 false
      return false;
    };

    return {
      routers,
      hasOnlyOneChild,
    };
  },
};
</script>

<style scoped>
.aside-menu-svg {
  margin-right: 5px;
  margin-top: -2px;
  font-size: 18px;
}
</style>
