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
      <!--通过ref定义该表单的DOM引用，方便后面通过 $refs 来获取该表单的DOM-->
      <!--通过 :rules="data.form_rules" 绑定表单验证规则-->
      <el-form ref="account_form" :model="data.form" :rules="data.form_rules">
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
            <el-col :span="14">
              <el-input v-model="data.form.code"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button
                type="primary"
                @click="handlerGetCode"
                :disabled="data.code_btn_disabled"
                :loading="data.code_btn_loading"
                >{{ data.code_btn_text }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <label class="form--label"></label>
          <el-button
            type="primary"
            class="el-button-block"
            :disabled="data.submit_btn_disabled"
            :loading="data.submit_btn_loading"
            @click="submitForm"
            >{{ data.current_menu === "login" ? "登录" : "注册" }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onBeforeUnmount, reactive, ref } from "vue";

import { isEmail, isPassword, isCode } from "@/utils/validate";
import { GetCode, ErrorHttp } from "@/api/common";
import { Register } from "@/api/account";

export default {
  name: "login",
  setup(props) {
    // 获取当前组件实例
    const instance = getCurrentInstance();
    // console.log(instance);
    const message = instance.appContext.config.globalProperties.$message;
    const refs = instance.refs;

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

      // // 也能在输入验证码时激活“提交”按钮
      // data.submit_btn_disabled = !regCode;

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
      // 表单数据
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

      // 表单tab切换
      tab_manu: [
        { type: "login", label: "登录" },
        { type: "register", label: "注册" },
      ],
      // 当前tab
      current_menu: "login",

      // 获取验证码时的按钮交互状态
      code_btn_disabled: false, // 是否用验证码按钮
      code_btn_loading: false, // 是否显示验证码加载状态
      code_btn_text: "获取验证码", // 验证码按钮文本
      code_btn_timer: null, // 验证码按钮倒计时

      // ”提交“按钮
      submit_btn_disabled: true, // 是否启用”提交”按钮
      submit_btn_loading: false, // 是否显示”提交“按钮加载状态
    });

    // 验证码倒计时
    const countDown = (time) => {
      // 设置初始状态
      let second = time || 60; // 倒计时60秒
      data.code_btn_disabled = true; // 禁用按钮
      data.code_btn_loading = false; // 隐藏加载状态
      data.code_btn_text = `${second}秒后重新获取`; // 显示倒计时文本
      // 判断是否存在定时器，存在则清除
      if (data.code_btn_timer) {
        clearInterval(data.code_btn_timer);
      }
      // 开启定时器后每秒更新按钮文本
      data.code_btn_timer = setInterval(() => {
        second--;
        data.code_btn_text = `${second}秒后重新获取`;
        // 倒计时结束后重置按钮状态
        if (second <= 0) {
          clearInterval(data.code_btn_timer);
          data.code_btn_disabled = false; // 启用按钮
          data.code_btn_text = "重新获取验证码";
        }
      }, 1000);
    };
    /** 使用封装好的公共API来获取验证码 */
    const handlerGetCode = () => {
      // 表单数据
      const username = data.form.username;
      const password = data.form.password;
      const confirm_password = data.form.confirm_password;
      // 验证码按钮交互状态
      data.code_btn_loading = true;
      data.code_btn_text = "验证码发送中...";

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
      GetCode(requestData)
        .then((res) => {
          console.log(res);
          // 获取后端返回的数据
          const responseData = res; // 本来应该是 res.data，但是拦截器已经处理过了，它返回的就是 res.data，因此这里直接获取 then 回调方法中的 res

          // 激活“提交”按钮
          data.submit_btn_disabled = false;

          // 根据返回的状态码，判断当前用户名已存在
          if (responseData.resCode === 1024) {
            message.error({
              message: responseData.message,
              type: "error",
            });
            return false;
          }

          // element-ui 提示框提示验证码
          message.success({
            message: responseData.message,
            type: "success",
            duration: 4000,
          });
          // 倒计时
          countDown();
        })
        .catch((error) => {
          console.log(error);
          data.code_btn_loading = false;
          data.code_btn_text = "获取验证码";
        });

      // 错误请求测试
      // ErrorHttp(requestData)
      //   .then((res) => {
      //     console.log(res);
      //     countDown();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     data.code_btn_loading = false;
      //     data.code_btn_text = "获取验证码";
      //   });
    };
    // 销毁组件时清除定时器
    onBeforeUnmount(() => {
      clearInterval(data.code_btn_timer);
      /* 为什么要消除定时器？
      定时器会占用内存，所以在组件销毁时，需要清除定时器来释放内存。
      如果用户在倒计时过程中，关闭了页面，那么定时器仍然会继续执行，这时就需要在组件销毁时，清除定时器
      */
    });

    /** 提交表单 */
    const account_form = ref(null); // account_form 是一个 ref 对象，它的 current 属性指向真实的 DOM 元素，要与表单的 ref 属性一致绑定
    const submitForm = () => {
      account_form.value.validate((valid) => {
        if (valid) {
          alert("submit!");
          if (data.current_menu === "register") {
            register();
            // // 判断当前是登录还是注册
            // data.current_menu === "login" ? login() : register();
          }
        } else {
          console.log("error validate!!");
          return false;
        }
      });
    };

    // 重置表单
    const reset = () => {
      refs.form.resetFields(); // resetFields() 方法用于重置表单，是 element-ui 的表单组件的内置方法，可直接调用。重置后，表单的值会恢复到初始值，并移除校验结果
      // 切换回登录模式
      data.current_menu = "login";
      // 重置表单后，清除定时器
      data.code_btn_timer && clearInterval(data.code_btn_timer);
      // 重置表单后，重置验证码按钮的文本
      data.code_btn_text = "获取验证码";
      // 重置表单后，禁用验证码按钮
      data.code_btn_disabled = false;
      // 重置表单后，禁用“提交”按钮
      data.submit_btn_disabled = true;
      // 重置表单后，取消“提交”按钮的加载状态
      data.submit_btn_loading = false;
    };
    /** 注册 */
    const register = () => {
      const requestData = {
        username: data.form.username,
        password: data.form.password,
        code: data.form.code,
      };
      data.submit_btn_loading = true;
      Register(requestData)
        .then((res) => {
          // console.log(res);
          message({
            message: res.message,
            type: "success",
          });
          // 注册成功后，重置表单
          reset();
        })
        .catch((error) => {
          reset();
          console.log(error);
          data.submit_btn_loading = false;
        });
    };

    return {
      data,
      handlerGetCode,
      submitForm,
      account_form,
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
