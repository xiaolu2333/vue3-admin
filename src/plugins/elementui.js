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
  ElMenu,
  ElMenuItem,
  ElIcon,
  ElMessageBox,
  ElSelect,
  ElTable,
  ElPagination,
  ElConfigProvider,
  ElTree,
  ElUpload,
  ElDatePicker,
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
  app.use(ElMenu);
  app.use(ElMenuItem);
  app.use(ElIcon);
  app.use(ElMessageBox);
  app.use(ElSelect);
  app.use(ElTable);
  app.use(ElPagination);
  app.use(ElConfigProvider);
  app.use(ElTree);
  app.use(ElUpload);
  app.use(ElDatePicker);
};
