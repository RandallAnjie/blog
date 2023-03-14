---
title: 每日一题——前缀判断
tags: []
id: '512'
categories:
  - - 每日一题
date: 2022-03-21 19:31:32
---

*   day5

## 题目

如下的代码判断 needle\_start指向的串是否为haystack\_start指向的串的前缀，如不是，则返回NULL。 
比如："abcd1234" 就包含了 "abc" 为前缀

```c
char* prefix(char* haystack_start, char* needle_start)
{
    char* haystack = haystack_start;
    char* needle = needle_start;
    while(*haystack && *needle){
        if(__________________) return NULL; //填空位置
    }
    if(*needle) return NULL;
    return haystack_start;
}
```

请分析代码逻辑，并推测划线处的代码

## 答案格式

仅把应填在横线上缺少的代码作为答案

## 参考答案

>  \*(haystack++) != \*(needle++)

## 测试代码

```c++
#include<iostream>

using namespace std;

char* prefix(char* haystack_start, char* needle_start)
{
    char* haystack = haystack_start;
    char* needle = needle_start;
    while(*haystack && *needle){
        if(*(haystack++) != *(needle++)) return NULL;  //填空位置
    }

    if(*needle) return NULL;

    return haystack_start;
}

int main()
{
    char *a=prefix("abc123","abc");
    char *b=prefix("abc123","abd");
    if(a == NULL){
        cout << "a = NULL" << endl;
    }else{
        cout << "a = " << a << endl;
    }
    if(b == NULL){
        cout << "b = NULL" << endl;
    }else{
        cout << "b = " << a << endl;
    }
    return 0;
}
```

输出：

```shell
a = abc123
b = NULL
```

