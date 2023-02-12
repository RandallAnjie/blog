---
title: 算法分析与设计大作业——期末测试
tags: []
id: '41'
categories:
  - - C++
  - - 算法
date: 2021-05-20 06:11:00
---

需要代码请评论或者与我联系！

## **问题描述**

助教小明给期末测验出了n道算法题目。他希望在即将到来的期末测验试卷中使用其中k道题目。每道算法题目都有一个难度等级。如果一次测验中的所有k道题目都有不同的难度等级，那么这次期末测试就是有区分度的。计算小明可以设计多少种有区分度的期末试卷。  
注：两份测验试卷当且仅当一份试卷中存在某一题目p，而另一份试卷中不存在这个题p，这两份试卷才有区别。  
输出结果对998,244,353取余。

## 输入形式

输入第一行包括两个用空格分隔开的整数n和k，1≤k≤n≤1000  
输入第二行n个用空格分开隔的整数li，表示不同题目的难度，Li≤109

## 输出形式

一个整数，表示可设计的有区分度的期末试卷数目。结果对998,244,353取余

## 样例输入

5 2  
1 2 3 4 5

## 样例输出

10

## 分析

该题可采用动态规划算法来进行求解。首先将题目进行整理，按照题目难度排序后整理出不同难度的题目的个数，最后利用列表格动态规划求解出最终结果。或者利用递归和数学计算的方式求解，但是这种方式对于计算机计算需要大量的空间，解法不是最优。

## **流程图**

![](https://img-blog.csdnimg.cn/20210520201132837.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)

流程图

## **伪代码**

```
枚举i=1~count{
枚举j=0~i{
如果j=0成立{
sheet[i][j]=number[i][1]+sheet[i-1][j];
}
如果i==j成立{
sheet[i][j]=(number[i][1]*sheet[i-1][j-1]) %998244353;
}
否则{
sheet[i][j]=(sheet[i-1][j]+sheet[i-1][j-1]*number[i][1]) %998244353;
}
}
}
```

## **代码（C++）**

```
#include <iostream>
#include <algorithm>

using namespace std;

long long number[1000][2];

int main(){
long long n,k;
cin >> n;
cin >> k;
long long data[n];
for(long long i=0;i<n;i++){
cin >> data[i];
}
sort(data, data+n);
number[0][0]=data[0];
number[0][1]=1;
long long  count=1;
for(long long i=1;i<n;i++){
if(data[i]==data[i-1]){
number[count-1][1]++;
}
else{
number[count][0]=data[i];
number[count][1]=1;
count++;
}
}

for(long long i=0;i<count;i++){
cout << number[i][0] << " " <<  number[i][1] <<endl;
}

if(count<k){
cout << "0";
return 0;
}

long long sheet[count][k];
sheet[0][0]=number[0][1];

for(long long i=1;i<count;i++){
for(long long j=0;j<k;j++){
if(j==0){
sheet[i][j]=number[i][1]+sheet[i-1][j];
}
else if(i==j){
sheet[i][j]=(number[i][1]*sheet[i-1][j-1])%998244353;
}
else{
sheet[i][j]=(sheet[i-1][j]+sheet[i-1][j-1]*number[i][1])%998244353;
}
}
}

long long suma=sheet[count-1][k-1];

//long long sum=jc(count)/(jc(k)*jc(count-k));
//
//for(long long i=0;i<count;i++){
//sum=sum*(long long)number[i][1];
//}
//cout << sum << endl;

suma=suma%998244353; 
cout << suma;
}

```

## **总结**

本算法对规定范围下不同的输入数据能够得出满足要求的结构，对于精心选择的典型、苛刻而带有刁难性的输入数据能够得出满足要求的结果，对于一切合法的输入数据都产生满足要求的结果。本算法要求考虑到边界条件当不同难度的算法题目数量小于要求。本算法的边界条件就是不同难度的题目数量可能会小于所需求的k，本程序以及提前判断出相关大小情况。  
核心代码问题：求解sheet表中第一列就是上一行的数值加上number\[i\]\[1\]的值；求解sheet表中左上到右下的对角线上的格子的值sheet\[i\]\[j\]就是number\[i\]\[1\]乘上sheet\[i-1\]\[j-1\]；求解其他的格子中的值就是sheet\[i-1\]\[j\]加上sheet\[i-1\]\[j-1\]乘以number\[i\]\[1\]（n类里面挑选k个的个数等同于n-1类里挑选k个的个数或者n-1类里挑选k-1个，再在第n类挑选一个）。

 

1

2

…

k-1

k

…

1

number\[1\]\[1\]

 

 

 

 

 

2

sheet\[1\]\[1\]+number\[1\]\[1\]

sheet\[1\]\[1\]\*number\[2\]\[1\]

 

 

  

 

…

 

 

 

 

  

 

n-1

sheet\[n-1\]\[1\]

sheet\[n-1\]\[2\]

sheet\[n-1\]\[k-1\]

sheet\[n-1\]\[k\]

 

n

sheet\[n-1\]\[1\]+number\[n\]\[1\]

sheet\[n-1\]\[2\]+sheet\[n-1\]\[1\]\* number\[n\]\[1\]

 

sheet\[n-1\]\[k-1\]+ sheet\[n-1\]\[k-2\]\* number\[n\]\[1\]

sheet\[n-1\]\[k\]+ sheet\[n-1\]\[k-1\]\* number\[n\]\[1\]

   

…