---
title: Ubuntu下x-ui面板搭建
tags: []
id: '1044'
categories:
  - - Linux
date: 2022-12-09 16:45:50
---

原始仓库：[https://github.com/vaxilu/x-ui](https://github.com/vaxilu/x-ui)

## 介绍

x-ui面板支持vmess、vless、trojan、shadowsocks、dokodemo-door、socks、http等协议

## 安装准备

安装面板需要关闭防火墙，运行：

```shell
sudo iptables -P INPUT ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo iptables -P OUTPUT ACCEPT
sudo iptables -F
```

卸载netfilter-persistent

```shell
apt-get purge netfilter-persistent
```

删除iptables并重启服务器

```shell
rm -rf /etc/iptables && reboot
```

## 开始安装

### 自动安装

```shell
bash <(curl -Ls https://raw.githubusercontent.com/vaxilu/x-ui/master/install.sh)
```

### 手动安装

从release页面下载最新安装包，并且上传至`/root/`文件夹并且解压，运行：

```shell
cd /root/
rm x-ui/ /usr/local/x-ui/ /usr/bin/x-ui -rf
tar zxvf x-ui-linux-amd64.tar.gz # 替换为你对应设备的对应压缩包
chmod +x x-ui/x-ui x-ui/bin/xray-linux-* x-ui/x-ui.sh
cp x-ui/x-ui.sh /usr/bin/x-ui
cp -f x-ui/x-ui.service /etc/systemd/system/
mv x-ui/ /usr/local/
systemctl daemon-reload
systemctl enable x-ui
systemctl restart x-ui
```

## 开始使用

使用安装时的`ip:端口`或者`域名:端口`进入面板

![](https://blog.zhuanjie.ltd/img/uploads/2022/12/image-2-1024x384.png)

入站列表中添加结点

## 特殊说明

tls支持密钥+公钥文件或者直接输入，可用acme申请