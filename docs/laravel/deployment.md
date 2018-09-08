# 部署到 Heroku

部署到 [Heroku](https://heroku.com/)

## Heroku 的安装配置

注册 [Heroku账号](http://signup.heroku.com/)

安装 Heroku ，官方[安装教程](https://devcenter.heroku.com/articles/heroku-cli)

登录

    $ heroku login

添加 SSH Key

    $ heroku keys:add

新建 `Procfile` 文件

    $ echo web: vendor/bin/heroku-php-apache2 public/ > Procfile

## 在 Heroku 上创建应用

创建应用

    $ heroku create

更改应用名称

    $heroku  rename new-app-name

声明 buildpack

    $ heroku buildpacks:set heroku/php

设置 APP Key

    $ heroku config:set APP_KEY=<app_key>

## 部署代码

使用 Git 推送代码

    $ git push heroku master

打开应用

    $ heroku open

查看 Heroku 域名

    $ heroku domains

查看日志

    $ heroku logs
