---
title: 背包问题BackpackProblem
tags: []
id: '95'
categories:
  - - C++
  - - 算法
date: 2021-05-25 06:11:00
---

## 代码

```c++
#include <stdio.h>
#include <iostream>
#include <vector>
#include <string.h>
using namespace std;
void package(int *weight,int *size,int n,int c);//构造最优矩阵
void getResult(int n,int c,int *res,int *size,int *weight);//构造最优解
int f[10][100];
//构造最优矩阵

int main(){
    vector<int> vweight;//定义一个vector数组vweight
    vector<int> vsize;
    int number;
    vweight.push_back(0);
    vsize.push_back(0);
    cout << "请输入每个物品的重量：";
    while (1){
        cin >> number;
        vweight.push_back(number);//每输入一个数字就把它添加到数组的最后
        if (cin.get() == '\n')//如果是回车符则跳出循环
            break;
    }
    int *weight = new int[vweight.size()];//每个物品的重量
    if (!vweight.empty()){
        memcpy(weight, &vweight[0], vweight.size()*sizeof(int));
    }
    cout << "请输入每个物品的价值：";
    while (1) {
        cin >> number;
        vsize.push_back(number);
        if (cin.get() == '\n')
            break;
    }
    int *size = new int[vsize.size()];//每个物品的价值
    if (!vsize.empty()){
        memcpy(size, &vsize[0], vsize.size()*sizeof(int));
    }
    if(vweight.size()!=vsize.size()){
        cout << "数据输入错误，请重新开始";
        exit(0);
    }
    cout << "请输入背包的总容量：";
    int c; //背包能容的重量
    cin >> c;
    int n = vweight.size()-1; //物品的个数
    int res[n];
    for(int a=0;a<n;a++){
        res[a]=0;
    }

    int i,j;
    package(weight,size,n,c);
    for(i=0;i<=n;i++){
        for(j=0;j<=c;j++)
            printf("%2d ",f[i][j]);
        cout << endl;
    }
    getResult(n,c,res,size,weight);
    cout << "放入背包最大价值: " << f[n][c] << endl;
    cout << "放入背包的物品为: ";
    for(i=1;i<=n;i++)
        if(res[i] == 1)
            cout << i << "  ";
}

void package(int *weight,int *size,int n,int c){
    int i,j;
    //初始化矩阵
    for(i=1;i<=n;i++)
        f[i][0] = 0;
    for(j=1;j<=c;j++)
        f[0][j] = 0;
    for(i=1;i<=n;i++){
        for(j=1;j<=c;j++){
            //当容量够放入第i个物品，并且放入之后的价值要比不放大
            if(weight[i] <= j && f[i-1][j-weight[i]] + size[i] > f[i-1][j]){
                f[i][j] = f[i-1][j-weight[i]] + size[i];
            }else
                f[i][j] = f[i-1][j];
        }
    }
}

void getResult(int n,int c,int *res,int *size,int *weight){
//构造最优解
    int i,j;
    j = c;
    for(i=n;i>=1;i--){
        if(f[i][j] != f[i-1][j]){
            res[i] = 1;
            j = j - weight[i];
        }
    }
}


```

## 总结

背包问题是要求一个最优值，如果要求输出这个最优值的方案，可以参照一般动态规划问题输出方案的方法：记录下每个状态的最优值是由哪一个策略推出来的，这样便可根据这条策略找到上一个状态，从上一个状态接着向前推即可。即自顶向下的备忘录法或自底向上。