---
title: 数据结构——栈和队列
tags: []
id: '432'
categories:
  - - C++
  - - 数据结构
date: 2022-02-15 22:46:48
---

头文件StackAndQueue.h

```c
// StackAndQueue.h - 栈和队列
#include <iostream>

#define SqStackMaxSize 10  // 定义静态链表的最大长度
#define SqQueueMaxSize 10  // 定义顺序队列的最大长度

// 数据部分用int类型数据模拟

/*********************************************************************************************************************************
 * 数据类型一览
 * SqStack 顺序栈
 * ShStack 共享栈
 * LiStack 链栈
 * SqQueue 顺序队列
 * ShQueue 共享队列
 * LinkQueue 链队列
 * 
 * 操作函数 共享栈操作在函数名后加0或者1 不带头结点的链栈操作在函数名后加WithoutFirstNode
 * int Length(S) 求栈或者队列长度 返回栈长或者队列长
 * bool Empty(S) 判断栈S是否为空 栈空返回1，否则返回0
 * bool Full(S) 判断栈S是否已满 栈满返回1，否则返回0
 * int Push(S,e) 入栈，将e压入栈S 正常结束返回0，栈满，无法入栈返回-1
 * int Pop(S,e) 出栈，将栈S的栈顶元素e出栈 正常结束返回0，栈空，无法出栈返回-1
 * int GetTop(S,e) 获取栈S的栈顶元素e 正常结束返回0，栈空，无法获取返回-1
 * int DestroyStack(S) 销毁栈S 正常结束返回0
 * int PrintStack(S) 打印栈S 正常结束返回0
 * int InitQueue(Q) 初始化队列Q 正常结束返回0
 * int DeQueue(Q,e) 出队，将队列Q的队头元素e出队 正常结束返回0，队空，无法出队返回-1
 * int GetHead(Q,e) 获取队列Q的队头元素e 正常结束返回0，队空，无法获取返回-1
 * int PrintQueue(Q) 打印队列Q 正常结束返回0
 * int DestroyQueue(Q) 销毁队列Q 正常结束返回0
 * 
 *********************************************************************************************************************************/

// 顺序栈
typedef struct SqStack {
    int data[SqStackMaxSize];
    int top;
} SqStack;

// 初始化顺序栈
int InitStack(SqStack &S) {
    S.top = -1;  // 初始化栈顶指针为-1
    return 0;
}

// 判断顺序栈是否为空
bool Empty(SqStack S) {
    return S.top == -1;
}

// 判断顺序栈是否已满
bool Full(SqStack S) {
    return S.top == SqStackMaxSize - 1;
}

// 入栈
int Push(SqStack &S, int x) {
    if (Full(S)) {
        return -1;  // 栈满，无法入栈返回-1
    }
    S.data[++S.top] = x;  // 入栈
    return 0;
}

// 出栈
int Pop(SqStack &S, int &x) {
    if (Empty(S)) {
        return -1;  // 栈空，无法出栈返回-1
    }
    x = S.data[S.top--];  // 出栈
    return 0;
}

// 获取栈顶元素
int GetTop(SqStack S, int &x) {
    if (Empty(S)) {
        return -1;  // 栈空，无法获取栈顶元素返回-1
    }
    x = S.data[S.top];  // 获取栈顶元素
    return 0;
}

// 顺序栈的销毁
int DestroyStack(SqStack &S) {
    S.top = -1;  // 销毁栈，栈顶指针指向-1
    return 0;
}

// 顺序栈的输出
int PrintStack(SqStack S) {
    if (Empty(S)) {
        return -1;  // 栈空，无法输出返回-1
    }
    for (int i = 0; i <= S.top; i++) {
        std::cout << S.data[i] << " ";  // 输出栈
    }
    std::cout << std::endl;
    return 0;
}

// 顺序栈的求长度
int Length(SqStack S) {
    return S.top + 1;  // 返回栈的长度
}

// 共享栈
typedef struct ShStack {
    int data[SqStackMaxSize];
    int top0;  // 0号栈栈顶指针
    int top1;  // 1号栈栈顶指针
} ShStack;

// 初始化共享栈
int InitStack(ShStack &S) {
    S.top0 = -1;  // 初始化0号栈栈顶指针为-1
    S.top1 = SqStackMaxSize;  // 初始化1号栈栈顶指针为栈的最大长度
    return 0;
}

// 判断共享栈是否为空
bool Empty(ShStack S) {
    return S.top0 == -1 && S.top1 == SqStackMaxSize;
}
bool Empty0(ShStack S) {
    return S.top0 == -1;
}
bool Empty1(ShStack S) {
    return S.top1 == SqStackMaxSize;
}

// 判断共享栈是否已满
bool Full(ShStack S) {
    return S.top1-1 == S.top0;  // 栈顶指针相邻为栈满
}
bool Full0(ShStack S) {
    return Full(S);
}
bool Full1(ShStack S) {
    return Full(S);
}

// 入栈
int Push0(ShStack &S, int x) {
    if (Full0(S)) {
        return -1;  // 栈满，无法入栈返回-1
    }
    S.data[++S.top0] = x;  // 入栈
    return 0;
}
int Push1(ShStack &S, int x) {
    if (Full1(S)) {
        return -1;  // 栈满，无法入栈返回-1
    }
    S.data[--S.top1] = x;  // 入栈
    return 0;
}

// 出栈
int Pop0(ShStack &S, int &x) {
    if (Empty0(S)) {
        return -1;  // 栈空，无法出栈返回-1
    }
    x = S.data[S.top0--];  // 出栈
    return 0;
}
int Pop1(ShStack &S, int &x) {
    if (Empty1(S)) {
        return -1;  // 栈空，无法出栈返回-1
    }
    x = S.data[S.top1++];  // 出栈
    return 0;
}

// 获取栈顶元素
int GetTop0(ShStack S, int &x) {
    if (Empty0(S)) {
        return -1;  // 栈空，无法获取栈顶元素返回-1
    }
    x = S.data[S.top0];  // 获取栈顶元素
    return 0;
}
int GetTop1(ShStack S, int &x) {
    if (Empty1(S)) {
        return -1;  // 栈空，无法获取栈顶元素返回-1
    }
    x = S.data[S.top1];  // 获取栈顶元素
    return 0;
}

// 共享栈的销毁
int DestroyStack(ShStack &S) {
    S.top0 = -1;  // 销毁0号栈，栈顶指针指向-1
    S.top1 = SqStackMaxSize;  // 销毁1号栈，栈顶指针指向栈的最大长度
    return 0;
}
int DestroyStack0(ShStack &S) {
    S.top0 = -1;  // 销毁0号栈，栈顶指针指向-1
    return 0;
}
int DestroyStack1(ShStack &S) {
    S.top1 = SqStackMaxSize;  // 销毁1号栈，栈顶指针指向栈的最大长度
    return 0;
}

// 共享栈的输出
int PrintStack0(ShStack S) {
    if (Empty0(S)) {
        return -1;  // 栈空，无法输出返回-1
    }
    for (int i = 0; i <= S.top0; i++) {
        std::cout << S.data[i] << " ";  // 输出0号栈，输出栈顶元素
    }
    std::cout << std::endl;
    return 0;
}
int PrintStack1(ShStack S) {
    if (Empty1(S)) {
        return -1;  // 栈空，无法输出返回-1
    }
    for (int i = SqStackMaxSize-1; i > S.top1; i--) {
        std::cout << S.data[i] << " ";  // 输出1号栈，输出栈顶元素
    }
    std::cout << std::endl;
    return 0;
}
int PrintStack(ShStack S) {
    PrintStack0(S);
    if (Empty1(S)) {
        return -1;  // 栈空，无法输出返回-1
    }
    for (int i = SqStackMaxSize-1; i > S.top1; i--) {
        std::cout << S.data[i] << " ";  // 输出1号栈，输出栈顶元素
    }
    std::cout << std::endl;
    return 0;
}

// 共享栈求长度
int StackLength0(ShStack S) {
    return S.top0+1;  // 返回0号栈的长度
}
int StackLength1(ShStack S) {
    return SqStackMaxSize-S.top1;  // 返回1号栈的长度
}
int StackLength(ShStack S) {
    return StackLength0(S) + StackLength1(S);  // 返回共享栈的长度
}

// 链栈
typedef struct Linknode{
    int data;  // 数据域
    struct Linknode *next;  // 指针域
}*LiStack;

// 初始化链栈
int InitStack(LiStack &L) {
    L = (LiStack)malloc(sizeof(struct Linknode));  // 分配结点
    if (L == NULL) {
        return -1;  // 分配失败，返回-1
    }
    L->next = NULL;  // 初始化链栈
    return 0;
}

// 初始化链栈 不带头结点
int InitStackWithoutFirstNode(LiStack &L) {
    L = NULL;  // 初始化链栈
    return 0;
}

// 判断链栈是否为空
int Empty(LiStack L) {
    return L->next == NULL;  // 判断链栈是否为空
}

// 判断链栈是否空 不带头结点
int EmptyWithoutFirstNode(LiStack L) {
    return L == NULL;  // 判断链栈是否为空
}

// 入栈
int Push(LiStack &L, int x) {
    LiStack p = (LiStack)malloc(sizeof(struct Linknode));  // 分配结点
    if (p == NULL) {
        return -1;  // 分配失败，返回-1
    }
    p->data = x;  // 入栈
    p->next = L->next;  // 入栈
    L->next = p;  // 入栈
    return 0;
}

// 入栈 不带头结点
int PushWithoutFirstNode(LiStack &L, int x) {
    LiStack p = (LiStack)malloc(sizeof(struct Linknode));  // 分配结点
    if (p == NULL) {
        return -1;  // 分配失败，返回-1
    }
    p->data = x;  // 入栈
    p->next = L;  // 入栈
    L = p;  // 入栈
    return 0;
}

// 出栈
int Pop(LiStack &L, int &x) {
    if (Empty(L)) {
        return -1;  // 栈空，无法出栈返回-1
    }
    LiStack p = L->next;  // 出栈
    x = p->data;  // 出栈
    L->next = p->next;  // 出栈
    free(p);  // 释放结点
    return 0;
}

// 出栈 不带头结点
int PopWithoutFirstNode(LiStack &L, int &x) {
    if (EmptyWithoutFirstNode(L)) {
        return -1;  // 栈空，无法出栈返回-1
    }
    LiStack p = L;  // 出栈
    x = p->data;  // 出栈
    L = p->next;  // 出栈
    free(p);  // 释放结点
    return 0;
}

// 输出链栈
int PrintStack(LiStack L) {
    if (Empty(L)) {
        return -1;  // 栈空，无法输出返回-1
    }
    while (L->next != NULL) {
        std::cout << L->next->data << " ";  // 输出链栈
        L = L->next;  // 输出链栈
    }
    std::cout << std::endl;
    return 0;
}

// 输出链栈 不带头结点
int PrintStackWithoutFirstNode(LiStack L) {
    if (EmptyWithoutFirstNode(L)) {
        return -1;  // 栈空，无法输出返回-1
    }
    while (L != NULL) {
        std::cout << L->data << " ";  // 输出链栈
        L = L->next;  // 输出链栈
    }
    std::cout << std::endl;
    return 0;
}

// 获取栈顶元素
int GetTop(LiStack L, int &x) {
    if (Empty(L)) {
        return -1;  // 栈空，无法获取栈顶元素返回-1
    }
    x = L->next->data;  // 获取栈顶元素
    return 0;
}

// 获取栈顶元素 不带头结点
int GetTopWithoutFirstNode(LiStack L, int &x) {
    if (EmptyWithoutFirstNode(L)) {
        return -1;  // 栈空，无法获取栈顶元素返回-1
    }
    x = L->data;  // 获取栈顶元素
    return 0;
}

// 删除链栈
int DeleteStack(LiStack &L) {
    if (Empty(L)) {
        return -1;  // 栈空，无法删除返回-1
    }
    while (L->next != NULL) {
        LiStack p = L->next;  // 删除链栈
        L->next = p->next;  // 删除链栈
        free(p);  // 释放结点
    }
    free(L);  // 释放结点
    return 0;
}

// 删除链栈 不带头结点
int DeleteStackWithoutFirstNode(LiStack &L) {
    if (EmptyWithoutFirstNode(L)) {
        return -1;  // 栈空，无法删除返回-1
    }
    while (L != NULL) {
        LiStack p = L;  // 删除链栈
        L = L->next;  // 删除链栈
        free(p);  // 释放结点
    }
    return 0;
}

// 队列的顺序实现
typedef struct SqQueue{
    int data[SqQueueMaxSize];  // 数据
    int front;  // 队头
    int rear;  // 队尾
}SqQueue;

// 初始化队列
int InitQueue(SqQueue &Q) {
    Q.front = 0;  // 队头
    Q.rear = 0;  // 队尾
    return 0;
}

// 判断队列是否为空
int Empty(SqQueue Q) {
    return Q.front == Q.rear;
}

// 判断队列是否满
int Full(SqQueue Q) {
    return (Q.rear + 1) % SqQueueMaxSize == Q.front;
}

// 入队
int EnQueue(SqQueue &Q, int x) {
    if (Full(Q)) {
        return -1;  // 队满，无法入队返回-1
    }
    Q.data[Q.rear] = x;  // 入队
    Q.rear = (Q.rear + 1) % SqQueueMaxSize;  // 入队
    return 0;
}

// 出队
int DeQueue(SqQueue &Q, int &x) {
    if (Empty(Q)) {
        return -1;  // 队空，无法出队返回-1
    }
    x = Q.data[Q.front];  // 出队
    Q.front = (Q.front + 1) % SqQueueMaxSize;  // 出队
    return 0;
}

// 获取对头元素
int GetHead(SqQueue Q, int &x) {
    if (Empty(Q)) {
        return -1;  // 队空，无法获取对头元素返回-1
    }
    x = Q.data[Q.front];  // 获取对头元素
    return 0;
}

// 删除队列
int DeleteQueue(SqQueue &Q) {
    if (Empty(Q)) {
        return -1;  // 队空，无法删除返回-1
    }
    Q.front = 0;  // 队头
    Q.rear = 0;  // 队尾
    return 0;
}

// 队列长度
int Length(SqQueue Q) {
    return (Q.rear - Q.front + SqQueueMaxSize) % SqQueueMaxSize;
}

// 链队列
typedef struct LinkNode{
    int data;  // 数据
    struct LinkNode *next;  // 指针
}LinkNode;
typedef struct LinkQueue{
    LinkNode *front;  // 队头
    LinkNode *rear;  // 队尾
    // int length;  // 队列长度(如果频繁访问队列长度可添加长度计数器)
}LinkQueue;

// 初始化链队列
int InitQueue(LinkQueue &Q){
    Q.front = (LinkNode *)malloc(sizeof(LinkNode));  // 队头
    Q.rear = Q.front;  // 队尾
    Q.front->next = NULL;  // 队头指针
    return 0;  // 初始化成功
}

// 初始化链队列 不带头结点
int InitQueueWithoutFirstNode(LinkQueue &Q){
    Q.front = NULL;  // 队头
    Q.rear = NULL;  // 队尾
    return 0;  // 初始化成功
}

// 判断链队列是否为空
bool Empty(LinkQueue Q){
    return Q.front == Q.rear;
}

// 判断链队列是否为空 不带头结点
bool EmptyWithoutFirstNode(LinkQueue Q){
    return Q.front == NULL;
}

// 入队
int EnQueue(LinkQueue &Q, int x){
    LinkNode *s = (LinkNode *)malloc(sizeof(LinkNode));  // 创建结点
    if (s == NULL) {
        return -1;  // 创建结点失败，无法入队返回-1
    }
    s->data = x;  // 新结点数据
    s->next = NULL;  // 新结点的next指针为空
    Q.rear->next = s;  // 将新结点插入队尾
    Q.rear = s;  // 修改对尾指针
    return 0;  // 入队成功
}

// 出队
int DeQueue(LinkQueue &Q, int &x){
    if (Empty(Q)) {
        return -1;  // 队空，无法出队返回-1
    }
    LinkNode *p = Q.front->next;  // 出队结点
    x = p->data;  // 出队结点数据
    Q.front->next = p->next;  // 将队头指针指向出队结点的下一个结点
    if (Q.rear == p) {  // 如果出队结点是队尾结点，则修改队尾指针
        Q.rear = Q.front;
    }
    free(p);  // 释放结点
    return 0;  // 出队成功
}

// 入队 不带头结点
int EnQueueWithoutFirstNode(LinkQueue &Q, int x){
    LinkNode *s = (LinkNode *)malloc(sizeof(LinkNode));  // 创建结点
    if (s == NULL) {
        return -1;  // 创建结点失败，无法入队返回-1
    }
    s->data = x;  // 新结点数据
    s->next = NULL;  // 新结点的next指针为空
    if (EmptyWithoutFirstNode(Q)) {  // 如果队列为空
        Q.front = s;  // 队头指针指向新结点
    } else {  // 如果队列不为空
        Q.rear->next = s;  // 将新结点插入队尾
    }
    Q.rear = s;  // 修改对尾指针
    return 0;  // 入队成功
}

// 出队 不带头结点
int DeQueueWithoutFirstNode(LinkQueue &Q, int &x){
    if (EmptyWithoutFirstNode(Q)) {
        return -1;  // 队空，无法出队返回-1
    }
    LinkNode *p = Q.front;  // 出队结点
    x = p->data;  // 出队结点数据
    Q.front = p->next;  // 将队头指针指向出队结点的下一个结点
    if (Q.rear == p) {  // 如果出队结点是队尾结点，则修改队尾指针
        Q.rear = Q.front;
    }
    free(p);  // 释放结点
    return 0;  // 出队成功
}

// 打印链队列
int PrintQueue(LinkQueue Q){
    if (Empty(Q)) {
        return -1;  // 队空，无法打印返回-1
    }
    LinkNode *p = Q.front->next;  // 打印结点
    while (p != NULL) {
        printf("%d ", p->data);  // 打印结点数据
        p = p->next;  // 指向下一个结点
    }
    printf("\n");  // 换行
    return 0;  // 打印成功
}

// 打印链队列 不带头结点
int PrintQueueWithoutFirstNode(LinkQueue Q){
    if (EmptyWithoutFirstNode(Q)) {
        return -1;  // 队空，无法打印返回-1
    }
    LinkNode *p = Q.front;  // 打印结点
    while (p != NULL) {
        printf("%d ", p->data);  // 打印结点数据
        p = p->next;  // 指向下一个结点
    }
    printf("\n");  // 换行
    return 0;  // 打印成功
}

// 求链队列长度
int Length(LinkQueue Q){
    if (Empty(Q)) {
        return 0;  // 队空，长度为0
    }
    int len = 0;  // 长度
    LinkNode *p = Q.front->next;  // 计算结点
    while (p != NULL) {
        len++;  // 长度加1
        p = p->next;  // 指向下一个结点
    }
    return len;  // 返回长度
}

// 求链队列长度 不带头结点
int LengthWithoutFirstNode(LinkQueue Q){
    if (EmptyWithoutFirstNode(Q)) {
        return 0;  // 队空，长度为0
    }
    int len = 0;  // 长度
    LinkNode *p = Q.front;  // 计算结点
    while (p != NULL) {
        len++;  // 长度加1
        p = p->next;  // 指向下一个结点
    }
    return len;  // 返回长度
}

// 销毁链队列
int DestroyQueue(LinkQueue &Q){
    if (Empty(Q)) {
        return -1;  // 队空，无法销毁返回-1
    }
    LinkNode *p = Q.front->next;  // 销毁结点
    while (p != NULL) {
        LinkNode *q = p->next;  // 保存下一个结点
        free(p);  // 释放结点
        p = q;  // 指向下一个结点
    }
    Q.front->next = NULL;  // 队头指针指向空
    Q.rear = Q.front;  // 队尾指针指向队头
    return 0;  // 销毁成功
}

// 销毁链队列 不带头结点
int DestroyQueueWithoutFirstNode(LinkQueue &Q){
    if (EmptyWithoutFirstNode(Q)) {
        return -1;  // 队空，无法销毁返回-1
    }
    LinkNode *p = Q.front;  // 销毁结点
    while (p != NULL) {
        LinkNode *q = p->next;  // 保存下一个结点
        free(p);  // 释放结点
        p = q;  // 指向下一个结点
    }
    Q.front = NULL;  // 队头指针指向空
    Q.rear = NULL;  // 队尾指针指向空
    return 0;  // 销毁成功
}
```