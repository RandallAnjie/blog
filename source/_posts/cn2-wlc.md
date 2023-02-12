---
title: 第2章 物理层
tags: []
id: '818'
categories:
  - - 研
  - - 计算机网络
comments: false
date: 2022-09-20 17:50:45
---

# 第二章 物理层

#计算机网络

## 物理层接口特性

1.  **机械特性**：定义物理连接的特性，规定物理连接时所采用的规格、接口形状、引线数目、引脚数量和排列情况
2.  **电气特性**：规定传输二进制位时，线路上的信号的电压范围、阻抗匹配、传输速率和距离限制 **(电压->电平)**
3.  **功能特性**：指明某条线上出现的某一电平表示何种意义，接口部件的信号线的用途 **(电平的意义)**
4.  **规程特性（过程特性）**：定义各条物理线路的工作规程和时序关系

## 同步传输于异步传输

1.  同步传输：在同步传输的模式下，数据的传送是以一个数据区块为单位。因此同步传输又称区块传输，在传送数据时，需要先发送出一个或多个同步字符再送出整批数据。
2.  异步传输：异步传输将比特分成小组进行传送，小组可以是8位的1个字符或更长，发送方可以在任何时刻发送这些比特组，而接收方不知道它们什么时候会到达，在传送数据时加上一个字符的起始位和一个字符的终止位。

## 串行和并行

