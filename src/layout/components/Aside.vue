<template>
  <div class="logo-container">
    <img class="logo" src="../../assets/images/logo.png" alt="管理后台logo" />
  </div>
  <el-menu
    :collapse="collapse"
    :default-active="$route.path"
    background-color="#344a5f"
    text-color="#fff"
    active-text-color="#ffffff"
    router
  >
    <template v-for="item in routers" :key="item.path">
      <template v-if="!item.hidden">
        <!-- 只有一个二级菜单的一级菜单 -->
        <template v-if="hasOnlyOneChild(item.children)">
          <el-menu-item :index="item.children[0].path">
            <svg-icon
              :icon-name="item.meta.icon"
              class-name="aside-menu-svg"
            ></svg-icon>
            <template #title>
              {{ item.children[0].meta && item.children[0].meta.title }}
            </template>
          </el-menu-item>
        </template>
        <!-- 有多个二级菜单的一级菜单 -->
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
              <span>{{ item.meta && item.meta.title }}</span>
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
import { reactive, toRefs, computed } from "vue";
// 导入 vue-router 路由实例对象
import { useRouter } from "vue-router";
import { useStore } from "vuex";

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

    // 将 path 与 el-menu 的 index 属性进行绑定（采用方案一）
    // 方案一：直接在模板中使用 $route.path
    // :default-active="$route.path"
    // // 方案二：使用 useRoute 获取当前路由对象的 path 属性，并通过 computed 计算属性返回
    // const { path } = useRoute();
    // const currentPath = computed(() => {
    //   console.log("path:", path);
    //   return path;
    // });

    const store = useStore();
    const data = reactive({
      logo: require("@/assets/images/logo.png"), // @ 表示 src 目录，会通过 require() 导入资源，为了防止打包后因为解释错误而报错，就使用相对路径来引入图片
      collapse: computed(() => store.state.app.collapse), // 侧边栏是否折叠，依赖于使用 computed 计算属性监听的 vuex store 中的 collapse 属性
    });

    return {
      routers,
      hasOnlyOneChild,
      ...toRefs(data), // 将 data 中的各个数据转换为响应式数据
    };
  },
};
</script>

<style lang="scss" scoped>
.logo {
  padding: 20px;
  border-bottom: 1px solid #2d4153;
  img {
    margin: auto;
  }
}

// 选中的菜单项会被 elementplus 添加 is-active class
.is-active {
  background-color: #3a8ee6 !important;
}

// 被展开的菜单项会被 elementplus 添加 is-opened class
// 有多个二级菜单的一级菜单展开后 class="el-sub-menu is-active is-opened"
//.el-sub-menu.is-active.is-opened{
.is-opened{
  .el-sub-menu__title {
    background-color: #f56c6c;
  }
}

.aside-menu-svg {
  margin-right: 5px;
  margin-top: -2px;
  font-size: 18px;
}
</style>
