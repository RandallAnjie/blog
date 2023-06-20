---
title: leetcode刷题记录9-用两个栈实现队列
date: 2023-06-08 11:00:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 用两个栈实现队列

>  [原题传送门](https://leetcode.cn/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

用两个栈实现一个队列。队列的声明如下，请实现它的两个函数`appendTail`和`deleteHead`，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，`deleteHead`操作返回 -1 )

## 示例

### 示例1

输入：
["CQueue","appendTail","deleteHead","deleteHead","deleteHead"]
[[],[3],[],[],[]]
输出：[null,null,3,-1,-1]


### 示例2


输入：
["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
[[],[],[5],[2],[],[]]
输出：[null,-1,null,null,5,2]



提示：

- `1 <= values <= 10000`
- 最多会对`appendTail`、 `deleteHead`进行 10000 次调用

## 解答

### C++1

两个栈直接相互交换元素求解

```c++
class CQueue {
public:
    bool isHead{};  // 标记当前栈的状态，true表示栈1，false表示栈2
    // 创建两个栈
    std::stack<int> *stack1{};  // 栈1，用于头部操作
    std::stack<int> *stack2{};  // 栈2，用于尾部操作
    CQueue() {
        CQueue::isHead = true;  // 标记当前栈的状态，true表示栈1，false表示栈2
        // 创建两个栈
        CQueue::stack1 = new std::stack<int>();  // 栈1，用于头部操作
        CQueue::stack2 = new std::stack<int>();  // 栈2，用于尾部操作
    }

    void appendTail(int value) {
        // 判断当前栈的状态
        if (CQueue::isHead) {
            // 栈1，将内容弹出并压入栈2
            while (!CQueue::stack1->empty()) {
                CQueue::stack2->push(CQueue::stack1->top());
                CQueue::stack1->pop();
            }
            // 将新元素压入栈2
            CQueue::stack2->push(value);
            CQueue::isHead = false;
        } else {
            // 栈2，直接将新元素压入栈2
            CQueue::stack2->push(value);
        }
    }

    int deleteHead() {
        if(CQueue::isHead){
            // 栈1，直接弹出栈1的栈顶元素
            if(CQueue::stack1->empty()){
                return -1;
            }else{
                int result = CQueue::stack1->top();
                CQueue::stack1->pop();
                return result;
            }
        }else{
            // 栈2，将内容弹出并压入栈1
            while (!CQueue::stack2->empty()) {
                CQueue::stack1->push(CQueue::stack2->top());
                CQueue::stack2->pop();
            }
            // 弹出栈1的栈顶元素
            if(CQueue::stack1->empty()){
                return -1;
            }else{
                int result = CQueue::stack1->top();
                CQueue::stack1->pop();
                CQueue::isHead = true;
                return result;
            }
        }
    }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * CQueue* obj = new CQueue();
 * obj->appendTail(value);
 * int param_2 = obj->deleteHead();
 */
```
> leetcode运行时间：320 ms; 内存：104.9 MB



### C++2

优化算法，将移动元素放到当输出栈为空的情况

```c++
class CQueue {
public:
    // 创建两个栈
    std::stack<int> *stack1{};  // 栈1，用于头部操作
    std::stack<int> *stack2{};  // 栈2，用于尾部操作
    CQueue() {
        // 创建两个栈
        stack1 = new std::stack<int>();  // 栈1，用于头部操作
        stack2 = new std::stack<int>();  // 栈2，用于尾部操作
    }

    void appendTail(int value) {
        stack2->push(value);
    }

    int deleteHead() {
        if(stack1->empty()){
            while(!stack2->empty()){
                stack1->push(stack2->top());
                stack2->pop();
            }
            if(stack1->empty()){
                return -1;
            }else{
                int result = stack1->top();
                stack1->pop();
                return result;
            }
        }else{
            int result = stack1->top();
            stack1->pop();
            return result;
        }
    }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * CQueue* obj = new CQueue();
 * obj->appendTail(value);
 * int param_2 = obj->deleteHead();
 */
```

> leetcode运行时间：248 ms；内存：101 MB


