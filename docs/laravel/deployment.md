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

查看配置

    $ heroku config

## 在 Heroku 上使用 PostgreSQL

安装 PostgreSQL 扩展

    $ heroku addons:add heroku-postgresql:hobby-dev

为 Heroku 新增一个 `IS_IN_HEROKU` 配置，用来判断应用是否运行在 Heroku 上

    $ heroku config:set IS_IN_HEROKU=true

配置数据库连接

``` php
<?php

function get_db_config()
{
    if (getenv('IS_IN_HEROKU')) {
        $url = parse_url(getenv("DATABASE_URL"));

        return $db_config = [
            'connection' => 'pgsql',
            'host' => $url["host"],
            'database'  => substr($url["path"], 1),
            'username'  => $url["user"],
            'password'  => $url["pass"],
        ];
    } else {
        return $db_config = [
            'connection' => env('DB_CONNECTION', 'mysql'),
            'host' => env('DB_HOST', 'localhost'),
            'database'  => env('DB_DATABASE', 'forge'),
            'username'  => env('DB_USERNAME', 'forge'),
            'password'  => env('DB_PASSWORD', ''),
        ];
    }
}
```

``` php
<?php

$db_config = get_db_config();

return [

    'default' => $db_config['connection'],

    'connections' => [

        'sqlite' => [
            'driver' => 'sqlite',
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
        ],

        'mysql' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ],

        'pgsql' => [
            'driver'   => 'pgsql',
            'host'     => $db_config['host'],
            'port'     => env('DB_PORT', '5432'),
            'database' => $db_config['database'],
            'username' => $db_config['username'],
            'password' => $db_config['password'],
            'charset'  => 'utf8',
            'prefix'   => '',
            'schema'   => 'public',
            'sslmode'  => 'prefer',
        ],

        'sqlsrv' => [
            'driver' => 'sqlsrv',
            'host' => env('DB_HOST', 'localhost'),
            'port' => env('DB_PORT', '1433'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all the migrations that have already run for
    | your application. Using this information, we can determine which of
    | the migrations on disk haven't actually been run in the database.
    |
    */

    'migrations' => 'migrations',

    /*
    |--------------------------------------------------------------------------
    | Redis Databases
    |--------------------------------------------------------------------------
    |
    | Redis is an open source, fast, and advanced key-value store that also
    | provides a richer set of commands than a typical key-value systems
    | such as APC or Memcached. Laravel makes it easy to dig right in.
    |
    */

    'redis' => [

        'client' => 'predis',

        'default' => [
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', 6379),
            'database' => 0,
        ],

    ],

];
```

提交代码到 Heroku

``` bash
$ git push heroku master
```

在 Heroku 上运行迁移命令

``` bash
$ heroku run php artisan migrate
```

如果需要在 Heroku 上重置 PostgreSQL 数据库，运行

``` bash
$ heroku pg:reset DATABASE
$ heroku run php artisan migrate
```