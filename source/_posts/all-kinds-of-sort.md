---
title: 关于各种排序
tags: []
id: '625'
categories:
  - - C++
  - - 算法
date: 2022-04-11 15:51:55
---

[源码及测试样例下载](http://startpage.zhuanjie.ltd:8888/down/W4UMsxpMhjTb)

## LSD(Least Significant Digit)基数排序

需要r个辅助队列（本代码中r为10）

*   时间复杂度O(d(n+r))
*   空间复杂度O(r)

```c
int *LSD(int *a, int f, int l)
{
    int n = l - f + 1;
    int m = log(n) / log(10);
    queue<int> q[10];
    for(int i = 0; i < m; i++){
        for(int j = 0; j < n; j++){
            int t = a[f + j] % (int)pow(10, i + 1);
            t = t / (int)pow(10, i);
            q[t].push(a[f + j]);
        }
        int k = 0;
        for(int j = 0; j < 10; j++){
            while(!q[j].empty()){
                a[f + k] = q[j].front();
                q[j].pop();
                k++;
            }
        }
    }
    return a;
}
```

## MSD(Most Significant Digit)基数排序

需要r个辅助队列（本代码中r为10）

*   时间复杂度O(d(n+r))
*   空间复杂度O(r)

```c
int *MSD(int *a, int f, int l)
{
    int n = l - f + 1;
    int m = log(n) / log(10);
    queue<int> q[10];
    for(int i = 0; i < m; i++){
        for(int j = 0; j < n; j++){
            int t = a[f + j] / (int)pow(10, i);
            t = t % 10;
            q[t].push(a[f + j]);
        }
        int k = 0;
        for(int j = 0; j < 10; j++){
            while(!q[j].empty()){
                a[f + k] = q[j].front();
                q[j].pop();
                k++;
            }
        }
    }
    return a;
}
```

## QS(Quick Sort)快速排序

*   时间复杂度O(nlogn)
*   空间复杂度O(1)

```c
int *QS(int *a, int f, int l)
{
    if(f >= l) return a;
    int i = f, j = l;
    int x = a[f];
    while(i < j){
        while(i < j && a[j] >= x) j--;
        if(i < j) a[i++] = a[j];
        while(i < j && a[i] <= x) i++;
        if(i < j) a[j--] = a[i];
    }
    a[i] = x;
    QS(a, f, i - 1);
    QS(a, i + 1, l);
    return a;
}
```

## MS(Merge Sort)归并排序

*   时间复杂度O(nlogn)
*   空间复杂度O(n)

```c
int *MS(int *a, int f, int l)
{
    if(f >= l) return a;
    int m = (f + l) / 2;
    MS(a, f, m);
    MS(a, m + 1, l);
    int *b = new int[l - f + 1];
    int i = f, j = m + 1, k = 0;
    while(i <= m && j <= l){
        if(a[i] < a[j]) b[k++] = a[i++];
        else b[k++] = a[j++];
    }
    while(i <= m) b[k++] = a[i++];
    while(j <= l) b[k++] = a[j++];
    for(int i = 0; i < k; i++) a[f + i] = b[i];
    return a;
}
```

## SS(Shell Sort)希尔排序

*   时间复杂度O(n^1.3)
*   空间复杂度O(1)

```c
int *SS(int *a, int f, int l)
{
    int n = l - f + 1;
    int h = 1;
    h = n / 2;
    while(h >= 1){
        for(int i = f + h; i <= l; i++){
            int t = a[i];
            int j = i - h;
            while(j >= f && a[j] > t){
                a[j + h] = a[j];
                j -= h;
            }
            a[j + h] = t;
        }
        h /= 2;
    }
    return a;
}
```

## IS(Insertion Sort)插入排序

*   时间复杂度O(n^2)
*   空间复杂度O(1)

```c
int *IS(int *a, int f, int l){
    for(int i = f + 1; i <= l; i++){
        int t = a[i];
        int j = i - 1;
        while(j >= f && a[j] > t){
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = t;
    }
    return a;
}
```

## BS(Bubble Sort)冒泡排序

*   时间复杂度O(n^2)
*   空间复杂度O(1)

```c
int *BS(int *a, int f, int l){
    for(int i = f; i < l; i++){
        for(int j = f; j < l - i; j++){
            if(a[j] > a[j + 1]){
                int t = a[j];
                a[j] = a[j + 1];
                a[j + 1] = t;
            }
        }
    }
    return a;
}
```

## 测试部分：

```c
/*
 * @Author: 转接
 * @Date: 2022-04-11 13:27:41
 * @LastEditors: 转接
 * @LastEditTime: 2022-04-11 15:19:31
 * @Description: 各种排序算法
 */

#include <iostream>
#include <math.h>
#include <queue>
#include <time.h>
#include <fstream>

using namespace std;

// LSD(Least Significant Digit)基数排序
// 需要r个辅助队列（本代码中r为10）
// 时间复杂度O(d(n+r))
// 空间复杂度O(r)
int *LSD(int *a, int f, int l)
{
    int n = l - f + 1;
    int m = log(n) / log(10);
    queue<int> q[10];
    for(int i = 0; i < m; i++){
        for(int j = 0; j < n; j++){
            int t = a[f + j] % (int)pow(10, i + 1);
            t = t / (int)pow(10, i);
            q[t].push(a[f + j]);
        }
        int k = 0;
        for(int j = 0; j < 10; j++){
            while(!q[j].empty()){
                a[f + k] = q[j].front();
                q[j].pop();
                k++;
            }
        }
    }
    return a;
}

// MSD(Most Significant Digit)基数排序
// 需要r个辅助队列（本代码中r为10）
// 时间复杂度O(d(n+r))
// 空间复杂度O(r)
int *MSD(int *a, int f, int l)
{
    int n = l - f + 1;
    int m = log(n) / log(10);
    queue<int> q[10];
    for(int i = 0; i < m; i++){
        for(int j = 0; j < n; j++){
            int t = a[f + j] / (int)pow(10, i);
            t = t % 10;
            q[t].push(a[f + j]);
        }
        int k = 0;
        for(int j = 0; j < 10; j++){
            while(!q[j].empty()){
                a[f + k] = q[j].front();
                q[j].pop();
                k++;
            }
        }
    }
    return a;
}

// QS(Quick Sort)快速排序
// 时间复杂度O(nlogn)
// 空间复杂度O(1)
int *QS(int *a, int f, int l)
{
    if(f >= l) return a;
    int i = f, j = l;
    int x = a[f];
    while(i < j){
        while(i < j && a[j] >= x) j--;
        if(i < j) a[i++] = a[j];
        while(i < j && a[i] <= x) i++;
        if(i < j) a[j--] = a[i];
    }
    a[i] = x;
    QS(a, f, i - 1);
    QS(a, i + 1, l);
    return a;
}

// MS(Merge Sort)归并排序
// 时间复杂度O(nlogn)
// 空间复杂度O(n)
int *MS(int *a, int f, int l)
{
    if(f >= l) return a;
    int m = (f + l) / 2;
    MS(a, f, m);
    MS(a, m + 1, l);
    int *b = new int[l - f + 1];
    int i = f, j = m + 1, k = 0;
    while(i <= m && j <= l){
        if(a[i] < a[j]) b[k++] = a[i++];
        else b[k++] = a[j++];
    }
    while(i <= m) b[k++] = a[i++];
    while(j <= l) b[k++] = a[j++];
    for(int i = 0; i < k; i++) a[f + i] = b[i];
    return a;
}

// SS(Shell Sort)希尔排序
// 时间复杂度O(n^1.3)
// 空间复杂度O(1)
int *SS(int *a, int f, int l)
{
    int n = l - f + 1;
    int h = 1;
    h = n / 2;
    while(h >= 1){
        for(int i = f + h; i <= l; i++){
            int t = a[i];
            int j = i - h;
            while(j >= f && a[j] > t){
                a[j + h] = a[j];
                j -= h;
            }
            a[j + h] = t;
        }
        h /= 2;
    }
    return a;
}

// IS(Insertion Sort)插入排序
// 时间复杂度O(n^2)
// 空间复杂度O(1)
int *IS(int *a, int f, int l){
    for(int i = f + 1; i <= l; i++){
        int t = a[i];
        int j = i - 1;
        while(j >= f && a[j] > t){
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = t;
    }
    return a;
}

// BS(Bubble Sort)冒泡排序
// 时间复杂度O(n^2)
// 空间复杂度O(1)
int *BS(int *a, int f, int l){
    for(int i = f; i < l; i++){
        for(int j = f; j < l - i; j++){
            if(a[j] > a[j + 1]){
                int t = a[j];
                a[j] = a[j + 1];
                a[j + 1] = t;
            }
        }
    }
    return a;
}



int main(){
    int n = 10000;
    // 生成n个随机数
    int a[n];
    for(int i = 0; i < n; i++){
        a[i] = rand() % 10000;
    }
    // 将数据写入文件
    ofstream fout("data.txt");
    fout <<  "排序前：" << endl;
    for(int i = 0; i < n; i++){
        fout << a[i] << " ";
    }
    fout << endl;
    fout.close();
    // LSD基数排序
    // 记录时间
    clock_t time1 = clock();
    int *b = LSD(a,0,n-1);
    clock_t time2 = clock();
    // 输出结果追加到data.txt
    fout.open("data.txt", ios::app);
    fout << "LSD基数排序后：" << endl;
    for(int i = 0; i < n; i++){
        fout << b[i] << " ";
    }
    fout << endl;
    fout.close();

    // MSD基数排序
    // 记录时间
    clock_t time3 = clock();
    int *c = MSD(a,0,n-1);
    clock_t time4 = clock();
    // 输出结果追加到data.txt
    fout.open("data.txt", ios::app);
    fout << "MSD基数排序后：" << endl;
    for(int i = 0; i < n; i++){
        fout << c[i] << " ";
    }
    fout << endl;
    fout.close();

    // QS快速排序
    // 记录时间
    clock_t time5 = clock();
    int *d = QS(a,0,n-1);
    clock_t time6 = clock();
    // 输出结果追加到data.txt
    fout.open("data.txt", ios::app);
    fout << "QS快速排序后：" << endl;
    for(int i = 0; i < n; i++){
        fout << d[i] << " ";
    }
    fout << endl;
    fout.close();

    // MS归并排序
    // 记录时间
    clock_t time7 = clock();
    int *e = MS(a,0,n-1);
    clock_t time8 = clock();
    // 输出结果追加到data.txt
    fout.open("data.txt", ios::app);
    fout << "MS归并排序后：" << endl;
    for(int i = 0; i < n; i++){
        fout << e[i] << " ";
    }
    fout << endl;
    fout.close();

    // SS希尔排序
    // 记录时间
    clock_t time9 = clock();
    int *f = SS(a,0,n-1);
    clock_t time10 = clock();
    // 输出结果追加到data.txt
    fout.open("data.txt", ios::app);
    fout << "SS希尔排序后：" << endl;
    for(int i = 0; i < n; i++){
        fout << f[i] << " ";
    }
    fout << endl;
    fout.close();

    // IS插入排序
    // 记录时间
    clock_t time11 = clock();
    int *g = IS(a,0,n-1);
    clock_t time12 = clock();
    // 输出结果追加到data.txt
    fout.open("data.txt", ios::app);
    fout << "IS插入排序后：" << endl;
    for(int i = 0; i < n; i++){
        fout << g[i] << " ";
    }
    fout << endl;
    fout.close();

    // BS冒泡排序
    // 记录时间
    clock_t time15 = clock();
    int *k = BS(a,0,n-1);
    clock_t time16 = clock();
    // 输出结果追加到data.txt
    fout.open("data.txt", ios::app);
    fout << "BS冒泡排序后：" << endl;
    for(int i = 0; i < n; i++){
        fout << k[i] << " ";
    }
    fout << endl;
    fout.close();

    // 最后输出排序时间比较
    fout.open("data.txt", ios::app);
    fout << "-----------------------------------------------" << endl;
    fout << "LSD基数排序用时：" << (double)(time2 - time1) / CLOCKS_PER_SEC << "s" << endl;
    fout << "MSD基数排序用时：" << (double)(time4 - time3) / CLOCKS_PER_SEC << "s" << endl;
    fout << "QS快速排序用时：" << (double)(time6 - time5) / CLOCKS_PER_SEC << "s" << endl;
    fout << "MS归并排序用时：" << (double)(time8 - time7) / CLOCKS_PER_SEC << "s" << endl;
    fout << "SS希尔排序用时：" << (double)(time10 - time9) / CLOCKS_PER_SEC << "s" << endl;
    fout << "IS插入排序用时：" << (double)(time12 - time11) / CLOCKS_PER_SEC << "s" << endl;
    fout.close();
    return 0;
}
```