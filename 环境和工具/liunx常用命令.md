# liunx

## 常用命令


#### 目录操作
Linux以树状结构组织文件和目录，目录可以包含文件，也可以包含其它目录。目录的最高层是根目录"/"，其它所有文件和目录都是挂在根目录下，形成一个倒挂的目录树。
![](http://www.runoob.com/wp-content/uploads/2014/06/003vPl7Rty6E8kZRlAEdc690.jpg)


- /bin：
bin是Binary的缩写, 这个目录存放着最经常使用的命令。
- /boot：
这里存放的是启动Linux时使用的一些核心文件，包括一些连接文件以及镜像文件。
- /dev ：
dev是Device(设备)的缩写, 该目录下存放的是Linux的外部设备，在Linux中访问设备的方式和访问文件的方式是相同的。
- /etc：
这个目录用来存放所有的系统管理所需要的配置文件和子目录。
- /home：
用户的主目录，在Linux中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的。
- /lib：
这个目录里存放着系统最基本的动态连接共享库，其作用类似于Windows里的DLL文件。几乎所有的应用程序都需要用到这些共享库。
- /lost+found：
这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件。
- /media linux系统会自动识别一些设备，例如U盘、光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。
- /mnt：
系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在/mnt/上，然后进入该目录就可以查看光驱里的内容了。
- /opt：
 这是给主机额外安装软件所摆放的目录。比如你安装一个ORACLE数据库则就可以放到这个目录下。默认是空的。
- /proc：
这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。
这个目录的内容不在硬盘上而是在内存里，我们也可以直接修改里面的某些文件，比如可以通过下面的命令来屏蔽主机的ping命令，使别人无法ping你的机器：
echo 1 > /proc/sys/net/ipv4/icmp_echo_ignore_all
- /root：
该目录为系统管理员，也称作超级权限者的用户主目录。
- /sbin：
s就是Super User的意思，这里存放的是系统管理员使用的系统管理程序。
- /srv：
 该目录存放一些服务启动之后需要提取的数据。
- /sys：
 这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。
sysfs文件系统集成了下面3种文件系统的信息：针对进程信息的proc文件系统、针对设备的devfs文件系统以及针对伪终端的devpts文件系统。
该文件系统是内核设备树的一个直观反映。
当一个内核对象被创建的时候，对应的文件和目录也在内核对象子系统种被创建。
- /tmp：
这个目录是用来存放一些临时文件的。
- /usr：
 这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似与windows下的program files目录。
- /usr/bin：
系统用户使用的应用程序。
- /usr/sbin：
超级用户使用的比较高级的管理程序和系统守护程序。
- /usr/src：内核源代码默认的放置目录。
- /var：
这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。

###### ls
```shell
lulu@lulu:~$ ls
Getting Started with Ubuntu 16.04.pdf  test       模板          文档
GitBook                                tmp        鸟哥的私房菜  下载
lantern-installer-beta.exe             workplace  视频          音乐
pyv8-linux64-p3.zip                    公共的     图片          桌面
```

```shell
lulu@lulu:~$ ls -l
总用量 37140
-rw-rw-r-- 1 lulu lulu  6964582  5月  6 09:33 Getting Started with Ubuntu 16.04.pdf
drwxrwxr-x 3 lulu lulu     4096  4月 25 10:09 GitBook
-rw-rw-r-- 1 lulu lulu  7890108  4月 18 12:50 pyv8-linux64-p3.zip
drwxrwxr-x 2 lulu lulu     4096  4月 25 18:28 test
drwxrwxr-x 7 lulu lulu     4096  4月 25 10:23 tmp
drwxrwxr-x 4 lulu lulu     4096  4月 22 14:34 workplace
drwxr-xr-x 3 lulu lulu     4096  4月 18 16:55 公共的
drwxr-xr-x 2 lulu lulu     4096  4月  8 17:46 模板
-rw-rw-r-- 1 lulu lulu 23121212  3月  5  2015 鸟哥的私房菜
drwxr-xr-x 2 lulu lulu     4096  4月  8 17:46 视频
drwxr-xr-x 3 lulu lulu     4096  5月 19 09:16 图片
drwxr-xr-x 2 lulu lulu     4096  4月  8 17:46 文档
drwxr-xr-x 4 lulu lulu     4096  5月  4 09:10 下载
drwxr-xr-x 2 lulu lulu     4096  4月  8 17:46 音乐
drwxr-xr-x 3 lulu lulu     4096  5月 24 15:23 桌面
```

###### cd (change directory) 切换目录
```shell
lulu@lulu:~$ cd /home/lulu #绝对路径
lulu@lulu:~$ cd 桌面 #相对路径
lulu@lulu:~$ cd . #'.'代表当前目录
lulu@lulu:~$ cd .. #'..'代表上一级目录
lulu@lulu:~$ cd ~  #'~'代表用户主目录

```


######  pwd(print working directory) 显示当前工作目录
```shell
lulu@lulu:~$ pwd
/home/lulu
```

###### mkdir(make directories) 创建目录
```shell
lulu@lulu:~$ mkdir test1
```

```shell
lulu@lulu:~$ mkdir -p test1/test2
```

p表示递归创建


###### rmdir(remove empty directory) 删除空目录
```shell
lulu@lulu:~$ mkdir test
lulu@lulu:~$ mkdir -p test1/test2
lulu@lulu:~$ rmdir test
lulu@lulu:~$ rmdir test1
rmdir: 删除 "test1" 失败: 目录非空
```

###### rm(remove) 删除文件或目录
rm -rf [文件或目录]
- r 表示删除目录
- f 强制删除

###### cp(copy) 复制文件或目录
cp [选项] [原文件或目录] [目标目录]
选项:
- r 复制目录
- a 深度复制(一个区别就是文件的创建时间)

```shell
lulu@lulu:~$ cp test1/ /tmp/  #复制test1目录到/tmp/下
lulu@lulu:~$ cp -r test1/ /tmp/test-rename #复制test1目录到/tmp/下,并且改名为test-rename
```

###### mv(move) 移动文件或目录(剪切或重命名)
mv [原文件或目录] [目标目录]
```shell
lulu@lulu:~$ mv test1 /tmp/test1-rename #在不同目录下就是剪切

lulu@lulu:~$ mv test1 test1-rename  #在同一个目录下就是重命名 

```


#### 链接命令(快捷方式) ln( link)

ln -s [原文件] [目标文件]
-s 代表创建软链接, 不加则创建的是硬链接

一般我们用软链接



#### 搜索命令

###### whereis 搜索<font color="red">系统命令</font> 
whereis 命令名


搜索命令所在路径及帮助文档所在位置

选项:
- b 只查找可执行文件
- m  只查找帮助文件
```shell
lulu@lulu:~$ whereis ls
ls: /bin/ls /usr/share/man/man1/ls.1.gz
```
/bin/ls是ls的可执行文件, /usr/share/man/man1/ls.1.gz是帮助文档位置


###### find  文件搜索

find  [搜索范围] [搜索条件]

```shell
lulu@lulu:~$ find / -name test1
```

name 是完全匹配,部分匹配需要使用通配符
- * 匹配任意内容
- ? 匹配任意一个字符
- [] 匹配任意在总括号内的一个字符


假设当前文件夹下有a.txt, aac.txt ,abc.txt, acc.txt四个文件
```shell
lulu@lulu:~$ find . -name "*.txt" #找到所有以.txt为后缀的文件,及 a.txt, aac.txt ,abc.txt, acc.txt

lulu@lulu:~$ find . -name "a?c.txt" #找aac.txt ,abc.txt, acc.txt

lulu@lulu:~$ find . -name "a[ab]c.txt" #找aac.txt ,abc.txt
```

**注意加双引号**


```shell
lulu@lulu:~$ find . -iname "a.txt"
```

iname表示不区分大小写

```shell
lulu@lulu:~$ find . -user root
```

按所有者搜索,这条命令一般没有什么作用

```shell
lulu@lulu:~$ find . -nouser
```

查找没有所有者的文件

>没有所有者的情况
- 又内核直接产生的,这些文件可能没有所有者, 比如在/sys, /proc下文件
- 外来文件, 比如说外来u盘里的文件
剩下的没有所有者的文件就是垃圾文件, 可以清理掉

```shell
lulu@lulu:~$ find /var/log/ -mtime +10 #查找10天前修改的文件
```
<font>m</font>time m代表modify 修改
- -10 10内修改的
- 10 10当天
- +10 10天前


- atime 文件访问时间, a代表access
- ctime  改变文件属性, c代表change
- mtime 改变文件内容


```shell
lulu@lulu:~$ find . -size +25k #查找大于25k的文件
lulu@lulu:~$ find . -size -25k #查找小于25k的文件
lulu@lulu:~$ find . -size 25k #查找等于25k的文件

lulu@lulu:~$ find . -size +25M #查找大于25M的文件
```
> 注意k为小写, M为大写


```shell
#根据文件查找i节点
lulu@lulu:~/test1-rename$ ls -i a.txt
1076936 a.txt


#根据i节点查找文件
lulu@lulu:~/test1-rename$ find . -inum  1076936
./a.txt

```

```shell
lulu@lulu:~$ find . -size +25k -a -size -50k #大于25k小于50k
```
- -a  and 逻辑与, 两个条件都满足
- -o  or  逻辑或, 满足一个条件


###### grep 搜索字符串
> grep [选择] 字符串 文件名

在文件当中符合条件的字符串

- -i 不区分大小写
- -v 排除指定字符串


a.txt文件内容
```
size=1
size=2
size=3
C
s
```


找到size字符串所在行的内容
```shell
lulu@lulu:~$ grep 'size' a.txt 
size=1
size=2
size=3
```


找到没有size字符串所在行的内容
```shell
lulu@lulu:~/test1-rename$ grep -v 'size' a.txt 
C
s
```

###### find与grep的区别
- find: 搜索文件名,如果需要匹配,使用通配符, 通配符是完全匹配
- grep: 在文件中搜索满足条件的字符串，如果需要匹配，使用正则表达式，正则表达式是包含匹配



####　帮助命令

###### man (manual 手册)
> man 命令


查看命令的帮助文档
```shell
lulu@lulu:~$ man ls
```

man的级别：
1.   可执行程序或 shell 命令
2.   系统调用(内核提供的函数)
3.   库调用(程序库中的函数)
4.   特殊文件(通常位于 /dev)
5.   文件格式和规范，如 /etc/passwd
6.   游戏
7.   杂项(包括宏包和规范，如 man(7), groff(7))
8.   系统管理命令(通常只针对 root 用户)
9.   内核例程 [非标准

```shell
lulu@lulu:~$ whereis passwd　#whereis  可以查看有哪些级别
passwd: /usr/bin/passwd /etc/passwd /usr/bin/X11/passwd /usr/share/man/man1/passwd.1.gz /usr/share/man/man1/passwd.1ssl.gz /usr/share/man/man5/passwd.5.gz
# /usr/bin/passwd 可执行文件
# /etc/passwd 配置文件

lulu@lulu:~$ man -1 passwd 
lulu@lulu:~$  man -5 passwd #查看配置文件的帮助文档
```
**man默认的显示级别最小的帮助文档**

```shell
lulu@lulu:~$ man -k passwd #列出包含passwd相关的命令，当你忘记具体名字时会很有用
chpasswd (8)         - 批量更新密码
gpasswd (1)          - 管理员 /etc/group 和 /etc/gshadow
passwd (1)           - 更改用户密码
passwd (5)           - 密码文件
..
```


#### 用户登陆查看
###### ｗ
```shell
lulu@lulu:~$ w
 11:10:10 up  2:25,  3 users,  load average: 2.37, 2.33, 2.56
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
lulu     :0       :0               08:44   ?xdm?   6:21   0.23s init --user
lulu     pts/0    :0.0             08:59    3:54  35.88s 35.85s node /usr/local
lulu     pts/11   :0.0             09:02    2.00s  0.21s  0.00s w
```

-　USER 用户名
-　TTY 终端　
-　FROM  用户的ip   
-　LOGIN@ 运行时间
-　IDLE 用户闲置的时间
-　WHAT 当前正在运行的命令

###### who

```shell
lulu@lulu:~$ who
lulu     :0           2016-05-26 08:44 (:0)
lulu     pts/0        2016-05-26 08:59 (:0.0)
lulu     pts/11       2016-05-26 09:02 (:0.0)
```

###### last 记录了所有的用户的登陆历史
```
lulu@lulu:~$ last
lulu     pts/11       :0.0             Thu May 26 09:02   still logged in   
lulu     pts/0        :0.0             Thu May 26 08:59   still logged in   
lulu     pts/0        :0               Thu May 26 08:48 - 08:59  (00:11)    
lulu     :0           :0               Thu May 26 08:44   still logged in   
reboot   system boot  3.13.0-24-generi Thu May 26 08:44 - 11:15  (02:31)    
lulu     pts/12       :0               Tue May 24 13:49 - down   (04:18)    
lulu     pts/23       :0               Tue May 24 13:49 - 13:49  (00:00)    
lulu     pts/12       :0               Tue May 24 09:08 - 13:49  (04:40)    
lulu     pts/0        :0.0             Tue May 24 08:49 - down   (09:19)    
lulu     pts/0        :0               Tue May 24 08:40 - 08:49  (00:08)    
lulu     pts/0        :0               Tue May 24 08:39 - 08:40  (00:00)    
lulu     :0           :0               Tue May 24 08:38 - down   (09:30)    
reboot   system boot  3.13.0-24-generi Tue May 24 08:38 - 18:08  (09:30)    
lulu     pts/0        :0.0             Mon May 23 14:00 - down   (04:0
...
```

###### lastlog 记录了所有用户最后一次登陆的时间


## 用户和用户组

- 用户：　使用操作系统的人
- 用户组： 具有相同系统权限的一组用户

一个用户组有多个用户,一个用户也可以属于多个用户组

######  /etc/group 存储系统中所有用户组的信息
group  : x          : 123     : lulu,xxx
组名   :组密码站位符 : 组编号  : 组中用户名列表

###### /etc/gshadow 存储系统中用户组的密码信息
group  : *     :          : lulu,xxx
组名   :组密码 : 组管理者  : 组中用户名列表

- 组密码:　如果为'*'或'!'代表没有密码
- 组管理者: 一般情况下都是为空的,就是表示组内所有用户都可以管理这个用户组


###### /etc/passwd 存储系统中所有用户的信息
user  : x        : 123     : 456 : xxxxxxx    : /home/user/ : /bin/bash
用户名 : 密码站位符 : 用户编号 : 所属用户组编号:用户描述:用户组目录:　shell类型 

###### /etc/shadow 存储系统中用户的密码信息
lulu   :  $a..     :::::::
用户名 : 密码站位符 :::::::

> /etc/gshadow, /etc/shadow两个文件出现的原因,因为/etc/group和/etc/passwd两个文件的内容会被经常读取，比如说查找一个用户在哪个用户组的操作，所以，它们的权限不应该太苛刻，但是密码是很重要的数据，所以单独需要单独存放


####  相关命令

新建用户组
```shell
groupadd 用户组名
```


修改用户组名
```shell
groupmod -n  新名字　老名字　
```
mod(modify) -n (--new-name)



删除用户组
```shell
groupdel  用户组名　
```
**注意：删除用户组的时候,应该先删除它下面的所有用户**


新建用户

```shell
useradd  -g 用户组 用户名 
```
创建了用户，并指定了用户组
**注意：如果没有指定用户组，会创建一个跟用户同名的用户组**

修改用户名
```shell
usermod  -c 新名字 老名字 
```

修改用户组
```shell
usermod  -g 用户组  用户名
```

删除用户
```shell
userdel   用户名
```


<!-- ###### passwd,gpasswd命令 -->


#### 其他命令
######  id
id 用户名
显示指定用户的信息

###### groups
groups 用户名
显示指定用户所在用户组 