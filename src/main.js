/* jshint esversion: 6 */

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 导入全局路由守卫
import "./router/permit";

// // 全局完整导入 element-plus ui
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
// // 创建实例
// const app = createApp(App);
// // 实例化
// app.use(store).use(router).use(ElementPlus).mount("#app");

const app = createApp(App);

// 手动按需导入 element-plus ui
import ElementUI from "@/plugins/elementui";
// // 全局导入 element-plus 的 icon 图标
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component);
// }

// 全局注册 SvgIcon 组件
import SvgIcon from "@/components/svgIcon/Index.vue";
// 批量导入 .svg 文件
import "@/components/svgIcon/svg.js";

app
  .component("svg-icon", SvgIcon)
  .use(store)
  .use(router)
  .use(ElementUI)
  .mount("#app");