1.  串行：将一个字符的8位二进制数由低位到高位依次传输  
    速度慢、费用低、适合远距离传输  
    ![](http://blog.zhuanjie.ltd/wp-content/uploads/2022/09/串行.png)
2.  并行：将一个字符的8位二进制数同时通过8条信道传输  
    速度快、费用高、适合近距离传输  
    ![](http://blog.zhuanjie.ltd/wp-content/uploads/2022/09/并行.png)

## 数据、信号、码元

1.  数据：  
    传送信息的实体（有意义的符号序列）
2.  信号
    1.  数字信号/离散信号
    2.  模拟信号/连续信号
3.  码元  
    固定时长的信号波形  
    n进制码元中1码元->log2n比特

## 信道（逻辑通路）、信源、信宿

数据从信源发送到信宿  
信道是信号的传输媒介（**信道是有方向的**）

**ATT：信道上传递的信号**

1.  基带信号：将数字1和0直接用两种不同的电压表示，再送到**数字信道**上传输（基带传输）（近距离传输）
2.  宽带信号：将基带信号进行调制后形成的频分复用模拟信号，再传送到**模拟信道**上去传输（宽带传输）（远距离传输）

## 速率、波特、带宽

1.  码元传输速率（波特率）：单位时间内传输的码元的个数（信号脉冲个数/信号变化的次数），单位是波特（Baud）。1波特表示**数字通信系统**每秒传输一个码元。其中码元可以是多进制的，**码元速率于进制数无关**
2.  信息传输速率（信息速率，比特率）：表示单位时间内**数字通信系统**传输的**二进制**码元的个数（即比特数）（二进制码元数AKA比特数）
3.  \[\[第1章 计算机网络体系结构#^b69777带宽\]\]：
    1.  模拟信号中：最高频率和最低频率的插值即为（通频）带宽，单位赫兹（Hz）
    2.  数字信号中：单位时间从网络中的某一点到另一点能通过对最高数据率/单位时间内通过链路的数量

## 奈式准则和香农定理

1.  \==奈式准则==  
    理想低通（无噪声、带宽限制）  
    极限数据传输**速率 = 2Wlog2V**（单位为b/s）  
    W为信道带宽，单位赫兹（Hz）  
    V为每个码元离散电平的数目
2.  \==香农定理==  
    带宽受限且有噪声  
    极限数据传输\*\*速率 = 2Wlog2(1+S/N)\*\*（单位为b/s）  
    W为信道带宽，单位赫兹（Hz）  
    S为信道所传输信号的平均功率  
    N为信道内部的高斯噪声功率  
    **信噪比 = 10log10(S/N)**

## 编码与调制

数据->编码->数字信号  
数据->调制->模拟信号

1.  数字数据->数字信号
    1.  归零编码(RZ)  
        高1低0
    2.  非归零编码(NRZ)  
        高1低0
    3.  反向非归零编码(NRZI)  
        高0低1
    4.  曼彻斯特编码  
        前高后低为1
    5.  差分曼彻斯特编码  
        同1异0
    6.  4B/5B编码  
        16种4位码与16种(共32种)5位码一一对应，编码效率80%  
        ![](http://blog.zhuanjie.ltd/wp-content/uploads/2022/09/编码方式.png)
2.  数字数据->模拟信号
    1.  调幅 ASK 幅移键控
    2.  调频 FSK 频移键控
    3.  调相 PSK 相移键控
    4.  调幅+调相 QAM 正交振幅调制
3.  模拟数据->数字信号  
    PCM脉码调制
    1.  采样  
        采样定理（奈奎斯特定理）：**采样频率大于等于模拟数据的带宽频率的两倍f采样≥2f最大**
    2.  量化：将电平数值按照分级转化为数字取整
    3.  编码：把量化结果转换为对应的二进制编码
4.  模拟数据->模拟信号  
    放大器，调制器

## 电路交换、报文交换、分组交换

1.  电路交换
    1.  特点：独占资源，用户始终占用端到端的固定传输带宽。适用于远程批处理信息、传输或系统间实时性高的大量数据传输情况。
    2.  优点：
        1.  通信实验小
        2.  有序传输
        3.  没有冲突（全双工）
        4.  适用范围广
        5.  实时性强
        6.  控制简单
    3.  缺点：
        1.  建立连接时间长
        2.  线路独占，使用效率底
        3.  灵活性差
        4.  难以规格化
        5.  无存储能力
        6.  无差错控制
2.  报文交换
    1.  原理：存储、转发
    2.  优点：
        1.  无需建立连接
        2.  动态分配路线
        3.  提高线路可靠性
        4.  提高线路利用率
        5.  提供多目标服务
    3.  缺点：
        1.  实时性差
        2.  只适合数字信号
        3.  要求网络结点有较大的缓存空间
3.  分组交换
    1.  原理：限制要传输的数据单位的长度
    2.  **数据报方式**  
        特点：  
        1\. 无需建立连接  
        2\. 可能会产生失序、丢失或重复分组  
        3\. 发送的分组需要包括发送端和接收端的完整地址  
        4\. 分组再交换结点存储转发时，需要排队，即有传输时延  
        5\. 网络具有冗余路径（不适合长报文和会话式通信）  
        6\. 存储转发时延小，提高网络吞吐量  
        7\. 资源利用率高
    3.  **虚电路方式**  
        特点：  
        1\. 建立和拆除需要时间  
        2\. 连接确定了后就确定了传输路径  
        3\. 虚电路提供可靠的通信功能，能保证每个分组正确且有序到达（当接收方来不及接受数据时，可以通知发送方暂缓发送）  
        4\. 当网络某个结点或某条链路出现故障而失效时，所有经过该节点或者该链路的虚电路遭到破坏  
        5\. 分组首部不包含目的地址，而包含虚电路表示符，相对于数据报方式，其开销小

## 传输介质（物理通路）

传输介质并不知道传输的信号代表什么，而物理层规定了电气特性，传输介质位于物理层下面（第0层）

1.  导向性传输介质：电磁波沿着固体媒介传播（铜线，光纤）
2.  非导向性传输介质：自由空间，介质可以是空气、真空、水

介质：

1.  双绞线（模拟信号&数字信号）
    1.  无屏蔽网（UTP）
    2.  有屏蔽网（STP）
    3.  距离：几千米到数十千米
        1.  距离太远，对于模拟信号：要用放大器放大衰减信号
        2.  距离太远，对于数字信号：要用中继器将失真信号整形
2.  同轴电缆
    1.  基带数字信号（AKA基带同轴电缆）（局域网）
    2.  宽带信号（AKA宽带同轴电缆）（有线电视系统）
    3.  特点：有良好的抗干扰性，传输距离更远，价格较双绞线贵
3.  光纤
    1.  利用**光脉冲**通信
    2.  带宽范围极大
    3.  多模光纤：近距离传输
    4.  单模光纤：近距离传输
    5.  特点：
        1.  传输损耗小，对远距离传输特别经济
        2.  抗雷电和电磁干扰性能好
        3.  无串音干扰，保密性好
        4.  体积小重量轻
4.  无线传播介质
    1.  无线电波  
        信号向所有方向传播（有穿透能力）（无线局域网）
    2.  微波、红外和激光  
        信号沿固定方向传播
        1.  红外和激光要把传输的信号分别转换为各自的信号格式
        2.  微波通信频率高，频段范围宽（数据率高）（eg.地面微波接力通信，卫星通信）
        3.  卫星通信：
            1.  优点：通信容量大、距离远、覆盖广、易于实现广播通信和多址通信
            2.  缺点：保密性差、端到端传播时延长、受到气候影响大、误码率高、成本高

## 物理层设备

1.  中继器  
    中继器两端网段是同一个协议  
    中继器两端的网络部分是网段，而不是子网，适用于完全相同的两类网络互联  
    5-4-3规则：互相串联中继器不超过4个，这5段网络中只有3段能挂接计算机
2.  集线器  
    （多口中继器）

**ATT：放大器于中继器**

1.  放大器：放大模拟信号，将衰减的信号放大
2.  中继器：再生数字信号，将衰减的信号整形再生