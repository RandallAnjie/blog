---
title: 计算机网络小学期——UDP服务器的设计
tags: []
id: '371'
categories:
  - - Python
  - - 计算机网络
date: 2021-12-31 19:51:43
---

成品及源码下载链接：[Release 可执行程序 · Zhuanjier/udp-server (github.com)](https://github.com/Zhuanjier/udp-server/releases/tag/v1.0)

## 要求

UDP是TCP/IP协议族为传输层设计的两个协议之一，是一种无连接的，不可靠的协议。由于UDP采取了无连接的方式，因此协议简单，在一些特定的应用中协议运行效率高。UDP适合一些实时的应用，如IP电话、视频会议，它们要求源主机以恒定的速率发送数据，并且在网络出现拥塞时，可以丢失一些数据，但是延迟不能太大。基于这些特点，流式多媒体通信、多播等应用在传输层采用的就是UDP协议。编写一UDP服务器程序，流畅地完成视频文件地传输，要能对多个客户端进行管理。需要通过UDP模拟多个客户端连接验证的情况。

## 设计思路

### 工具

a) 编译环境：Python3.10  
b) 编译工具：PyCharm  
c) 打包工具：pyinstaller

### 调用函数库

a) time：处理时间的标准库，提供获取系统时间并格式化输出功能  
b) socket：帮助在网络上的两个程序之间建立信息通道  
c) queue：提供队列操作的模块，用于多个线程之间的数据共享  
d) basename：去掉目录路径，单独返回文件名

### 解决问题思路

本程序由于需要在网络上搭建UDP服务器来传输信息、文件，则必须要定义一个合适的确认连接以及检验文件完成性的功能。  
以TCP传输模式为样例，本程序的服务器端和客户端采用了类似TCP的三次握手确认连接和四次挥手断开连接。  
本程序采用类似FTP传输模式，利用6000端口来传送控制信息以及一些普通消息，利用7777端口来传输文件信息，利用7778端口来接收ack数据包确认信息。  
服务器端主进程开启接受消息线程，该线程负责接受捕获到的6000端口的UDP数据包，并将判断数据是否为连接、断开等命令数据。  
如接收到连接指令则将信息发送方的套接字保存创建新线程负责处理该线程发送来的信息并且创建新管道方便与之通信。  
如果是断开连接命令，则在“四次挥手”结束后结束该套接字对应的线程，释放资源。如果是其他命令，则将命令存放到信息来的套接字对应的管道中。  
管道另一头接受到信息后开始处理对应信息。处理不同套接字的消息的进程在从套接字中取到消息后开始执行程序。如果将信息通过默认命令消息处理函数处理后返回不同对应的信息，如果服务器需要执行聊天操作，则会创建新线程调用循环发送函数给该套接字发送消息。如果服务器需要执行发送文件操作则需等待客户机发送所需要的文件目录后创建两个新线程一个负责在7777端口发送文件，另一个是负责在7778端口接收确认包。  
客户端程序只需要获取服务器ip后主动连接服务器。在服务器相应后显示连接成功。同时启动两个线程，一个负责发送数据包，另一个负责接收数据包并处理。  
处理数据时，如果为传输文件确认数据包，则阻塞发送数据包的线程，并把需要的文件路径发送至服务器。然后通过对接收到服务器7777端口发送来的数据进行整理，返回给服务器7778端口确认包。全部确认后文件传输完成并唤醒发送数据进程。  
如果发送的数据为exit（断开连接命令），将状态变量改变，使得发送和接受线程全部停止，主进程等待两个线程结束后结束运行。

## 流程图

