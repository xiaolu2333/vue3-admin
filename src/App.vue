<template>
  <el-config-provider :locale="locale">
    <nav>
      <router-link to="/"></router-link>
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </nav>
    <router-view />
  </el-config-provider>
</template>

<script>
import { computed, ref } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";

export default {
  name: "App",
  setup() {
    // 切换 element-plus 组件库的语言为中文
    const language = ref("zh-cn");
    const locale = computed(() => (language.value === "zh-cn" ? zhCn : en));

    return {
      locale,
    };
  },
};
</script>

<style lang="scss">
#app {
}

a {
  margin: 10px;
}
</style>
