// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import home from './components/Home.vue' // 正确相对路径

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('home', home) // 全局注册组件
  }
}