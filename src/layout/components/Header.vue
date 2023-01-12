<template>
  <div class="header-wrap">
    <!--左侧-->
    <div class="wrap">
      <span class="menu-btn" @click="switchAsideCollapse">
        <!--iconName是 svg 文件名，className是 svg 样式类名-->
        <svg-icon iconName="menuBtn" className="icon-menu-svg"></svg-icon>
      </span>
    </div>
    <!--右侧-->
    <div class="wrap">
      <div class="user-info">
        <div class="face-info">
          <img src="../../assets/images/logo-min.png" :alt="username" />
          <span class="user-name">{{ username }}</span>
        </div>
        <div class="logout" @click="handleLogout">
          <svg-icon iconName="logout" className="icon-logout-svg"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { getCurrentInstance, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from 'element-plus'

import SvgIcon from "@/components/svgIcon/Index.vue";

export default {
  name: "LayoutHeader",
  components: { SvgIcon },
  setup() {
    const store = useStore();
    // 获取实例
    const instance = getCurrentInstance();
    // 获取消息总线
    const confirm = instance.appContext.config.globalProperties.$confirm;
    const message = instance.appContext.config.globalProperties.$message;
    const { replace } = useRouter(); // replace 跳转，不会留下历史记录，不会回退，类似于 window.location.replace

    /** 切换菜单状态 */
    const switchAsideCollapse = () => {
      store.commit("app/SET_ASIDE_COLLAPSE");
    };
    const username = ref(store.state.app.username);

    /** 使用封装好的公共API来登出用户 */
    const handleLogout = () => {
      confirm("确定要退出管理后台吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          store
            .dispatch("app/LogoutAction")
            .then((response) => {
              // if (response.code === 200)
              message({
                type: "success",
                message: response.message,
              });
              // 跳转到登录页面
              replace({
                name: "Login",
              });
            })
            .catch((error) => {
              message({
                type: "error",
                message: error.message,
              });
            });
        })
        .catch((error) => {
          message({
            type: "error",
            message: error.message,
          });
        });
    };

    return {
      switchAsideCollapse,
      username,
      handleLogout,
    };
  },
};
</script>

<style lang="scss" scoped>
.header-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-btn {
  cursor: pointer;
}

.icon-menu-svg {
  font-size: 24px;
}

.user-info {
  display: flex; // 弹性盒子模式
  align-items: center; // 子元素水平对齐
}

.face-info {
  span,
  img {
    display: inline-block;
    vertical-align: middle; // 水平居中
    cursor: pointer;
  }
  span {
    margin-left: 10px;
  }
}

.logout {
  display: flex;
  align-items: center;
  justify-content: center; // 子元素垂直对齐
  width: 75px;
  height: 75px;
  cursor: pointer;
}

.icon-logout-svg {
  font-size: 24px;
}
</style>
