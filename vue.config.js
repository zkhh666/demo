
const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin")

function resolve(dir) {
    return path.join(__dirname, dir)
  }

// vue.config.js
module.exports = {
  productionSourceMap: false,

  //打包app时放开该配置
  //publicPath:'./',
  configureWebpack:{
    resolve: {
        alias: { //配置别名,修改后需要重新编译才能生效
            '@': resolve('src'),
        }
    }
  },
  chainWebpack: (config) => {
    //生产环境，开启js\css压缩
    if (process.env.NODE_ENV === 'production') {
        config.plugin('compressionPlugin').use(new CompressionPlugin({
          test: /\.js$|.\css|.\less/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        }))
    }

 
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          'primary-color': '#1890FF',
          'link-color': '#1890FF',
          'border-radius-base': '4px',
        },
        javascriptEnabled: true,
      }
    }
  },

  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        // 目标服务器
        target: 'http://172.19.1.64:8233', //请求本地 
        ws: false,
        changeOrigin: true
      },
    }
  },

  lintOnSave: undefined
}