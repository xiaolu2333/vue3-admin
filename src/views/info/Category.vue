<template>
  <el-button type="primary">添加一级分类</el-button>
  <hr class="spacing-hr" />
  <el-row>
    <el-col :span="10">
      <div class="category-list">
        <el-tree
          :data="data.treeData"
          :props="data.defaultProps"
          @node-click="handleNodeClick"
          default-expand-all
        ></el-tree>
      </div>
    </el-col>
    <el-col :span="14">输入区</el-col>
  </el-row>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "InfoCategory",
  setup(props) {
    const data = reactive({
      // 模拟树菜单数据
      treeData: [
        {
          text: "一级分类 1",
          children: [
            {
              text: "二级分类 1-1",
              children: [
                {
                  text: "三级分类 1-1-1",
                },
                {
                  text: "三级分类 1-1-2",
                },
              ],
            },
            {
              text: "二级分类 1-2",
              children: [
                {
                  text: "三级分类 1-2-1",
                },
                {
                  text: "三级分类 1-2-2",
                },
              ],
            },
          ],
        },
        {
          text: "一级分类 2",
          children: [
            {
              text: "二级分类 2-1",
            },
            {
              text: "二级分类 2-2",
            },
          ],
        },
        {
          text: "一级分类 3",
          children: [
            {
              text: "二级分类 3-1",
            },
            {
              text: "二级分类 3-2",
            },
          ],
        },
      ],

      // 树形菜单中默认的节点的名称，要与 treeData 中的 text 和 children 对应
      defaultProps: {
        children: "children", // children 属性指定子树为节点对象的某个属性值
        label: "text", // label 属性指定节点标签为节点对象的某个属性值
      },
    });

    // 节点点击事件
    const handleNodeClick = () => {};

    return {
      data,
      handleNodeClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.spacing-hr {
  border: none;
  border-top: 1px solid #e9e9e9;
  margin: 10px 0;
}
</style>