![](http://blog.zhuanjie.ltd/img/uploads/2021/12/image-745x1024.png)

服务器端流程图

![](http://blog.zhuanjie.ltd/img/uploads/2021/12/image-1-630x1024.png)

客户端流程图

## 详细设计(利用Python代码实现)

### 函数列表

函数名

参数

描述

sendto

传输文件名称,客户端套接字

用于传输文件

recv\_ack

无

确认客户端返回的确认信息

sendOne

消息,发送到的客户机的套接字

整合发送一条udp消息到指定套接字

circlesend

发送到的客户机的套接字

循环发送消息到客户端（基于聊天功能）

getfire

文件路径,发送到的客户机的套接字

获取文件函数，用于启动发送文件进程和确认客户端返回的确认进程

mafun

消息,发送到的客户机的套接字

默认命令消息处理函数

diviceConnect

发送到的客户机的套接字

连接到服务器后的设备所启动线程调用的函数

receive

无

接受消息并将消息送到管道

服务器端函数列表

函数名

参数

描述

getFile

文件名

获取文件路径，名称

receive

无

接受消息

circlesend

无

发送消息

客户端函数列表

## 主要函数代码

### 服务器端主要函数

```
# 文件传输 占用端口7777
# 三级子进程（父进程：设备对应进程）
# 变量：(传输文件名称,客户端套接字)
def sendto(fn_path, addr):
    # 读取文件全部内容
    with open(fn_path, 'rb') as fp:
        content = fp.read()
    # 获取文件大小，做好分块传输的准备
    fn_size = len(content)
    for start in range(fn_size // BUFFER_SIZE + 1):
        positions.append(start * BUFFER_SIZE)
    # 设置事件，可以启动用来接收确认信息的线程了
    e.set()
    # 窗口套接字，设置发送缓冲区大小
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_SNDBUF, BUFFER_SIZE)
    # 发送文件数据，直到所有分块都收到确认，否则就不停地循环发送
    while positions:
        for pos in positions:
            sock.sendto(f'{pos}_'.encode() + content[pos:pos + BUFFER_SIZE], (addr[0], 7777))
        time.sleep(0.1)
    # 通知，发送完成
    while file_name:
        sock.sendto(b'over_' + file_name[0], (addr[0], 7777))
    # 关闭套接字
    sock.close()
# 确认客户端返回的确认信息 占用端口7778
# 三级子进程（父进程：设备对应进程）
# 变量：空
def recv_ack():
    # 创建套接字，绑定本地端口，用来接收对方的确认信息
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind((IP, 7778))
    # 如果所有分块都确认过，就结束循环
    while positions:
        # 预期收到的确认包格式为1234_ack
        data, _ = sock.recvfrom(1024)
        pos = int(data.split(b'_')[0])
        if pos in positions:
            positions.remove(pos)
    # 确认对方收到文件名，并已接收全部数据
    while file_name:
        data, _ = sock.recvfrom(1024)
        fn = data.split(b'_')[0]
        if fn in file_name:
            file_name.remove(fn)
    sock.close()
# 整合发送一条udp消息
# 变量：(消息,发送到的客户机的套接字)
def sendOne(msg, addr):
    s.sendto(msg.encode(), addr)
# 循环发送消息到客户端（聊天功能）
# 变量：(发送到的客户机的套接字)
def circlesend(addr):
    global OCCUIPED
    while OCCUIPED:
        send_data = input("To" + str(addr) + ":")
        s.sendto(send_data.encode(), addr)
        if send_data == "exitchat":
            OCCUIPED = False
            break
# 获取文件函数，用于启动发送文件进程和确认客户端返回的确认进程
# 变量：(文件路径,发送到的客户机的套接字)
def getfire(datapath, addr):
    global fn_path, file_name
    fn_path = datapath
    file_name = [f'{basename(fn_path)}'.encode()]
    t1 = threading.Thread(target=sendto, args=(fn_path, addr))
    t1.start()
    e.clear()
    e.wait()
    t2 = threading.Thread(target=recv_ack)
    t2.start()
    # 等待发送线程和接收确认线程都结束
    t2.join()
    t1.join()
# 默认命令消息处理函数
# 变量：(消息,发送到的客户机的套接字)
def mafun(message, addr):
    if message == "help":
        sendOne("\n1.返回当前服务器时间\n2.聊天\n3.文件传输\n4.关于\nexit——退出 help——帮助", addr)  # man——指令详情
    elif message == "1":
        ticks = time.time()
        sendOne("\n当前服务器时间戳为:" + str(ticks) + "\n当前服务器时间为" + str(time.asctime(time.localtime(ticks))), addr)
    elif message == "2":
        global OCCUIPED
        if OCCUIPED != "":
            return "聊天室搭建失败，聊天室被占用！"
        else:
            OCCUIPED = str(addr)
            tsend = threading.Thread(target=circlesend, args=(addr,))  # 开启发送消息线程
            tsend.start()
            sendOne("chatconfirm", addr)
    elif message == "3":
        sendOne("transferconfirm", addr)
        datapath = Pipe[addr].get()
        getfire(datapath, addr)  # 调用获取文件函数
        print("文件传输完成")
    elif message == "4":
        sendOne("\n本程序是我的计算机网络小学期作业\n@author: 朱安杰 194020215", addr)
    else:
        sendOne("未知命令：" + message, addr)
def diviceConnect(addr):
    global OCCUIPED
    while state[addr]:
        msg = Pipe[addr].get()
        if OCCUIPED == str(addr):
            if msg == "exitchat":
                OCCUIPED = ""
                print("结束聊天")
                continue
            print(str(addr) + ":" + msg)
            continue
        mafun(msg, addr)
# 接受消息 持续监听6000端口 二级子进程（父进程：主进程（用户进程）；子进程：各个用户设备处理信息对应的进程）
# 接收到的消息分为两类：1.指令形消息2.内容形消息
# 指令形式消息：根据接受到的消息和判断已经存在的设备列表分配（删除）独立进程
# 内容形消息：根据套接字将消息发送给对应的进程（唤醒进程）
def receive():
    while True:
        data, addr = s.recvfrom(BUFFER_SIZE)  # 获取消息
        print("终端： %s:%s 数据： " % addr + str(data))  # 打印获取信息
        if data == b"tryconnect":  # 对信息进行分类处理
            ConnectedDivice.append(addr)
            print("设备：" + str(addr) + " 已被发现！")
            state[addr] = True
            q = queue.Queue()  # 创建通信管道
            Pipe[addr] = q  # 管道存入字典
            tcreate = threading.Thread(target=diviceConnect, args=(addr,))  # 发现设备后创建分配进程给设备
            tcreate.start()
            # 创建完成后返回连接成功确认
            s.sendto(b"connectconfirm", addr)
            s.sendto("输入help获取选项列表".encode(), addr)
        elif data == b"exit":
            s.sendto(b"exitconfirm", addr)
            s.sendto(b"over", addr)
        elif data == b"overconfirm":
            print("设备：" + str(addr) + " 已主动离线！")
            del state[addr]  # 删除字典
            ConnectedDivice.remove(addr)  # 删除设备列表
        else:
            Pipe[addr].put(data.decode())
```

### 客户端程序

```
# 获取文件路径，名称
# 变量(文件名)
def getFile(filename):
    filepath, tempfilename = os.path.split(filename)
    shotname, extension = os.path.splitext(tempfilename)
    return filepath, shotname, extension
# 接受消息 持续监听端口 二级子进程（父进程：主进程（用户进程））
def receive():
    global go
    while True:
        if go:
            break
        response, addred = s.recvfrom(1024 * 1024)
        if response == b"exitconfirm":
            responsee, addrede = s.recvfrom(1024 * 1024)
            if responsee == b"over":
                s.sendto("overconfirm".encode(), addr)
                print("--------断开服务器：%s:%s--------" % addr)
                s.close()
                go = True
                break
        elif response == b"chatconfirm":
            continue
        elif response == b"transferconfirm":
            print("--------文 件 传 输--------")
            getfirename = input('请输入想要获取的文件:')
            dst = input('请输入用来保存文件的目标位置:')
            s.sendto(getfirename.encode(), addr)
            BUFFER_SIZE = 1024 * 1024
            # 用来临时保存数据
            data = set()
            # 接收数据的Socket
            sock_recv = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            sock_recv.bind((IP, 7777))
            # 确认反馈地址
            ack_address = (IP, 7778)
            sock_ack = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            # 重复收包次数
            repeat = 1
            while True:
                buffer, _ = sock_recv.recvfrom(BUFFER_SIZE)
                # 全部接收完成,获取文件名
                if buffer.startswith(b'over_'):
                    fn = buffer[5:].decode()
                    # 多确认几次文件传输结束,防止发送方丢包收不到确认
                    for i in range(5):
                        sock_ack.sendto(fn.encode() + b'_ack', ack_address)
                    break
                # 接收带编号的文件数据,临时保存,发送确认信息
                buffer = tuple(buffer.split(b'_', maxsplit=1))
                if buffer in data:
                    repeat = repeat + 1
                else:
                    data.add(buffer)
                sock_ack.sendto(buffer[0] + b'_ack', ack_address)
            sock_recv.close()
            sock_ack.close()
            print(f'重复接收数据{repeat}次')
            data = sorted(data, key=lambda item: int(item[0]))
            with open(rf'{dst}/{fn}', 'wb') as fp:
                for item in data:
                    fp.write(item[1])
            print("传输完成")
            q.put(1)
        else:
            print("%s:%s：" % addr + str(response.decode()))
# 发送消息
def circlesend():
    while True:
        send_data = input()
        s.sendto(send_data.encode(), addr)
        if send_data == "3":
            q.get()
        if go:
            break
```

## 运行结果

打开服务器和客户端后执行不同功能如图

![](http://blog.zhuanjie.ltd/img/uploads/2021/12/image-5.png)