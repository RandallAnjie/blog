---
title: 数据结构——串
tags: []
id: '441'
categories:
  - - C++
  - - 数据结构
date: 2022-02-19 03:39:43
---

头文件SString.h

```
// SString.h - 串
#include <iostream>

#define MAXLEN 255

/*********************************************************************************************************************************
 * 数据类型一览
 * SString 定长顺序存储（静态数组）
 * HString 串的顺序存储 可拓展长度顺序存储（指针数组）
 * StringNode, *Node 串的链式存储
 * 
 * 操作函数 共享栈操作在函数名后加0或者1 不带头结点的链栈操作在函数名后加WithoutFirstNode
 * bool StrAssign(&T, *ch) 赋值操作，将字符串ch复制到串T中 正常结束返回1，否则返回0
 * bool StrCopy(&T, S) 复制操作，将S串复制到串T中 正常结束返回1，否则返回0
 * bool StrEmpty(S) 判空 空返回1，否则返回0
 * int StrLength(S) 求长度 返回串的长度
 * bool ClearString(S) 清空 正常结束返回1，否则返回0
 * bool DestroyString(&S) 销毁 正常结束返回1，否则返回0
 * bool Concat(&T, S1, S2) 串连接,将S1和S2连接后存入T 正常结束返回1，否则返回0
 * bool SubString(&Sub, S, pos, len) 求子串，求出串S中位于pos位置的长度为len长度的子串存入Sub 正常结束返回1，否则返回0
 * int StrCompare(S, T) 比较操作 比较串S和T的大小，返回值小于0，等于0，大于0，分别表示S<T，S=T，S>T
 * int Index(S, T) 定位操作，求出串S中第一次出现串T的位置 返回值为定位串T的位置，如果没有找到返回0
 * int Index2(S, T) 朴素模式匹配，求出串S中第一次出现串T的位置 返回值为定位串T的位置，如果没有找到返回0
 * void get_next(T, next) 求模式串T的next数组
 * void get_nextval(T, nextval) 求模式串优化后的nextval数组
 * int Index_KMP(S, T) KMP算法求出串S中第一次出现串T的位置 返回值为定位串T的位置，如果没有找到返回0
 * 
 *********************************************************************************************************************************/

// 串的顺序存储 定长顺序存储（静态数组）
typedef struct SString{
    char ch[MAXLEN];  // 每个分量存储一个字符
    int length;  // 串的实际长度
}SString;

// 串的顺序存储 可拓展长度顺序存储（指针数组）
typedef struct HString{
    char *ch;  // 按串长分配存储区，ch指向串的基地址
    int length;  // 串的长度
}HString;
//HString S; S.ch = (char *)malloc(MAXLEN*sizeof(char)); S.length = 0;

// 串的链式存储
typedef struct StringNode{
    char ch;  // 每个结点存1字符，若要提高存储密度，则可设置为多个字符数组
    struct StringNode *next;
}StringNode, *Node;

// 赋值操作
bool StrAssign(SString &T, char *ch){
    int i = 1;
    while(ch[i] != '\0'){
        T.ch[i] = ch[i];
        i++;
    }
    T.length = i;
    return true;
}

// 复制操作
bool StrCopy(SString &T, SString S){
    int i = 1;
    while(S.ch[i] != '\0'){
        T.ch[i] = S.ch[i];
        i++;
    }
    T.length = i;
    return true;
}

// 判空
bool StrEmpty(SString S){
    return S.length == 0;
}

// 求长度
int StrLength(SString S){
    return S.length;
}

// 清空
bool ClearString(SString &S){
    S.length = 0;
    return true;
}

// 销毁
bool DestroyString(SString &S){
    S.length = 0;
    return true;
}

// 串连接
bool Concat(SString &T, SString S1, SString S2){
    int i = 1;
    while(S1.ch[i] != '\0'){
        T.ch[i] = S1.ch[i];
        i++;
    }
    while(S2.ch[i] != '\0'){
        T.ch[i] = S2.ch[i];
        i++;
    }
    T.length = i;
    return true;
}

// 求子串
bool SubString(SString &Sub, SString S, int pos, int len){
    if(pos < 1  pos > S.length  len < 0  len > S.length - pos + 1){  // 子串位置不合法
        return false;
    }
    Sub.length = len;
    for(int i = 0; i < len; i++){
        Sub.ch[i] = S.ch[pos - 1 + i];
    }
    return true;
}

// 比较操作
int StrCompare(SString S, SString T){
    for(int i = 0; i < S.length && i < T.length; i++){
        if(S.ch[i] != T.ch[i]){
            return S.ch[i]-T.ch[i];
        }
    }
    return S.length - T.length;
}

// 定位操作
int Index(SString S, SString T){
    int i = 1, n = S.length, m = T.length;
    SString Sub;
    while(i <= n - m + 1){
        if(SubString(Sub, S, i, m) && StrCompare(Sub, T) == 0){
            return i;
        }
        i++;
    }
}

// 朴素模式匹配
int Index2(SString S, SString T){
    int k = 1;  // 当前匹配的字符位置
    int i = k, j = 1;
    while(i <= S.length && j <= T.length){
        if(S.ch[i] == T.ch[j]){
            i++;  // 继续比较后续字符
            j++;
        }else{
            k++;  // 匹配失败，向后移动匹配字符位置
            i = k;
            j = 1;
        }
    }
    if(j > T.length){
        return k;
    }else{
        return 0;
    }
}

// KMP算法：朴素模式算法优化
int Index_KMP_Need_Next(SString S, SString T, int next[]){  // 传入next数组
    // 例：google的next数组为next[7] = {0, 0, 1, 1, 1, 2, 1}
    int i = 1, j = 1;
    while(i <= S.length && j <= T.length){
        if(j == 0  S.ch[i] == T.ch[j]){  // 通过j==0来判断是否是第一位不相符，然后i，j都加一以至于可以i向后移，j归为1
            i++;
            j++;
        }else{
            j = next[j];
        }
    }
    if(i > T.length){
        return i-T.length;        
    }else{
        return 0;
    }
}

// 求模式串T的next数组
void get_next(SString T, int next[]){
    int i = 0, j = 0;
    next[1] = 0;
    while(i < T.length){
        if(j == 0  T.ch[i] == T.ch[j]){
            ++i;
            ++j;
            // 若pi等于pj，则next[j+1] = next[j] + 1
            next[i] = j;
        }else{
            j = next[j];
        }
    }
}

// next数组优化为nextval数组
void get_nextval(SString T, int nextval[]){
    int *next = new int[T.length+1];
    get_next(T, next);
    nextval[1] = 0;
    for(int j = 2; j <=T.length; j++){
        if(T.ch[j] == T.ch[next[j]]){
            nextval[j] = nextval[next[j]];
        }else{
            nextval[j] = next[j];
        }
    }
    delete[] next;
}

// KMP算法
int Index_KMP(SString S, SString T){
    int i = 1, j = 1;
    int *next = new int[T.length+1];
    get_next(T, next);  // 求模式串T的next数组 时间复杂度O(m)
    while(i <= S.length && j <= T.length){  // 时间复杂度O(n)
        if(j == 0  S.ch[i] == T.ch[j]){
            i++;
            j++;  // 继续比较后继字符
        }else{
            j = next[j];  // 模式串向右移动
        }
    }
    delete[] next;
    if(j>T.length){
        return i-T.length;  // 匹配成功返回匹配的位置
    }else{
        return 0;
    }
}
```