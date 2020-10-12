const path = require('path'); // 引入路径
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
  }
}
