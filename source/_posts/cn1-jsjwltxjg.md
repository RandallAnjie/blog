---
title: 第1章 计算机网络体系结构
tags: []
id: '814'
categories:
  - - 研
  - - 计算机网络
comments: false
date: 2022-09-20 17:39:51
---

# 第一章 计算机网络体系结构

#计算机网络

## 计算机网络的发展

1.  APARnet——internet——Internet
    1.  internet——互联网
    2.  Internet——因特网
2.  三层体系结构因特网
    1.  主干网
    2.  地区网
    3.  校园网
3.  多层次ISP
    1.  主干ISP——地区ISP——本地ISP
    2.  出现IXP
    3.  ISP：网络服务提供着（商）
    4.  IXP：因特网交换点（处于同一层次的ISP之间）

## 计算机网路的组成

1.  从组成部分上看：硬件、软件、协议
2.  从工作方式上看：边缘部分、核心部分
3.  从功能组成上看：通信子网、资源子网
    1.  通信子网：物理层、数据链路层、网络层（主要负责数据通信）
    2.  资源子网：会话层、表示层、应用层（主要负责向高层用户屏蔽下面通信子网的细节）
        *   OSI模型种上三层

**ATT：协议的组成部分：语法、语义、同步（时序）**

## 计算机网络的功能

1.  数据通信  
    _即通信子网功能_
2.  资源共享  
    _即资源子网功能_
3.  分布式处理
4.  提高可靠性
5.  负载均衡

## 计算机网络的分类

1.  按分布范围分类
    1.  广域网（WAN）  
        _采用交换技术_
    2.  城域网（MAN）
    3.  局域网（LAN）  
        _采用广播技术_
    4.  个域网（PAN）
2.  按传输技术分类
    1.  广播式网络  
        _常为总线型网络，共享通信信道_
    2.  点对点网络  
        _常使用分组，存储、转发和路由选择机制_
3.  按拓扑结构分类
    1.  总线型网络
    2.  星形网络
    3.  环形网络
    4.  网状网络
4.  按使用者分类
    1.  公用网
    2.  专用网
5.  按交换技术分类（_交换技术指的是数据交换技术_）
    1.  电路交换
    2.  报文交换
    3.  分组交换  
        _报文交换和分组交换采用存储—转发技术_
6.  按传输介质分类
    1.  有线网络
    2.  无线网络

## 计算机网络的性能指标

