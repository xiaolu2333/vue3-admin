/* jshint esversion: 6 */

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// // 全局完整导入 element-plus ui
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
// // 创建实例
// const app = createApp(App);
// // 实例化
// app.use(store).use(router).use(ElementPlus).mount("#app");

// 手动按需导入 element-plus ui
import ElementUI from "@/plugins/elementui";
// import "element-plus/dist/index.css";
createApp(App).use(store).use(router).use(ElementUI).mount("#app");
