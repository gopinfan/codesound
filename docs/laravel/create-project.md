# 使用 Homestead 创建项目

## 配置 Homestead

打开 `~/Homestead/Homestead.yaml`

``` sh
> code ~/Homestead/Homestead.yaml
```

添加站点配置，在 `sites` 下面添加

``` yaml
    - map: homestead.test
      to: /home/vagrant/code/homestead/public
```

添加数据库配置，在 `databases` 下面添加

``` yaml
    - homestead
```

## 绑定主机

打开 `/etc/hosts` ，在最后添加

``` txt
192.168.10.10  homestead.test
```

## 进入虚拟机环境

如果虚拟机未启动，启动虚拟机

``` sh
> cd ~/Homestead
> vagrant up
```

如果虚拟机已启动，则重新应用更改配置

``` sh
> vagrant provision
```

进入虚拟机

``` sh
> vagrant ssh
```

## 创建项目

创建Laravel项目

``` sh
$ cd ~/Code
$ composer create-project laravel/laravel homestead
```

在浏览器中访问 [http://homestead.test](http://homestead.test)