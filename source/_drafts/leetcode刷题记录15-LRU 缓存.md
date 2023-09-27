---
title: leetcode刷题记录15-LRU 缓存
date: 2023-06-20 13:55:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## LRU 缓存

>  [原题传送门](https://leetcode.cn/problems/lru-cache/description/)

给定两个大小分别为`m`和`n`的正序（从小到大）数组`nums1`和`nums2`。请你找出并返回这两个正序数组的**中位数**。
请你设计并实现一个满足[LRU (最近最少使用) 缓存](https://baike.baidu.com/item/LRU)约束的数据结构。
实现`LRUCache`类：
- `LRUCache(int capacity)`以`正整数`作为容量`capacity`初始化 LRU 缓存
- `int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
- `void put(int key, int value)`如果关键字`key`已经存在，则变更其数据值`value`；如果不存在，则向缓存中插入该组`key-value`。如果插入操作导致关键字数量超过`capacity`，则应该**逐出**最久未使用的关键字。
函数`get`和`put`必须以`O(1)`的平均时间复杂度运行。

## 示例

输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]

解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4



提示：

- `1 <= capacity <= 3000`
- `0 <= key <= 10000`
- `0 <= value <= 100000`
- 最多调用`2 * 105`次`get`和`put`


## 解答

### C++1

LRU缓存的实现方式使用了`std::list`和`std::unordered_map`，它们分别用于保存缓存中的键的顺序和键值对数据。

- `keys`是一个`list`，用于存储缓存中的键。这个`list`的头部始终存储最近被访问的键，尾部存储最近最少被访问的键。
- `cache`是一个`unordered_map`，其中键就是缓存的键，值是一个`pair`，其中`first`部分存储缓存的值，`second`部分存储对应键在`keys`中的迭代器。
- `get`方法首先检查给定的键是否存在于缓存中。如果存在，那么就在`keys`中删除对应的键，然后将它插入到`keys`的头部，然后更新在`cache`中的迭代器，并返回对应的值。`get`操作通过哈希表（`std::unordered_map`）查找键的复杂度为O(1)；删除list中的元素和在list头部插入元素的复杂度也都是O(1)。所以`get`操作的总时间复杂度是O(1)。
- `put`方法首先检查给定的键是否存在于缓存中。如果存在，那么就在`keys`和`cache`中删除对应的键和值。然后，如果`keys`的大小已经等于缓存的容量，那么就在`keys`和`cache`中删除最近最少被访问的键和值（即`keys`的尾部）。最后，将新的键插入到`keys`的头部，并在`cache`中添加对应的值和迭代器。`put`操作通过哈希表查找键的复杂度为O(1)；删除list中的元素、在list头部插入元素和在哈希表中插入元素的复杂度也都是O(1)。所以`put`操作的总时间复杂度是O(1)。

因此，无论是`get`操作还是`put`操作，其时间复杂度都是O(1)，这意味着无论缓存的容量大小如何，获取和存放数据的操作速度都能保持恒定，这也是哈希表和双向链表结合实现LRU缓存的主要优点。

```c++
class LRUCache {
    int capacity;  // 缓存的最大容量
    list<int> keys;  // 保存缓存键的list，最近使用的key在list头部，最少使用的key在list尾部
    unordered_map<int, pair<int, list<int>::iterator>> cache;  // 哈希表，保存key对应的值和在list中的位置
public:
    LRUCache(int capacity) : capacity(capacity) {}  // 构造函数，初始化缓存容量

    int get(int key) {  // 获取键对应的值
        if(cache.find(key) == cache.end()) {  // 如果键不存在于缓存中，返回-1
            return -1;
        } else {  // 如果键存在
            keys.erase(cache[key].second);  // 从list中移除该键
            keys.push_front(key);  // 把该键移动到list的头部，表示它是最近使用的
            cache[key].second = keys.begin();  // 更新哈希表中该键对应的迭代器
            return cache[key].first;  // 返回该键对应的值
        }
    }

    void put(int key, int value) {  // 添加键值对到缓存
        if(cache.find(key) != cache.end()) {  // 如果键已存在于缓存中
            keys.erase(cache[key].second);  // 从list中移除该键
            cache.erase(key);  // 从哈希表中移除该键对应的值和迭代器
        }

        if(keys.size() == capacity) {  // 如果缓存已满
            cache.erase(keys.back());  // 移除缓存中最少使用的键值对，即list尾部的键对应的键值对
            keys.pop_back();  // 从list中移除最少使用的键
        }

        keys.push_front(key);  // 把新的键添加到list头部，表示它是最近使用的
        cache[key] = make_pair(value, keys.begin());  // 在哈希表中添加新的键值对和迭代器
    }
};
```
> leetcode运行时间：428 ms；内存：175.6 MB



### C++2

由于上一个代码中提交上去之后，运行时间比较长，我换了链表来实现相同操作，又由于时间复杂度要求，只能使用哈希表来查找元素

```c++
using namespace std;

// 链表
struct DLinkedNode {
    int key, value;
    DLinkedNode* prev;
    DLinkedNode* next;
    DLinkedNode() : key(0), value(0), prev(nullptr), next(nullptr) {}
    DLinkedNode(int key, int value) : key(key), value(value), prev(nullptr), next(nullptr) {}
};

class LRUCache {
    int capacity;  // 缓存的最大容量
    int tmpSize;  // 链表长度
    DLinkedNode* head;  // 伪头部
    DLinkedNode* tail;  // 伪尾部
    unordered_map<int, DLinkedNode*> cache;  // 哈希表，保存key对应的节点
public:
    LRUCache(int capacity){
        this->capacity = capacity;
        this->tmpSize = 0;
        this->head = new DLinkedNode();
        this->tail = new DLinkedNode();
        this->head->next = this->tail;
        this->tail->prev = this->head;
    }

    int get(int key) {  // 获取键对应的值
        if(cache.find(key) == cache.end()) {  // 如果键不存在于缓存中，返回-1
            return -1;
        } else {  // 如果键存在
            DLinkedNode* node = cache[key];
            // 将该节点移动到链表头部
            node->prev->next = node->next;
            node->next->prev = node->prev;
            node->next = this->head->next;
            node->prev = this->head;
            this->head->next->prev = node;
            this->head->next = node;
            return node->value;  // 返回该键对应的值
        }
    }

    void put(int key, int value) {  // 添加键值对到缓存
        if(cache.find(key) == cache.end()) {  // 如果键不在于缓存中
            if(this->tmpSize == this->capacity) {  // 如果缓存已满
                // 移除缓存中最少使用的键值对，即链表尾部的键对应的键值对
                DLinkedNode* node = this->tail->prev;
                node->prev->next = this->tail;
                this->tail->prev = node->prev;
                this->cache.erase(node->key);
                delete node;
                this->tmpSize--;
            }
            // 在链表头部添加新的节点
            DLinkedNode* node = new DLinkedNode(key, value);
            node->next = this->head->next;
            node->prev = this->head;
            this->head->next->prev = node;
            this->head->next = node;
            this->cache[key] = node;
            this->tmpSize++;
        }else{
            // 如果键存在于缓存中
            DLinkedNode* node = this->cache[key];
            node->value = value;  // 更新该键对应的值
            // 将该节点移动到链表头部
            node->prev->next = node->next;
            node->next->prev = node->prev;
            node->next = this->head->next;
            node->prev = this->head;
            this->head->next->prev = node;
            this->head->next = node;
        }
    }
};


/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */

```

> leetcode运行时间：352 ms；内存：161 MB

