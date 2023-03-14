---
title: Ubuntu开启crontab执行日志
tags: []
id: '1027'
categories:
  - - Linux
date: 2022-12-09 15:45:55
---

Ubuntu默认不开启crontab的日志，但是在启动项里面有注释

未开启状态时，日志文件夹是这样的：

![日志文件夹](https://blog.zhuanjie.ltd/img/uploads/2022/12/image-1024x100.png)

## 开启方式

1.  编辑 `/etc/rsyslog.d/50-default.conf` 文件
2.  取消注释 `cron.* /var/log/cron.log` 这一行
3.  保存文件后运行 `sudo service rsyslog restart` 重启日志服务
4.  之后crontab运行的日志就放在 `/var/log/cron.log` 里面了

## 运行日志

```shell
root@22-12-9-0643:~# sudo vim /etc/rsyslog.d/50-default.conf
root@22-12-9-0643:~# sudo service rsyslog restart
```

## 说明

crontab所有作业均由外壳执行，因此需要过命令启动该外壳片段以更改目录，如每10分钟在 `/root/DDNS/src` 下运行 `python3 DDNS.py`则需在crontab中写成：

```shell
*/10 *  * * *   cd /root/DDNS/src/ && python3 /root/DDNS/src/DDNS.py
```