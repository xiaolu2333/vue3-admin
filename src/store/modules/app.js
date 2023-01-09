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
const mutations = {};
const actions = {};

export default {
  namespaced: true, // 开启命名空间，防止命名冲突
  state,
  getters,
  mutations,
  actions,
};
