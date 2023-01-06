// 获取当前 svg 目录下的所有 svg 文件
const context = require.context("./icon", false, /\.svg$/); // 制定目录，是否遍历子目录，匹配文件的正则
console.log(context);

// 解析 svg 文件名称
const requireAll = (requireContext) => {
  console.log(requireContext.keys());
  /* 输出：
    [
      "./home.svg",
      "./information.svg",
      "./user.svg"
    ]
  */
  return requireContext.keys().map(requireContext);
};

// 执行
const result = requireAll(context);
console.log(result);
/* 输出
  [
    "img/home.9147393e.svg",
    "img/information.84fa7fde.svg",
    "img/user.05d36b61.svg"
  ]
*/
