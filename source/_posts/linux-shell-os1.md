---
title: Linux下Shell语言编写程序——操作系统实验1
tags: []
id: '151'
categories:
  - - Linux
  - - 操作系统
date: 2021-10-18 18:44:20
---

## 实验目的

(1)通过实验使学生了解Linux提供的用户界面中的作业批处理操作界面：

(2)掌握Linux Shell脚本的编辑和执行，熟悉批处理语言的编程方法：

(3)熟悉Linux提供的文本编辑器vi (Gedit)的使用。

## 实验预备知识

(1)Linux文本编辑器vi (Gedit) 。

(2)Linux批处理文件(Shell脚本)的编辑和执行

## 实验内容

(1)用Shell语言编制一个批处理程序，其功能如下：

 1) 屏幕提示用户键盘输入年、月；

 2) 接收用户的输入值；

 3) 输出该年该月的日历。

(2)创建一个Shell文件，完成以下功能：

 1) 将键盘输入的内容保存到文件myfile.txt 中；

 2) 显示该文件内容；

 3) 显示当前目录下的所有文件和目录名称。

## 代码

### E1-3-1.sh

```
#!/bin/bash
## “#!”是一个约定的标记，它告诉系统这个脚本需要哪一种解释器来执行
## 编译之前需要加权：$ chmod +x 文件名

## 提示输入年
echo "Please input year: "
## 将年读入变量YEAR
read YEAR
## 提示输入月
echo "Please input month: "
## 将月存入变量MONTH
read MONTH
## 输出日历
cal $MONTH $YEAR

## date命令：显示日期与时间的命令
## 其中date命令又可以带一些参数，如果我们想让当前的日期的显示格式为2015-05-14 21：22则应该输入date +%Y-%m-%d，如果输出具体时间，格式为21：22，表示当前的时间的话，可以输入date +%H:%M
## cal命令：显示日历的命令
## 如果要列出当前这个月份的月历，可以直接使用命令cal即可，如果我们想列出某个年的月历情况，我们可以输入命令cal 2016，如果想列出某个年的某个月的话，我们可以输入命令cal 9 2015，即可查看2015年9月份的日历
## bc命令：一个简单好用的计算器
## 加法：+    减法：-    乘法：*    除法：/    指数：^    余数：%
## 使用quit命令可以退出bc计算器
## bc默认仅输出整数，如果要输出全部小数，那么就必须要执行scale=number，这里的number指的是小数点后的位数
```

### E1-3-2.sh

```
#!/bin/bash

echo "Please input some word: "
read WORD
echo $WORD >> myfile.txt
## 一个箭头会覆盖写入，两个箭头是追加写入
echo "The word in myfile.txt: "
## cat命令用于连接文件并将内容输出到标准输出设备上
cat myfile.txt
echo "The doucments in this dictionary: "
ls
```

## 截图

对E1-3-1.sh进行加权后运行：

![](http://blog.zhuanjie.ltd/img/uploads/2021/10/image-4.png)

对E1-3-2.sh进行加权后运行：

![](http://blog.zhuanjie.ltd/img/uploads/2021/10/image-3.png)