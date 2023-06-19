---
title: leetcode刷题记录14-最长公共前缀
date: 2023-06-19 14:16:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 找到二叉树中最近的右侧节点

>  [原题传送门](https://leetcode.cn/problems/longest-common-prefix/description/)

编写一个函数来查找字符串数组中的最长公共前缀。
如果不存在公共前缀，返回空字符串`""`。

## 示例

### 示例1

输入：strs = ["flower","flow","flight"]
输出："fl"

### 示例2


输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。



提示：

- `1 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]`仅由小写英文字母组成


## 解答

### C++1

```c++

class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        string result = "";
        char temp;
        if (strs.size() == 0) {
            return result;
        }
        int count = strs.size();
        int i = 0;
        while(i < strs[0].size()) {
            temp = strs[0][i];
            for (int j = 1; j < count; j++) {
                if (i >= strs[j].length() || strs[j][i] != temp) {
                    return result;
                }
            }
            result += temp;
            i++;
        }
        return result;
    }
};

```
> leetcode运行时间：4 ms；内存：9 MB



### C++2

在讨论区看到一个由大佬[hyxl1017](https://leetcode.cn/u/hyxl1101/)提出的好用的方法。
“理解了字典序概念以后，把数组进行排序，这时候只需要看第一个字符串和最后一个字符串的公共前缀了，相当于夹逼”

```c++
class Solution {
public:
    string longestCommonPrefix(vector<string>& str) {
        sort(str.begin(),str.end());
        string &s1=str.front();
        string &s2=str.back();
        int i=0;
        while(i<s1.size()&&i<s2.size()&&s1[i]==s2[i]){
            ++i;
        }
        return string(s1.begin(),s1.begin()+i);
    }
};
```

> leetcode运行时间：0 ms；内存：8.8 MB

