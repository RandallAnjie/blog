---
title: leetcode刷题记录5-存在重复元素
date: 2023-03-27 21:45:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 存在重复元素

>  [原题传送门](https://leetcode.cn/problems/contains-duplicate/description/)

给你一个整数数组 `nums` 。如果任一值在数组中出现 **至少两次** ，返回 `true` ；如果数组中每个元素互不相同，返回 `false` 。

## 示例

### 示例1


输入：nums = [1,2,3,1]
输出：true


### 示例2


输入：nums = [1,2,3,4]
输出：false


### 示例3


输入：nums = [1,1,1,3,3,4,3,2,4,2]
输出：true



提示：

- `1 <= nums.length <= 10<sup>5</sup>`
- `-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup>`

## 解答

### C++1——直接使用vector函数

```c++
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        sort(nums.begin(),nums.end());
        return distance(nums.begin(), unique(nums.begin(), nums.end())) != nums.size();
    }
};
```
> leetcode运行时间：108 ms；内存：55.9 MB

### C++2——顺序扫描

根据排序后扫描判断当前一个是不是等于下一个元素值

```c++
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        sort(nums.begin(),nums.end());
        int size = nums.size() - 1;
        for (int i = 0; i < size; ++i)
        {
            if (nums[i] == nums[i+1]){
                return true;
            }
        }
        return false;
    }
};
```

> leetcode运行时间：88 ms；内存：55.9 MB


### C++4——使用set（TODO：时间过长）

set使用的是红黑树，插入的时候不会有重复元素

> 在C++中，set是一种关联容器，它内部实现了红黑树数据结构来存储元素，保证元素的有序性，并且每个元素都是唯一的。set中的insert函数用于向set中插入元素，其具体实现过程如下：
>
> 1. 首先，set会调用自己的红黑树实现来查找当前元素是否已经存在于set中。
> 2. 如果当前元素不存在于set中，则将其插入到红黑树中，并更新红黑树的平衡状态。
> 3. 如果当前元素已经存在于set中，则不进行任何操作。
> 4. 最后，返回一个pair对象，其中第一个元素是一个迭代器，指向set中新插入的元素，第二个元素是一个bool值，表示插入操作是否成功。
>
> 需要注意的是，set中的元素是按照元素值自动进行排序的，因此插入新元素时，set会自动将其插入到正确的位置以保持元素的有序性。同时，由于set中的元素是唯一的，因此插入已经存在的元素时，set会自动忽略插入操作，保证每个元素都是唯一的。

```c++
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        set<int> res;
        for(int i = 0; i < nums.size(); i++){
            res.insert(nums[i]);
        }
        return nums.size() != res.size();
    }
};
```

> leetcode运行时间：184 ms；内存：71.8 MB


### C++5——将set替换为unordered_set

> unordered_set和set都是C++ STL中的关联容器，它们的主要区别在于底层数据结构和查找效率。
>
> 1. 底层数据结构：set内部使用红黑树来存储元素，保证元素的有序性，并且每个元素都是唯一的；而unordered_set使用哈希表来存储元素，不保证元素的有序性，但是插入、删除和查找操作的平均时间复杂度为O(1)。
>
> 2. 查找效率：由于set内部使用红黑树来存储元素，因此查找操作的时间复杂度为O(log n)，其中n为元素个数；而unordered_set使用哈希表来存储元素，查找操作的平均时间复杂度为O(1)，但是最坏情况下的时间复杂度为O(n)。
>
> 因此，如果需要保证元素的有序性，或者需要频繁进行查找操作，可以选择使用set；如果需要进行频繁的插入、删除和查找操作，并且不需要保证元素的有序性，可以选择使用unordered_set。

```c++
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> res;
        for(int i = 0; i < nums.size(); i++){
            if(res.count(nums[i]) > 0){
                return true;
            }else{
                res.insert(nums[i]);
            }
        }
        return false;
    }
};
```

> leetcode运行时间：88 ms；内存：67.7 MB
