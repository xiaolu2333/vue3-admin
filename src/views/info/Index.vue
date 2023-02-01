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
              v-for="item in data.categoryOptions"
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
  <el-table
    ref="table"
    border
    :data="data.tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      type="selection"
      width="40"
      align="center"
      header-align="center"
    ></el-table-column>
    <el-table-column
      prop="name"
      label="标题"
      width="200"
      align="center"
      header-align="center"
    ></el-table-column>
    <el-table-column
      prop="address"
      label="类别"
      :table-layout="tableLayout"
      align="center"
      header-align="center"
    ></el-table-column>
    <el-table-column
      prop="date"
      label="发布时间"
      width="200"
      align="center"
      header-align="center"
    ></el-table-column>
    <el-table-column
      prop="date"
      label="操作"
      width="200"
      align="center"
      header-align="center"
    >
      <template #default="scope">
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row>
    <el-col :span="6">
      <el-button type="danger">批量删除</el-button>
    </el-col>
    <el-col :span="18">
      <el-pagination
        :current-page="data.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        :total="100"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        class="pull-right"
        size="small"
        background
      ></el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  name: "InfoIndex",
  setup(props, { root }) {
    // 实现表格列的 fixed 布局
    const tableLayout = ref("fixed");

    // 类别数据
    const data = reactive({
      currentPage: 1, // 当前页码
      category: 0, // 默认选项
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
      // 信息列表数据
      tableData: [
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1517 弄",
          date: "2016-05-02",
        },
        {
          name: "王小虎",
          address:
            "上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄",
          date: "2016-05-04",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          date: "2016-05-01",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          date: "2016-05-03",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1520 弄",
          date: "2016-05-02",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1521 弄普陀区金沙江路 1517 弄",
          date: "2016-05-04",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1522 弄",
          date: "2016-05-01",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1523 弄",
          date: "2016-05-03",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1524 弄",
          date: "2016-05-02",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1525 弄",
          date: "2016-05-04",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1526 弄",
          date: "2016-05-01",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1527 弄",
          date: "2016-05-03",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1528 弄",
          date: "2016-05-02",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1529 弄",
          date: "2016-05-04",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1530 弄",
          date: "2016-05-01",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1531 弄",
          date: "2016-05-03",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1532 弄",
          date: "2016-05-02",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1533 弄",
          date: "2016-05-04",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1534 弄",
          date: "2016-05-01",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1535 弄",
          date: "2016-05-03",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1536 弄",
          date: "2016-05-02",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1537 弄",
          date: "2016-05-04",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1538 弄",
          date: "2016-05-01",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1539 弄",
          date: "2016-05-03",
        },
      ],
    });

    // 列表多选事件
    const handleSelectionChange = (val) => {
      console.log(val);
    };
    // 页码事件
    const handleSizeChange = (val) => {
      console.log(val);
    };
    const handleCurrentChange = (val) => {
      console.log(val);
    };

    return {
      data,
      tableLayout,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
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
