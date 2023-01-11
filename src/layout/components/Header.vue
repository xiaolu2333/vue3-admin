<template>
  <div class="header-wrap">
    <div class="wrap">
      <span class="menu-btn">
        <!--iconName是 svg 文件名，className是 svg 样式类名-->
        <svg-icon iconName="menuBtn" className="icon-menu-svg"></svg-icon>
      </span>
    </div>
    <div class="wrap">用户头像</div>
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
</style>
