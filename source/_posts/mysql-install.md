---
title: MySQL的配置安装
categories:
  - - 教程
date: 2022-02-23 22:34:01
tags:
  - - mysql
---

## 下载

### 方法一：官网下载

进入MySQL官网[下载（https://dev.mysql.com/downloads/mysql/）](https://dev.mysql.com/downloads/mysql/)

选择对应的版本下载

### 方法二：网盘下载

个人网盘下载：[个人网盘该文件分享链接🔗](https://pan.zhuanjie.ltd/s/Z52Fn)

## 配置

将下载好的文件夹解压，并且获取**文件夹的地址**，如：C:\\Users\\zhuan\\mysql-8.0.28-winx64

在该目录下创建新文本文件，内容如下：

```ini
[mysql]
# mysql默认字符集
default-character-set=utf8
[mysqld]
# 端口
port=3306
# mysql安装目录
basedir=C:\Users\zhuan\mysql-8.0.28-winx64 #更改为文件夹地址
# 数据存放目录
datadir=C:\Users\zhuan\mysql-8.0.28-winx64\data #更改为文件夹地址+\data
# 最大连接数
max_connections=20
# 服务器端编码
character-set-server=utf8
# 创建新表时使用默认存储引擎
default-storage-engine=INNODB
# 设置协议认证方式
default_authentication_plugin=mysql_native_password
```

将文本文件更改名称为my.ini

在该文件夹内创建一个文件夹命名为data

在命令提示窗口进入bin目录下运行命令：

```powershell
C:\Users\zhuan\mysql-8.0.28-winx64\bin>mysqld -install
Service successfully installed.

C:\Users\zhuan\mysql-8.0.28-winx64\bin>mysqld --initialize-insecure --user=mysql

C:\Users\zhuan\mysql-8.0.28-winx64\bin>net start mysql
MySQL 服务正在启动 .
MySQL 服务已经启动成功。


C:\Users\zhuan\mysql-8.0.28-winx64\bin>mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.28 MySQL Community Server - GPL

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';
Query OK, 0 rows affected (0.01 sec)

mysql> quit
Bye

C:\Users\zhuan\mysql-8.0.28-winx64\bin>
```

此电脑（右键）——属性——系统——高级系统设置——系统属性——环境变量

将文件夹地址加上\\bin后加入系统变量的**Path**变量