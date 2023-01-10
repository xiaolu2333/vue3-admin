/* jshint esversion: 6 */

// 本模块的 state 状态数据：
const state = {
  count: 100,
  text: "Hello Vuex",
};

// 在这里可计算有的状态而不影响原始状态
const getters = {
  getCount: (state) => {
    return state.count + 10;
  },

  getText: (state) => {
    return state.text + "!";
  },
};

// 用于改变 state 状态的方法
const mutations = {
  SET_COUNT: (state, payload) => {
    state.count = payload;
  },

  SET_TEXT: (state) => {
    state.text = "Hello World!";
  },
};
const actions = {};

export default {
  namespaced: true, // 开启命名空间，防止命名冲突
  state,
  getters,
  mutations,
  actions,
};
