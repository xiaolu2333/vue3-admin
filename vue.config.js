/* jshint esversion: 6 */

const path = require("path");
const ElementPlus = require("unplugin-element-plus/webpack").default;

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
    plugins: [
      // unplugin-element-plus 0.4.1 版本这样用，代替了之前的 ElementPlus()
      require("unplugin-element-plus/webpack")({
        // options
      }),
    ],
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
  devServer: {
    open: true, // 配置自动启动浏览器，在编译完成之后自动打开浏览器访问
    host: "0.0.0.0", // 指定使用一个 host 让外界可访问。默认是 localhost
    port: 8080, // 端口地址 8080
    proxy: {
      // 配置跨域
      "/devApi": {
        target: "http://v3.web-jshtml.cn/api", // 必填。这里后台的地址模拟的;应该填写你们真实的后台接口
        changeOrigin: true, // 必填。允许跨域。
        ws: false, // 不启用websockets。
        secure: false, // 不https接口。
        pathRewrite: {
          "^/devApi": "", // 重写路径。这里理解成用"/devApi"代替target里面的地址，后面组件中我们调接口时直接用devApi代替即可。
        },
      },
    },
  },

  /**
   * 第三方插件配置
   */
  pluginOptions: {},
};
