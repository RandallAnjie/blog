---
title: Python的列表，集合，字典的区别和使用
tags: []
id: '142'
categories:
  - - Python
date: 2021-10-16 14:26:26
---


## 列表List

```python
res = [1,2,'Randall']

# 增加元素：extend和append

# 如果想添加的一个元素是一个列表，那么append是将这个这个列表作为一个元素添加进来，而extend是将列中的元素一个一个添加进去
res.append(1)
res.extend('R')

# 删除元素：del，pop，切片，remove
del res[1]# 删除指定位置的元素
res.pop(1)# 弹出（删除）该位置上的元素，没有指定则是最后一个元素
res = res[:2]+res[3:]#切片：从开始到角标为2的左边一个元素加上角标为3的元素到最后一个元素
res.remove(2)# 删除指定值的元素

# 更改元素
res[1] = 100# 将指定位置的元素改为100

# 查元素
print(res[0])# 输出指定元素

```


### 列表内置函数完整列表

|   函数    |        描述        |
| :-------: | :----------------: |
| len(list) |    列表元素个数    |
| max(list) | 返回列表元素最大值 |
| min(list) | 返回列表元素最小值 |
| list(seq) |  将元组转换为列表  |



### 列表内置方法完整列表

|                方法                 |                             描述                             |
| :---------------------------------: | :----------------------------------------------------------: |
|          list.append(obj)           |                    在列表末尾添加新的对象                    |
|           list.count(obj)           |                统计某个元素在列表中出现的次数                |
|          list.extend(seq)           | 在列表末尾一次性追加另一个序列中的多个值（用新列表扩展原来的列表） |
|           list.index(obj)           |           从列表中找出某个值第一个匹配项的索引位置           |
|       list.insert(index, obj)       |                        将对象插入列表                        |
|       list.pop(\[index=-1\])        | 移除列表中的一个元素（默认最后一个元素），并且返回该元素的值 |
|          list.remove(obj)           |                移除列表中某个值的第一个匹配项                |
|           list.reverse()            |                        反向列表中元素                        |
| list.sort( key=None, reverse=False) |                       对原列表进行排序                       |
|            list.clear()             |                           清空列表                           |
|             list.copy()             |                           复制列表                           |

* * *

## 集合Set

创建一个空集合必须用 **set()** 而不是 **{ }**，因为 **{ }** 是用来创建一个空字典。

```python
# 创建
parame = {value01,value02,...}
parame = set(value)

# 增加元素：add和update
parame.add(1)
parame.update(x)# x可以是列表，元组，字典等，若有多个x，每个x中间用逗号隔开

# 删除元素：remove，discard， pop() 
parame.remove(x)# 删除指定元素,若元素不存在则会发生错误
parame.discard(x)# 删除指定元素,若元素不存在不会发生错误
parame.pop()# 随机删除集合中的一个元素

# 计算集合parame里的元素个数
len(parame)

# 清空集合
parame.clear()

# 判断元素x是否在集合parame中
x in parame# 存在返回 True，不存在返回 False
```



### 集合内置方法完整列表

|              方法               |                             描述                             |
| :-----------------------------: | :----------------------------------------------------------: |
|              add()              |                        为集合添加元素                        |
|             clear()             |                     移除集合中的所有元素                     |
|             copy()              |                         拷贝一个集合                         |
|          difference()           |                      返回多个集合的差集                      |
|      difference\_update()       |         移除集合中的元素，该元素在指定的集合也存在。         |
|            discard()            |                     删除集合中指定的元素                     |
|         intersection()          |                        返回集合的交集                        |
|     intersection\_update()      |                       返回集合的交集。                       |
|          isdisjoint()           | 判断两个集合是否包含相同的元素，如果没有返回 True，否则返回 False。 |
|           issubset()            |           判断指定集合是否为该方法参数集合的子集。           |
|          issuperset()           |           判断该方法的参数集合是否为指定集合的子集           |
|              pop()              |                         随机移除元素                         |
|            remove()             |                         移除指定元素                         |
|     symmetric\_difference()     |               返回两个集合中不重复的元素集合。               |
| symmetric\_difference\_update() | 移除当前集合中在另外一个指定集合相同的元素，并将另外一个指定集合中不同的元素插入到当前集合中。 |
|             union()             |                      返回两个集合的并集                      |
|            update()             |                        给集合添加元素                        |

* * *

## 字典Dict

```
# 创建空的字典
dict1 = dict()
empty_dict = {}# 空的花括号代表空的dict
dict2 = {'A': 1, 'B': 2, 'C': 3}
dict3 = {(20, 30):'good', 30:'bad'}# 使用元组作为dict的key
dict4 = dict(spinach = 1.39, cabbage = 2.59)# 使用关键字参数来创建字典，输出为{'spinach': 1.39, 'cabbage': 2.59}

# 增加元素：
dict2['D'] = 93# 对不存在的key赋值，就是增加key-value对
# 如果对 dict 中存在的 key-value 对赋值，新赋的 value 就会覆盖原有的 value

# 删除元素：del
del dict2['A']

# 清空集合
dict2.clear()

# 判断元素x是否在集合parame中
'A' in dict2# 存在返回 True，不存在返回 False
```



### 字典内置函数/方法完整列表



|                 函数/方法                 |                             描述                             |
| :---------------------------------------: | :----------------------------------------------------------: |
|                 len(dict)                 |                 计算字典元素个数，即键的总数                 |
|                 str(dict)                 |                输出字典，可以打印的字符串表示                |
|              type(variable)               |       返回输入的变量类型，如果变量是字典就返回字典类型       |
|            radiansdict.clear()            |                      删除字典内所有元素                      |
|            radiansdict.copy()             |                     返回一个字典的浅复制                     |
|          radiansdict.fromkeys()           | 创建一个新字典，以序列seq中元素做字典的键，val为字典所有键对应的初始值 |
|    radiansdict.get(key, default=None)     |  返回指定键的值，如果键不在字典中返回 default 设置的默认值   |
|                key in dict                |          如果键在字典dict里返回true，否则返回false           |
|            radiansdict.items()            |                    以列表返回一个视图对象                    |
|            radiansdict.keys()             |                       返回一个视图对象                       |
| radiansdict.setdefault(key, default=None) | 和get()类似, 但如果键不存在于字典中，将会添加键并将值设为default |
|         radiansdict.update(dict2)         |               把字典dict2的键/值对更新到dict里               |
|           radiansdict.values()            |                       返回一个视图对象                       |
|           pop(key\[,default\])            | 删除字典给定键 key 所对应的值，返回值为被删除的值。key值必须给出。 否则，返回default值 |
|                 popitem()                 |             随机返回并删除字典中的最后一对键和值             |

