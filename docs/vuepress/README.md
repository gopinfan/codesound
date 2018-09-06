---
sidebar: auto
sidebarDepth: 2
---

# VuePress 快速上手

## 安装

``` bash
# 推荐使用 yarn 安装
yarn add -D vuepress

# 或者使用 npm
# npm install -D vuepress

# 新建 docs 文件夹
mkdir docs

# 新建一个名为 README.md 的 markdown 文件
echo "# Hello World!" > docs/README.md

# 启动服务器
npx vuepress dev docs
```

在 `package.json` 文件里添加：

``` json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

运行本地开发服务器：

``` bash
yarn docs:dev

# 或者
# npm run docs:dev
```

生成静态 HTML 文件：

``` bash
yarn docs:build

# 或者
# npm run docs:build
```

## 配置文件

配置文件是 `.vuepress/config.js` 

``` js
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around'
}
```

## 主题

在 VuePress 中，目前自带了一个默认的主题，它是为技术文档而设计的。同时，默认主题提供了一些选项，让你可以去自定义导航栏（navbar）、 侧边栏（sidebar）和 首页（homepage） 等，详情请参见 [默认主题](https://vuepress.vuejs.org/zh/default-theme-config/) 。

VuePress 可以开发自定义主题，参考 [自定义主题](https://vuepress.vuejs.org/zh/guide/custom-themes.html)。

以下的设置选项都是基于默认主题。

### 首页

要开启首页，需在根级 `README.md` 的 `YAML front matter` 指定 `home: true`。

以下为首页常用的配置

``` yaml
---
home: true
heroImage: /hero.png
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

`YAML front matter` 之后的内容，会以普通的 markdown被渲染，插入到 `features` 的后面。

### 导航栏

#### 导航栏链接

通过 `themeConfig.nav` 设置导航栏链接

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}
```

#### 下拉列表式导航链接

当 `link` 为一个 `items` 数组时，显示下拉列表

``` js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/language/chinese' },
          { text: 'Japanese', link: '/language/japanese' }
        ]
      }
    ]
  }
}
```

通过嵌套的 `items` 给下拉列表设置分组

``` js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Group1', items: [/*  */] },
          { text: 'Group2', items: [/*  */] }
        ]
      }
    ]
  }
}
```

#### 禁用导航栏

设置 `themeConfig.navbar` 为 `false` 禁用所有页面的导航栏

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    navbar: false
  }
}
```

设置 `YAML front matter` 禁用指定页面的导航栏

``` yaml
---
navbar: false
---
```

### 侧边栏

#### 设置侧边栏

使用 `themeConfig.sidebar` 设置侧边栏

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      '/',
      '/guide/',
      ['/docs/', 'Documents']
    ]
  }
}
```

#### 侧边栏标题深度

`themeConfig.sidebarDepth` 配置所有页面标题嵌套深度

``` js
module.exports = {
  themeConfig: {
    sidebarDepth: 2
  }
}
```

使用 `YAML front matter` 为指定页面设置嵌套深度

``` yaml
---
sidebarDepth: 2
---
```

#### 显示所有页面的标题链接

设置 `themeConfig.displayAllHeaders` 为 `true` 显示所有页面的标题链接。

``` js
module.exports = {
  themeConfig: {
    displayAllHeaders: true // 默认值：false
  }
}
```

#### 禁用活动标题链接

``` js
module.exports = {
  themeConfig: {
    activeHeaderLinks: false, // 默认值：true
  }
}
```

#### 侧边栏分组

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',
        collapsable: false,
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ]
      }
    ]
  }
}
```

设置 `collapsable: false` 禁用折叠

#### 多个侧边栏

为不同的页面组来显示不同的侧边栏，首先，将你的页面文件组织成下述的目录结构

``` txt
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar/
   ├─ README.md
   ├─ three.md
   └─ four.md
```

然后配置侧边栏

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      '/foo/': [
        '',     /* /foo/ */
        'one',  /* /foo/one.html */
        'two'   /* /foo/two.html */
      ],

      '/bar/': [
        '',      /* /bar/ */
        'three', /* /bar/three.html */
        'four'   /* /bar/four.html */
      ],

      // fallback
      '/': [
        '',        /* / */
        'contact', /* /contact.html */
        'about'    /* /about.html */
      ]
    }
  }
}
```

::: warning
确保 fallback 侧边栏被最后定义。VuePress 会按顺序遍历侧边栏配置来寻找匹配的配置。
:::

#### 自动生成当前页面侧边栏

自动生成只包含当前页面标题（headers）链接的侧边栏，可以通过 `YAML front matter` 来实现：

``` yaml
---
sidebar: auto
---
```

通过配置在所有页面启用

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: 'auto'
  }
}
```

#### 禁用侧边栏

`YAML front matter` 禁用指定页面侧边栏

``` yaml
---
sidebar: false
---
```

### 搜索框

#### 内置搜索

设置 `themeConfig.search: false` 禁用默认搜索框，设置 `themeConfig.searchMaxSuggestions` 调整搜索结果数量

``` js
module.exports = {
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10
  }
}
```

::: tip 提示
内置搜索只会为页面的标题、h2 和 h3 构建搜索索引。
:::

#### Algolia 全文搜索

设置 `themeConfig.algolia` 启用 [Algolia 搜索](https://community.algolia.com/docsearch/)

``` js
module.exports = {
  themeConfig: {
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
    }
  }
}
```

::: warning 注意
Algolia 搜索需要先提供 `apiKey` 和 `indexName`，并提前将网站提交给他们创建索引。
:::

更多内容参考 [Algolia DocSearch 文档](https://github.com/algolia/docsearch#docsearch-options)

### 最后更新时间

通过 `themeConfig.lastUpdated` 选项来获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)。

``` js
module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
  }
}
```

`themeConfig.lastUpdated` 默认是关闭的，如果给定一个字符串，它将会作为前缀显示（默认值是：Last Updated）。

::: warning 使用须知
由于 `lastUpdated` 是基于 `git` 的, 所以你只能在一个基于 `git` 的项目中启用它。
:::

### 上 / 下一篇链接

上一篇和下一篇文章的链接将会自动地根据当前页面的侧边栏的顺序来获取。你也可以使用 `YAML front matter` 来明确地重写或者禁用它：

``` yaml
---
prev: ./some-other-page
next: false
---
```

### Git 仓库和编辑链接

当你提供了 `themeConfig.repo` 选项，将会自动在每个页面的导航栏生成生成一个 `GitHub` 链接，以及在页面的底部生成一个 `"Edit this page"` 链接。

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'vuejs/vuepress',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'vuejs/vuepress',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！'
  }
}
```

通过 `YAML front matter` 来禁用指定页面的编辑链接：

``` yaml
---
editLink: false
---
```

## 部署

下述的指南基于以下条件：

- 文档放置在项目的 docs 目录中；
- 使用的是默认的构建输出位置；
- VuePress 以本地依赖的形式被安装到你的项目中，并且配置了如下的 npm scripts:

``` js
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```

### 部署到 GitHub Pages

#### 设置 base

在 `docs/.vuepress/config.js` 中设置 `base`。

- 如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。
- 如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

#### 创建 deploy.sh 文件

在你的项目中，创建一个如下的 `deploy.sh` 文件（请自行判断去掉高亮行的注释）:

``` bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

#### 添加命令

在 `package.json` 的 `scripts` 下添加 `"deploy": "bash deploy.sh"`：

``` js
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "deploy": "bash deploy.sh"
  },
  "devDependencies": {
    "vuepress": "^0.14.2"
  }
}
```

#### 运行部署命令

``` bash
yarn deploy
```