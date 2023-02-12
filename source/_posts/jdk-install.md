---
title: JDK安装以及环境变量配置
tags: []
id: '444'
categories:
  - - 教程
date: 2022-02-23 21:07:25
---

## 下载JDK

打开[Oracle官网https://www.oracle.com/cn/java/](https://www.oracle.com/cn/java/)

选择立即下载java跳转下载界面，选择对应的版本后下载jdk

### 64位Windows：

jdk17下载链接：[https://download.oracle.com/java/17/latest/jdk-17\_windows-x64\_bin.exe](https://download.oracle.com/java/17/latest/jdk-17_windows-x64_bin.exe)

### 64位Ubuntu（基于树莓派）：

```
ubuntu@ubuntu:~$ mkdir jdk
ubuntu@ubuntu:~$ cd jdk
ubuntu@ubuntu:~/jdk$ wget https://download.oracle.com/java/17/latest/jdk-17_linux-aarch64_bin.tar.gz
```

## 安装jdk

### Windows：

打开安装程序，**复制安装路径**如：**C:\\Program Files\\Java\\jdk-17.0.2\\**

### Ubuntu：

```
ubuntu@ubuntu:~/jdk$ sudo tar -zxvf jdk-17_linux-aarch64_bin.tar.gz
```

需要记住解压路径

## 添加环境变量

### Windows：

此电脑（右键）——属性——系统——高级系统设置——系统属性——环境变量

在系统变量里新建**变量名**：**JAVA\_HOME** **变量值**为安装时**复制的地址**：C:\\Program Files\\Java\\jdk-17.0.2\\

在系统变量里找到变量名为**Path**的变量，在末尾添加**%JAVA\_HOME%bin**

### Ubuntu：

```
ubuntu@ubuntu:~/jdk$ sudo vim /etc/profile
```

在末尾添加：

```
JAVA_HOME=/home/ubuntu/java/jdk/jdk-17.0.2/ # 值为解压路径
CLASSPATH=$JAVA_HOME/lib/
PATH=$PATH:$JAVA_HOME/bin
export PATH JAVA_HOME CLASSPATH
```

保存并退出，并且更新源

```
ubuntu@ubuntu:~/jdk$ source /etc/profile
```

## 验证

### Windows：

```
Microsoft Windows [版本 10.0.22000.493]
(c) Microsoft Corporation。保留所有权利。

C:\Users\zhuan>java -version
java version "17.0.2" 2022-01-18 LTS
Java(TM) SE Runtime Environment (build 17.0.2+8-LTS-86)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.2+8-LTS-86, mixed mode, sharing)

C:\Users\zhuan>javac -version
javac 17.0.2

C:\Users\zhuan>
```

### Ubuntu：

```
ubuntu@ubuntu:~/jdk$ java -version
java version "17.0.2" 2022-01-18 LTS
Java(TM) SE Runtime Environment (build 17.0.2+8-LTS-86)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.2+8-LTS-86, mixed mode, sharing)
ubuntu@ubuntu:~/jdk$ javac -version
javac 17.0.2
ubuntu@ubuntu:~/jdk$
```