<template>
  <div>console index</div>
  <svg-icon :icon-name="icon"></svg-icon>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "UserIndex",

  setup(props) {
    const icon = ref("home");
    // console.log(icon);
    setTimeout(() => {
      icon.value = "user";
    }, 2000);

    // // 模块化后获取 vuex store
    // const store = useStore();
    // console.log("原始状态：", store.state.app.count);
    // store.commit("app/SET_COUNT", 0); // 提交 mutation 中的状态修改动作来修改状态。
    // console.log("更新后的状态：", store.state.app.count);
    // store.dispatch("app/update_count", 1); // 通过 action 中的状态修改动作需要通过 store.dispatch 方法触发（有模块化的，还必须指定模块名称）
    // console.log("新状态：", store.state.app.count);

    // 获取 sessionStore 对象
    const sessionStore = window.sessionStorage;
    // 在 sessionStore 中存储 JSON 数据
    sessionStore.setItem(
      "user",
      JSON.stringify({ name: "zhangsan", age: 18, sex: "男" })
    );
    // 从 sessionStore 中获取 JSON 数据
    const user = JSON.parse(sessionStore.getItem("user"));
    console.log(user);
    // 从 sessionStore 中删除 JSON 数据
    sessionStore.removeItem("user");
    // 在 sessionStore 中存储 Array 数据
    sessionStore.setItem("currentUser", JSON.stringify(["zhangsan", "lisi"]));
    // 从 sessionStore 中获取 Array 数据
    const currentUser = JSON.parse(sessionStore.getItem("currentUser"));
    console.log("currentUser:", currentUser);
    // 从 sessionStore 中删除 Array 数据
    sessionStore.removeItem("currentUser");

    return {
      icon,
    };
  },
};
</script>

<style lang="scss" scoped></style>
