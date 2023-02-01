<template>
  <el-button type="primary">添加一级分类</el-button>
  <hr class="spacing-hr" />
  <el-row :gutter="20">
    <el-col :span="10">
      <div class="category-list">
        <el-tree
          :data="data.treeData"
          :props="data.defaultProps"
          @node-click="handleNodeClick"
          default-expand-all
          :expand-on-click-node="false"
        >
          <template #default="{ node, data }">
            <div class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="primary" class="button-mini">添加子级</el-button>
                <el-button type="primary" class="button-mini">修改</el-button>
                <el-button type="danger" class="button-mini">删除</el-button>
              </span>
            </div>
          </template>
        </el-tree>
      </div>
    </el-col>
    <el-col :span="14">
      <h4 class="column">创建分类</h4>
      <el-form label-width="100px">
        <el-form-item label="一级分类">
          <el-input placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-input placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-input placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
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

.custom-tree-node {
  /* 弹性盒布局等级 */
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding: 10px;
}

/* 使用穿透选择器，修改 el-tree-node__content 的高度 */
:deep(.el-tree-node__content) {
  height: auto;
  button {
    padding: 8px 12px;
    margin: 8px 3px;
    font-size: 12px;
    height: auto;
  }
}

.column {
  text-align: center;
  height: 44px;
  padding: 0 20px;
  margin-bottom: 30px;
  line-height: 44px;
  border-radius: 6px;
  background-color: #f3f3f3;
}

.el-form {
  width: 70%;
  /* 水平居中 */
  margin: 0 auto;
}
</style>
