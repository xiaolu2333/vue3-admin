/* jshint esversion: 6 */

// 本模块的 state 状态数据：
import { Login } from "@/api/account";

const state = {
  collapse: false, // 导航栏收缩状态
  // count: 100,
  // text: "Hello Vuex",
};

// 在这里可计算有的状态而不影响原始状态
const getters = {
  // getCount: (state) => {
  //   return state.count + 10;
  // },
  //
  // getText: (state) => {
  //   return state.text + "!";
  // },
};

// 用于改变 state 状态的方法
const mutations = {
  // SET_COUNT: (state, payload) => {
  //   state.count = payload;
  // },
  //
  // SET_TEXT: (state) => {
  //   state.text = "Hello World!";
  // },
};
const actions = {
  // // 3，通过参数解构的方式获取 commit 方法
  // update_count({ commit }, payload) {
  //   // 4，可以在需要调用 commit 很多次的时候，简化代码
  //   commit("SET_COUNT", payload);
  // },
  //
  // // 1，接受一个与 store 实例具有相同方法和属性的 context 对象，以及一个可选的 payload
  // update_text(context, payload) {
  //   console.log(context);
  //   // 2，因此可以调用 context.commit 提交一个 mutation 来间接修改状态，或者通过 context.state 和 context.getters 来获取 state 和 getters。
  //   context.commit("SET_TEXT");
  // },

  LoginAction(context, responseData) {
    return new Promise((resolve, reject) => {
      // 调用登录接口
      Login(responseData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true, // 开启命名空间，防止命名冲突
  state,
  getters,
  mutations,
  actions,
};
