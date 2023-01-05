// 获取当前 svg 目录下的所有 svg 文件
const context = require.context("./icon", false, /\.svg$/); // 制定目录，是否遍历子目录，匹配文件的正则
console.log(context);

// 解析 svg 文件名称
const requireAll = (requireContext) => {
  console.log(requireContext.keys());
  return requireContext.keys().map(requireContext);
};

// 执行
requireAll(context);
