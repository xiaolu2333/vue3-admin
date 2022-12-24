/* jshint esversion: 6 */

const path = require("path");

// // 自动按需引入  element-plus ui 组件
// const AutoImport = require("unplugin-auto-import/webpack");
// const Components = require("unplugin-vue-components/webpack");
// const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === "production" ? "" : "./",

  // 输出文件目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",

  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,

  /** vue3.0内置了webpack所有东西，
   * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   **/
  chainWebpack: (config) => {},
  configureWebpack: {
    // plugins: [
    //   AutoImport({
    //     resolvers: [ElementPlusResolver()],
    //   }),
    //   Components({
    //     resolvers: [ElementPlusResolver()],
    //   }),
    // ],
  },

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 是否开启 CSS source maps
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        // sass-loader version < 8
        // data: `@import "./src/styles/main.scss";`         // 引入全局样式，配置样式主入口文件
        // sass-loader version = 8
        // prependData: `@import "./src/styles/main.scss";`
        // sass-loader version >= 10
        additionalData: `@import "./src/styles/main.scss";`,
      },
      // webpack4 之后，css-loader 默认使用了 css modules。关闭这里。
      // requireModuleExtension: true // 启用 CSS modules for all css / pre-processor files.
    },
  },

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,

  /**
   *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},

  // webpack-dev-server 相关配置
  devServer: {},

  /**
   * 第三方插件配置
   */
  pluginOptions: {},
};
