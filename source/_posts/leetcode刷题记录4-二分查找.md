---
title: leetcode刷题记录4-二分查找
date: 2023-03-26 23:39:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 二分查找

>  [原题传送门](https://leetcode.cn/problems/binary-search/description/)

给定一个 `n` 个元素有序的（升序）整型数组 `nums` 和一个目标值 `target` ，写一个函数搜索 `nums` 中的 `target`，如果目标值存在返回下标，否则返回 `-1`。

## 示例

### 示例1


输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4




### 示例2

输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1





提示：

- 你可以假设 `nums` 中的所有元素是不重复的。
- `n` 将在 `[1, 10000]`之间。
- `nums` 的每个元素都将在 `[-9999, 9999]`之间。

## 解答

### C++1——标准遍历查找

```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        for(int i = 0; i < nums.size(); i++){
            if(nums[i] == target){
                return i;
            }
        }
        return -1;
    }
};
```
> leetcode运行时间：32 ms；内存：26.8 MB

### C++2——二分查找法

```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        // 给定的就已经是升序的，则使用二分查找
        int i = 0, j = nums.size() - 1;
        while(i <= j){
            int middle = nums[(i+j)/2];
            int pos = (i+j)/2;
            if(middle == target){
                return pos;
            }else if(middle > target){
                j = pos - 1;
            }else if(middle < target){
                i = pos + 1;
            }
        }
        return -1;
    }
};
```

> leetcode运行时间：32 ms；内存：26.9 MB

#### 标准二分查找

```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left, mid, right;
        left = 0;
        mid = (left + right) / 2;
        right = nums.size() - 1;
        while(left <= right){
            if(target < nums[mid]){
                right = mid - 1;
            }else if(target > nums[mid]){
                left = mid + 1;
            }else{
                return mid;
            }
            mid = (left + right) / 2;
        }
        return -1;
    }
};
```

