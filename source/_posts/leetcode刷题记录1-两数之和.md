---
title: leetcode刷题记录1-两数之和
date: 2023-02-15 18:16:35
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 两数之和

[原题传送门](https://leetcode.cn/problems/two-sum/description/)

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出**和**为目标值 `target`  的那**两个**整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

## 示例

### 示例1

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

### 示例2

输入：nums = [3,2,4], target = 6
输出：[1,2]

### 示例3

输入：nums = [3,3], target = 6
输出：[0,1]

## 解答

### C++1——暴力破解法

```c++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // 将nums的宽度直接保存下来
        int n = nums.size();
        // 遍历循环解题
        for(int i = 0; i < n; i++){
            for(int j = i+1; j < n; j++){
                if(nums[i] + nums[j] == target){  //如果i和j指向的数和为target就是答案 
                    return {i,j};  // 返回vector类型值
                }
            }
        }
        return {};
    }
};
```
> leetcode运行时间：264 ms；内存：9.9 MB

### C++2——引入二分查找和线性查找

将数组先拷贝一份，将备份排序，由小到大遍历，看target和当前数的差值是不是在数组中，如果在就利用线性查找去找到下标，如果不在就继续往后遍历。

在线性遍历中要防止遍历到两个相同的值，【x的值对应的下标】可以在【0到n-1】中遍历，target-x的值只能先在【【x的值对应的下标+1】到n-1】中遍历，如果没有就只能在【0到【x的值对应的下标-1】】中遍历了

```c++
class Solution {
    // 实现二分查找
    bool binSearch(vector<int>& arr, int left, int right, int value){
        while(left <= right){
            int mid = (left + right) >> 1;
            // 右移运算符>>,运算结果正好能对应一个整数的二分之一值
            // 这就正好能代替数学上的除2运算，但是比除2运算要快
            // 如mid=(left+right)>>1相当于mid=(left+right)/2
            if(value == arr[mid]){
                return true;
            }else if(value > arr[mid]){
                left = mid + 1;
            }else{
                right = mid - 1;
            }
        }
        return false;
    }

    // 线性查找
    int linearSearch(vector<int>& arr, int left, int right, int value){
        for(int i = left; i <= right; ++i){
            if(arr[i] == value){
                return i;
            }
        }
        return -1;
    }

public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // 拷贝一份数组
        vector<int> numsCopy(nums);
        // 将新的数组强制排序
        sort(numsCopy.begin(),numsCopy.end());
        // 将nums的宽度直接保存下来
        int n = nums.size();
        int x;
        for(int i = 0; i < n; ++i){
            x = numsCopy[i];
            if(binSearch(numsCopy, i+1, n-1, target - x)){
                break;
            }
        }
        // 找到
        int firstNum = linearSearch(nums, 0, n-1, x);
        int secondNum = linearSearch(nums, firstNum+1, n-1, target - x);
        if(secondNum == -1){
            secondNum = linearSearch(nums, 0, firstNum-1, target - x);
        }
        if(firstNum == -1 || secondNum == -1){
            return {};
        }else{
            return {firstNum, secondNum};
        }
    }
};
```

> leetcode运行时间：12 ms；内存：10.2 MB

### C++3——map法

先定义一个map，如果has这个map有x，has[x]表示在枚举这个数之前，x就是这个数字的下标。先枚举每个数，如果能找到target-nums[i]，就说明map中有这个数字，返回这两个下标，否则就把nums[i]的下标置为i，如果一直没有找到就返回空

```c++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> has;
        int n = nums.size();
        for(int i = n-1; i >= 0; --i){
            if(has.find(target - nums[i]) != has.end()){
                return {has[target-nums[i]],i};
            }
            has[nums[i]]=i;
        }
        return {};
    }
};
```

> leetcode运行时间：8 ms；内存：11.1 MB