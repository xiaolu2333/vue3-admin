<template>
  <div>console index</div>
  <svg-icon :icon-name="icon"></svg-icon>
  <!--<el-icon :size="20" color="black"><AddLocation /></el-icon>-->
</template>

<script>
// // 局部注册 icon 图标
// import { AddLocation } from "@element-plus/icons-vue";

// // 载入全局 svg 图标
// import SvgIcon from "@/components/svgIcon/Index.vue";

import { ref } from "vue";

export default {
  name: "UserIndex",
  // components: { SvgIcon },
  // // 局部手动注册 icon 图标需要手动载入图标组件
  // components: {
  //   AddLocation,
  // },

  setup(props) {
    const icon = ref("home");
    // console.log(icon);
    setTimeout(() => {
      icon.value = "user";
    }, 2000);

    return {
      icon,
    };
  },
};
</script>

<style lang="scss" scoped></style>
