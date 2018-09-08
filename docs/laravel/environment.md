# 开发环境

使用 Homestead 统一开发环境。

## MacOS下的开发环境

### 安装 VirtualBox

VirtualBox [官方下载地址](https://www.virtualbox.org/wiki/Downloads)

### 安装 Vagrant

Vagrant [官方下载地址](https://www.vagrantup.com/downloads.html)

Vagrant [官方文档](https://www.vagrantup.com/docs/index.html)

Vagrant [Box下载](https://app.vagrantup.com/boxes/search)

### 安装 Homestead

Homestead 管理脚本

[https://github.com/laravel/homestead](https://github.com/laravel/homestead)

Homestead 虚拟机盒子

[https://app.vagrantup.com/laravel/boxes/homestead](https://app.vagrantup.com/laravel/boxes/homestead)

下载虚拟机盒子

[Laravel China 定制版 Homestead 虚拟机盒子](http://download.fsdhub.com/lc-homestead-6.1.0-2018061700.zip)

解压后包含两个文件：

- `virtualbox.box` 定制版 Homestead 盒子
- `metadata.json` 盒子的导入配置文件

导入盒子

``` bash
> vagrant box add metadata.json
```

下载定制版 Homestead 管理脚本：

``` bash
> cd ~
> git clone https://git.coding.net/summerblue/homestead.git Homestead
```

检出指定版本的脚本：

``` bash
> cd ~/Homestead
> git checkout v7.8.0
```

初始化 Homestead

``` bash
> bash init.sh
```

### Homestead 配置

Homestead 配置文件位于 `~/Homestead/Homestead.yaml`

``` yaml
---
ip: "192.168.10.10"
memory: 2048
cpus: 1
provider: virtualbox

authorize: ~/.ssh/id_rsa.pub

keys:
    - ~/.ssh/id_rsa
    - ~/.ssh/id_rsa.pub

folders:
    - map: ~/Code
      to: /home/vagrant/Code

sites:
    - map: laravel.test
      to: /home/vagrant/Code/Laravel/public

databases:
    - laravel

# blackfire:
#     - id: foo
#       token: bar
#       client-id: foo
#       client-token: bar

# ports:
#     - send: 50000
#       to: 5000
#     - send: 7777
#       to: 777
#       protocol: udp
```

#### 虚拟机配置

默认配置，无需修改

``` yaml
ip: "192.168.10.10"
memory: 2048
cpus: 1
provider: virtualbox
```

#### SSH 密钥登录配置

虚拟机授权连接公钥：

``` yaml
authorize: ~/.ssh/id_rsa.pub
```

同步本机公钥和私钥到虚拟机：

``` yaml
keys:
    - ~/.ssh/id_rsa
    - ~/.ssh/id_rsa.pub
```

检查是否存在 SSH Key:

``` bash
> ls -al ~/.ssh
```

如果不存在 `id_rsa` 和 `id_rsa.pub`，使用以下命令生成 SSH Key:

``` bash
> ssh-keygen -t rsa -C "your-email@exmple.com"
```

#### 共享文件夹配置

``` yaml
folders:
    - map: ~/Code
      to: /home/vagrant/Code
```

- `map` 本机文件夹
- `to` 对应的 Homestead 上的文件夹

#### 站点配置

``` yaml
sites:
    - map: laravel.test
      to: /home/vagrant/Code/Laravel/public
```

#### 数据库配置

指定需要创建的数据库名称：

``` yaml
databases:
    - laravel
```

### 绑定 hosts

打开 `hosts` 文件

- Mac 系统在 `/etc/hosts`
- Windows 系统在 `C:/Windows/System32/Drivers/etc/hosts`

在最后添加

``` txt
192.168.10.10  laravel.test
```

创建项目 `Laravel` 后，可通过浏览器访问 `laravel.test` 站点。

### 运行 Vagrant

启动 Homestead :

``` bash
> cd ~/Homestead
> vagrant up
```

登录虚拟机：

``` bash
> vagrant ssh
```

退出虚拟机：

``` bash
$ exit
```

关闭 Homestead

``` bash
> vagrant halt
```

### Vagrant 常用命令

Vagrant 的常用命令如下：

| 命令 | 说明 |
| ---- | ----- |
| vagrant init | 初始化 vagrant |
| vagrant up | 启动 vagrant |
| vagrant halt | 关闭 vagrant |
| vagrant ssh | 通过 SSH 登录 vagrant（需要先启动 vagrant） |
| vagrant provision | 重新应用更改 vagrant 配置 |
| vagrant destroy | 删除 vagrant |
