---
title: leetcode刷题记录6-一维数组的动态和
date: 2023-03-28 15:43:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 一维数组的动态和

>  [原题传送门](https://leetcode.cn/problems/running-sum-of-1d-array/description/)

给你一个数组 `nums` 。数组「动态和」的计算公式为：`runningSum[i] = sum(nums[0]…nums[i])` 。

请返回 `nums` 的动态和。

## 示例

### 示例1


输入：nums = [1,2,3,4]
输出：[1,3,6,10]
解释：动态和计算过程为 [1, 1+2, 1+2+3, 1+2+3+4] 。



### 示例2


输入：nums = [1,1,1,1,1]
输出：[1,2,3,4,5]
解释：动态和计算过程为 [1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1] 。



### 示例3


输入：nums = [3,1,2,10,1]
输出：[3,4,6,16,17]




提示：

- `1 <= nums.length <= 1000`
- `-10^6^ <= nums[i] <= 10^6^`

## 解答

### C++——直接求解

```c++
class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        vector<int> result;
        result.push_back(nums[0]);
        for(int i = 1; i < nums.size(); i++){
            result.push_back(nums[i]+result[i-1]);
        }
        return result;
    }
};
```
> leetcode运行时间：4 ms；内存：8.1 MB
