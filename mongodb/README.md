## 几个网站
- 官网 https://www.mongodb.com/
    + 安装包下载
    + 使用文档
- 中文网站  http://www.mongoing.com/


## 数据库的概念
- 有组织的存放数据
- 按照不同的需求进行查找


## 数据库分类
- sql数据库: 支持sql语言的数据库
   > oracle， mysql

- NoSql数据库，不支持sql语言的数据
    > redis mongodb


## mongodb 特点
1. 无数据结构限制
    - 没有表结构的概念， 每条记录可以完全不同的结构
    - 业务开发方便快捷
    - sql数据库需要事先定义表结构在使用
    


```js
    {name: '小明', sex: '男'}
    {name: '小红', addres: "_address"}
    {name: '小红', home: ["山东","江西"]}
```


## 搭建服务
- mkdir data //用来存储数据文件
- mkdir log //用来存储日志文件
- mkdir conf //用来存储启动配置文件
- mkdir bin //用来存储数据库的二进制文件

将安装的二进制文件拷贝到 bin文件夹下


cd conf

vi mongod.conf

port= 12345 数据库端口

dbpath = data 数据文件路径，可以是相对路径，也可以是绝对路径，我们这里使用相对路径

logpath = log/mongod.log  指定日志存放路径，需要指定一个实际的文件
fork = true 表明这是启动了一个后台程序

返回上层文件
cd ..

-f指定启动配置文件
启动服务
./bin/mongod -f conf/mongod.conf


cd data  可以看到创建的文件
cd log 可以看到日志文件


## 连接mongoDB服务器 
./bin/mongo 127.0.0.1:12345/test

127.0.0.1 本地ip地址
12345 端口号
test 数据库名称

本来还应该指定用户民和密码 但这里我们没有设置
-u username -p password

## 关闭mongod服务
两种方法:
- 在连接到mongod服务后使用db.shotdownServer()
    + use admin 需要进入到admin数据库之后
    + db.shutdownServer() 关闭服务
- 找到pid; kill -15 pid



## 常用方法
### 查看有多少数据库
show dbs  

### 切换数据库
use testdb
切换到不存在的数据库, 既不会报错,也不会创建新数据库,它会在插入一条数据的时候创建

### 插入数据 db + 集合名 + insert(data)  insert带一个参数,格式为json
db.test_collection.insert({x:1})

现在使用show dbs 能够看到 新的数据库testdb
使用show collections 能够看到我们创建的集合 test_collection

 

### 查询 
```
> db.test_collection.find()
{ "_id" : ObjectId("5788a9317114ab2a42a8578a"), "a" : 1 }
```
默认情况下返回所有数据

可以接受一个参数,参数格式为json,表示查询条件

### _id
上面我们插入数据{x:1}后,看到查询的结果中多了一个字段_id ,这个是数据唯一标示符,
是自动生成的, 我们也可以手动指定,注意不能重复

### 插入多条数据
mongodb允许我们使用javascript的语法来插入多条数据
```
for(var i=0; i<100; i++){ db.test_collection.insert({x:i}) }
```

### 计数
```
db.test_collection.find().count()
```

### skip limit sort
```
db.test_collection.find().skip(3).limit(2).sort({x:1})
```


### 更新操作 update()
```
db.test_collection.update({x: 1},{x: 999})
```
接收两个参数, 第一是查询条件, 第二个替换目标

### 更新部分字段
```
db.test_collection.insert({x: 100, y: 100, z: 100})
db.test_collection.update({x: 100}, {x: 99})
```
上面代码会修改数据{x: 100, y: 100, z: 100}为{x: 99},覆盖了y和z

如果我们只想修改x字段的值,保持 y和z字段, 我们需要用到$set操作符, $set表示部分跟新

```
db.test_collection.update({x: 100}, { $set: {x: 99} })
```

### 更新一条不存在的记录时自动创建数据
```
db.test_collection.update({x: 100}, {x:99})
```
如果{x:100} 查找的结果为空, 默认mongodb不会有任何的操作


当我们给update加上第三个参数时,更新一条不存在的记录时自动创建数据
```
db.test_collection.update({x: 100}, {x:99}, true)
```

将创建一条新数据

### 更新多条数据
默认情况下, mongodb只会更新找的第一条数据

传入第四个参数,表示更新多条数据, 注意, 更新多条数据只能使用 $set 为了防止误操作


```
db.user.update({x: 100}, {$set: {x:99}}, false, true)
```

### 数据删除 remove
与查询类似, 接收另一个参数,格式为json
与查询不同的是,为了防止误操作,remove必须传参数
与更新不同的是,默认删除多条数据


## 安全
### 创建用户
createUser命令
参数：
```js
{
    user: "<用户名>",
    pwd: "<密码>",
    roles:[
        {role: "<角色>", db: "<角色应用到的数据库>"}
    ]
}
```
角色类型：
- read 只读
- readWrite 读写
- dbAdmin 数据库的管理操作，比如说创建索引,show dbs,show collections ..
- dbOwner 拥有上面三个权限
- userAdmin 可以对其他角色进行管理( Provides the ability to create and modify roles and users on the current database. )


```js
db.createUser({
    user: "lulu",
    pwd: "123456",
    roles: [
        {role: "dbOwner", db: "test_db"},
        {role: "userAdmin", db: "test_db"}
    ]
})
```


### 开启权限认证
在conf/mongod.conf文件中写入auth＝true

重启服务
ps -ef | grep mongod
kill -15 pid
./bin/mongod -f conf/mongod.conf

连接服务
./bin/mongo 127.0.0.1:12345







