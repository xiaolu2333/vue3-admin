/* jshint esversion: 6 */

// 在这里手动导入需要的组件，避免造成 main.js 文件过于混乱
import {
  ElButton,
  ElSwitch,
  ElForm,
  ElFormItem,
  ElInput,
  ElCol,
  ElRow,
  ElMessage,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
} from "element-plus";
export default (app) => {
  "use strict";
  app.use(ElButton);
  app.use(ElSwitch);
  app.use(ElForm);
  app.use(ElFormItem);
  app.use(ElInput);
  app.use(ElCol);
  app.use(ElRow);
  app.use(ElMessage);
  app.use(ElContainer);
  app.use(ElHeader);
  app.use(ElAside);
  app.use(ElMain);
};
