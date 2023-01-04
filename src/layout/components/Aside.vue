<template>
  <!--一级菜单-->
  <!--页面加载时默认激活菜单的 index，index 的值可以通过 el-menu-item 的 index 属性设置-->
  <el-menu
    default-active="1"
    background-color="#3290f4"
    text-color="#fd046"
    active-text-color="#fff"
  >
    <!--二级菜单-->
    <!--index 的值必须唯一-->
    <el-menu-item index="1">
      <template #title>控制台</template>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>信息管理</template>
      <el-menu-item index="1-1-1">信息列表</el-menu-item>
      <el-menu-item index="1-1-2">信息列表</el-menu-item>
      <el-sub-menu index="1-1-3">
        <template #title>信息管理</template>
        <el-menu-item index="1-1-3-1">信息列表</el-menu-item>
        <el-menu-item index="1-1-3-2">信息列表</el-menu-item>
        <el-menu-item index="1-1-3-3">信息列表</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>信息管理</template>
      <el-menu-item index="1-2-1">信息列表</el-menu-item>
      <el-menu-item index="1-2-2">信息列表</el-menu-item>
      <el-menu-item index="1-2-3">信息列表</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>信息管理</template>
      <el-menu-item index="1-3-1">信息列表</el-menu-item>
      <el-menu-item index="1-3-2">信息列表</el-menu-item>
      <el-menu-item index="1-3-3">信息列表</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
export default {
  name: "LayoutAside",
};
</script>

<style scoped></style>
