# Git 教程

参考资料：

- [廖雪峰的官方网站](https://www.liaoxuefeng.com/) 上的 [Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
- [Pro Git](https://git-scm.com/book/en/v2) [Pro Git 简体中文版](https://git-scm.com/book/zh/v2)

## Git 简介

### Git 的诞生

### 集中式vs分布式

## Git 安装

### 在 Linux 上安装 Git

#### 检查有没有安装 Git

    $ git

#### 安装 Git

    $ sudo apt-get install git

或者

    $ sudo yum install git

### 在 MacOS 上安装 Git

#### 通过 homebrew 安装

[homebrew 文档](http://brew.sh/)

#### 从 Xcode 安装

先从 `AppStore` 安装 `Xcode`，运行 `Xcode`，选择菜单 `Xcode->Preferences`，在弹出窗口中找到 `Downloads`，选择 `Command Line Tools`，点 `Install` 安装。

#### 客户端程序直接安装

- OSX Git 安装程序 [http://git-scm.com/download/mac](http://git-scm.com/download/mac)
- Github for Mac [http://mac.github.com/](http://mac.github.com/)

### 在 Windows 上安装 Git

- Git for Windows [http://git-scm.com/download/win](http://git-scm.com/download/win)
- Github for Windows [http://windows.github.com/](http://windows.github.com/)

## 创建版本库

### 初始化版本库

``` bash
$ git init
```

### 添加文件到 Git 仓库

把文件添加到暂存区

``` bash
$ git add <file>
```

把暂存区文件提交到当前分支

``` bash
$ git commit -m <message>
```

## 版本管理

### 查看工作区状态

``` bash
$ git status
```

### 比较文件差异

``` bash
# 工作区和暂存区
$ git diff <file>

# 暂存区和最新版本库
$ git diff --cached <file>

# 工作区和最新版本库
$ git diff HEAD <file>

# 工作区与指定版本
$ git diff <commit-id> <file>

# 暂存区与指定版本
$ git diff --cached <commit-id> <file>

# 两个版本之间
$ git diff <commit-id> <commit-id> <file>
```

### 查看提交历史

``` bash
$ git log
```

常用参数组合

``` bash
$ git log --graph --pretty=oneline --abbrev-commit
```

### 查看命令历史

``` bash
$ git reflog
```

### 版本回退

``` bash
# 回退到上一版本
$ git reset --hard HEAD^

# 回退到指定版本
$ git reset --hard <commit-id>
```

### 撤销修改

#### 撤销工作区的修改

把工作区的内容恢复到最后一次 `git add` 或 `git commit` 的状态

``` bash
$ git checkout -- <file>
```

撤销工作区所有修改的文件

``` bash
$ git checkout .
```

`git checkout` 其实是用版本库里的版本替换工作区的版本，无论修改还是删除。

::: tip
注意，只能撤销工作区修改的文件，新增的文件无法撤销。撤销新增的文件使用 `git clean -df`。
:::

#### 撤销暂存区的修改

把暂存区的修改撤销掉(Unstage)

``` bash
$ git reset HEAD <file>
```

#### 撤销工作区和暂存区所有的修改

撤销工作区和暂存区所有的修改，回退到最后一次commit的版本

``` bash
$ git reset --hard
```

### 清空工作区

使用 `git clean` 命令删除工作区中所有没有tracked过的文件

删除所有工作区中没有track过的文件和文件夹

``` bash
$ git clean -df
```

### 综合使用

把工作区和暂存区的所有文件清空，包括修改的和新增的，回复到最后一次 commit 的状态

``` bash
$ git reset --hard
$ git clean -df
```

### 删除文件

删除文件，是指把文件从已跟踪清单中移除，从暂存区删除，同时从工作目录中删除

``` bash
$ git rm <file>
```

仅从跟踪清单中删除，并不从工作目录中删除：

``` bash
$ git rm --cached <file>
```

使用 `git rm <file>` 删除文件后，如果还没有 `commit`，可以使用以下命令恢复

``` bash
$ git reset HEAD readme.md
$ git checkout -- <file>
```

## 远程仓库

### 添加远程仓库

添加远程仓库

``` bash
$ git remote add origin git@github.com:<username>/<repo>.git
```

第一次推送，加上 `-u` 参数，把本地分支和远程分支关联越来

``` bash
$ git push -u origin master
```

以后就可以使用 `git push` 命令推送本地分支了

``` bash
$ git push origin master
```

### 克隆远程仓库

使用 `git clone` 命令把远程仓库克隆到本地

``` bash
$ git clone git@github.com:<username>/<repo>.git
```

### 查看远程分支

``` bash
$ git remote
# 或者加参数 -v 显示更详细的信息
$ git remote -v
```

### 取消关联远程仓库

``` bash
$ git remote remove <remote-name>
```

### 重命名远程仓库

``` bash
$ git remote rename <old-name> <new-name>
```

### 删除远程仓库

``` bash
$ git remote rm <remote-name>
```

## 分支管理

### 创建分支

``` bash
$ git branch <branch-name>
```

### 切换分支

``` bash
$ git checkout <branch-name>
```

### 创建并切换分支

``` bash
$ git checkout -b <branch-name>
```

### 合并分支

把其它分支合并到当前分支上

``` bash
$ git merge <branch-name>
```

### 删除分支

``` bash
$ git branch -d <branch-name>
```

强制删除一个未合并的分支

``` bash
$ git branch -D <branch-name>
```

### 查看分支

``` bash
$ git branch
```

### 推送分支

``` bash
$ git push origin <branch-name>
```

### 抓取远程分支

``` bash
$ git pull
```

### 在本地创建和远程分支对应的分支

``` bash
$ git checkout -b <branch-name> origin/<branch-name>
```

### 建立本地分支和远程分支的关联

``` bash
$ git branch --set-upstream <branch-name> origin/<branch-name>
```

## 标签管理

### 创建标签

#### 给当前最新版本创建标签

``` bash
$ git tag <tag-name>
```

#### 给指定版本创建标签

``` bash
$ git tag <tag-name> <commit-id>
```

#### 创建带有说明的标签

`-a` 指定标签名， `-m` 指定说明文字

``` bash
$ git tag -a <tag-name> -m <message>
```

### 查看标签

#### 查看所有标签

``` bash
$ git tag
```

#### 查看指定标签信息

``` bash
$ git show <tag-name>
```

### 删除标签

#### 删除本地标签

``` bash
$ git tag -d <tag-name>
```

#### 删除远程标签

先从本地删除

``` bash
$ git tag -d <tag-name>
```

再从远程删除

``` bash
$ git push origin :refs/tags/<tag-name>
```

### 推送标签

#### 推送指定标签

``` bash
$ git push origin <tag-name>
```

#### 推送所有尚未推送的标签

``` bash
$ git push origin --tags
```

## 忽略文件

在工作区的根目录下创建 `.gitignore` 文件，把需要忽略的文件逐行列出来，把此文件提交到 Git。

### .gitignore 文件格式规范

- 空行和以 `#` 开头的行都会被忽略
- 支持标准的 `glob` 模式匹配
- 使用 `/` 开头防止递归
- 使用 `/` 结尾指定目录
- 使用 `!` 开头取反

`glob` 模式：

- `*` 匹配0个或多个任意字符
- `[]` 匹配任何一个方括号中的字符
- `?` 匹配一个任意字符
- `[0-9]` 匹配区间范围
- `**` 匹配任意中间目录

### 参考 .gitignore 文件

参考各种语言的 `.gitignore` 配置文件： [https://github.com/github/gitignore](https://github.com/github/gitignore)

## Git 配置

### 配置文件

- `/etc/gitconfig` : 所有用户和仓库的通用配置
- `~/.gitconfig` : 当前用户的配置，使用 `--global` 读写
- `.git/config` : 当前仓库配置

### 查看配置信息

#### 列出所有配置

``` bash
$ git config --list
```

#### 查看某一项配置

``` bash
$ git config <key>
```

### 配置用户信息

如果只对当前仓库设置，不需要 `--global` 参数

#### 设置用户名称

``` bash
$ git config --global user.name "username"
```

#### 设置用户邮箱

``` bash
$ git config --global user.email "username@example.com"
```

### 配置别名

使用 `alias` 命令配置别名： 

`git config --global alias.<alias> <verb>`

``` bash
$ git config --global alias.st status
```

## 获取帮助

- `$ git help <verb>`
- `$ git <verb> --help`