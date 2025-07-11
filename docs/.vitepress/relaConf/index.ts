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
            text: 'Examples',
            items: [
                { text: 'Markdown Examples', link: '/markdown-examples' },
                { text: 'Runtime API Examples', link: '/exp' },
                { text: 'VitePress Home Design', link: '/col/01' }
            ]
        },
        {
            text: 'Eples',
            items: [
                { text: 'Mn Examples', link: '/markdown-examples' },
                { text: 'Runtimples', link: '/exp' },
                { text: 'VitePrsign', link: '/col/01' }
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
                }
            ]
        }
    ]
}