---
title: 每日一题——九进制转十进制
tags: []
id: '623'
categories:
  - - 每日一题
date: 2022-04-11 12:09:20
---

*   day8

## 题目

九进制正整数 (2022)9 转换成十进制等于多少？

## 格式

这是一道结果填空的题，你只需要算出结果后提交即可。本题的结果为一  
个整数，在提交答案时只填写这个整数，填写多余的内容将无法得分。

## 代码

```
/*
 * @Author: 转接
 * @Date: 2022-04-11 12:00:25
 * @LastEditors: 转接
 * @LastEditTime: 2022-04-11 12:08:28
 * @Description: 九进制转十进制
 */
/*
day8

每日一题——九进制转十进制

九进制正整数 (2022)9 转换成十进制等于多少？
*/
#include<iostream>
#include<math.h>

using namespace std;

int switch_num(int num){
    int sum = 0;
    int i = 0;
    while(num){
        sum += (num%10)*pow(9,i);
        num /= 10;
        i++;
    }
    return sum;
}

int main(){
    int num;
    cin>>num;
    cout<<switch_num(num);
    return 0;
}
```