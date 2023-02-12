---
title: Tomcat安装配置
tags: []
id: '455'
categories:
  - - 教程
date: 2022-02-23 23:21:26
---

## 下载

[官网下载（https://tomcat.apache.org/）](https://tomcat.apache.org/)

选择对应的版本的core下载

eg.64位Windows10的[下载链接](https://dlcdn.apache.org/tomcat/tomcat-10/v10.0.16/bin/apache-tomcat-10.0.16-windows-x64.zip)

## 配置

解压并且获取**文件夹的地址**，如：C:\\Users\\zhuan\\apache-tomcat-10.0.16

在"系统变量"里新建变量名：**CATALINA\_BASE**，变量值：C:\\Users\\zhuan\\apache-tomcat-10.0.16（此处为你的解压包路径）

在"系统变量"里新建变量名：**CATALINA\_HOME**，变量值：C:\\Users\\zhuan\\apache-tomcat-10.0.16

在"系统变量"里打开**Path**变量，添加变量值：**%CATALINA\_HOME%\\lib** 和 **%CATALINA\_HOME%\\bin**

## 安装服务

```
C:\Users\zhuan\apache-tomcat-10.0.16\bin>service.bat install
Installing the service 'Tomcat10' ...
Using CATALINA_HOME:    "C:\Users\zhuan\apache-tomcat-10.0.16"
Using CATALINA_BASE:    "C:\Users\zhuan\apache-tomcat-10.0.16"
Using JAVA_HOME:        "C:\Program Files\Java\jdk-17.0.2\"
Using JRE_HOME:         "C:\Program Files\Java\jdk-17.0.2\"
Using JVM:              "C:\Program Files\Java\jdk-17.0.2\\bin\server\jvm.dll"
The service 'Tomcat10' has been installed.

C:\Users\zhuan\apache-tomcat-10.0.16\bin>
```

## 运行

访问bin文件夹下的startup.bat文件或者tomcat10.exe或者tomcat10w.exe打开服务

访问本机8080端口即可访问Tomcat

## 遇到的问题

localhost:8080无法打开页面，而127.0.0.1:8080可以打开页面

*   更改host文件（C:/WINDOWS/system32/drivers/etc/hosts）将下列解析添加进host

```
127.0.0.1       localhost
::1             localhost
```