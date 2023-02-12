---
title: 每日一题——带分数
tags: []
id: '811'
categories:
  - - C++
  - - 每日一题
date: 2022-08-02 16:59:54
---

## 题目

100 可以表示为带分数的形式：100 = 3 + 69258 / 714。

还可以表示为：100 = 82 + 3546 / 197。

注意特征：**带分数中，数字1~9分别出现且只出现一次（不包含0）。**

类似这样的带分数，100 有 11 种表示法。

## 格式

### 输入格式

从标准输入读入一个正整数N (N<1000\*1000)

### 输出格式

程序输出该数字用数码1~9不重复不遗漏地组成带分数表示的全部种数。

**注意：不要求输出每个表示，只统计有多少表示法！**

### 样例输入1

100

### 样例输出1

11

### 样例输入2

105

### 样例输出2

6

## 思路

暴力穷举，生成1~9的全排列，再根据数字判断循环是否进行

## 代码

### 直接代码

```
/*
 * @Author: 转接
 * @Date: 2022-08-02 16:01:02
 * @LastEditors: 转接
 * @LastEditTime: 2022-08-02 16:30:08
 * @Description: 带分数
 */
/*
day10

每日一题——带分数

100 可以表示为带分数的形式：100 = 3 + 69258 / 714。
还可以表示为：100 = 82 + 3546 / 197。
*/
#include <iostream>
#include <cstdlib>
#include <algorithm>

using namespace std;

int main() {
    int n, num = 0;
    cin >> n;
    string s = "123456789";
    do {
        for (int i = 1; i <= 7; ++i) {  // i表示+前的串的长度
            string a = s.substr(0, i);  // 取出从0到i的字符串
            int numa = atoi(a.c_str());  // atoi传入char*类型将char类型转换为int类型
            if (numa >= n) {
                break;
            }
            for (int j = 1; j < 9 - i - 1; ++j) {  // j表示+和/之间的长度
                string b = s.substr(i, j);  // 取出从i到/前的字符串
                string c = s.substr(i + j);  // 取出/后面的字符串
                int numb = atoi(b.c_str());
                int numc = atoi(c.c_str());
                if (numb % numc == 0 && numa + numb / numc == n) {
                    num++;
                }
            }
        }
    } while (next_permutation(s.begin(), s.end()));  // 全排序
    cout << num;
    return 0;
}
```

存在的问题：substr耗费大量时间，其工作原理是开辟新空间拷贝原字符串再截取后再返回

解决方法：重写截取字串并转换为数字的函数，降低时间开销

### 修改后代码

```
/*
 * @Author: 转接
 * @Date: 2022-08-02 16:01:02
 * @LastEditors: 转接
 * @LastEditTime: 2022-08-02 16:50:34
 * @Description: 带分数
 */
/*
day10

每日一题——带分数

100 可以表示为带分数的形式：100 = 3 + 69258 / 714。
还可以表示为：100 = 82 + 3546 / 197。
*/
#include <iostream>
#include <algorithm>

using namespace std;

int getnum(const char *s, int pos, int len) {
    int num = 0;
    for (int i = pos; i < pos + len; ++i) {
        num += s[i] - '0';
        num *= 10;
    }
    num /= 10;
    return num;
}

int main() {
    int n, num = 0;
    cin >> n;
    string s = "123456789";
    do {
        for (int i = 1; i <= 7; ++i) {  // i表示+前的串的长度
            int numa = getnum(s.c_str(), 0, i);
            if (numa >= n) {
                break;
            }
            for (int j = 1; j < 9 - i - 1; ++j) {  // j表示+和/之间的长度
                int numb = getnum(s.c_str(), i, j);
                int numc = getnum(s.c_str(), i + j, 9 - i - j);
                if (numb % numc == 0 && numa + numb / numc == n) {
                    num++;
                }
            }
        }
    } while (next_permutation(s.begin(), s.end()));  // 全排序
    cout << num;
    return 0;
}
```