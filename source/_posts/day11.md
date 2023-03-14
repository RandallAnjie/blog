---
title: 每日一题——RGB
tags: []
id: '917'
categories:
  - - C++
  - - 每日一题
date: 2022-10-05 11:00:42
---

## 题目

给定两个由RGB组成的字符串，R代表红色，G代表绿色，B代表蓝色。Vasya有色盲症因此他无法分辨蓝色和绿色。问这两个字符串在Vasya眼里是否相同。

## 格式

### 输入格式

输入由多个测试用例组成。第一行包含一个整数t(1≤t≤100)测试用例的数量。测试用例的描述如下： 每个测试用例的第一行包含一个整数n(1≤n≤100)一网格的列数： 以下两行各包含一个字符串，有个字符，每个字符都是R、G或B,分别代表红色、绿色或蓝色单元格。

### 输出格式

对于每个测试用例，如果Vasya认为网格的两行相同，则输出“YES”,否则输出“NO”。 无论如何，您都可以输出答案（例如，字符串“yEs”、“yes”、“Yes”和“YES”将被识别为正确答案）。

### 样例


#### 输入：

```sh
6
2
RG
RB
4
GRBG
GBGB
5
GGGGG
BBBBB
7
BBBBBBB
RRRRRRR
8
RGBRRGBR
RGGRRBGR
1
G
G
```

#### 输出：

```sh
YES
NO
YES
NO
YES
YES
```
#### 样例说明
在第一个测试用例中，Vasya认为每行的第二个单元格相同，因为第一行的第二个单元格是绿色的，第二行的第二个单元格是蓝色的，所以他无法区分这两个单元格。其余的行在颜色上是相等的。因此，Vasya会说这两行颜色相同，即使它们实际上并不相同。
在第二个测试用例中，Vasya可以看到这两行是不同的。
在第三个测试用例中，每个细胞都是绿色或蓝色的，所以Vasya会认为它们是一样的。

## 代码及结果

### 代码

```c++
/*
 * @Author: 转接
 * @Date: 2022-10-05 10:13:21
 * @LastEditors: 转接
 * @LastEditTime: 2022-10-05 10:40:08
 * @Description: RGB
 */
/*
day11

每日一题——RGB

给定两个由RGB组成的字符串，R代表红色，G代表绿色，B代表蓝色。Vasya有色盲症因此他无法分辨蓝色和绿色。问这两个字符串在Vasya眼里是否相同。
*/

#include <iostream>
using namespace std;
char fotmat0(char a){
    if(a > 90){
        return a-('z'-'Z');
    }
    return a;
}

bool judge(char a, char b){
    if(fotmat0(a) == fotmat0(b)){
        return true;
    }
    if(fotmat0(a) != 'R' && fotmat0(b) != 'R'){
        return true;
    }
    return false;
}

int main() {
    int t; // 测试样例数量
    cin >> t;
    bool result[t];
    if (t <= 0  t > 100) { // 问题规模
        return -1;
    }
    for (int i = 0; i < t; i++){ // core
        int n; // 每个测试样例一行的个数
        cin >> n;
        char arr1[n], arr2[n];
        cin >> arr1;
        cin >> arr2;
        int j = 0;
        for(; j < n; j++){
            if(!judge(arr1[j],arr2[j])){
                result[i] = 0;
                break;
            }
        }
        if(j == n){
            result[i] = 1;
        }
    }

    for (int i = 0; i < t; i++){ // 输出
        if(result[i]){
            cout << "YES" << endl;
        } else{
            cout << "NO" << endl;
        }
    }
    return 0;
}
```

### 运行结果

```shell
6
2
RG
RB
4
GRBG
GBGB
5
GGGGG
BBBBB
7
BBBBBBB
RRRRRRR
8
RGBRRGBR
RGGRRBGR
1
G
G
YES
NO
YES
NO
YES
YES
```

## TODO

*   判读函数逻辑可以优化：可以将所有字符串组合后判断ASCII差值，取出不符合区间
*   如果将arr数组变为二维，输入会影响result数组
    *   ![](https://blog.zhuanjie.ltd/img/uploads/2022/10/image.png)
    *   ![](https://blog.zhuanjie.ltd/img/uploads/2022/10/image-1.png)