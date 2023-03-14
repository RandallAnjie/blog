---
title: Traffmonetizer使用教程
tags: []
id: '1085'
categories:
  - - Linux
  - - shell
  - - 教程
date: 2023-02-01 15:14:47
---

直达一键运行脚本→[传送门](https://blog.zhuanjie.ltd/2023/02/01/traffmonetizer%e4%bd%bf%e7%94%a8%e6%95%99%e7%a8%8b/#2.-%E4%BD%BF%E7%94%A8%E5%AE%98%E6%96%B9%E6%8F%90%E4%BE%9B%E7%9A%84%20Windows%2C%20Mac%2C%20Android%2C%20Docker%20%E8%BF%90%E8%A1%8C)

## 简介

Traffmonetizer是一个来自欧洲的流量挂机平台，类似Peer2profit，满10刀可提现(Paypal、BTC、Payoneer)

## 官网

Traffmonetizer官网：[https://app.traffmonetizer.com/](https://app.traffmonetizer.com/)

Docker：[https://hub.docker.com/r/traffmonetizer/cli](https://hub.docker.com/r/traffmonetizer/cli)

## 使用教程

### 1\. 获取application token

在 [https://app.traffmonetizer.com/dashboard](https://app.traffmonetizer.com/dashboard) 左上角复制 application token

### 2\. 使用官方提供的 Windows, Mac, Android, Docker 运行

这里我提供**一键运行脚本**如下（**注意：将`xxxxxxxxxx`替换为你的 `application token`**）

```shell
wget https://startpage.zhuanjie.ltd/download/randall-traffmonetizer.sh && chmod +x ./randall-traffmonetizer.sh && bash ./randall-traffmonetizer.sh xxxxxxxxxx
```

## 附-脚本文件

初学shell，脚本臃肿，仅适配Ubuntu和Centos

```shell
#!/bin/bash
#
# @Author : 转接
# @Date : 23/02/01
#
#/*传入参数 traffmonetizer 中的 application token, 
# *在 https://app.traffmonetizer.com/dashboard 中获取
# */

get_arch=`uname  -a`

if [[ $get_arch =~ "x86_64" ]];then
    echo "ARM64机器"
    if [[ $get_arch =~ "ubuntu" ]];then
        echo "ubuntu系统"
        sudo apt-get update
        sudo apt install docker.io -y
    elif [[ $get_arch =~ "centos" ]];then
        echo "centos系统"
        yum -y update
        yum -y install docker
    else
        echo "未适配系统"
        exit 2
    fi
    echo "开始安装……请等待"
    if [[ -n $(docker ps -q -f "name=^ra-tm$") ]];then
        echo "存在同名镜像，执行删除"
        sudo docker stop ra-tm
        sudo docker rm ra-tm
    fi
    sudo docker run -d --name ra-tm traffmonetizer/cli start accept --token $1

elif [[ $get_arch =~ "aarch64" ]];then
    echo "ARM64机器"
    if [[ $get_arch =~ "ubuntu" ]];then
        echo "ubuntu系统"
        sudo apt-get update
        sudo apt install docker.io -y
    elif [[ $get_arch =~ "centos" ]];then
        echo "centos系统"
        yum -y update
        yum -y install docker
    else
        echo "未适配系统"
        exit 2
    fi
    echo "开始安装……请等待"
    if [[ -n $(docker ps -q -f "name=^ra-tm$") ]];then
        echo "存在同名镜像，执行删除"
        sudo docker stop ra-tm
        sudo docker rm ra-tm
    fi
    sudo docker run -d --name ra-tm traffmonetizer/cli:arm64v8 start accept --token $1
    
elif [[ $get_arch =~ "mips64" ]];then
    echo "this is mips64"
else
    echo "未知架构!!"
    exit 1
fi
exit 0
```