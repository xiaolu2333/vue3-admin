<template>
  <el-row>
    <el-col :span="18">
      <el-form :inline="true" label-width="80px">
        <el-form-item label="类别:">
          <el-select
            v-model="data.category"
            placehoder="请选择"
            class="width-160"
          >
            <el-option
              v-for="item in data.category_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字:">
          <el-select placeholder="请选择" class="width-100"></el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入关键字" class="width-180"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6">
      <el-button type="danger" class="pull-right">新增</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "InfoIndex",
  setup(props, { root }) {
    // 模拟接口数据
    const data = reactive({
      category: 0, // 默认选项
      category_options: [
        {
          label: "人工智能",
          value: 0,
        },
        {
          label: "区块链",
          value: 1,
        },
        {
          label: "云计算",
          value: 2,
        },
        {
          label: "大数据",
          value: 3,
        },
        {
          label: "物联网",
          value: 4,
        },
        {
          label: "移动开发",
          value: 5,
        },
        {
          label: "前端开发",
          value: 6,
        },
        {
          label: "后端开发",
          value: 7,
        },
        {
          label: "数据库",
          value: 8,
        },
        {
          label: "运维",
          value: 9,
        },
        {
          label: "测试",
          value: 10,
        },
        {
          label: "UI设计",
          value: 11,
        },
        {
          label: "游戏开发",
          value: 12,
        },
        {
          label: "其他",
          value: 13,
        },
      ],
    });
    return {
      data,
    };
  },
};
</script>

<style lang="scss" scoped>
.width-160 {
  width: 160px;
}

.width-100 {
  width: 100px;
}

.width-180 {
  width: 180px;
}
</style>
