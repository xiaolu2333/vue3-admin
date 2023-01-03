<template>
  <el-container id="layout-container">
    <el-aside id="layout-aside" width="250px">侧边栏菜单</el-aside>
    <el-container>
      <el-header id="layout-header" height="75px">头部信息</el-header>
      <el-main id="layout-main">数据视图</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",
};
</script>

<style lang="scss" scoped>
#layout-container {
  height: 100vh;
}

#layout-aside {
  background-color: #75b0f1;
}

#layout-header {
  background-color: #52a1f4;
}

#layout-main {
  background-color: #f5f5f5;
}
</style>
