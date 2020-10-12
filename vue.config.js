const path = require('path'); // 引入路径
const FileManagerPlugin = require('filemanager-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',

  devServer: {
    host: '0.0.0.0',
    // proxy: {
      // '/api': {
      //   target: 'http://192.168.2.199:8190', // 开发使用
      //   changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      //   pathRewrite: {'^/api': ''} // 这里重写路径
      // }
    // }
  },

  pages: {
    index: {
      // page 的入口
      entry: 'src/main.ts',
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '浏览器标题'
    }
  },

  lintOnSave: true,

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@img', resolve('src/assets/image'))
      .set('@css', resolve('src/assets/style'))
      .set('@com', resolve('src/components'))
      .set('@sys', resolve('src/systemConfig'))
      .set('@api', resolve('src/api/index.ts'))
  },

  configureWebpack: config => {  //webpack的相关配置在这里
    if (process.argv.includes('NEED_ZIP')) {
      return {
        plugins: [
          new FileManagerPlugin({  //初始化 filemanager-webpack-plugin 插件实例
            onEnd: {
              delete: [   //首先需要删除项目根目录下的dist.zip
                './dist.zip',
              ],
              archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
                {source: './dist', destination: './dist.zip'},
              ]
            }
          })
        ]
      }
    }
  }
}
