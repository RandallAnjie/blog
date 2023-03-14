---
title: 每日一题——第39级台阶
tags: []
id: '506'
categories:
  - - 每日一题
date: 2022-03-19 21:36:20
---

*   day3

## 题目

小明刚刚看完电影《第39级台阶》，离开电影院的时候，他数了数礼堂前的台阶数，恰好是39级!  
站在台阶前，他突然又想着一个问题：  
如果我每一步只能迈上1个或2个台阶。先迈左脚，然后左右交替，最后一步是迈右脚，也就是说一共要走偶数步。那么，上完39级台阶，有多少种不同的上法呢？  
请你利用计算机的优势，帮助小明寻找答案。

## 格式

### 输出格式

输出一个整数

## 参考答案

>  51167078

## 代码

```c
#include<stdio.h>

int totol;

void fun(int last, int steps){
    if(last < 0){
        return;
    }
    if(last == 0 && steps%2 == 0){
        totol++;
    }
    fun(last - 1, steps + 1);
    fun(last - 2, steps + 1);
}

int main(){
    fun(39,0);
    printf("%d",totol);
}
```