---
title: 每日一题——三部排序
tags: []
id: '514'
categories:
  - - 每日一题
date: 2022-03-22 17:48:46
---

*   day6

## 题目

如果给定数组：  
25,18,-2,0,16,-5,33,21,0,19,-16,25,-3,0  
则排序后为：  
\-3,-2,-16,-5,0,0,0,21,19,33,25,16,18,25

请分析代码逻辑，并推测划线处的代码

```
void sort3p(int* x, int len)
{
int p = 0;
int left = 0;
int right = len-1;
while(p<=right){
if(x[p]<0){
int t = x[left];
x[left] = x[p];
x[p] = t;
left++;
p++;
}
else if(x[p]>0){
int t = x[right];
x[right] = x[p];
x[p] = t;
right--;
}
else{
__________________________;  //填空位置
}
}
}
```

如果给定数组：  
25,18,-2,0,16,-5,33,21,0,19,-16,25,-3,0  
则排序后为：  
\-3,-2,-16,-5,0,0,0,21,19,33,25,16,18,25

请分析代码逻辑，并推测划线处的代码

## 答案格式

仅把应填在横线上缺少的代码作为答案

## 参考答案

p++

## 测试代码

```
#include<iostream>

using namespace std;

void sort3p(int* x, int len)
{
int p = 0;
int left = 0;
int right = len-1;

while(p<=right){
if(x[p]<0){
int t = x[left];
x[left] = x[p];
x[p] = t;
left++;
p++;
}
else if(x[p]>0){
int t = x[right];
x[right] = x[p];
x[p] = t;
right--;
}
else{
p++;
}
}

}
int main(){
int i;
int a[14]={25,18,-2,0,16,-5,33,21,0,19,-16,25,-3,0};
sort3p(a,14);
for(i = 0; i < 14; i++)
cout << a[i] << " ";
return 0;
}
```

输出：
-3 -2 -16 -5 0 0 0 21 19 33 25 16 18 25