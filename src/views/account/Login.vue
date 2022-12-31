<template>
  <div id="login">
    <div class="form-wrap">
      <ul class="manu-tab">
        <li
          :class="{ current: data.current_menu === item.type }"
          v-for="item in data.tab_manu"
          :key="item.type"
          @click="data.current_menu = item.type"
        >
          {{ item.label }}
        </li>
      </ul>
      <!--通过 :rules="data.form_rules" 绑定表单验证规则-->
      <el-form ref="form" :model="data.form" :rules="data.form_rules">
        <!--prop 要与校验规则中的属性名一致-->
        <el-form-item prop="username">
          <label class="form--label">用户名</label>
          <el-input v-model="data.form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label class="form--label">密码</label>
          <el-input type="password" v-model="data.form.password"></el-input>
        </el-form-item>
        <el-form-item
          prop="confirm_password"
          v-if="data.current_menu === 'register'"
        >
          <label class="form--label">确认密码</label>
          <el-input
            type="password"
            v-model="data.form.confirm_password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label class="form--label">验证码</label>
          <el-row :gutter="10">
            <el-col :span="20">
              <el-input v-model="data.form.code"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="handlerGetCode"
                >获取验证码</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <label class="form--label"></label>
          <el-button
            type="primary"
            class="el-button-block"
            disabled
            @click="submit"
            >{{ data.current_menu === "login" ? "登录" : "注册" }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from "vue";

import { isEmail, isPassword, isCode } from "@/utils/validate";
import { GetCode } from "@/api/common";

export default {
  name: "login",
  setup(props) {
    const instance = getCurrentInstance();
    const message = instance.appContext.config.globalProperties.$message;

    // 自定义用户名校验
    const validate_username_rules = (rule, value, callback) => {
      let regEmail = isEmail(value);
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!regEmail) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    // 自定义密码校验
    const validate_password_rules = (rule, value, callback) => {
      let regPassword = isPassword(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!regPassword) {
        callback(new Error("请输入>=6并且<=20位的密码，包含数字、字母"));
      } else {
        callback();
      }
    };
    // 自定义确认密码校验
    const validate_confirm_password_rules = (rule, value, callback) => {
      // 如果是登录，不需要校验确认密码，默认通过
      if (data.current_menu === "login") {
        callback();
      }
      let regPassword = isPassword(value);
      // 获取“密码”
      const passwordValue = data.form.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!regPassword) {
        callback(new Error("请输入>=6并且<=20位的密码，包含数字、字母"));
      } else if (passwordValue && passwordValue !== value) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    // 自定义验证码校验
    const validate_code_rules = (rule, value, callback) => {
      let regCode = isCode(value);
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!regCode) {
        callback(new Error("请输入6位的验证码"));
      } else {
        callback();
      }
    };

    // 必须使用 reactive 构造响应式数据（data本身）
    const data = reactive({
      form: {
        username: "",
        password: "",
        confirm_password: "",
        code: "",
      },
      // 表单验证规则
      form_rules: {
        // 使用自定义用户名校验规则
        username: [{ validator: validate_username_rules, trigger: "change" }],
        password: [{ validator: validate_password_rules, trigger: "change" }],
        confirm_password: [
          { validator: validate_confirm_password_rules, trigger: "change" },
        ],
        code: [{ validator: validate_code_rules, trigger: "change" }],
      },
      tab_manu: [
        { type: "login", label: "登录" },
        { type: "register", label: "注册" },
      ],
      current_menu: "login",
    });

    // 使用封装好的公共API来获取验证码
    const handlerGetCode = () => {
      const username = data.form.username;
      const password = data.form.password;
      const confirm_password = data.form.confirm_password;

      // 校验用户名
      if (!isEmail(username)) {
        message.error({
          message: "邮箱不能为空 或 格式不正确", // 提示信息
          type: "error", // 提示主题类型，可选 success / warning / info / error
          duration: 2000, // 显示时间，单位毫秒，默认 3000
          showClose: true, // 是否显示关闭按钮，默认 false
          center: true, // 文字是否居中，默认 false
          dengerouslyUseHTMLString: false, // 是否将 message 属性作为 HTML 片段处理，默认 false
        });
        return false;
      }
      // 校验密码
      if (!isPassword(password)) {
        message.error({
          message: "密码不能为空 或 格式不正确",
          type: "error",
        });
        return false;
      }
      // 注册时，校验确认密码
      if (data.current_menu === "register" && password !== confirm_password) {
        message.error({
          message: "两次密码不一致",
          type: "error",
        });
        return false;
      }

      // 注册用户
      const requestData = {
        username: data.form.username, // "409019683@qq.com",
        module: "register", // login/register
      };
      GetCode(requestData).then((res) => {
        console.log(res.data);
        const responseData = res.data;
        // 根据返回的状态码，判断当前用户名已存在
        if (responseData.resCode === 1024) {
          message.error({
            message: responseData.message,
            type: "error",
          });
          return false;
        }
      });
    };

    return {
      data,
      handlerGetCode,
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
