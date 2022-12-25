<template>
  <div id="login">
    <div class="form-wrap">
      <ul class="manu-tab">
        <li
          :class="{ current: current_menu === item.type }"
          v-for="item in tab_manu"
          :key="item.type"
          @click="toggleMenu(item.type)"
        >
          {{ item.label }}
        </li>
      </ul>
      <el-form>
        <el-form-item>
          <label class="form--label">用户名</label>
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item>
          <label class="form--label">密码</label>
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
        <el-form-item v-if="current_menu === 'register'">
          <label class="form--label">确认密码</label>
          <el-input type="password" v-model="confirm_password"></el-input>
        </el-form-item>
        <el-form-item>
          <label class="form--label">验证码</label>
          <el-row :gutter="10">
            <el-col :span="20">
              <el-input v-model="code"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <label class="form--label"></label>
          <el-button type="primary" class="el-button-block" @click="submit"
            >登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  name: "login",
  setup(props) {
    // 必须使用 reactive 构造响应式数据（data本身）
    const data = reactive({
      username: "",
      password: "",
      confirm_password: "",
      code: "",
      tab_manu: [
        { type: "login", label: "登录" },
        { type: "register", label: "注册" },
      ],
      current_menu: "login",
    });
    // 使用 toRefs 批量将响应式数据data的所有属性转为响应式数据
    const dataItem = toRefs(data);
    const toggleMenu = (type) => {
      data.current_menu = type;
    };

    return {
      toggleMenu,
      ...dataItem, // 解包，将响应式数据data的所有属性展开
    };
  },
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh; // 100% viewport height
  background-color: #ffffff;
  padding: 20px;
}

.form-wrap {
  // 水平垂直居中
  position: absolute; // 相对于父元素定位
  top: 50%; // 50% 父元素高度
  left: 50%; // 50% 父元素宽度
  //margin: auto; // 块元素水平居中
  transform: translate(-50%, -50%); // 位移，相对于自身宽高的 50%
  width: 400px;
  padding: 100px 20px; // 100px top and bottom, 20px left and right
  background-color: #a2cdf9;
  border-radius: 5px; // 圆角
}

.manu-tab {
  text-align: center;

  li {
    display: inline-block; // 块级内联元素，可以设置宽高。让li元素在一行显示
    padding: 10px 24px;
    margin: 0 10px;
    color: aliceblue;
    font-size: 14px;
    border-radius: 5px; // 圆角
    cursor: pointer; // 鼠标悬停时显示手型
    &.current {
      // &表示当前元素。设置当前选中的li元素的样式
      background-color: #fff;
      color: #409eff;
    }
  }
}

.form--label {
  display: block;
  margin: 10px 2px; // 上下间距10，左右间距2
  color: #ffffff;
  font-size: 14px;
}
</style>
