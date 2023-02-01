<template>
  <el-button type="primary">添加一级分类</el-button>
  <hr class="spacing-hr">
  <el-row>
    <el-col :span="10">树形菜单</el-col>
    <el-col :span="14">输入区</el-col>
  </el-row>
</template>

<script>
export default {
  name: "NewsCategory",
};
</script>

<style lang="scss" scoped>
.spacing-hr {
  border: none;
  border-top: 1px solid #e9e9e9;
  margin: 10px 0;
}
</style>
