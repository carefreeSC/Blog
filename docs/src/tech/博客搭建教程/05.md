# 关于vitePress的相关设计
前文已经描述了vitePress -> github pages 的搭建流程，接下来来看一下如何让我们的博客看起来更加个性化。如何去自定义页面组件...
## Home 首页设计
根目录下的index.md默认为系统的首页
<br>
首页有开发好的预板块：hero\features...
```js{4}
hero:
  name: "小吴 Awesome Project" //首页标题
  text: "A VitePress Site" //副标题
  tagline: My great project tagline //标题描述
  image: //图片
      src: /image.png //路径
      alt: "" //图片描述
  actions: //按钮
    - theme: brand //主题
      text: Markdown Examples //按钮文字
      link: /markdown-examples //按钮链接
    - theme: alt
      text: API Examples
      link: /api-examples
```
```js{4}
features: //按钮下方的卡片
  - title: Feature A //卡片标题
    icon: // 图标 直接复制emoji即可
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit //卡片内容
```
支持的emoji列表： :tada:
<br>
https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs