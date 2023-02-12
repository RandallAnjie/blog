---
title: 每日一题——翻硬币
tags: []
id: '793'
categories:
  - - C++
  - - 每日一题
date: 2022-07-14 14:39:21
---

## 题目

小明正在玩一个“翻硬币”的游戏。

桌上放着排成一排的若干硬币。我们用 \* 表示正面，用 o 表示反面（是小写字母，不是零）。

比如，可能情形是：\*\*oo\*\*\*oooo

如果同时翻转左边的两个硬币，则变为：oooo\*\*\*oooo

现在小明的问题是：如果已知了初始状态和要达到的目标状态，每次只能同时翻转相邻的两个硬币,那么对特定的局面，最少要翻动多少次呢？  
我们约定：把翻动相邻的两个硬币叫做一步操作。

## 格式

### 输入

两行等长的字符串，分别表示初始状态和要达到的目标状态。每行的长度<1000

### 输出

一个整数，表示最小操作步数。

### 输入样例1

```
**********
o****o****
```

### 输出样例1

```
5
```

### 输入样例2

```
*o**o***o***
*o***o**o***
```

### 输出样例2

```
1
```

## 代码

### 暴力循环解法

*   从头依次比对判断，出现不同的元素开始将其和其后的硬币翻转，直至最后一个硬币，如果不同则输入有误，如果相同则输出反转次数

```
/*
 * @Author: 转接
 * @Date: 2022-07-14 12:00:21
 * @LastEditors: 转接
 * @LastEditTime: 2022-07-14 14:26:08
 * @Description: 翻硬币
 */
/*
day9

每日一题——翻硬币

如果已知了初始状态和要达到的目标状态，每次只能同时翻转相邻的两个硬币,那么对特定的局面，最少要翻动多少次呢？
*/
#include <iostream>
#include <cstring>

using namespace std;

void change(char* a, int i){
    if(a[i] == '*'){
        a[i] = 'o';
    }else if(a[i] == 'o'){
        a[i] = '*';
    }else{
        cout << "出现非法字符";
        exit(0);
    }
}

int main() {
    char a[1000],b[1000];
    cin >> a >> b;
    if(strlen(a) != strlen(b)){
        cout << "两字符串长度不一致！";
        return 0;
    }
    int num = 0;
    int len = strlen(a);
    for(int i = 0; i < len-1; i++){
        if(a[i] != b[i]){
            change(a, i);
            change(a, i+1);
            num++;
        }
    }
    if(a[len-1] != b[len-1]){
        cout << "输入有误，请检查输入";
        return 0;
    }
    cout << num;
    return 0;
}
```

### 利用不同元素数组下标解

*   记录下所有不同的元素的数组下标，奇数个则证明输入有误，偶数个则将每两个为一组，对于第n组，需要变换第2n个元素的下标减去2n-1个元素的下标，最后求和

```
/*
 * @Author: 转接
 * @Date: 2022-07-14 12:00:21
 * @LastEditors: 转接
 * @LastEditTime: 2022-07-14 14:33:09
 * @Description: 翻硬币
 */
/*
day0

每日一题——翻硬币

如果已知了初始状态和要达到的目标状态，每次只能同时翻转相邻的两个硬币,那么对特定的局面，最少要翻动多少次呢？
*/
#include <iostream>
#include <cstring>
#include <queue>

using namespace std;

int main() {
    char a[1000],b[1000];
    cin >> a >> b;
    if(strlen(a) != strlen(b)){
        cout << "两字符串长度不一致！";
        return 0;
    }
    int num = 0;
    int len = strlen(a);
    queue<int> q;
    for(int i = 0; i < len; i++){
        if(a[i] != b[i]){
            q.push(i);
        }
    }
    if(q.size() % 2 != 0){
        cout << "输入有误，请检查输入";
        return 0;
    }
    while(!q.empty()){
        num-=q.front();
        q.pop();
        num+=q.front();
        q.pop();
    }
    cout << num;
    return 0;
}
```