1.  带宽  
    指的是通信线路允许通过的信号频带范围/**网络通信线路能传送的数据的能力**，单位赫兹(Hz)/比特/秒(b/s)  
    ^b69777
2.  时延
    1.  发送时延  
        发送时延 = 分组长度 / 信道宽度
    2.  传播时延  
        传播时延 = 信道长度 / 电磁波在信道上的传播速率
    3.  处理时延
    4.  排队时延  
        总时延 = 发送时延 + 传播时延 + 处理时延 + 排队时延  
        排队时延和处理时延一般可以忽略
3.  时延带宽积  
    以比特为长度的链路单位  
    时延带宽积 = 传播时延 \* 信道带宽
4.  往返时延  
    RTT = 两倍传播时延（忽略处理时延）
5.  吞吐量  
    单位时间通过某个网络（或信道、接口）的数据量，单位b/s
6.  速率（传输速率、数据率、比特率）  
    宏观数字信道上的传送数据的速率，单位b/s(bps)  
    最高数据传输速率称为带宽
7.  信道利用率  
    信道利用率 = 有数据通过的时间 / 总时间

**ATT：单位换算**

1.  速率： 1Tb/s = 103Gb/s = 106Mb/s = 109Kb/s = 1012b/s 比特/秒 ^217130
2.  存储量： 1TB = 210GB = 220MB = 230KB = 240B 字节 = 8\*240bit ^475694

## 计算机网络的分层结构

1.  SDU 服务数据单元 每层的数据部分
2.  PCI 协议控制信息 每层的首/尾部分
3.  PDU 协议数据单元 每层的全部信息  
    PCI + SDU = PDU  
    n+1-PDU = n-SDU

## OSI参考模型

OSI模型

功能

协议

SAP

\[\[第6章 应用层应用层\]\]

与用户交互

FTP, SMTP, HTTP，DHCP

提供的服务为用户界面

表示层

1\. 数据格式变换 2. 数据加密解密 3. 数据的压缩与恢复

JPEG, ASCII

 

会话层

1\. 建立、管理、中止会话 2. 使用校验点，使通信失效时，从会话校验点/同步点继续恢复通信（大文件传输）

ADSP, ASP

 

\[\[第5章 传输层传输层\]\]

1\. 可靠/不可靠传输 2. **差错控制** 3. **流量控制** 4. 复用分用 5. **拥塞控制**

TCP, UDP

端口

\[\[第4章 网络层网络层\]\]

1\. 路由选择（分组转发） 2. **流量控制** 3. **差错控制** 4. **拥塞控制**

IP, IPX, ICMP ,IGMP, ARP, RARP, OSPF

IP地址（网络地址）

\[\[第3章 数据链路层数据链路层\]\]

1\. 成帧（定义帧的开始和结束） 2. **差错控制**（帧错+位错）（数据重发） 3. **流量控制**（物理寻址） 4. 访问（接入）控制（介质访问子层控制信道的访问）

SDLC, HDLC, PPP, STP, 帧中继，ARQ

MAC地址（网卡地址）

\[\[第2章 物理层物理层\]\]

1\. 定义接口特性 2. 定义传输模式（单工、半双工、全双工） 3. 定义传输速率 4. 比特同步 5. 比特编码

Rj45, 802.3

网卡接口

SAP：服务访问点，逻辑接口，是一个层次系统的上下层之间进行通信的接口，N层的SAP就是N+1层可以访问N层服务的地方 ^690d1a

 

 

 

> 其中**数据链路层**被拆分为两个子层：**逻辑控制（LLC）子层**和**媒体接入（MAC）子层**  
> **LLC子层**与传输媒体无关，它**向网络层提供无确认无连接、面向连接、带确认无连接、高速传输**4种不同的连接服务类型  
> **MAC子层**有接入传输媒体有关的内容，它向上屏蔽对物理层访问的各种差异，提供对物理层的统一访问接口，主要功能包括：**组帧和拆卸帧、比特传输（帧的寻址和识别）、差错检测、透明传输**

5层模型

传输单位

\[\[第6章 应用层应用层\]\]

报文

\[\[第5章 传输层传输层\]\]

报文段（TCP），用户数据报（UDP）

\[\[第4章 网络层网络层\]\]

分组，数据报

\[\[第3章 数据链路层数据链路层\]\]

帧

\[\[第2章 物理层物理层\]\]

比特流

**ATT： TCP/IP模型和OSI模型的比较**

1.  相同点：
    1.  都采用分层体系结构
    2.  都是基于独立的协议栈的概念
    3.  都可以解决异构网络的互联
2.  不同点：
    1.  **OSI模型**定义了三个概念**服务、协议和接口**
    2.  OSI不偏向于特定的协议
    3.  TCP/IP协议将网际协议(IP)作为一个单独的重要层次
    4.  OSI在网络层支持无连接和面向连接的通信，但在传输层只有面向连接的通信；TCP/IP在网际层只有无连接的通信模式，但在传输层有无连接和面向连接的两种模式

 

OSI

TCP/IP

\[\[第5章 传输层传输层\]\]

面向连接

无连接+面向连接

\[\[第4章 网络层网络层\]\]

无连接+面向连接

无连接

![](http://blog.zhuanjie.ltd/wp-content/uploads/2022/09/TCPIP协议栈-1024x763.png)

* * *

**\[\[第4章 网络层#冲突域和广播域关于冲突域和广播域\]\]**

设备

所属层次

能否隔离冲突域

能否隔离广播域

\[\[第2章 物理层#物理层设备集线器\]\]

\[\[第2章 物理层物理层\]\]

不能

不能

\[\[第2章 物理层#物理层设备中继器\]\]

\[\[第2章 物理层物理层\]\]

不能

不能

\[\[第3章 数据链路层#交换机交换机\]\]

\[\[第3章 数据链路层数据链路层\]\]

能

不能

\[\[第3章 数据链路层#网桥网桥\]\]

\[\[第3章 数据链路层数据链路层\]\]

能

不能

\[\[第4章 网络层#路由器的组成和功能路由器\]\]

\[\[第4章 网络层网络层\]\]

能

能

^b35684