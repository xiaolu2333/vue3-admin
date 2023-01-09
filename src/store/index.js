/* jshint esversion: 6 */

// // 创建一个 store 实例
// export default createStore({
//   state: {}, // 在这里放置所有的状态
//   getters: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });

import { createStore } from "vuex";

import app from "./modules/app";
export default createStore({
  // 有很多 state 时可选择模块化 state
  modules: {
    app,
  },
});
