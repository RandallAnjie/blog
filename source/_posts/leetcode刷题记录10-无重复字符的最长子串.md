---
title: leetcode刷题记录10-无重复字符的最长子串
date: 2023-06-08 11:30:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 无重复字符的最长子串

>  [原题传送门](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

给定一个字符串`s`，请你找出其中不含有重复字符的**最长子串**的长度。

## 示例

### 示例1

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是"abc"，所以其长度为 3。

### 示例2


输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是"b"，所以其长度为 1。


### 示例3

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是"wke"，所以其长度为 3。
请注意，你的答案必须是**子串**的长度，"pwke" 是一个子序列，不是子串。



提示：

- `0 <= s.length <= 50000`
- `s`由英文字母、数字、符号和空格组成

## 解答

### C++1

双指针求解，寻找两个标记，begin和end，将end逐渐向后移动，移动之前判断下一个元素是否被标记为已经使用，如果已经使用则向前推进begin，直至下一个元素没被使用

```c++
class Solution {
private:
    bool used[128]={false};  // s 由英文字母、数字、符号和空格组成

public:
    int lengthOfLongestSubstring(std::string s) {
        if(s.length() == 0) return 0;
        int begin = 0, end = 1, max = 1;
        int length = s.length();
//        std::string tmp = "";
        used[s[0]] = true;
        for(; end < length; end++){
            while(used[s[end]]){
                used[s[begin]] = false;
                begin++;
            }
            used[s[end]] = true;
            if (end - (begin-1) + 1 > max) {
                max = end - begin + 1;
//                tmp = s.substr(begin, max);
            }
        }
//        std::cout << tmp << std::endl;
        return max;
    }
};
```
> leetcode运行时间：4 ms; 内存：6.8 MB



### C++2

优化算法，将数组转换为哈希表

```c++
class Solution {
public:
    static int lengthOfLongestSubstring(std::string s) {
        std::unordered_map<char,int> usedMap;  // 创建一个哈希表，用于存储字符及其下标
        int begin=0, end=0, max=0;
        int length = s.size();
        while(end < length)
        {
            char c=s[end];
            end++;
            usedMap[c]++;
            while(usedMap[c]>1)
            {
                char x=s[begin];
                begin++;
                usedMap[x]--;
            }
            max = max > (end - begin) ? max : (end - begin);
        }
        return max;
    }
};
```

> leetcode运行时间：12 ms；内存：8.1 MB


