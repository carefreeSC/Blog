// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import home from './components/home.vue' // 正确相对路径
import '../style/index.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('home', home) // 全局注册组件
  },
}

