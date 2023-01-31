<template>
  <el-container id="layout-container">
    <el-aside id="layout-aside" :width="collapse === true ? '80px' : '240px'">
      <LayoutAside />
    </el-aside>
    <el-container>
      <el-header id="layout-header" height="75px"><LayoutHeader /></el-header>
      <el-main id="layout-main"><LayoutMain /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import { computed } from "vue";
import store from "@/store";

import LayoutAside from "./components/Aside.vue";
import LayoutHeader from "./components/Header.vue";
import LayoutMain from "./components/Main.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",
  components: {
    LayoutAside,
    LayoutHeader,
    LayoutMain,
  },

  setup() {
    const collapse = computed(() => store.state.app.collapse);
    return {
      collapse,
    };
  },
};
</script>

<style lang="scss" scoped>
#layout-container {
  height: 100vh;
}

#layout-aside {
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
}

#layout-header {
  position: relative; // 配合 z-index 设置元素层级
  z-index: 10; // z-index 用于控制元素的堆叠顺序，值越大，元素越靠前
  background-color: $color-white;
  // 用 sass 语法中的混合指令定义可重用的样式
  //// 兼容不同浏览器
  //-webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 5); // Chrome Safari
  //-moz-box-shadow: 0 0 10px rgba(0, 0, 0, 5); // Firefox
  ////-ms-box-shadow: 0 0 10px rgba(0, 0, 0, 5); // IE
  //-o-box-shadow: 0 0 10px rgba(0, 0, 0, 5); // Opera
  //box-shadow: 0 0 10px rgba(0, 0, 0, 5); // CSS3 标准的阴影效果
  // 调用自定义的混合指令webkit
  @include webkit(box-shadow, 2px 2px 2px 1px rgba(0, 0, 0, 5));
}

#layout-main {
  background-color: #f5f5f5;
}
</style>
