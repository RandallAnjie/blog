---
title: leetcode刷题记录3-罗马数字转整数
date: 2023-03-23 14:45:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 罗马数字转整数

>  [原题传送门](https://leetcode.cn/problems/roman-to-integer/description/)

- 罗马数字包含以下七种字符: `I`， `V`， `X`， `L`，`C`，`D` 和 `M`。


| 字符 | 数值 |
| :--: | :--: |
|  I   |  1   |
|  V   |  5   |
|  X   |  10  |
|  L   |  50  |
|  C   | 100  |
|  D   | 500  |
|  M   | 1000 |


例如， 罗马数字 `2` 写做 `II` ，即为两个并列的 1 。`12` 写做 `XII` ，即为 `X` + `II` 。 `27` 写做 `XXVII`, 即为 `XX` + `V` + `II` 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 `IIII`，而是 `IV`。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 `IX`。这个特殊的规则只适用于以下六种情况：

- `I` 可以放在 `V` (5) 和 `X` (10) 的左边，来表示 4 和 9。
- `X` 可以放在 `L` (50) 和 `C` (100) 的左边，来表示 40 和 90。 
- `C` 可以放在 `D` (500) 和 `M` (1000) 的左边，来表示 400 和 900。

给定一个罗马数字，将其转换成整数。

## 示例

### 示例1


输入: s = "III"
输出: 3



### 示例2


输入: s = "IV"
输出: 4



### 示例3


输入: s = "IX"
输出: 9


### 示例4

输入: s = "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.

### 示例5

输入: s = "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.


提示：

- `1 <= s.length <= 15`
- `s` 仅含字符 `('I', 'V', 'X', 'L', 'C', 'D', 'M')`
- 题目数据保证 s 是一个有效的罗马数字，且表示整数在范围 [1, 3999] 内
- 题目所给测试用例皆符合罗马数字书写规则，不会出现跨位等情况。
- IL 和 IM 这样的例子并不符合题目要求，49 应该写作 XLIX，999 应该写作 CMXCIX 。
- 关于罗马数字的详尽书写规则，可以参考 [罗马数字 - Mathematics]([罗马数字 - Mathematics (partcommunity.com)](https://b2b.partcommunity.com/community/knowledge/zh_CN/detail/10753/罗马数字#knowledge_article)) 。

## 解答

### C++1——递归法

取字符串中表示最大数字的字符为基准，减去该字符串前面的字符串数字，加上该字符串后面的字符串数字

```c++
class Solution {
public:
    int getNum(char c){
        switch(c){
            case 'I': return 1;
            case 'V': return 5;
            case 'X': return 10;
            case 'L': return 50;
            case 'C': return 100;
            case 'D': return 500;
            case 'M': return 1000;
            default: return 0;
        }
    }

    int romanToInt(string s) {
        if(s.empty()){
            return 0;
        }
        if(s.size() == 1){
            return getNum(s[0]);
        }
        int flag = 0;
        for(int i = 0; i < s.size(); i++){
            if(getNum(s[flag]) < getNum(s[i])){
    //            cout << "flag=" << flag << endl;
                flag = i;
            }
        }
    //    cout << "flag=" << flag << endl;
    //    cout << s.substr(0, flag) << "  ";
    //    cout << s.substr(flag + 1) << endl;
        return getNum(s[flag]) - romanToInt(s.substr(0, flag)) + romanToInt(s.substr(flag + 1));
    }

};
```
> leetcode运行时间：16 ms；内存：5.8 MB

### C++2——顺序计算

根据顺序扫描，扫到一个`V`或者`L`直接加`50`（`V`和`L`没办法在减法行列中），其他不会出现多次连续的减法，即不会出现IIX之类的形式

```c++
class Solution {
public:
    int romanToInt(string s) {
        if(s.empty()){
            return 0;
        }
        int result = 0;
        for(int i = 0; i < s.size(); i++){
            if(s[i] == 'I') {
                if(i+1 < s.size() && (s[i+1] == 'V' || s[i+1] == 'X')) {  // 不会出现类似IIV和IIX类的形式
                    result -= 1;
                } else {
                    result += 1;
                }
            }
            else if(s[i] == 'V') {
                result += 5;
            }
            else if(s[i] == 'X') {
                if(i+1 < s.size() && (s[i+1] == 'L' || s[i+1] == 'C')) {  // 不会出现类似XXL和XXC类的形式
                    result -= 10;
                } else {
                    result += 10;
                }
            }
            else if(s[i] == 'L') {
                result += 50;
            }
            else if(s[i] == 'C') {
                if(i+1 < s.size() && (s[i+1] == 'D' || s[i+1] == 'M')) {  // 不会出现类似CCD和CCM类的形式
                    result -= 100;
                } else {
                    result += 100;
                }
            }
            else if(s[i] == 'D') {
                result += 500;
            }
            else if(s[i] == 'M') {
                result += 1000;
            }
        }
        return result;
    }

};
```

> leetcode运行时间：4 ms；内存：5.8 MB
