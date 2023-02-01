<template>
  <div id="main-content">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "LayoutMain",
};
</script>

<style scoped>
#main-content {
  background-color: #fff;
  padding: 20px;
  /* 使内容区域的高度自适应父元素高度 */
  min-height: 100%;
  /* 忽略 padding 和 border 带来的 padding、border、width、height 叠加的高度宽度影响 */
  @include webkit(box-sizing, border-box);
}
</style>
