---
title: 今日校园自动签到
tags: []
id: '691'
categories:
  - - Python
  - - 教程
date: 2022-07-08 21:16:25
---

## 介绍

**此项目本意是为北京印刷学院学子提供方便，代码方面针对性的对北印信工22暑期签到进行了优化**

北京印刷学院服务器目前每天晚上例行维护，签到时间请自行设定到早上七点半以后

如有疑问可以在GitHub上提交issue或在本文下方评论

项目地址：[Zhuanjier/jrxySign](https://git.zhuanjie.ltd/randall/jrxySign)

稳定版阿里云函数直接上传[此链接](https://github.com/Zhuanjier/jrxySign/files/9104079/stable-code.zip)下载的压缩包解压后的文件夹即可



## 近期运行日志

如果乱码请更换设备查看，url直接指向文本文件

[https://startpage.zhuanjie.ltd/api/signlog.txt](https://startpage.zhuanjie.ltd/api/signlog.txt)

## 更新日志

### v1.8.8(beta)

*   适配了北印信工的签到系统
*   调整新增了签到选项为其他需要填写信息的情况

### v1.8.9

*   完善上一版本更新的稳定性
*   更新了日志文档

### v1.9.0(beta)

*   新增本地保存登录信息session的`wise`模块，免于签到一次登录一次（未测试）（由于会挤掉手机端今日校园，该功能已废弃）

### v1.9.2

*   提高代码稳定性
*   优化文档

### v2.0.0

*   修复部分代码上的bug

### v2.5.0

*   完成对新教务和日期变量的适配，配置文件中的extra可填写$Data表示当前UTC日期的前一天

## 配置文件说明

1.  notifyOption（通知方式）
    *   0为禁用
    *   1为webApi模式
        *   此方式正在调试
    *   2为APPRISE模式
        *   此方式正在调试
    *   3为企业微信
2.  ocrOption（腾讯云OCR服务）
    *   用来防止学校教务验证码
3.  httpProxy（全局HTTP代理）
    *   填入家用ip即可
4.  users（用户配置）
    1.  user（用户1）
        1.  type（任务类型）
            *   0：收集
            *   1：签到
            *   2：查寝
            *   3：政工签到
            *   4：教师工作日志
        2.  schoolName（学校全称）
        3.  username（教务登录账号）
        4.  password（教务登录密码）
        5.  address（签到等显示地址）
        6.  formTitle（签到等表单包含字段）
        7.  notifyOption（通知方式）
            *   和顶部参数一致，不填默认按照顶部参数执行，填入不同参数即为独立配置
            *   rcvOption（为接受消息的账号，可以为Email账号（需要配置邮箱）、QQ号（需要配置qq机器人）、或者是企业微信ID（需要配置企业微信））
        8.  abnormalReason（反馈信息，置空）
        9.  lon（经度）（经纬度查询网址:[http://api.map.baidu.com/lbsapi/getpoint/index.html](http://api.map.baidu.com/lbsapi/getpoint/index.html)）
        10.  lat（纬度）
        11.  checkTitle（是否检查表单的标题）
            *   1：检查
            *   0：不检查
        12.  forms（表单信息）
            1.  form（问题1）
                1.  title（问题标题）
                2.  value（需要选择问题选项的值）
                    *   如果要选择选项“体温低于37.3”，则填入“体温低于37.3”
                3.  extra（附加结果）
                    *   如果选项中选择其它后需要填入信息，在此处填入信息（如果不需要可以删除此条），可以用$Date表示运行时的前一天，如“yyyy年mm月dd日”
            2.  form（问题2...）
                *   同上一条同级配置
    2.  user（用户2...）
        *   同上一条同级配置

## 部署

### 部署前准备

下载config.yam并且填写内容，必填内容如下：

*   username: '' —学号
*   password: '' —密码（登录学校教务的密码）
*   address: '' —地址（今日校园签到页面上面的地址信息）
*   lon: —经度 经纬度查询网址:[http://api.map.baidu.com/lbsapi/getpoint/index.html](http://api.map.baidu.com/lbsapi/getpoint/index.html)
*   lat: —纬度 

### 服务器部署

*   安装Python3.6+环境
*   下载并解压项目代码包
*   修改`config.yml`文件中的相关配置内容
*   运行`pip install -r requirements.txt -t ./ -i https://mirrors.aliyun.com/pypi/simple`安装项目依赖
*   执行`Python index.py`即可运行项目

![](http://blog.zhuanjie.ltd/img/uploads/2022/07/image-4.png)

pycharm测试运行结果

### 阿里云函数

*   [下载](https://github.com/Zhuanjier/jrxySign/archive/refs/heads/main.zip)并解压项目代码包（或者通过git获取包https://github.com/Zhuanjier/jrxySign.git）

登录阿里云进入[服务及](https://help.aliyun.com/document_detail/122602.html)[函数](https://fcnext.console.aliyun.com/cn-hangzhou/services)页面，开通服务

![](http://blog.zhuanjie.ltd/img/uploads/2022/07/image-8-1024x644.png)

*   创建服务

![](http://blog.zhuanjie.ltd/img/uploads/2022/07/image-9.png)

*   创建云函数并且修改配置

![](http://blog.zhuanjie.ltd/img/uploads/2022/07/image-10-1024x537.png)

*   设置触发器

![](http://blog.zhuanjie.ltd/img/uploads/2022/07/image-11-1024x421.png)

*   打开函数详情

![](http://blog.zhuanjie.ltd/img/uploads/2022/07/image-12-1024x399.png)

*   在下方终端中运行如下代码段（**末尾有英文的句点，下文同理**）

```shell
pip3 install -r requirements.txt -t .
```

*   运行完成后部署测试
*   如果出现错误，根据提示查看相应信息
*   此处列举几条遇到的问题：
    *   出现No module named 'yaml'错误时，终端运行 `pip install pyyaml -t .` 解决
    *   出现No module named 'tencentcloud'错误时，终端运行 `pip install --upgrade tencentcloud-sdk-python -t .` 解决
    *   阿里云运行函数需要修改action文件下的Utils.py文件的136行，其中文件地址由`signlog.txt`改为`/tmp/signlog.txt` 解决（原因：阿里云未开放除/tmp以外文件的写入权限）
    *   同上一条action文件下的Utils.py文件的末尾两个函数（saveWise函数和getWise函数）也需要修改地址

![](http://blog.zhuanjie.ltd/img/uploads/2022/07/image-13.png)

![](http://blog.zhuanjie.ltd/img/uploads/2022/07/image-14.png)

*   执行部署代码，然后运行测试
*   查看日志

![](http://blog.zhuanjie.ltd/img/uploads/2022/07/image-19.png)

### 常见问题

*   如果输出418错误如图则将config.yml中的httpProxy填写为你当前查询到的自己的[ip（点击此处查询自己的ip）](https://ipaddress.com/)

![](http://blog.zhuanjie.ltd/img/uploads/2022/07/image-18.png)

![](http://blog.zhuanjie.ltd/img/uploads/2022/07/image-17-1024x636.png)

## 说明

### 许可证

本项目的源代码在MPL2.0协议下发布，同时附加以下条目：

*   **非商业性使用** — 不得将此项目及其衍生的项目的源代码和二进制产品用于任何商业和盈利用途