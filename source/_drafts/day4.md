---
title: 每日一题——黄金连分数
tags: []
id: '508'
categories:
  - - 每日一题
date: 2022-03-20 19:39:08
---

*   day4

## 题目

黄金分割数0.61803… 是个无理数，这个常数十分重要，在许多工程问题中会出现。有时需要把这个数字求得很精确。 
对于某些精密工程，常数的精度很重要。也许你听说过哈勃太空望远镜，它首次升空后就发现了一处人工加工错误，对那样一个庞然大物，其实只是镜面加工时有比头发丝还细许多倍的一处错误而已，却使它成了“近视眼”!! 
言归正传，我们如何求得黄金分割数的尽可能精确的值呢？有许多方法。 
比较简单的一种是用连分数：

```
                 1
黄金数 = ---------------------
                     1
         1 + -----------------
                      1
             1 + -------------
                        1
                 1 + ---------
                      1 + ...
```

这个连分数计算的“层数”越多，它的值越接近黄金分割数。 
请你利用这一特性，求出黄金分割数的足够精确值，要求四舍五入到小数点后100位。 
小数点后3位的值为：0.618 
小数点后4位的值为：0.6180 
小数点后5位的值为：0.61803 
小数点后7位的值为：0.6180340 
（注意尾部的0，不能忽略） 
你的任务是：写出精确到小数点后100位精度的黄金分割值。 
注意：尾数的四舍五入！ 尾数是0也要保留！

## 格式

### 输出格式

输出一个小数，其小数点后有100位数字

## 思路

本题如果采用递归来计算就会造成栈溢出。观察黄金数，1层嵌套的结果是1，2层嵌套的结果是1/2，3层嵌套的结果是2/3，3层嵌套的结果是3/5...即每层的嵌套结果是斐波那契数列的前一项与后一项的比值。所以本题利用斐波那契数列的推导来求值。

且由于C没有能表示一百位小数的数据类型，需要自己定义string类型是数据的加法和除法，而除法可以看作多次减法，即需要完成string类型数据的加减除。在函数体中要注意0的个数和位置。在加法中要先创建一个比加数和被加数长度中更长的那个的长度加一个的string类型数组用来存放结果，再将加数和被加数反序，依次相加，遇到进位需要进位（TODO：本代码中判断加数区域代码可优化，不必在b已经完成加法后且没有进位的情况下继续使用temp）。减法要注意循环借位，借完要保证中间的每一位都是'9'。除法要循环利用到减法，如果不够减，则将其末尾添0再减。

最后结果肯定是随着斐波那契数列往后循环前100位小数一定不会再改变，要利用循环找到前一百位不再改变的数据。

## 参考答案

>  0.6180339887498948482045868343656381177203091798057628621354486227052604628189024497072072041893911375

## 代码

```c++
#include<iostream>
#include<algorithm>
#include<string>

using namespace std;

// 判断a,b大小
int comp(string a, string b){
    if(a.find_first_not_of('0') == string::npos){
        a = "0";
    }else{
        a.substr(a.find_first_not_of('0'));
    }
    if(b.find_first_not_of('0') == string::npos){
        b = "0";
    }else{
        b.substr(b.find_first_not_of('0'));
    }
    if(a.length() > b.length()){
        return 1;
    }else if(a.length() < b.length()){
        return -1;
    }else{
        if(a > b){
            return 1;
        }else if(a < b){
            return -1;
        }else{
            return 0;
        }
    }
}

// 加法
string add(string a, string b){
    int tmp = 0; // 用于记录进位值
    // 去除首部的0后
    a = a.substr(a.find_first_not_of('0'));
    b = b.substr(b.find_first_not_of('0'));
    // 将a，b进行反序，方便后续计算
    reverse(a.begin(), a.end());
    reverse(b.begin(), b.end());
    // 创建结果字符串定义其长度为a，b长度的最大值加1（加一防止a，b相加后产生进位）
    string ans(max(a.length(),b.length())+1,'0');
    // 拷贝a到ans中准备计算
    for(int i = 0; i < a.length(); i++){
        ans[i] = a[i];
    }
    // 依次循环进行相加
    for(int i = 0; i < ans.length(); i++){
        if(i < b.length()){
            tmp += (ans[i] - '0') + (b[i] - '0'); // 计算此位置的tmp
        }else{
            tmp += ans[i] - '0';
        }
        ans[i] = tmp%10 + '0'; // 将目前位置tmp中个位数存入ans
        tmp /= 10; // 标志下一位进位数
    }
    reverse(ans.begin(), ans.end());
    return ans.substr(ans.find_first_not_of('0'));
}

// 减法 默认a大于b的情况
string subtract(string a, string b){
    // 去除首部的0后
    if(a.find_first_not_of('0') == string::npos){
        a = "0";
    }else{
        a = a.substr(a.find_first_not_of('0'));
    }
    if(b.find_first_not_of('0') == string::npos){
        b = "0";
    }else{
        b = b.substr(b.find_first_not_of('0'));
    }
    // 将a，b进行反序，方便后续计算
    reverse(a.begin(), a.end());
    reverse(b.begin(), b.end());
    for(int i = 0; i < b.length(); i++){
        if(a[i] >= b[i]){
            a[i] = a[i] - b[i] + '0';
        }else{
            int k = 1;
            while(a[i+k] == '0'){
                a[i+k] = '9';
                k++;
            }
            a[i+k] = a[i+k] - 1;
            // a[i]变为a[i]加上10（借）减去b[i]
            // (a[i] - '0' + 10) - (b[i] - '0') + '0'
            // 化简为a[i] - b[i] + 10 + '0'
            a[i] = a[i] - b[i] + 10 + '0';
        }
    }
    reverse(a.begin(), a.end());
    if(a.find_first_not_of('0') == string::npos){
        return "0";
    }
    return a.substr(a.find_first_not_of('0'));
}

// 除法 默认a小于b，且a，b大于0
string divide(string a, string b){
    // 由题意结果必然是以0.开头的小数
    string ans = "0.";
    // 记录减法次数
    int times;
    for(int i = 0; i < 101; i++){
        a.append("0");
        // 初始化减去的次数
        times = 0;
        while(comp(a, b) >= 0){
            a = subtract(a, b);
            times++;
        }
        char temp = times + '0';
        ans.append(1,temp);
    }
    return ans;
}

int main(){
    string a = "1";
    string b = "1";
    string res = "1";
    // 斐波那契数列
    while(true){
        string temp = b;
        b = add(a, b);
        a = temp;
        if(res == divide(a, b)){
            break;
        }else{
            res = divide(a, b);
        }
    }
    if(res[102]-'0' < 5){
        res = res.substr(0, res.length() - 1);
        cout << res << endl;
    }else{
        res = res.substr(2, res.length() - 3);
        res = add(res, "1");
        cout << "0." << res << endl;
    }
    return 0;
}
```