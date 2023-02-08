<template>
  <el-form label-width="150px">
    <el-form-item label="信息类别">
      <el-select v-model="data.category" placeholder="请选择">
        <el-option
          v-for="item in data.categoryOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="信息标题">
      <el-input v-model="data.title"></el-input>
    </el-form-item>
    <el-form-item label="信息图片"></el-form-item>
    <el-form-item label="发布日期"></el-form-item>
    <el-form-item label="信息内容"></el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "InfoDetailed",
  setup(props) {
    const data = reactive({
      imageURL: "",
      category: "",
      title: "",
      date: "",
      categoryOptions: [
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
    })

    return {
      data
    };
  }
};
</script>

<style lang="scss" scoped></style>
