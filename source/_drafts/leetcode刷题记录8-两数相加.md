---
title: leetcode刷题记录8-两数相加
date: 2023-06-08 10:30:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 两数相加

>  [原题传送门](https://leetcode.cn/problems/add-two-numbers/description/)

给你两个**非空**的链表，表示两个非负的整数。它们每位数字都是按照**逆序**的方式存储的，并且每个节点只能存储**一位**数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

## 示例

### 示例1

![示例1](https://pan.zhuanjie.ltd/f/Y8bH0/addtwonumber1.jpg)

输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.



### 示例2


输入：l1 = [0], l2 = [0]
输出：[0]




### 示例3


输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]




提示：

- 每个链表中的节点数在范围 `[1, 100]` 内
- `0 <= Node.val <= 9`
- 题目数据保证列表表示的数字不含前导零

## 解答

### C++1

根据计数器规则正常加法

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        int tmp = 0;  // 作为进位器
        // 获取两个链表的长度
        int len1 = 0, len2 = 0;
        ListNode* tmp1 = l1;
        ListNode* tmp2 = l2;
        while(tmp1 != nullptr){
            len1++;
            tmp1 = tmp1->next;
        }
        while(tmp2 != nullptr){
            len2++;
            tmp2 = tmp2->next;
        }
        ListNode* res = new ListNode();
        ListNode* tmpRes = res;
        if(len1 == 0 || len2 == 0){
            if(len1 == 0 && len2 == 0){
                tmpRes->val = 0;
                return tmpRes;
            }else{
                return len1 == 0 ? l2 : l1;
            }
        }else{
            if(len1 > len2){
                ListNode* tmpList = l1;
                l1 = l2;
                l2 = tmpList;
                int tmpLen = len1;
                len1 = len2;
                len2 = tmpLen;
            }
            for(int i = 1; i <= len2; i++){
                if(i > len1){
                    // i超出l1长度
                    for(;i <= len2; i++){
                        tmpRes->val = (l2->val + tmp) % 10;
                        tmp = (l2->val + tmp)/10;
                        tmpRes->next = new ListNode();
                        tmpRes = tmpRes->next;
                        l2 = l2->next;
                    }
                    break;
                }
                // i在l1，l2长度范围内
                tmpRes->val = (l1->val + l2->val + tmp) % 10;
                tmp = (l1->val + l2->val + tmp)/10;
                tmpRes->next = new ListNode();
                tmpRes = tmpRes->next;
                l1 = l1->next;
                l2 = l2->next;
            }
            if(tmp != 0){
                tmpRes->val = tmp;
            }else{
                ListNode* lastTmp = new ListNode();
                lastTmp = res;
                while(lastTmp->next->next != nullptr){
                    lastTmp = lastTmp->next;
                }
                lastTmp->next = nullptr;
            }
            return res;
        }
    }
};
```
> leetcode运行时间：8 ms；内存：69.8 MB



### C++2

改用头节点进行编写

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        int a = 0, b = 0, s = 0, val1 = 0, val2  = 0;
        ListNode* newhead = new ListNode(-1);
        ListNode* node = newhead;

        while(l1 || l2 || a != 0)
        {
            val1 = l1 != nullptr ? l1->val : 0;
            val2 = l2 != nullptr ? l2->val : 0;
            if(l1)
            {
                l1 = l1->next;
            }
            if(l2)
            {
                l2 = l2->next;
            }
            s = val1 + val2 + a;
            a  = s / 10;
            b = s % 10;
            ListNode* p = new ListNode(b);
            node->next = p;
            node = node->next;
        }
        return newhead->next;
        
    }
};
```

> leetcode运行时间：36 ms；内存：39.7 MB


