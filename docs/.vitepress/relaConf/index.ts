import { DefaultTheme } from 'vitepress';
import article from '../sidebar-generated.json'
export const nav: DefaultTheme.NavItem[] = [
    {

        text: 'Home',
        link: '/' // 表示docs/index.md
    },
    {

        text: 'CareFree v1.0.0',
        items: [
            {

                text: '博客搭建',
                link: '/col/01'
            },
            {

                text: '所思·所想·所游',
                link: '/travelNotes/01'
            },


            {
                text: '前端小问题本',
                link: '/tech/01'
            }


        ]
    },
    {

        text: 'About Me',
        items: [
            {
                text: 'Github', link: 'https://github.com/carefreeSC/Blog'
            },
            {

                text: 'CSDN',
                link: 'https://blog.csdn.net/weixin_64463374?spm=1000.2115.3001.5343'
            },
            // {
            //     text: '个人简历',
            //     link: 'https://pzfqk98jn1.feishu.cn/wiki/space/7193915595975491587?ccm_open_type=lark_wiki_spaceLink'
            // }
        ]
    }
];
export const sidebar: DefaultTheme.Sidebar = article.sidebars