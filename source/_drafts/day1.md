---
title: 每日一题——高斯日记
tags: []
id: '500'
categories:
  - - 每日一题
date: 2022-03-17 14:19:39
---

*   day1

## 题目

大数学家高斯有个好习惯：无论如何都要记日记。

他的日记有个与众不同的地方，他从不注明年月日，而是用一个整数代替，比如：4210。

后来人们知道，那个整数就是日期，它表示那一天是高斯出生后的第几天。这或许也是个好习惯，它时时刻刻提醒着主人：日子又过去一天，还有多少时光可以用于浪费呢？

高斯出生于：1777年4月30日。

在高斯发现的一个重要定理的日记上标注着：5343，因此可算出那天是：1791年12月15日。

高斯获得博士学位的那天日记上标着：8113。

请你算出高斯获得博士学位的年月日。

## 格式

### 输出格式

>  yyyy-mm-dd, 例如：1980-03-21

## 参考答案

>  1799-07-16

## 代码

```c
#include<stdio.h>

int monthn[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
int monthd[12] = {31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

bool IsLeap(int year){
    if(year%400 == 0  (year%100 != 0 && year%4 == 0)){
        return true;
    }else{
        return false;
    }
}

int Last(int year, int month, int day){
    int *monthi;
    if(IsLeap(year)){
        monthi = &monthd[0];
    }else{
        monthi = &monthn[0];
    }
    int result = monthi[month-1] - day;
    for(int i = month ; i < 12; i++){
        result += monthi[i];
    }
    return result;
}

int Past(int year, int month, int day){
    int *monthi;
    if(IsLeap(year)){
        monthi = &monthd[0];
    }else{
        monthi = &monthn[0];
    }
    int result = day;
    for(int i = 0 ; i < month-1; i++){
        result += monthi[i];
    }
    return result;
}

int To(int year, int month, int day){
    int result = 0;
    for(int i = 1777; i <= year; i++){
        if(IsLeap(i)){
            result += 366;
        }else{
            result += 365;
        }
    }
    // 出生当天算第一天 
    return result-Past(1777, 4, 30)-Last(year, month, day)+1;
}

int main(){
    //printf("%d",To(1791,12,15));
    //printf("%d",To(1777,12,31));
    int num = 8113 - To(1777,12,31);
    int year = 1777;
    int month = 12, day = 31;
    while(true){
        int temp = num;
        if(IsLeap(year+1)){
            temp -= 366;
        }else{
            temp -= 365;
        }
        if(temp < 0){
            year ++;
            break;
        }else{
            year ++;
            num = temp;
        }
    }
    int *monthi;
    if(IsLeap(year)){
        monthi = &monthd[0];
    }else{
        monthi = &monthn[0];
    }
    for(month = 1; month <= 12; month++){
        if(num - monthi[month-1] > 0){
            num -= monthi[month-1];
        }else{
            day = num;
            break;
        }
    }
    printf("%d-%d-%d",year,month,day);
    return 0;
}
```