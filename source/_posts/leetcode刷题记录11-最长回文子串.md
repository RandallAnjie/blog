---
title: leetcode刷题记录11-最长回文子串
date: 2023-06-15 13:47:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 找到二叉树中最近的右侧节点

>  [原题传送门](https://leetcode.cn/problems/longest-palindromic-substring/description/)

给定一个字符串`s`，找到`s`中最长的回文子串。

## 示例

### 示例1

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。

### 示例2


输入：s = "cbbd"
输出："bb"



提示：

- `1 <= s.length <= 1000`
- `s`仅由数字和英文字母组成

## 解答

### C++1

暴力循环法，长度从s的长度开始依次减小字串长度并且移动子串，利用isPalindrome函数判断是不是回文子串

```c++
class Solution {
public:
    bool isPalindrome(string s) {
        int len = s.length();
        for (int i = 0; i < len / 2; i++) {
            if (s[i] != s[len - i - 1]) {
                return false;
            }
        }
        return true;
    }

    string longestPalindrome(string s) {
        for(int i = 0; i < s.size(); i++){
            for(int j = 0; j <= i; j++){
                string temp = s.substr(j, s.size() - i);
                if(isPalindrome(temp)){
                    return temp;
                }
            }
        }
        return "";
    }
};
```
> leetcode运行时间：超出时间限制



### C++2

动态规划1，判断dp[i][j] 表示 s[i] 到 s[j] 是否为回文串

```c++
class Solution {
public:
    bool isPalindrome(string s) {
        int len = s.length();
        for (int i = 0; i < len / 2; i++) {
            if (s[i] != s[len - i - 1]) {
                return false;
            }
        }
        return true;
    }

    string longestPalindrome(string s) {
        int len = s.length();  // 字符串长度
        int dp[len][len];  // dp[i][j] 表示 s[i] 到 s[j] 是否为回文串
        string ans = "";
        for (int i = 0; i < len; i++) {
            dp[i][i] = 1;
            ans = s[i];
        }
        for (int i = 0; i < len - 1; i++) {
            if (s[i] == s[i + 1]) {
                dp[i][i + 1] = 1;
                ans = s.substr(i, 2);
            } else {
                dp[i][i + 1] = 0;
            }
        }
        for (int i = 3; i <= len; i++) {
            for (int j = 0; j <= len - i; j++) {
                if (s[j] == s[j + i - 1] && dp[j + 1][j + i - 2] == 1) {
                    dp[j][j + i - 1] = 1;
                    ans = s.substr(j, i);
                } else {
                    dp[j][j + i - 1] = 0;
                }
            }
        }
        return ans;
    }

};

```

> leetcode运行时间：1048 ms；内存：514.5 MB


### C++3

动态规划2，判断dp[i][j] 表示 s[j] 到 s[j+i] 是否为回文串

```c++
class Solution {
public:
    bool isPalindrome(string s) {
        int len = s.length();
        for (int i = 0; i < len / 2; i++) {
            if (s[i] != s[len - i - 1]) {
                return false;
            }
        }
        return true;
    }

    string longestPalindrome(string s) {
        int len = s.length();  // 字符串长度
        int dp[len][len];  // dp[i][j] 表示 s[j] 到 s[j+i] 是否为回文串
        int tmpMax = 1;
        string ans = s.substr(0, 1);

        // 初始化前两行
        for (int i = 0; i < len; i++) {
            dp[0][i] = 1;
        }
        for (int i = 0; i < len - 1; i++) {
            if (s[i] == s[i + 1]) {
                dp[1][i] = 1;
                if(tmpMax < 2){
                    tmpMax = 2;
                    ans = s.substr(i, 2);
                }
            } else {
                dp[1][i] = 0;
            }
        }

        // 主体循环，判断某一个子串是否为回文串，就是判断长度比他小两个的子串是否为回文串
        for(int i = 2; i < len; i++){
            for(int j = 0; j < len - i; j++){
                if(s[j] == s[j + i] && dp[i - 2][j + 1] == 1){
                    dp[i][j] = 1;
                    if(tmpMax < i + 1){
                        tmpMax = i + 1;
                        ans = s.substr(j, i + 1);
                    }
                }else{
                    dp[i][j] = 0;
                }
            }
        }

        return ans;

    }

};

```

> leetcode运行时间：116 ms；内存：23.2 MB


### C++4

挨个扫描获取以当前字符串或者当前字符串和下一个字符串为中心的最长回文子串

```c++
class Solution {
public:

    string longestPalindrome(string s) {
        int len = s.length();  // 字符串长度
        int maxL = 0, maxR = 0, tmpL = 0, tmpR = 0;

        for(int i = 0; i < len; i++){

            // 以当前字符为中心
            tmpL = i;
            tmpR = i;
            while(tmpL >= 0 && tmpR < len && s[tmpL] == s[tmpR]){
                tmpL--;
                tmpR++;
            }
            if(tmpR - tmpL - 1 > maxR - maxL + 1){
                maxL = tmpL + 1;
                maxR = tmpR - 1;
            }


            // 以当前字符和下一个字符为中心
            tmpL = i;
            tmpR = i + 1;
            while(tmpL >= 0 && tmpR < len && s[tmpL] == s[tmpR]){
                tmpL--;
                tmpR++;
            }
            if(tmpR - tmpL - 1 > maxR - maxL + 1){
                maxL = tmpL + 1;
                maxR = tmpR - 1;
            }
        }

        return s.substr(maxL, maxR - maxL + 1);

    }

};

```

> leetcode运行时间：8 ms；内存：6.7 MB


