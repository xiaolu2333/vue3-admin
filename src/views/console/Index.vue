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
    // 方式一：赋值
    const store = useStore();
    console.log(store.state.app.count);
    // 方式二：解构
    const { state } = useStore();
    console.log(state.app.count);

    return {
      icon,
    };
  },
};
</script>

<style lang="scss" scoped></style>
