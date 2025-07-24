import { defineConfig } from 'vitepress'
import { nav } from './relaConf'
import { sidebar } from './relaConf'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/Blog/",
  title: "逍遥竹的博客",
  description: "Recoding live",
  srcDir: "src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/image.png',
    nav: nav,
    search: {
      provider: 'local'
    },
    sidebar: sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
})
