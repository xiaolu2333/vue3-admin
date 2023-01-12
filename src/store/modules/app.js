/* jshint esversion: 6 */

// 本模块的 state 状态数据：
import { Login } from "@/api/account";
import { getToken, getUserName, setToken, setUserName } from "@/utils/cookies";

const state = {
  // 从 sessionStorage 中获取侧边栏的折叠状态，如果没有则默认为 false 不折叠
  collapse: JSON.parse(sessionStorage.getItem("aside-collapse")) || false,
  token: "" || getToken(), // 刷新页面后，从 cookies 中获取 token
  username: "" || getUserName(),
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
  // 设置菜单收展状态
  SET_ASIDE_COLLAPSE(state) {
    state.collapse = !state.collapse;
    // 在更新状态后，将状态保存到本地 sessionStorage 存储中
    sessionStorage.setItem("aside-collapse", JSON.stringify(state.collapse));
  },

  // 设置 token
  SET_TOKEN(state, value) {
    // 将 token 保存到 state 中
    state.token = value;
    // 将 token 保存到 cookie 中
    value && setToken(value);
  },
  // 设置 username
  SET_USERNAME(state, value) {
    state.username = value;
    value && setUserName(value);
  },

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

  // 异步登录接口
  LoginAction(context, responseData) {
    return new Promise((resolve, reject) => {
      // 调用登录接口
      Login(responseData)
        .then((response) => {
          let data = response.data;
          // 将 token 和 username 保存到 state 中
          context.commit("SET_TOKEN", data.token);
          context.commit("SET_USERNAME", data.username);
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
