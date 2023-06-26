---
title: leetcode刷题记录16-爬楼梯
date: 2023-06-26 09:50:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 爬楼梯

>  [原题传送门](https://leetcode.cn/problems/climbing-stairs/description/)

假设你正在爬楼梯。需要`n`阶你才能到达楼顶。
每次你可以爬 `1`或`2`个台阶。你有多少种不同的方法可以爬到楼顶呢？

## 示例

### 示例1

输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶

### 示例2


输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶



提示：

- `1 <= n <= 45`


## 解答

### C++1

第一时间想到直接用递归方法求解

```c++
class Solution {
public:
    int climbStairs(int n) {
        if(n == 1){
            return 1;
        } else if (n == 2){
            return 2;
        } else {
            return climbStairs(n - 1) + climbStairs(n - 2);
        }

    }
};
```
> leetcode运行时间：超出时间限制



### C++2

直接递归超出时间，想办法保存已经计算的值，即将已经确定的值先存到哈希表中以供后续使用

```c++
class Solution {
private:
    unordered_map<int, long long> map;
public:
    int climbStairs(int n) {
        if(map.find(n) != map.end()){
            return map[n];
        }
        if(n == 1){
            map[1] = 1;
            return 1;
        } else if (n == 2){
            map[2] = 2;
            return 2;
        } else {
            map[n] = climbStairs(n - 1) + climbStairs(n - 2);
            return climbStairs(n - 1) + climbStairs(n - 2);
        }

    }
};
```

> leetcode运行时间：4 ms；内存：6.6 MB


### C++3

想到这个题目跟电影少年班里的老师去问那个“神棍”的题目是一样的，我就直接类似计算斐波那契数列第n项即可

```c++
class Solution {
public:
    int climbStairs(int n) {
        int *map = new int[n];
        map[0] = 1;
        if(n <= 1){
            return map[n-1];
        }
        map[1] = 2;
        for(int i = 2; i < n; i++){
            map[i] = map[i - 1] + map[i - 2];
        }
        return map[n-1];
    }
};
```

> leetcode运行时间：0 ms；内存：5.9 MB