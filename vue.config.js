const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: true,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/search': {
          target: "http://wallpaper.apc.360.cn",
          changeOrigin: true,             // 是否跨域
          pathRewrite: {                  // 路径重置
              '^/search': ''
          }
      },
      '/360hot': {
          target: "http://openbox.mobilem.360.cn",
          changeOrigin: true,             // 是否跨域
          pathRewrite: {                  // 路径重置
              '^/360hot': ''
          }
      },
      '/360': {
          target: "http://cdn.apc.360.cn",
          changeOrigin: true,             // 是否跨域
          pathRewrite: {                  // 路径重置
              '^/360': ''
          }
      },
    }
  },

})
