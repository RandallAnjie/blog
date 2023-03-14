---
title: Linux下将长期运行命令变为系统服务
tags: []
id: '670'
categories:
  - - Linux
date: 2022-06-13 12:21:10
---

在/lib/systemd/system/中新建“服务名.service”文件。

vim /lib/systemd/system/服务名.service 内容如下：

```ini
[Unit]
Desctiption = 服务名称
After = network.target syslog.target
Wants = network.target

[Service]
Type = simple
ExecStart = “命令”

[Install]
WantedBy = multi-user.target
```

**启动服务**

```shell
systemctl start 服务名.service
```

**查看状态**

```shell
systemctl status 服务名.service
```

**设置开机自启**

```shell
systemctl enable 服务名.service
```