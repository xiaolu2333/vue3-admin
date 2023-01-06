<template>
  <svg class="svg-class" :class="svgClassName" aria-hidden="true">
    <use href="#icon-home"></use>
  </svg>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SvgIconIndex",

  // 接受父组件传递的 props 参数，控制图标样式
  props: {
    iconName: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    // 使用 props 参数拼接 svg 图标的 class 属性名
    const svgClassName = ref(props.className);
    return { svgClassName };
  },
};
</script>

<style scoped>
.svg-class {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
