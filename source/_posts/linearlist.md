---
title: 数据结构——线性表
tags: []
id: '423'
categories:
  - - C++
  - - 数据结构
date: 2022-02-13 18:12:54
---

头文件LinearList.h

```
// LinearList.h - 线性表
#include <iostream>
#include <stdlib.h>

#define MAXSIZE 10  // 定义静态链表的最大长度
#define SqListMaxSize 10 
#define SqListInitSize 10 

// 数据部分用int类型数据模拟

/*********************************************************************************************************************************
 * 数据类型一览
 * SqList 顺序表 静态分配 
 * SeqList 顺序表 动态分配 
 * LNode *, LinkList 单链表
 * DNode *, DLinklist 双链表
 * Node 静态链表（单个）
 * SLinkList 静态链表（长度为MAXSIZE）
 * 
 * 操作函数
 * int Length(L) 求表L长度函数 返回表长
 * int LengthWithoutFirstNode(L) 求不带头结点的单链表L长度函数 返回表长 
 * bool Empty(L) 判空函数  空返回1，非空返回0
 * bool EmptyWithoutFirstNode (L) 单链表不带头结点判空函数  空返回1，非空返回0
 * int PrintList(L) 按顺序输出表L里内容 输出成功返回0，表空无输出返回1 
 * int PrintListWithoutFirstNode(L) 按顺序输出无头节点单链表L里内容 输出成功返回0，表空无输出返回1
 * int InitList(L) 初始化表L 正常结束返回0，内存不够初始化失败返回1
 * int InitListWithoutFirstNode(L) 无头节点初始化单链表表L 正常结束返回0，内存不够初始化失败返回1
 * int IncreaseSize(L, len) 动态分配顺序表增加长度 正常结束返回0，len大小不合法返回1
 * int ListInsert(L, e) 在表L的末尾插入元素e 正常结束返回0，表满导致内存不够返回1
 * int ListInsert(L, e, i) 在表L的第i位插入元素e 正常结束返回0，变量i大小不合法返回1，表满导致内存不够返回2
 * int ListInsertWithoutFirstNode(L, e, i) 在不带头结点的单链表L的第i位插入元素e 正常结束返回0，变量i大小不合法返回1
 * int ListDelete(L, i) 删除表L的第i位元素 正常结束返回0，变量i大小不合法返回1
 * int ListDeleteWithoutFirstNode(L, i) 删除表L的第i位元素 正常结束返回0，变量i大小不合法返回1
 * int ListPop(L, i) 弹出表L的第i位 正常结束返回弹出数据，变量i大小不合法返回-1
 * int ListPopWithoutFirstNode(L, i) 弹出表L的第i位 正常结束返回弹出数据，变量i大小不合法返回-1
 * int GetElem(L, i) 按位查找表L的元素 返回查找到的元素值，变量i大小不合法返回-1
 * LNode *GetElem(L, i) 按位查找表L的结点 返回查找到的结点，变量i大小不合法返回NULL
 * LNode *GetElemWithoutFirstNode (L, i) 按位查找不带头结点的单链表L的结点 返回查找到的结点，变量i大小不合法返回NULL
 * DNode *GetElem(L, i) 按位查找表L的结点 返回查找到的结点，变量i大小不合法返回NULL
 * int LocateElem(L, e) 按值查找表L的元素 返回查找到的元素位置，无匹配值返回0
 * LNode *LocateElem(L, e) 按值查找表L的元素 返回查找到的元素位置，无匹配值返回NULL
 * DNode *LocateElem(L, e) 按值查找表L的元素 返回查找到的元素位置，无匹配值返回NULL
 * int InsertNextNode(p, e) 单链表中在指定结点后插入元素e 正常结束返回0，p结点不存在返回1，新结点创建失败返回2
 * int InsertNextDNode(p, s) 双链表中在结点p后插入结点s 正常结束返回0，结点不存在返回1
 * int InsertPriorNode(p, e) 单链表中在指定结点前插入元素e 正常结束返回0，p结点不存在返回1，新结点创建失败返回2
 * int DeleteNode(p) 删除单链表中指定结点p 正常结束返回0，结点p不存在返回1，结点p为链表最后结点则无法删除返回2
 * int DeleteDNode(p) 删除单链表中指定结点p 正常结束返回0，结点p不存在返回1
 * int DeleteNextDNode(p) 删除双链表中指定结点p的后继节点q 正常结束返回0，结点p不存在返回1，结点p为链表最后结点则无法删除返回2
 * LinkList List_TailInsert() 正向建立一个单链表 返回已经初始化好的单链表
 * LinkList List_TailInsertWithoutFirstNode() 正向建立一个单链表 返回已经初始化好的不带头结点的单链表
 * LinkList List_HeadInsert() 反向建立一个单链表 返回已经初始化好的单链表
 * LinkList List_HeadInsertWithoutFirstNode() 反向建立一个单链表 返回已经初始化好的不带头结点的单链表
 * DsetoryList(L) 删除表L，归还内存给系统 正常结束返回0 (双链表已完成)
 * int List_Reverse(L) 反转链表L 正常结束返回0
 * 
 *********************************************************************************************************************************/
 
// 顺序表 静态分配 
typedef struct SqList {
int data[SqListMaxSize];  // 利用静态数组存放数据 
int length;  // 表示当前顺序表长度 
}SqList; 

// 顺序表 动态分配（伪动态，实则空间不够开创更大的一篇空间并且将之前的值赋值过去）
typedef struct SeqList {
int *data;  // 指示动态分配数组的指针 
int MaxSize;  // 顺序表的最大容量 
int length;  // 顺序表的当前长度 
}SeqList; 

// 顺序表求表长 静态分配
int Length(SqList L){
return L.length;
} 

// 顺序表求表长 动态分配
int Length(SeqList L){
return L.length;
} 

// 顺序表判空 静态分配
bool Empty(SqList L){
return L.length == 0;  // 返回1表示空，返回0表示非空 
}

// 顺序表判空 动态分配
bool Empty(SeqList L){
return L.length == 0;  // 返回1表示空，返回0表示非空 
}

// 顺序表输出内容 静态分配
int PrintList(SqList L){
if(Empty(L)){
return 1;  // 表空则无需输出，返回1 
}
for(int i = 0; i < L.length; i++){
std::cout << L.data[i] << " ";
}
std::cout << std::endl;
return 0;  // 输出成功完成后返回0 
} 

// 顺序表输出内容 动态分配
int PrintList(SeqList L){
if(Empty(L)){
return 1;  // 表空则无需输出，返回1 
}
for(int i = 0; i < L.length; i++){
std::cout << L.data[i] << " ";
}
std::cout << std::endl;
return 0;  // 输出成功完成后返回0 
} 

// 顺序表初始化 静态分配 
int InitList(SqList &L){
L.length = 0;
return 0;  // 正常结束返回0 
} 

// 顺序表初始化 动态分配
int InitList(SeqList &L){
L.data = (int *)malloc(SqListInitSize*sizeof(int));  // 初始大小为InitSize个ElemType类型的元素大小
// 实现初始大小分配方式：malloc申请一整片连续的空间，返回初始地址，然后强制转换成ElemType类型指针 
L.MaxSize = SqListInitSize;
L.length = 0;
return 0;  // 正常结束返回0 
} 

// 顺序表增加动态数组长度（本质开拓一片更大的内存空间，将之前的数据转存过去） 
// TODO:新建回收内存机制 
int IncreaseSize(SeqList &L, int len){  // 新增加长度为len 
if(len < 1){
return 1;  // 新增地址空间长度有误，返回1
} 
int *p = L.data;  // 创建一个指针指p向原数据地址 
L.data = (int *)malloc((L.MaxSize+len)*sizeof(int));  // 再将L.data指向新开辟的更大的地址空间 
/*ATT:这里malloc的内存大小要以表中MaxSize的数量加上len再乘以ElemType的大小*/
for(int i = 0; i < L.length; i++){  // 将数据迁移到新的地址 
L.data[i] = p[i];
}
L.MaxSize += len;  // 将顺序表的最大长度增加len 
free(p);  // 释放原始内存空间 
return 0;  // 正常结束返回0
} 

// 顺序表默认插入操作 静态分配 插入末尾 
int ListInsert(SqList &L, int e){
if(L.length >= SqListMaxSize){
return 2;  // 线性表已满 
}
L.data[L.length] = e;
L.length++;
return 0;  // 正常结束返回0
} 

// 顺序表插入操作 静态分配 
// 在顺序表L的第i位插入元素e 
// TODO:整合将部分数据向前、后移动操作 
int ListInsert(SqList &L, int e, int i){
if(i<1i>L.length+1){
return 1;  // 变量i大小不合法 
}
if(L.length >= SqListMaxSize){
return 2;  // 线性表已满 
}
for(int j = L.length; j >= i; j--){
L.data[j] = L.data[j-1];  // 将i及其后面的元素后移一位 
}
L.data[i-1] = e;
L.length++;
return 0;  // 正常结束返回0
} 

// 顺序表默认插入操作 动态分配 插入末尾 
int ListInsert(SeqList &L, int e){
if(L.length >= L.MaxSize){  // 线性表已满 
int functionCode = IncreaseSize(L, SqListMaxSize); 
if(functionCode!=0){
return functionCode;
} 
}
L.data[L.length] = e;
L.length++;
return 0;  // 正常结束返回0
} 

// 顺序表插入操作 动态分配 
// 在顺序表L的第i位插入元素e 
int ListInsert(SeqList &L, int e, int i){
if(i<1i>L.length+1){
return 1;  // 变量i大小不合法 
}
if(L.length >= L.MaxSize){  // 线性表已满 
int functionCode = IncreaseSize(L, SqListMaxSize); 
if(functionCode!=0){
return functionCode;
} 
}
for(int j = L.length; j >= i; j--){  // 将i及其后面的元素后移一位 
L.data[j] = L.data[j-1];
}
L.data[i-1] = e;
L.length++;
return 0;  // 正常结束返回0
} 

// 顺序表删除操作 静态分配
int ListDelete(SqList &L, int i){
if(i<1i>L.length+1){
return 1;  // 变量i大小不合法 
}
for(int j = i; j<L.length; j++){
L.data[j-1] = L.data[j];  // 将i及其后面的元素前移一位 
}
L.length--;
return 0;  // 正常结束返回0
}

// 顺序表删除操作 动态分配
int ListDelete(SeqList &L, int i){
if(i<1i>L.length+1){
return 1;  // 变量i大小不合法 
}
for(int j = i; j<L.length; j++){
L.data[j-1] = L.data[j];  // 将i及其后面的元素前移一位 
}
L.length--;
return 0;  // 正常结束返回0
}

// 顺序表弹出操作 静态分配
int ListPop(SqList &L, int i){
if(i<1i>L.length+1){
return -1;  // 变量i大小不合法 
}
int out = L.data[i-1]; 
for(int j = i; j<L.length; j++){
L.data[j-1] = L.data[j];  // 将i及其后面的元素前移一位 
}
L.length--;
return out;  // 正常结束返回弹出值 
}

// 顺序表弹出操作 动态分配
int ListPop(SeqList &L, int i){
if(i<1i>L.length+1){
return -1;  // 变量i大小不合法 
}
int out = L.data[i-1]; 
for(int j = i; j<L.length; j++){
L.data[j-1] = L.data[j];  // 将i及其后面的元素前移一位 
}
L.length--;
return out;  // 正常结束返回弹出值 
}

// 顺序表按位查找 静态分配 
int GetElem(SqList L, int i){
if(i<1i>L.length+1){
return -1;  // 变量i大小不合法 
}
return L.data[i-1];
}

// 顺序表按位查找 动态分配 
int GetElem(SeqList L, int i){
if(i<1i>L.length+1){
return -1;  // 变量i大小不合法 
}
return L.data[i-1];
} 

// 顺序表按值查找 静态分配 
// TODO:1.完善查找代码，可返回数组等 2.整合比较代码为函数 
int LocateElem(SqList L, int e){
for(int i = 0; i < L.length; i++){
if(L.data[i]==e){  // 判断数据是否和给定的数据一致
// 当数据为结构类型变量时，要依次比较其每一个分量 
return i+1;
}
}
return 0;  // 无匹配值返回0 
} 

// 顺序表按值查找 动态分配 
int LocateElem(SeqList L, int e){
for(int i = 0; i < L.length; i++){
if(L.data[i]==e){
return i+1;
}
}
return 0;  // 无匹配值返回0 
} 

// 删除顺序表 静态分配
int DsetoryList(SqList &L){
    if(L.length == 0){
        return 0;  // 空表不需要释放 
    }
    return 0;  // 正常结束返回0 
}

// 删除顺序表 动态分配
int DsetoryList(SeqList &L){
    if(L.length == 0){
        return 0;  // 空表不需要释放 
    }
    // 释放数据空间
    free(L.data);
    L.length = 0;  // 重置长度 
    L.data = NULL;  // 重置数据指针
    return 0;  // 正常结束返回0 
}

// 单链表
typedef struct LNode{  // 定义单链表的结点类型 
int data;  //每个结点存放一个元素 数据域 
struct LNode *next;  // 指针指向下一个结点 指针域 
}LNode, *LinkList;
 
// 单链表初始化 （默认带头结点） 
int InitList(LinkList &L){
L = (LNode *)malloc(sizeof(LNode));  //分配头结点
if(L == NULL){
return 1;  // 头结点指针为空时分配失败，内存不足，返回1
} 
L->next = NULL;  // 头结点之后无结点
return 0;  // 正常结束返回0 
}

// 判空操作 
bool Empty(LinkList L){
return L->next == NULL;  // 返回1表示空，返回0表示非空 
}

// 单链表初始化 不带头结点 
int InitListWithoutFirstNode(LinkList &L){
L = NULL;  // 空表，暂无结点，防止脏数据 
return 0;  // 正常结束返回0 
}

// 判空操作 不带头结点 
bool EmptyWithoutFirstNode(LinkList L){
return L == NULL;  // 返回1表示空，返回0表示非空 
}

// 单链表求表长
int Length(LinkList L){
int length = 0;  // 表示初始结点为第0结点
LNode *p;  // 指针p指向当前扫描到的结点 
p = L;
while(p->next != NULL && p->next != L){  // 循环的目的是找到最后一个结点 
p = p->next;
length++;
}
return length; 
}

// 单链表求表长 不带头结点
int LengthWithoutFirstNode(LinkList L){
int length = 0;  // 表示初始结点为第0结点
LNode *p;  // 指针p指向当前扫描到的结点 
p = L;
while(p != NULL && p->next != L){  // 循环的目的是找到最后一个结点 
p = p->next;
length++;
}
return length; 
}

// 单链表输出内容
int PrintList(LinkList L){
if(Empty(L)){
return 1;  // 表空则无需输出，返回1 
}
LNode *p;  // 指针p指向当前扫描到的结点 
p = L;
while(p->next != NULL){
std::cout << p->next->data << " ";
p = p->next;
}
std::cout << std::endl;
return 0;  // 输出成功完成后返回0 
}

// 单链表输出内容 不带头结点 
int PrintListWithoutFirstNode(LinkList L){
if(EmptyWithoutFirstNode(L)){
return 1;  // 表空则无需输出，返回1 
}
LNode *p;  // 指针p指向当前扫描到的结点 
p = L;
while(p != NULL && p->next != L){
std::cout << p->data << " ";
p = p->next;
}
std::cout << std::endl;
return 0;  // 输出成功完成后返回0 
} 

// 单链表插入操作 默认插入表尾 ATT：不能用此方法建立一个单链表，时间复杂度过高（O(n^2)）
int ListInsert(LinkList &L, int e){
if(L == NULL){
LNode *s = (LNode *)malloc(sizeof(LNode));
s->data = e;
s->next = L;
L = s;  // 将头指针指向新结点 
return 0;  // 正常结束返回0
}
LNode *p;  // 指针p指向当前扫描到的结点 
int j = 0;  // j表指向第几个结点 
p = L;  // L指向头结点，即第0个结点，不存放数据  
while(p->next != NULL){  // 循环的目的是找到最后结点并且对其操作
p = p->next;
j++;
}
LNode *s = (LNode *)malloc(sizeof(LNode));
s->data = e; 
s->next = NULL;
p->next = s;  // 将s结点排在p之后 
return 0;  // 正常结束返回0
}
int ListInsertWithoutFirstNode(LinkList &L, int e){
return ListInsert(L, e); 
}

// 单链表插入操作 
int ListInsertFull(LinkList &L, int e, int i){
if(i<1){
return 1;  // 变量i大小不合法 
}
LNode *p;  // 指针p指向当前扫描到的结点
p = L;  // L指向头结点，即第0个结点，不存放数据 
/*
int j = 0;  // j表指向第几个结点 
while(p != NULL && j < i - 1){  // 循环的目的是找到第i-1个结点并且对其操作
// 如果插在末尾即加上新元素一共i个结点，找到第i-1个结点后出循环，p指向第i-1个结点 
p = p->next;
j++;
}
注释区域可替换为如下循环*/
for(int j = 0; p!= NULL && j < i - 1; j++){
p = p->next;
} 
if(p == NULL){
return 1;  // 变量i大小不合法
}
LNode *s = (LNode *)malloc(sizeof(LNode));
s->data = e;
s->next = p->next;
p->next = s;  // 将s结点排在p之后 
return 0;  // 正常结束返回0
}

// 单链表插入操作 不带头结点 
int ListInsertWithoutFirstNodeFull(LinkList &L, int e, int i){
if(i < 1){
return 1;  // 变量i大小不合法 
}
if(i == 1){
LNode *s = (LNode *)malloc(sizeof(LNode));
s->data = e;
s->next = L;
L = s;  // 将头指针指向新结点 
return 0;  // 正常结束返回0
}
LNode *p;  // 指针p指向当前扫描到的结点
p = L;  // L指向头结点，即第0个结点，不存放数据
for(int j = 1; p != NULL && j < i - 1; j++){
// 这里的j表示当前扫描到的结点位置 
p = p->next;
} 
if(p == NULL){
return 1;  // 变量i大小不合法
}
LNode *s = (LNode *)malloc(sizeof(LNode));
s->data = e;
s->next = p->next;
p->next = s;  // 将s结点排在p之后 
return 0;  // 正常结束返回0
}

// 单链表在指定结点后插入元素 
int InsertNextNode(LNode *p, int e){
if(p == NULL){  // 便于其他函数调用时候传入NULL值
return 1;  // p结点不存在返回1 
}
LNode *s = (LNode *)malloc(sizeof(LNode));
if(s == NULL){
return 2;  // 新结点内存分配失败创建失败返回2 
}
s->data = e;
s->next = p->next;
p->next = s;
return 0;  // 正常结束返回0
} 

// 单链表在指定结点前插入元素 
int InsertPriorNode(LNode *p, int e){
if(p == NULL){
return 1;  // p结点不存在返回1 
}
LNode *s = (LNode *)malloc(sizeof(LNode));
if(s == NULL){
return 2;  // 新结点内存分配失败创建失败返回2 
}
s->next = p->next;
p->next = s;
s->data = p->data;  // p中数据赋值到s 
p->data = e;  // p中数据覆盖为e 
return 0;  // 正常结束返回0
} 

// 单链表删除操作 
int ListDelete(LinkList &L, int i){
if(i<1){
return 1;  // 变量i大小不合法 
}
// 下行直至循环结束代码可直接调用查找结点函数GetElem查找到i-1个结点
LNode *p;  // 指针p指向当前扫描到的结点
p = L;  // L指向头结点，即第0个结点，不存放数据 
int j = 0;  // j表指向第几个结点 
while(p != NULL && j < i - 1){  // 循环的目的是找到第i-1个结点并且对其操作
// 如果插在末尾即加上新元素一共i个结点，找到第i-1个结点后出循环，p指向第i-1个结点 
p = p->next;
j++;
}
if(p == NULL){
return 1;  // 变量i大小不合法
}
if(p->next == NULL){  // 此系列代码无法删除最后一个结点
return 1;  // 变量i大小不合法
}
LNode *q = p->next;
p->next = q->next;
free(q);  // 释放结点空间 
return 0;  // 正常结束返回0
}

// 单链表弹出操作 
int ListPop(LinkList &L, int i){
if(i<1){
return -1;  // 变量i大小不合法 
}
LNode *p;  // 指针p指向当前扫描到的结点
p = L;  // L指向头结点，即第0个结点，不存放数据 
int j = 0;  // j表指向第几个结点 
while(p != NULL && j < i - 1){  // 循环的目的是找到第i-1个结点并且对其操作
// 如果插在末尾即加上新元素一共i个结点，找到第i-1个结点后出循环，p指向第i-1个结点 
p = p->next;
j++;
}
if(p == NULL){
return -1;  // 变量i大小不合法
}
if(p->next == NULL){
return -1;  // 变量i大小不合法
}
LNode *q = p->next;
int out = q->data; 
p->next = q->next;
free(q);  // 释放结点空间 
return out;  // 正常结束返回弹出值 
}

// 单链表删除操作 不带头结点
int ListDeleteWithoutFirstNode(LinkList &L, int i){
if(i < 1){
return 1;  // 变量i大小不合法 
}
if(i == 1){
if(EmptyWithoutFirstNode(L)){
return 1;
}
LNode *q = L;
if(L->next == NULL){
L = NULL;
free(q);
return 0;  // 正常结束返回0
}
L = L->next;
free(q);
return 0;  // 正常结束返回0
}
LNode *p;  // 指针p指向当前扫描到的结点
p = L;  // L指向头结点，即第0个结点，不存放数据
for(int j = 1; p != NULL && j < i - 1; j++){
// 这里的j表示当前扫描到的结点位置 
p = p->next;
} 
if(p == NULL){
return 1;  // 变量i大小不合法
}
if(p->next == NULL){
return 1;  // 变量i大小不合法
}
LNode *q = p->next;
p->next = q->next;
free(q);  // 释放结点空间 
return 0;  // 正常结束返回0
}

// 单链表弹出操作 不带头结点
int ListPopWithoutFirstNode(LinkList &L, int i){
if(i < 1){
return 1;  // 变量i大小不合法 
}
if(i == 1){
if(EmptyWithoutFirstNode(L)){
return 1;
}
LNode *q = L;
int out = L->data;
if(L->next == NULL){
L = NULL;
free(q);
return out;  // 正常结束返回弹出值
}
L = L->next;
free(q);
return out;  // 正常结束返回弹出值 
}
LNode *p;  // 指针p指向当前扫描到的结点
p = L;  // L指向头结点，即第0个结点，不存放数据
for(int j = 1; p != NULL && j < i - 1; j++){
// 这里的j表示当前扫描到的结点位置 
p = p->next;
} 
if(p == NULL){
return 1;  // 变量i大小不合法
}
if(p->next == NULL){
return 1;  // 变量i大小不合法
}
LNode *q = p->next;
int out = p->data; 
p->next = q->next;
free(q);  // 释放结点空间 
return out;  // 正常结束返回弹出值 
}

// 单链表删除指定结点p
int DeleteNode(LNode *p){
if(p == NULL){
return 1;  // 结点p不存在 
}
LNode *q = p->next;
if(q == NULL){
return 2;  // p为最后一个结点，无法通过该函数删除 
}
p->data = q->data;  // ATT：不能用来删除最后一个结点 
p->next = q->next;
free(q);
return 0;  // 正常结束返回0 
}

// 按位查找表L的结点
LNode *GetElem(LinkList L, int i){
if(i<0){
return NULL;  // 变量i大小不合法
}
LNode *p;  // 指针p指向当前扫描到的结点
p = L;  // L指向头结点，即第0个结点，不存放数据 
int j = 0;  // j表指向第几个结点 
while(p != NULL && j < i){  // 循环的目的是找到第i个结点并且对其操作
p = p->next;
j++;
}
return p;
}

// 按位查找表L的结点 不带头结点
LNode *GetElemWithoutFirstNode(LinkList L, int i){
if(i < 0  L == NULL){
return NULL;  // 变量i大小不合法
}
LNode *p;  // 指针p指向当前扫描到的结点
p = L;  // L指向头结点，即第0个结点，不存放数据 
int j = 1;  // j表指向第几个结点 
while(p != NULL && j < i){  // 循环的目的是找到第i个结点并且对其操作
p = p->next;
j++;
}
return p;
}

// ListInsertFull简化代码
int ListInsert(LinkList &L, int e, int i){
if(i<1){
return 1;  // 变量i大小不合法 
}
LNode *p = GetElem(L, i-1);  // 查找到第i-1个结点的位置
return InsertNextNode(p, e);  // 正常结束返回0
}

// ListInsertWithoutFirstNodeFull简化代码 
int ListInsertWithoutFirstNode(LinkList &L, int e, int i){
if(i < 1){
return 1;  // 变量i大小不合法 
}
if(i == 1){
LNode *s = (LNode *)malloc(sizeof(LNode));
s->data = e;
s->next = L;
L = s;  // 将头指针指向新结点 
return 0;  // 正常结束返回0
}
LNode *p = GetElem(L, i-1);  // 查找到第i-1个结点的位置
return InsertNextNode(p, e);  // 正常结束返回0
}

// 按值查找单链表中的元素
LNode *LocateElem(LinkList L, int e){
LNode *p = L;
while(p != NULL && p->data != e){
p = p->next;
}
return p;
}

// 正向建立一个单链表 尾插法(自动初始化)
LinkList List_TailInsert(){
int sourceData;  // 源数据存放变量
LinkList L = (LinkList)malloc(sizeof(LNode));  // 设置头结点
LNode *s, *r = L;  // r为表尾指针
std::cin >> sourceData;  // 输入源数据
while(sourceData != 9999){
s = (LNode *)malloc(sizeof(LNode));
s->data = sourceData;
r->next = s;  // r指向新表尾
r = s;
std::cin >> sourceData;
}
r->next = NULL;  // 结尾置空
return L;
}

// 正向建立一个单链表 尾插法(自动初始化) 不带头结点
LinkList List_TailInsertWithoutFirstNode(){  // 未测试
int sourceData;  // 源数据存放变量
LinkList L;  // 设置头结点
std::cin >> sourceData;  // 输入源数据
if(sourceData != 9999){
L = (LNode *)malloc(sizeof(LNode));
L->data = sourceData;
L->next = NULL;
std::cin >> sourceData;
}
LNode *s, *r = L;  // r为表尾指针
while(sourceData != 9999){
s = (LNode *)malloc(sizeof(LNode));
s->data = sourceData;
r->next = s;  // r指向新表尾
r = s;
std::cin >> sourceData;
}
r->next = NULL;  // 结尾置空
return L;
}

// 反向建立一个单链表 头插法(自动初始化)
LinkList List_HeadInsertFull(){
LNode *s;
int sourceData;
LinkList L = (LinkList)malloc(sizeof(LNode));
L->next = NULL;
std::cin >> sourceData;
while(sourceData !=9999){
s = (LNode *)malloc(sizeof(LNode));
s->data = sourceData;
s->next = L->next;
L->next = s;
std::cin >> sourceData;
}
return L;
}
LinkList List_HeadInsert(){
LNode *s;
int sourceData;
LinkList L = (LinkList)malloc(sizeof(LNode));
L->next = NULL;
std::cin >> sourceData;
while(sourceData !=9999){
InsertNextNode(L, sourceData);
std::cin >> sourceData;
}
return L;
}

// 反向建立一个单链表 头插法(自动初始化) 不带头结点
LinkList List_HeadInsertWithoutFirstNode(){  // 未测试
LNode *s;
int sourceData;
LinkList L = NULL;
std::cin >> sourceData;
if(sourceData != 9999){
L = (LNode *)malloc(sizeof(LNode));
L->data = sourceData;
L->next = NULL;
std::cin >> sourceData;
}
while(sourceData !=9999){
s = (LNode *)malloc(sizeof(LNode));
s->data = sourceData;
s->next = L->next;
L->next = s;
std::cin >> sourceData;
}
return L;
}

// 将单链表反转（Copilot）
int List_Reverse(LinkList &L){
LNode *p, *q;
p = L->next;
L->next = NULL;
while(p != NULL && p->next != L){
q = p->next;
p->next = L->next;
L->next = p;
p = q;
}
return 0;
}

// 删除单链表
int DsetoryList(LinkList &L){
    LNode *p, *q;
    p = L;
    while(p != NULL){
        q = p->next;
        free(p);
        p = q;
    }
    L = NULL;
    return 0;
}

// 判尾
bool isTail(LNode *p){
return p->next == NULL;
}

// 双链表
typedef struct DNode{  // 定义单链表的结点类型 
int data;  //每个结点存放一个元素 数据域 
struct DNode *prior, *next;  // 指针指向下一个结点 指针域 
}DNode, *DLinklist;

// 双链表的初始化（默认为带头结点）
int InitList(DLinklist &L){
L = (DNode *)malloc(sizeof(DNode));
if(L == NULL){
return 1;  // 内存分配失败，初始化失败返回1
}
L->prior = NULL;
L->next = NULL;
return 0;
}

// 双链表的判空
bool Empty(DLinklist L){
return L->next == NULL;
}

// 求表长
int Length(DLinklist L){
int length = 0;  // 表示初始结点为第0结点
DNode *p;  // 指针p指向当前扫描到的结点 
p = L;
while(p->next != NULL && p->next != L){  // 循环的目的是找到最后一个结点 
p = p->next;
length++;
}
return length; 
}

// 双链表中在结点p后插入结点s
int InsertNextDNode(DNode *p, DNode *s){
if(p == NULL  s == NULL){
return 1;
}
s->next = p->next;
if(p->next != NULL){  // 判断p是否有后继结点，如果有后继结点，则设置后继结点的前驱为s
p->next->prior = s;
}
s->prior = p;
p->next = s;
return 0;
}

// 删除p的后继结点
int DeleteNextDNode(DNode *p){
if(p == NULL){
return 1;  // p结点不存在返回1
}
DNode *q = p->next;
if(q == NULL){
return 2;  // p的后继结点为空（不存在）返回2
}
p->next = q->next;
if(q->next != NULL){
q->next->prior = p;
}
free(q);
return 0;  // 正常结束返回0
}

// 删除p结点
int DeleteDNode(DNode *p){
if(p == NULL){
return 1;  // p结点不存在返回1
}
DNode *q = p->prior;
q->next = p->next;
if(p->next != NULL){
p->next->prior = q;
}
free(p);
return 0;  // 正常结束返回0
}

// 释放双链表各个数据结点（删除表）
int DsetoryList(DLinklist &L){
while(L->next != NULL){
DeleteNextDNode(L);
}
free(L);
L = NULL;
return 0;  // 正常结束返回0
}

// 循环输出双链表
int PrintList(DLinklist L){
if(Empty(L)){
return 1;  // 链表为空输出1
}
DNode *p = L->next;
while(p != NULL && p->next != L){
std::cout << p->data << " ";
p = p->next;
}
std::cout << std::endl;
return 0;
}

// 按位查找表L的结点
DNode *GetElem(DLinklist L, int i){
if(i<0){
return NULL;  // 变量i大小不合法
}
DNode *p;  // 指针p指向当前扫描到的结点
p = L;  // L指向头结点，即第0个结点，不存放数据 
int j = 0;  // j表指向第几个结点 
while(p != NULL && j < i){  // 循环的目的是找到第i个结点并且对其操作
p = p->next;
j++;
}
return p;
}

// 插入数据到双链表(默认表尾)
int ListInsert(DLinklist &L, int e){

DNode *p = L;
while(p->next != NULL){
p = p->next;
}
DNode *s = (DNode *)malloc(sizeof(DNode));
s->data = e;
return InsertNextDNode(p, s);  // 正常结束返回0
}

// 插入数据到双链表
int ListInsert(DLinklist &L, int e, int i){
if(i<1){
return 1;  // 变量i大小不合法 
}
DNode *p = GetElem(L, i-1);  // 查找到第i-1个结点的位置
DNode *s = (DNode *)malloc(sizeof(DNode));
s->data = e;
return InsertNextDNode(p, s);  // 正常结束返回0
}

// 按值查找单链表中的元素
DNode *LocateElem(DLinklist L, int e){
DNode *p = L;
while(p != NULL && p->data != e){
p = p->next;
}
return p;
}

// 删除双链表中的元素
int ListDelete(DLinklist &L, int e){
DNode *p = L;
while(p != NULL && p->data != e){
p = p->next;
}
if(p == NULL){
return 1;  // 变量e不存在
}
return DeleteNextDNode(p);  // 正常结束返回0
}

// 将双链表中元素反转
int List_Reverse(DLinklist &L){
DNode *p, *q;
p = L->next;
L->next = NULL;
while(p != NULL && p->next != L){
q = p->next;
p->next = L->next;
L->next = p;
p = q;
}
if(!Empty(L)){
p = L->next;
q = L;
while(p != NULL && p->next != L){
p->prior = q;
p = p->next;
q = q->next;
}
}
return 0;
}

// 初始化循环单链表
int InitCircleList(LinkList &L, int n){
L = (LinkList)malloc(sizeof(LinkList));
if(L == NULL){
return 1;  // 分配内存失败
}
L->next = L;  // 空链表头结点指向自身
return 0;  // 正常结束返回0
}

// 判空
bool CircleEmpty(LinkList L){
return L->next == L;
}

// 判尾
bool isTail(LinkList L, LinkList p){
return p->next == L;
}

// 初始化循环双链表
int InitCircleDList(DLinklist &L, int n){
L = (DLinklist)malloc(sizeof(DLinklist));
if(L == NULL){
return 1;  // 分配内存失败
}
L->prior = L;  // 空链表头结点指向自身
L->next = L;  // 空链表尾结点指向自身
return 0;  // 正常结束返回0
}

// 判空
bool CircleEmpty(DLinklist L){
return L->prior == L;
}

// 判尾
bool isTail(DLinklist L, DLinklist p){
return p->next == L;
}

// 静态链表
// 声明用：Node 变量名[MAXSIZE];
typedef struct Node {  // 静态链表结点类型
int data;  // 用于存放数据
int next;  // 用于存放下一个结点的数组下标
}Node;

// 静态链表(2)
// 声明用：SLinkList 变量名; 创建MAXSIZE个结点的静态链表
typedef struct{
    int data;
    int next;
}SLinkList[MAXSIZE];

// 初始化静态链表
int InitSLinkList(SLinkList &L){
    L[0].next = -1;  // 空链表头结点数组为-1
    // 其他的结点数组下标初始化为-2
    for(int i=1; i<MAXSIZE; i++){
        L[i].next = -2;
    }
    return 0;
}

// 求静态链表长度
int Length(SLinkList L){
    int length = 0;
    while(L[length].next != -1){
        length++;
    }
    return length;
}

// 判空
bool Empty(SLinkList L){
    return L[0].next == -1;
}

// 判尾
bool isTail(SLinkList L, int i){
    return L[i].next == -1;
}

// 输出静态链表
int PrintList(SLinkList L){
    int i = 0;
    while(L[i].next != -1){
i = L[i].next;
        std::cout << L[i].data << " ";
    }
    std::cout << std::endl;
    return 0;
}

// 在静态链表尾部插入元素
int ListInsert(SLinkList &L, int e){
    // 判断静态链表是否已满
    if(Length(L) == MAXSIZE - 1){
        return 1;  // 静态链表已满
    }
    int i = 0;
    while(L[i].next != -1){
        i = L[i].next;
    }
    L[i].next = i + 1;
    L[i + 1].data = e;
    L[i + 1].next = -1;
    return 0;
}

// 查找元素
int GetElem(SLinkList L, int i){
    int j = 0;
    if(i<1  i>Length(L)){
        return -1;  // 变量i大小不合法
    }
    j = L[0].next;
    while(j != -1 && i>1){
        j = L[j].next;
        i--;
    }
    return L[j].data;
}

// 查找元素
int LocateElem(SLinkList L, int e){
    int i = 0;
    int j = L[0].next;
    while(j != -1){
        if(L[j].data == e){
            return i;
        }
        i++;
        j = L[j].next;
    }
    return 0;
}

// 删除元素
int ListDelete(SLinkList &L, int i){
    int j;
    if(i<1  i>Length(L)){
        return 1;  // 变量i大小不合法
    }
    if(i == 1){
        L[0].next = L[L[0].next].next;
    }
    else{
        j = L[0].next;
        while(j != -1 && i>2){
            j = L[j].next;
            i--;
        }
        L[j].next = L[L[j].next].next;
    }
    return 0;
}

// 弹出元素
int ListPop(SLinkList &L, int i){
    int e;
    if(i<1  i>Length(L)){
        return -1;  // 变量i大小不合法返回-1
    }
    if(i == 1){
        e = L[L[0].next].data;
        L[0].next = L[L[0].next].next;
    }
    else{
        int j = L[0].next;
        while(j != -1 && i>2){
            j = L[j].next;
            i--;
        }
        e = L[L[j].next].data;
        L[j].next = L[L[j].next].next;
    }
    return e;
}

// 反转静态链表
int List_Reverse(SLinkList &L){
    int *p = new int[Length(L)];
int length = Length(L);
for(int i = 0; i < length; i++){
p[i] = ListPop(L, 1);
}
for(int i = length-1; i >= 0; i--){
ListInsert(L, p[i]);
}
delete[] p;
return 0;  // 反转成功
}

// 删除静态链表
int DsetoryList(SLinkList &L){
    L[0].next = -1;
    return 0;
}


```