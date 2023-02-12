---
title: 搭建IPSec服务
tags: []
id: '798'
categories:
  - - 教程
date: 2022-07-21 20:08:24
---

项目地址：[hwdsl2/setup-ipsec-vpn: Scripts to build your own IPsec VPN server, with IPsec/L2TP, Cisco IPsec and IKEv2 (github.com)](https://github.com/hwdsl2/setup-ipsec-vpn)

## 安装

### 脚本方式

#### 选项 1: 使用脚本随机生成的 VPN 登录凭证（完成后会显示）

```
wget https://get.vpnsetup.net -O vpn.sh && sudo sh vpn.sh
```

#### 选项 2: 编辑脚本并提供你自己的 VPN 登录凭证

```
wget https://get.vpnsetup.net -O vpn.sh
nano -w vpn.sh
[替换为你自己的值： YOUR_IPSEC_PSK, YOUR_USERNAME 和 YOUR_PASSWORD]
sudo sh vpn.sh
```

#### 选项 3: 将你自己的 VPN 登录凭证定义为环境变量

```
# 所有变量值必须用 '单引号' 括起来
# *不要* 在值中使用这些字符：  \ " '
wget https://get.vpnsetup.net -O vpn.sh
sudo VPN_IPSEC_PSK='你的IPsec预共享密钥' \
VPN_USER='你的VPN用户名' \
VPN_PASSWORD='你的VPN密码' \
sh vpn.sh
```

### docker方式

仓库地址：[hwdsl2/docker-ipsec-vpn-server: Docker image to run an IPsec VPN server, with IPsec/L2TP, Cisco IPsec and IKEv2 (github.com)](https://github.com/hwdsl2/docker-ipsec-vpn-server)

#### 创建配置文件`/etc/ipsec/ipsec.env`

```
VPN_IPSEC_PSK=your_ipsec_pre_shared_key
VPN_USER=your_vpn_username
VPN_PASSWORD=your_vpn_password
## 多用户(空格隔开)
VPN_ADDL_USERS=xxxx1 xxxxx2
VPN_ADDL_PASSWORDS=xxxx1 xxxxx2
## 默认的是谷歌的DNS
VPN_DNS_SRV1=8.8.8.8
VPN_DNS_SRV2=8.8.4.4
```

#### 创建挂在卷

```
mkdir -p /data/ikev2-vpn-data
```

#### 创建容器并运行

```
docker run --name ipsec-vpn-server --env-file /etc/ipsec/ipsec.env --restart=always -v /data/ikev2-vpn-data:/etc/ipsec.d -p 500:500/udp -p 4500:4500/udp -d --privileged hwdsl2/ipsec-vpn-server
```

## 遇到的问题

### 连接失败——云服务器防火墙问题

最少需要放行500和4500端口的UDP数据包

### Windows无法连接

控制面板设置属性——安全——允许使用这些协议

![](http://blog.zhuanjie.ltd/img/uploads/2022/07/image-20-1024x576.png)

### Windows连接报错：无法建立计算机与VPN服务器之间的网络连接,因为远程服务器未响应

管理员终端运行：

```
REG ADD "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\PolicyAgent" /v AssumeUDPEncapsulationContextOnSendRule /t REG_DWORD /d 2 /f
```

重启电脑后生效

### 安卓IPSec登录失败

改用IKEv2登录，下载[strongswan](https://download.strongswan.org/Android/)后导入后缀.sswan的配置文件

## 个人IPSec服务器

\[vip\_only\]

本服务器搭建在东澳大利亚，已搭建VPN服务，提供信息如下：

### IPsec VPN server

Server IP: 20.28.190.114  
IPsec PSK: qwertyuiopasdfghjkl  
Username: guide  
Password: guide

*   如果需要个人账号请与我联系

### IKEv2

Android配置文件：[http://startpage.zhuanjie.ltd/download/vpn/vpnclient.sswan](http://startpage.zhuanjie.ltd/download/vpn/vpnclient.sswan)

Windows & Linux配置文件：[http://startpage.zhuanjie.ltd/download/vpn/vpnclient.p12](http://startpage.zhuanjie.ltd/download/vpn/vpnclient.p12)

iOS & macOS配置文件：[http://startpage.zhuanjie.ltd/download/vpn/vpnclient.mobileconfig](http://startpage.zhuanjie.ltd/download/vpn/vpnclient.mobileconfig)

\[/vip\_only\]

## Download

[wireguard-x86-0.5.3](https://blog.zhuanjie.ltd/img/uploads/2022/10/wireguard-x86-0.5.3.msi)[下载](https://blog.zhuanjie.ltd/img/uploads/2022/10/wireguard-x86-0.5.3.msi)

[wireguard-amd64-0.5.3](https://blog.zhuanjie.ltd/img/uploads/2022/10/wireguard-amd64-0.5.3.msi)[下载](https://blog.zhuanjie.ltd/img/uploads/2022/10/wireguard-amd64-0.5.3.msi)

[wireguard-arm64-0.5.3](https://blog.zhuanjie.ltd/img/uploads/2022/10/wireguard-arm64-0.5.3.msi)[下载](https://blog.zhuanjie.ltd/img/uploads/2022/10/wireguard-arm64-0.5.3.msi)

[WireGuard.apk](https://blog.zhuanjie.ltd/img/uploads/2022/10/WireGuard.apk)[下载](https://blog.zhuanjie.ltd/img/uploads/2022/10/WireGuard.apk)