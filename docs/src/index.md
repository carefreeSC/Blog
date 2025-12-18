---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "逍遥竹"
  text: "Believe in yourself"
  tagline: every day will get better and better
  image:
      src: /image.png 
  actions:
    - theme: brand
      text: 了解 逍遥竹
      link: /markdown-examples
    - theme: alt
      text: 技术文档
      link: /tech/代码问题本/01
    - theme: alt
      text: 进入生活
      link: /旅游笔记/01
features:
  - title: WEB前端
    icon: 😎
    details: 职业程序猿，日常搬砖，欢迎来撩
  - title: 职业技能
    icon: 📖
    details: -原生= html+js+css+Jq <br> -css =scss + tailwind <br>-框架 = Vue2+Vue3+react+nextJs <br> -服务端 = nodeJs + py(了解) <br> -数据库 = Mysql
  - title: 项目经验
    icon: 📽️
    details: -Sass平台：主导前端0-1 <br> -低代码平台：先后参与三款中规模平台研发 <br>-业务逻辑：MES、ERP、中控系统
  - title: 喜爱运动
    icon: 💦
    details: 热爱篮球、台球、羽毛球、乒乓球等一系列球类运动
  - title: 记录生活
    icon: 🤔
    details: 博客初衷，记录游记，记录技术，记录生活
  - title: 联系方式
    icon: ✉️
    details: 请联系邮箱：CarefreeSC@outlook.com
---
<script setup>
import home from '../.vitepress/theme/components/home.vue';
</script>

<home />
