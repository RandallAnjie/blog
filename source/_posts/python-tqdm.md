---
title: Python tqdm进度条
tags: []
id: '299'
categories:
  - - Python
date: 2021-11-12 18:20:05
---

## tqdm包

```shell
from tqdm import tqdm
```

## 创建tqdm

```python
pbar = tqdm(range(1000))  # 创建进度条
for i in pbar:  # 在进度条中运行
    continue
```

## 参数解释

```python
iterable=None,     可迭代的对象, 在手动更新时不需要进行设置
desc=None,      传入str类型，作为进度条标题（类似于说明）
total=None,     预期的迭代次数（即进度条100的时候迭代的次数）
leave=True,     bool值, 迭代完成后是否保留进度条
file=None,      输出指向位置, 默认是终端, 一般不需要设置
ncols=None,     调整进度条宽度, 默认是根据环境自动调节长度, 如果设置为0, 就没有进度条, 只有输出的信息
mininterval=0.1,    最小的更新间隔
maxinterval=10.0,   最大更新间隔
miniters=None, 
ascii=None, 
unit='it',    描述处理项目的文字, 默认是'it', 例如: 100 it/s, 处理照片的话设置为'img' ,则为 100 img/s
unit_scale=False,    自动根据国际标准进行项目处理速度单位的换算, 例如 100000 it/s >> 100k it/s
dynamic_ncols=False, 
smoothing=0.3,
bar_format=None, 
initial=0, 
position=None, 
postfix=dict             以字典形式传入详细信息
```

## 示例代码

```python
from time import sleep
from tqdm import tqdm


for i in tqdm(range(1000)):
    sleep(0.01)
    # print(i)

pbar = tqdm(range(1000))  # 进度条
for i in pbar:
    err = 'abc'
    pbar.set_description("Reconstruction loss: %s" % err)

dict1 = {"a": 123, "b": 456}
for i in tqdm(range(1000), total=1000, desc="进度条", ncols=100, postfix=dict1, mininterval=0.3):
    sleep(0.01)

with tqdm(total=21, desc='Example', leave=True, ncols=100, unit='B', unit_scale=True) as pbar1:
    for i in range(7):
        sleep(0.5)  # 发呆0.5秒
        pbar1.update(3)  # 更新发呆进度，每次更新3个迭代次数
```

输出：

```shell
C:\Users\zhuan\PycharmProjects\test\venv\Scripts\python.exe C:/Users/zhuan/PycharmProjects/test/进度条.py
100%██████████ 1000/1000 [00:15<00:00, 63.72it/s]
Reconstruction loss: abc: 100%██████████ 1000/1000 [00:00<00:00, 3422.53it/s]
进度条: 100%█████████████████████████████████████ 1000/1000 [00:15<00:00, 63.53it/s, a=123, b=456]
Example: 100%████████████████████████████████████████████████████ 21.0/21.0 [00:03<00:00, 5.89B/s]
```