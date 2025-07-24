import { DefaultTheme } from 'vitepress';
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
export const sidebar: DefaultTheme.Sidebar = {
    // /column/Algothm/表示对这个文件夹下的所有md文件做侧边栏配置
    '/': [
        {
            text: '个人简历',
            items: [

            ]
        },
        {
            text: '欢迎光临 ! ! !',
            items: [

            ]
        },
    ],
    '/travelNotes/': [
        // 第一部分
        {

            text: '所思·所想·所游',
            items: [
                {

                    text: '游-贵州（六人行）',
                    link: '/travelNotes/01'
                },
            ]
        },
    ],
    '/tech/': [
        {
            text: '持续更新/搬迁中 · · ·',
        },
        {
            text: '技术记错本',
            items: [
                {
                    text: '1.文本显示间隙空白',
                    link: '/tech/01'
                },
                {
                    text: '2.import导入问题',
                    link: '/tech/02'
                },
                {
                    text: '3.工厂热力图',
                    link: '/tech/03'
                },

            ]
        },
        {
            text: 'NodeJs',
            items: [
                {
                    text: '1.简介',
                    link: '/tech/node/01'
                },
            ]
        },
        {
            text: '可视化平台构建历程',
            items: [
                {
                    text: '1.基于Express + 原生HTML 构建的可视化平台 (一)',
                    link: '/tech/web/01'
                },
                {
                    text: '1.基于Express + 原生HTML 构建的可视化平台 (一)',
                    link: '/tech/web/02'
                }
            ]
        },
        {
            text: 'VitePress 个人博客搭建历程',
            items: [
                {
                    text: '1.前景提示',
                    link: '/tech/11'
                },
                {
                    text: '2.自定义页面组件',
                    link: '/tech/05'
                }, {
                    text: '3.markdown常用语法',
                    link: '/tech/06'
                }, {
                    text: '4.导航栏 nav 相关配置',
                    link: '/tech/07'
                }, {
                    text: '5.发布文章',
                    link: '/tech/08'
                }, {
                    text: '6.自定义VUE组件',
                    link: '/tech/09'
                }, {
                    text: '7.侧边栏自动生成',
                    link: '/tech/10'
                }
            ]
        },
    ]
}