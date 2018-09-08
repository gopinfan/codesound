module.exports = {
    title: '代码之声',
    description: '代码的声音和窗外的雨声一样美妙',
    base: '/codesound/',
    themeConfig: {
        nav: [
            {text: 'VuePress', link: '/vuepress/'},
            {text: 'Git', link: '/git/'},
            {text: 'Laravel', link: '/laravel/'},
        ],
        sidebar: {
            '/laravel/': [
                {
                    collapsable: false,
                    children: [
                        '/laravel/environment',
                        '/laravel/create-project',
                        '/laravel/deployment'
                    ]
                }
            ]
        },
        sidebarDepth: 2,
        displayAllHeaders: true,
        lastUpdated: "最后更新",
        repo: 'gopinfan/codesound',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '改善此页面'
    }
}