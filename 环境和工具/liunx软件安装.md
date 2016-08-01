# liunx软件安装

liunx下软件安装方式分为:

- 源码安装
- 二进制文件安装(ubuntu为debian包, 及后缀为.deb的文件)


## dpkg
dpkg(debian package-name management system) debian也是一个liunx系统
dpkg是ubuntu下的包管理工具,实现软件的安装,删除,查询


#### 安装软件
首先要下载deb包
```shell
dpkg -i package-name.deb
```


###### deb的依赖性
a->b->c

a依赖b, b依赖c, 则必须先装c,在装b,a才能装的上

#### 查看已安装的软件
```shell
dpkg -l 
```


#### 查看deb包的信息(没有安装之前)
```shell
dpkg --info package-name.deb
```

#### 查看安装的软件信息(安装之后)
```shell
dpkg --status package-name
```


#### 查看该软件在系统上安装了哪些文件
```shell
dpkg --listfiles package-name
```


#### 删除软件
```shell
dpkg -r package-name
```

然后运行`dpkg --listfiles`,会发现配置文件还在,并没有完全删除

**注意:这种删除方式并没有彻底删除软件,会保留配置文件**


#### 彻底删除软件
```shell
dpkg --purge package-name
```

## apt

我们所有deb包都使用手工安装的话,有时候会非常复制,有些包会依赖很多的其他包
所以ubuntu下出现了apt在线安装,apt自动帮我们解决了依赖问题

###### 安装软件
```shell
apt-get install package-name
```
它会一键安装










