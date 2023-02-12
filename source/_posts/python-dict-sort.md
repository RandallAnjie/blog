---
title: python中的字典排序
tags: []
id: '278'
categories:
  - - Python
date: 2021-11-09 18:54:10
---

字典是一个无序的数据结构，一般都不对其进行排序的。但是要想对字典进行排序，是可以通过`sorted()`函数进行操作。首先声明注意一点字典中的值需要为同一种数据类型；比如在本文中的值都是字符串类型。

```
# 先定义一个字典
sys = {'name': '张三',
       'age': '十八',
       'gender': '男'}

#  单独打印出排序后的key值
new_sys = sorted(sys)
print(new_sys)

new_sys = sorted(sys.keys())
print(new_sys)

# 根据key的升序排列，把key value都打印出来
new_sys1 = sorted(sys.items(), key=lambda d: d[0], reverse=False)
print(new_sys1)

new_sys1 = sorted(sys.items(), reverse=False)
print(new_sys1)

# 单独打印出排序后的value值
new_sys1 = sorted(sys.values())
print(new_sys1)

# 打印出根据value排序后的键值对的具体值
new_sys2 = sorted(sys.items(),  key=lambda d: d[1], reverse=False)
print(new_sys2)
```

输出为：

```
['age', 'gender', 'name']
['age', 'gender', 'name']
[('age', '十八'), ('gender', '男'), ('name', '张三')]
[('age', '十八'), ('gender', '男'), ('name', '张三')]
['man', '十八', '张三'] 
[('gender', 'man'), ('age', '十八'), ('name', '张三')]
```

`new_sys = sorted(sys)`将字典直接传入到`sorted`函数中 ，`sorted`函数会默认根据字典的键k对字典进行排序，同时只取字典的键k的内容，并以列表的形式返回

```
new_sys1 = sorted(sys.items(), key=lambda d: d[0], reverse=False)
```

`sys.items()`这段代码，在打印输出后，会显示如下结果：

```
dict_items([(‘name’, ‘张三’), (‘age’, ‘十八’), (‘gender’, ‘man’)])

// 将原来的字典中的键值对，分别搜存入到一个元组中–>(key,value)
```

`key=lambda` `d: d[0]` 是一个匿名函数；  
其中：

```
d == (‘name’, ‘张三’) 或 (‘age’, ‘十八’)或(‘gender’, ‘man’)
```

`d[0]`是获取每个元组中的第一个元素，就是原`sys`字典中的`key`；并将匿名函数的返回值返回给`sorted`函数的key参数

`reverse=False` 排序默认是按照升序排列的，也可以改为`True`

`sorted(sys.values())` `sorted`函数默认是根据键`key`排序的，所以想要根据值`value`排序，就需要在`sys`后面使用`values()`，获取字典的`value`值

```
new_sys2 = sorted(sys.items(), key=lambda d: d[1], reverse=False)
```

```
d == (‘name’, ‘张三’) 或 (‘age’, ‘十八’)或(‘gender’, ‘man’)
```

`d[1]`是获取每个元组中的第二个元素，就是原`sys`字典中的`value`；并将匿名函数的返回值返回给`sorted`函数的`key`参数