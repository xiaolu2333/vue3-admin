<template>
  <div>console index</div>
  <svg-icon :icon-name="icon"></svg-icon>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "UserIndex",

  setup(props) {
    const icon = ref("home");
    // console.log(icon);
    setTimeout(() => {
      icon.value = "user";
    }, 2000);

    // 模块化后获取 vuex store
    const store = useStore();
    console.log("原始状态：", store.state.app.count);
    console.log("getter 计算后的结果：", store.getters["app/getCount"]);

    return {
      icon,
    };
  },
};
</script>

<style lang="scss" scoped></style>
