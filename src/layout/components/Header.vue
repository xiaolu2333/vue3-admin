<template>
  <div class="header-wrap">
    <!--左侧-->
    <div class="wrap">
      <span class="menu-btn">
        <!--iconName是 svg 文件名，className是 svg 样式类名-->
        <svg-icon iconName="menuBtn" className="icon-menu-svg"></svg-icon>
      </span>
    </div>
    <!--右侧-->
    <div class="wrap">
      <div class="user-info">
        <div class="face-info">
          <img src="../../assets/images/logo-min.png" alt="用户头像" />
          <span class="user-name">409619083@qq.com</span>
        </div>
        <div class="logout">
          <svg-icon iconName="logout" className="icon-logout-svg"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/svgIcon/Index.vue";

export default {
  name: "LayoutHeader",
  components: { SvgIcon },
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
