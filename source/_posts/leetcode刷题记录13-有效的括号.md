---
title: leetcode刷题记录13-有效的括号
date: 2023-06-19 13:53:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 有效的括号

>  [原题传送门](https://leetcode.cn/problems/valid-parentheses/description/)

给定一个只包括`'('`，`')'`，`'{'`，`'}'`，`'['`，`']'`的字符串`s`，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。

## 示例

### 示例1

输入：s = "()"
输出：true

### 示例2

输入：s = "()[]{}"
输出：true

### 示例3

输入：s = "(]"
输出：false



提示：

- `1 <= s.length <= 10000`
- `s`仅由括号`'()[]{}'`组成


## 解答

### C++

直接使用栈求解

```c++
class Solution {
public:
    bool isValid(string s) {
        stack<char> stack;
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            }
            else {
                if (stack.empty()) {
                    return false;
                }
                char top = stack.top();
                stack.pop();
                if (c == ')' && top != '(') {
                    return false;
                }
                if (c == ']' && top != '[') {
                    return false;
                }
                if (c == '}' && top != '{') {
                    return false;
                }
            }
        }
        return stack.empty();
    }
};

```
> leetcode运行时间：4 ms；内存：6.1 MB

