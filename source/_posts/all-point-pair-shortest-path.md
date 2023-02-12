---
title: 全点对最短路径All point pair shortest path
tags: []
id: '97'
categories:
  - - C++
  - - 算法
date: 2021-05-25 06:11:00
---

## 代码

```
#include <iostream>
#include <vector>

using namespace std;

int minnum(int a,int b,int c){//get the min number 
int n=a;
if(a>b){
n=b;
}
if(n>c){
n=c;
}
return n;
}

int maxinarr(int a[], int size){
int n=a[0];
for(int i=1;i<size;i++){
if(n<a[i])
n=a[i];
}
return n;
}

int mininarr(int a[], int size){
int n=a[0];
for(int i=1;i<size;i++){
if(n>a[i])
n=a[i];
}
return n;
}

int main(){
vector<int> startpoint;
vector<int> endpoint;
vector<int> weight;
int number; 
cout << "请依次输入每段路经的起始点，结束点和权值（输入-1结束输入ps:-1所在行数字无效）：" << endl;
while (1) {

cin >> number;
if (number == -1)//如果是-1则跳出循环
break;
startpoint.push_back(number);//每输入一个数字就把它添加到数组的最后
cin >> number;
if (number == -1)
break;
endpoint.push_back(number);
cin >> number;
if (number == -1)
break;
weight.push_back(number);
} 
int *sp = new int[startpoint.size()];
    if (!startpoint.empty()){
        memcpy(sp, &startpoint[0], startpoint.size()*sizeof(int));
    }
int *ep = new int[endpoint.size()];
    if (!endpoint.empty()){
        memcpy(ep, &endpoint[0], endpoint.size()*sizeof(int));
    }
    int *wt = new int[weight.size()];
    if (!weight.empty()){
        memcpy(wt, &weight[0], weight.size()*sizeof(int));
    }
    int size=minnum(startpoint.size(),endpoint.size(),weight.size());

int max=maxinarr(ep,size);
    if(maxinarr(sp,size)>maxinarr(ep,size))
    int max=maxinarr(sp,size);
    
    int sheet[max+1][max+1];
    int min=mininarr(ep,size);
    if(mininarr(sp,size)>mininarr(ep,size))
    int min=mininarr(sp,size);
    for(int i=min;i<=max;i++){
for(int j=min;j<=max;j++){
sheet[i][j]=99999;
}
}
    //比较存入路径长短后存入数据 
    for(int i=0;i<size;i++){
    if(sheet[sp[i]][ep[i]]>wt[i]){
    sheet[sp[i]][ep[i]]=wt[i];
}
}

cout<<"排序前："<< endl;
for(int i=min;i<=max;i++){
for(int j=min;j<=max;j++){
cout << sheet[i][j]<<" ";
}
cout << endl;
}
//循环计算最短路径表 
for(int k=min;k<=max;k++){
for(int i=min;i<=max;i++){
for(int j=min;j<=max;j++){
if(sheet[i][j]>sheet[i][k]+sheet[k][j])
sheet[i][j]=sheet[i][k]+sheet[k][j];
}
}
}
cout<<"排序后："<< endl;
for(int i=min;i<=max;i++){
for(int j=min;j<=max;j++){
cout << sheet[i][j]<<" ";
}
cout << endl;
}
cout << endl;
cout << "          ";
for(int i=min;i<=max;i++){
printf("%10d",i);
}
cout << endl;
for(int i=min;i<=max;i++){
for(int j=min-1;j<=max;j++){
if(j==min-1){
printf("%10d",i);
continue;
}
printf("%10d",sheet[i][j]);
}
cout << endl;
}
} 
```

## 总结

读取数组定义了三个个vector容器，将数值存入容器后再将容器转换为普通数组。函数上面对于该算法的分析，求解过程实际上是典型的动态规划解题过程，描述最优子结构：公式的推倒，思考过程，得到一个递归解，按自底向上的方式计算最优解：最短路径权值矩阵。最后有计算结果构造一个最优解，给出最短路径。