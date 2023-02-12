---
title: 动态ip配置阿里云DDNS
tags: []
id: '1032'
categories:
  - - Linux
date: 2022-12-09 16:15:58
---

使用仓库：[利用Python+阿里云云解析API实现DDNS (github.com)](https://github.com/mgsky1/DDNS)

仓库文件：[https://cloudreve.zhuanjie.ltd/s/OKCP](https://cloudreve.zhuanjie.ltd/s/OKCP)

家庭等动态ip绑定域名需要实时更新域名指向的ip

## 准备工作

在阿里云控制台创建一个拥有使用DNS解析权限的AccessKey，记住AccessKeyId和AccessKeySecret，所需权限如下图

![](https://blog.zhuanjie.ltd/img/uploads/2022/12/image-1-1024x460.png)

## 开始安装

服务器端需要`python3`和`aliyun-python-sdk-core`库，在服务器上运行：

```
sudo apt install python3 python3-pip -y
sudo pip3 install aliyun-python-sdk-core
```

在服务器上下载文件并解压或直接git拉去

```
git clone https://github.com/mgsky1/DDNS.git
```

编辑配置文件

```
vim ./DDNS/src/config.json
```

```
{
    "AccessKeyId": "Your_AccessKeyId",//你的阿里云AccessKeyId
    "AccessKeySecret": "Your_AccessKeySecret",//你的阿里云AccessKeySecret
    "First-level-domain": "Your_First-level-domain",//一级域名，例如 example.com
    "Second-level-domain": "Your_Second-level-domain"//二级域名，例如 ddns.example.com 填入ddns即可
}
```

最后运行即可

成功案例：

```
root@22-12-9-0643:~/DDNS/src# python3 DDNS.py 
{'type': 'A', 'ip': '##.##.##.##'}
成功！
```

失败案例：

```
root@instance-20221206-1430:~/DDNS/src# python3 DDNS.py 
{'type': 'A', 'ip': '##.##.##.##'}
失败！原因为
The DNS record already exists.
可参考:https://help.aliyun.com/document_detail/29774.html?spm=a2c4g.11186623.2.20.fDjexq#%E9%94%99%E8%AF%AF%E7%A0%81
或阿里云帮助文档
```

此处为已经存在相同名称相同ip的解析