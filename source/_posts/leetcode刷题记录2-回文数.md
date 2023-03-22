---
title: leetcode刷题记录2-回文数
date: 2023-03-22 19:26:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 回文数

[原题传送门](https://leetcode.cn/problems/palindrome-number/description/)

给你一个整数 `x` ，如果 `x` 是一个回文整数，返回 `true` ；否则，返回 `false` 。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

- 例如，`121` 是回文，而 `123` 不是。

## 示例

### 示例1


输入：x = 121
输出：true


### 示例2


输入：x = -121
输出：false
解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。


### 示例3

输入：x = 10
输出：false
解释：从右向左读, 为 01 。因此它不是一个回文数。


提示：

- `-231 <= x <= 231 - 1`

## 解答

### C++1——暴力破解法

将x反转后和自身比较大小

```c++
class Solution {
public:
    bool isPalindrome(int x) {
        if(x < 0){
            return false;
        }
        long long reverse = 0;
        long long original = x;
        while(x > 0){
            int tmp = x % 10;
            reverse = reverse * 10 + tmp;
            x/=10;
        }
        if(reverse == original){
            return true;
        }else{
            return false;
        }
    }
};
```
> leetcode运行时间：12 ms；内存：5.7 MB

### C++2——由于数字对称性，即可取一半进行计算

```c++
class Solution {
public:
    bool isPalindrome(int x) {
        if(x < 0){
            return false;
        }
        if(x == 0){
            return true;
        }
        int n = static_cast<int>(log10(x)) + 1;  // 取数字以10为底的对数，获取位数信息
        /* log10函数在cmath头文件中 */
        bool flag = true;
        while(n>1){
            int hight = x / pow(10, n - 1);  // 取10的n-1次方
            /* pow函数在cmath头文件中 */
            int low = x%10;
            if(hight != low){
                flag = false;
                break;
            }
            x = (x - hight * pow(10, n - 1))/10;
            n-=2;
        }
        return flag;
    }
};
```

> leetcode运行时间：8 ms；内存：5.9 MB
