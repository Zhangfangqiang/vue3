const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/vuejs-essential/dist/' : '/'    //判断环境是否是生产环境如果是, 就在./dist目录中创建文件 这样我们在使用 GitHub Pages 时，才能正确地引用静态资源。如果你不需要 GitHub Pages 了，可以将其去掉。
})
