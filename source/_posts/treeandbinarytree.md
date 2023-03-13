---
title: 数据结构——树与二叉树
tags: []
id: '465'
categories:
  - - C++
  - - 数据结构
date: 2022-03-03 23:39:11
---

头文件TreeAndBinaryTree.h

```c
// TreeAndBinaryTree.h - 树与二叉树
#include <iostream>

#define MAX_TREE_SIZE 100

/*********************************************************************************************************************************
 * 数据类型一览
 * ElemType 数据部分
 * TreeNoe 二叉树 顺序存储
 * BiTNode, *BiTree 二叉树 链式存储
 * ThreadNode, *ThreadTree 线索二叉树
 * BSTNode, *BSTree 二叉排序树
 * AVLNode, *AVLTree 二叉平衡树
 * HuffmanNode, *HuffmanTree 哈夫曼树
 * 
 * 操作函数 共享栈操作在函数名后加0或者1 不带头结点的链栈操作在函数名后加WithoutFirstNode
 * void InitTree(tree[], n) 初始化顺序存储二叉树
 * int InsertBiTree(&T, e) 二叉树的链式存储插入二叉树,默认左子树如果左子树满则插入右子树 插入根节点返回0，插入左子树返回1，插入右子树返回2
 * void Print(T) 输出二叉树结点
 * void PreOrder(T) 二叉树的链式存储先序遍历
 * void InOrder(T) 二叉树的链式存储中序遍历
 * void PostOrder(T) 二叉树的链式存储后序遍历
 * int TreeDepth(T) 利用递归求树的深度 返回树的深度
 * void LevelOrder(T) 二叉树的层序遍历
 * void Visit(*q) 访问节点
 * void InThread(T) 二叉树的链式存储中序遍历
 * void PreThread(T) 二叉树的链式存储先序遍历
 * void PostThread(T) 二叉树的链式存储后序遍历
 * void CreateInThread(&T) 中序线索化二叉树T
 * void CreatePreThread(&T) 先序线索化二叉树T
 * void CreatePostThread(&T) 后序线索化二叉树T
 * ThreadNode *InOrderPre(*q) 中序线索二叉树找指定结点的中序前驱pre 返回其前驱结点，无法找到则输出信息并返回NULL
 * ThreadNode *InOrderNext(*q) 中序线索二叉树找指定结点的中序后继next 返回其后继结点
 * ThreadNode *PreOrderPre(*q) 先序线索二叉树找指定结点的先序前驱pre 返回其前驱结点
 * ThreadNode *PreOrderNext(*q) 先序线索二叉树找指定结点的先序后继next 返回其后继结点
 * ThreadNode *PostOrderPre(*q) 后序线索二叉树找指定结点的后序前驱pre 返回其前驱结点
 * ThreadNode *PostOrderNext(*q) 后序线索二叉树找指定结点的后序后继next 返回其后继结点，无法找到则输出信息并返回NULL
 * BSTNode *SearchBST_Recursive(T, key) 二叉排序树的递归查找 返回查找到的结点，没有则返回NULL
 * BSTNode *SearchBST(T, key) 二叉排序树的非递归查找 返回查找到的结点，没有则返回NULL
 * void InsertBST_Recursive(&T, x) 二叉排序树的递归插入
 * void InsertBST(&T, x) 二叉排序树的非递归插入
 * void DeleteBST(&T, key) 二叉排序树的删除
 * void CreateBSTree(&T, str[], n) 二叉排序树的链式存储创建
 * AVLTree SingleRotateWithLeft(AVLTree &T) LL右单旋
 * AVLTree SingleRotateWithRight(AVLTree &T) LL左单旋
 * AVLTree DoubleRotateWithLeft(AVLTree &T） LR双旋
 * AVLTree DoubleRotateWithRight(AVLTree &T) RL双旋
 * void InsertAVL(&T, x) 二叉平衡树的插入
 * void CreateHuffmanTree(&T, n) 构造哈夫曼树
 * 
 *********************************************************************************************************************************/

// 数据部分用ElemType结构体表示
struct ElemType {
    int value;
};

// 二叉树的顺序存储
struct TreeNoe{
    ElemType data;
    bool isEmpty;
};

// 二叉树的链式存储
typedef struct BiTNode{
    ElemType data;  // 数据域
    struct BiTNode *lchild, *rchild;  // 左右孩子指针
}BiTNode, *BiTree;  // n个结点对应2n个指针对应n+1个空链域


// 初始化二叉树的顺序存储
void InitTree(TreeNoe tree[], int n){
    for (int i = 0; i < n; i++) {
        tree[i].isEmpty = true;
    }
}

// 二叉树的链式存储插入根节点
void CreateBiTree(BiTree &T, ElemType e){
    T = (BiTree)malloc(sizeof(BiTNode));
    if (T == NULL) {
        std::cout << "分配空间失败" << std::endl;
        exit(0);
    }
    T->data = e;
    T->lchild = NULL;
    T->rchild = NULL;
}

// 二叉树的链式存储插入二叉树（默认左子树如果左子树满则插入右子树）
int InsertBiTree(BiTree &T, ElemType e){
    if (T == NULL) {
        CreateBiTree(T, e);
        return 0;  // 插入根节点
    }
    if (T->lchild == NULL) {
        CreateBiTree(T->lchild, e);
        return 1;  // 插入左子树
    }
    if (T->rchild == NULL) {
        CreateBiTree(T->rchild, e);
        return 2;  // 插入右子树
    }
    return -1;
}

// 输出二叉树结点
void Print(BiTree T){
    std::cout << T->data.value << " ";
}

// 二叉树的链式存储 先序遍历
void PreOrder(BiTree T){
    if (T != NULL) {
        Print(T);
        PreOrder(T->lchild);
        PreOrder(T->rchild);
    }
}

// 二叉树的链式存储 中序遍历
void InOrder(BiTree T){
    if (T != NULL) {
        InOrder(T->lchild);
        Print(T);
        InOrder(T->rchild);
    }
}

// 二叉树的链式存储 后序遍历
void PostOrder(BiTree T){
    if (T != NULL) {
        PostOrder(T->lchild);
        PostOrder(T->rchild);
        Print(T);
    }
}

// 利用递归求树的深度
int TreeDepth(BiTree T){
    if (T == NULL) {
        return 0;
    }
    int ldepth = TreeDepth(T->lchild);
    int rdepth = TreeDepth(T->rchild);
    return (ldepth > rdepth ? ldepth : rdepth) + 1;
}

// 层序遍历辅助链队列
typedef struct LinkNode{
    BiTNode *data;
    struct LinkNode *next;
}LinkNode;
typedef struct LinkQueue{
    LinkNode *front, *rear;  // 队头队尾指针
}LinkQueue;
void InitQueue(LinkQueue &Q){
    Q.front = Q.rear = (LinkNode *)malloc(sizeof(LinkNode));
    Q.front->next = NULL;
}
bool EmptyQueue(LinkQueue Q){
    return Q.front == Q.rear;
}
void EnQueue(LinkQueue &Q, BiTNode *T){
    LinkNode *s = (LinkNode *)malloc(sizeof(LinkNode));
    s->data = T;
    s->next = NULL;
    Q.rear->next = s;
    Q.rear = s;
}
BiTree DeQueue(LinkQueue &Q){
    LinkNode *p = Q.front->next;
    BiTNode *T = p->data;
    Q.front->next = p->next;
    if (Q.rear == p) {
        Q.rear = Q.front;
    }
    free(p);
    return T;
}

// 二叉树的层序遍历
void LevelOrder(BiTree T){
    if (T == NULL) {
        return;
    }
    LinkQueue Q;
    InitQueue(Q);
    EnQueue(Q, T);
    while (!EmptyQueue(Q)) {
        T = DeQueue(Q);
        Print(T);
        if (T->lchild != NULL) {
            EnQueue(Q, T->lchild);
        }
        if (T->rchild != NULL) {
            EnQueue(Q, T->rchild);
        }
    }
}

// 线索二叉树
typedef struct ThreadNode{
    ElemType data;
    struct ThreadNode *lchild, *rchild;
    int ltag,rtag;  // 左右线索标志，为0时指向孩子，为1时指向线索
}ThreadNode, *ThreadTree;

ThreadNode *Pre = NULL;

// 访问节点
void Visit(ThreadNode *q){
    if(q->lchild == NULL){
        q->lchild = Pre;  // 左子树为空，建立前驱线索
        q->ltag = 1;
    }
    if(Pre == NULL && Pre->rchild == NULL){
        Pre->rchild = q;  // 建立前驱节点的后继线索
        Pre->rtag = 1;
    }
    Pre = q;
}

// 二叉树的链式存储 中序遍历
void InThread(ThreadTree T){
    if (T != NULL) {
        InThread(T->lchild);
        Visit(T);
        InThread(T->rchild);
    }
}

// 二叉树的链式存储 先序遍历
void PreThread(ThreadTree T){
    if (T != NULL) {
        Visit(T);
        if(T->ltag == 0){
            PreThread(T->lchild);  // 判断lchild是否指向的是孩子
            // 如果lchild指向的是前驱则不需要再进行递归遍历
        }
        PreThread(T->rchild);
    }
}

// 二叉树的链式存储 后序遍历
void PostThread(ThreadTree T){
    if (T != NULL) {
        PostThread(T->lchild);
        PostThread(T->rchild);
        Visit(T);
    }
}

// 中序线索化二叉树T
void CreateInThread(ThreadTree &T){
    Pre = NULL;
    if(T != NULL){
        InThread(T);
        if(Pre->rchild == NULL){
            Pre->rtag = 1;  // 手动处理最后一个结点的右指针标识
        }
    }
}

// 先序线索化二叉树T
void CreatePreThread(ThreadTree &T){
    Pre = NULL;
    if(T != NULL){
        PreThread(T);
        if(Pre->rchild == NULL){
            Pre->rtag = 1;  // 手动处理最后一个结点的右指针标识
        }
    }
}

// 后序线索化二叉树T
void CreatePostThread(ThreadTree &T){
    Pre = NULL;
    if(T != NULL){
        PostThread(T);
        if(Pre->rchild == NULL){
            Pre->rtag = 1;  // 手动处理最后一个结点的右指针标识
        }
    }
}

// 中序线索二叉树找指定结点的中序前驱pre
ThreadNode *InOrderPre(ThreadNode *q){
    if(q->ltag == 1){  // 如果左指针指向的是前驱
        return q->lchild;
    }
    // 否则，左指针指向的是左边孩子，则循环查找前驱的前驱
    ThreadNode *p = q->lchild;
    while(p->rtag == 0){
        p = p->rchild;
    }
    // q的左孩子的右孩子方向的叶子结点即为q的前驱
    return p;
}

// 中序线索二叉树找指定结点的中序后继next
ThreadNode *InOrderNext(ThreadNode *q){
    if(q->rtag == 1){  // 如果右指针指向的是后继
        return q->rchild;
    }
    // 否则，右指针指向的是右边孩子，则循环查找后继的后继
    ThreadNode *p = q->rchild;
    while(p->ltag == 0){
        p = p->lchild;
    }
    // q的右孩子的左孩子方向的叶子结点即为q的后继
    return p;
}

// 先序线索二叉树找指定结点的先序前驱pre
ThreadNode *PreOrderPre(ThreadNode *q){
    if(q->ltag == 1){  // 如果左指针指向的是前驱
        return q->lchild;
    }
    // 否则，左指针指向的是左边孩子，则根据先序排序 根 -> 左 -> 右 无法判断前驱
    std::cout << "无法找到该结点的先序前驱！" << std::endl;
    return NULL;
}

// 先序线索二叉树找指定结点的先序后继next
ThreadNode *PreOrderNext(ThreadNode *q){
    if(q->rtag == 1){  // 如果右指针指向的是后继
        return q->rchild;
    }
    if(q->lchild != NULL){  // 如果左孩子不为空，则左孩子的前驱即为后继
        return q->lchild;
    }else{  // 根据先序排序 根 -> 左 -> 右，且左孩子为空，则右孩子的前驱即为后继
        return q->rchild;
    }
}

// 后序线索二叉树找指定结点的后序前驱pre
ThreadNode *PostOrderPre(ThreadNode *q){
    if(q->ltag == 1){  // 如果左指针指向的是前驱
        return q->lchild;
    }
    if(q->rchild != NULL){  // 如果右孩子不为空，则右孩子的前驱即为前驱
        return q->rchild;
    }else{  // 根据后序排序 左 -> 右 -> 根，且右孩子为空，则左孩子的前驱即为前驱
        return q->lchild;
    }
}

// 后序线索二叉树找指定结点的后序后继next
ThreadNode *PostOrderNext(ThreadNode *q){
    if(q->rtag == 1){  // 如果左指针指向的是前驱
        return q->rchild;
    }
    // 否则，右指针指向的是右边孩子，则根据后序排序 左 -> 右 -> 根 无法判断后继
    std::cout << "无法找到该结点的后序后继！" << std::endl;
    return NULL;
}

// 二叉排序树
typedef struct BSTNode{
    int data;
    struct BSTNode *lchild, *rchild;
}BSTNode, *BSTree;

// 查找二叉排序树中指定结点 递归
BSTNode *SearchBST_Recursive(BSTree T, int key){
    if(T == NULL  T->data == key){
        return T;
    }
    if(key < T->data){
        return SearchBST_Recursive(T->lchild, key);
    }else{
        return SearchBST_Recursive(T->rchild, key);
    }
}

// 查找二叉排序树中指定结点 非递归
BSTNode *SearchBST(BSTree T, int key){
    while(T != NULL && T->data != key){
        if(key < T->data){
            T = T->lchild;
        }else{
            T = T->rchild;
        }
    }
    return T;
}

// 插入二叉排序树 递归
void InsertBST_Recursive(BSTree &T, int x){
    if(T == NULL){
        T = (BSTree)malloc(sizeof(BSTNode));
        T->data = x;
        T->lchild = T->rchild = NULL;
    }else if(x == T->data){
        std::cout << "该结点已存在！" << std::endl;
    }else if(x < T->data){
        InsertBST_Recursive(T->lchild, x);
    }else{
        InsertBST_Recursive(T->rchild, x);
    }
}

// 插入二叉排序树 非递归
void InsertBST(BSTree &T, int x){
    BSTree p = T, q = NULL;
    while(p != NULL && p->data != x){
        q = p;
        if(x < p->data){
            p = p->lchild;
        }else{
            p = p->rchild;
        }
    }
    if(p == NULL){
        p = (BSTree)malloc(sizeof(BSTNode));
        p->data = x;
        p->lchild = p->rchild = NULL;
        if(q == NULL){
            T = p;
        }else if(x < q->data){
            q->lchild = p;
        }else{
            q->rchild = p;
        }
    }else{
        std::cout << "该结点已存在！" << std::endl;
    }
}

// 删除二叉排序树
void DeleteBST(BSTree &T, int key){
    BSTree p = T, q = NULL;
    while(p != NULL && p->data != key){
        q = p;
        if(key < p->data){
            p = p->lchild;
        }else{
            p = p->rchild;
        }
    }
    if(p == NULL){
        std::cout << "该结点不存在！" << std::endl;
    }else{
        if(p->lchild == NULL){
            if(q == NULL){
                T = p->rchild;
            }else if(p == q->lchild){
                q->lchild = p->rchild;
            }else{
                q->rchild = p->rchild;
            }
        }else if(p->rchild == NULL){
            if(q == NULL){
                T = p->lchild;
            }else if(p == q->lchild){
                q->lchild = p->lchild;
            }else{
                q->rchild = p->lchild;
            }
        }else{
            BSTree s = p->lchild;
            while(s->rchild != NULL){
                s = s->rchild;
            }
            p->data = s->data;
            DeleteBST(p->lchild, s->data);
        }
    }
}

// 创建二叉排序树
void CreateBSTree(BSTree &T, int str[], int n){
    T = NULL;
    for(int i = 0; i < n; i++){
        InsertBST(T, str[i]);
    }
}

// 平衡二叉树
typedef struct AVLNode{
    int data;  // 数据域
    int height;  // 平衡因子，即高度
    struct AVLNode *lchild, *rchild;
}AVLNode, *AVLTree;

// 求最大值
int Max(int a, int b){
    return a > b ? a : b;
}

// LL右单旋转
AVLTree SingleRotateWithLeft(AVLTree &T){
    AVLTree p = T->lchild;
    T->lchild = p->rchild;
    p->rchild = T;
    T->height = Max(T->lchild->height, T->rchild->height) + 1;
    p->height = Max(p->lchild->height, T->height) + 1;
    return p;
}

// RR左单旋转
AVLTree SingleRotateWithRight(AVLTree &T){
    AVLTree p = T->rchild;
    T->rchild = p->lchild;
    p->lchild = T;
    T->height = Max(T->lchild->height, T->rchild->height) + 1;
    p->height = Max(p->rchild->height, T->height) + 1;
    return p;
}

// LR先左后右双旋转 即先变成LL结构再恢复平衡
AVLTree DoubleRotateWithLeft(AVLTree &T){
    T->lchild = SingleRotateWithRight(T->lchild);
    return SingleRotateWithLeft(T);
}

// RL先右后左双旋转 即先变成RR结构再恢复平衡
AVLTree DoubleRotateWithRight(AVLTree &T){
    T->rchild = SingleRotateWithLeft(T->rchild);
    return SingleRotateWithRight(T);
}

// 平衡二叉树的插入
void InsertAVL(AVLTree &T, int x){
    if(T == NULL){
        T = (AVLTree)malloc(sizeof(AVLNode));
        T->data = x;
        T->lchild = T->rchild = NULL;
        T->height = 1;
    }else if(x == T->data){
        std::cout << "该结点已存在！" << std::endl;
    }else if(x < T->data){
        InsertAVL(T->lchild, x);
        if(T->lchild->height - T->rchild->height == 2){
            if(T->lchild->lchild->height - T->lchild->rchild->height == 1){
                // 左左
                T = SingleRotateWithLeft(T);
            }else{
                // 左右
                T = DoubleRotateWithLeft(T);
            }
        }
    }else{
        InsertAVL(T->rchild, x);
        if(T->rchild->height - T->lchild->height == 2){
            if(T->rchild->rchild->height - T->rchild->lchild->height == 1){
                // 右右
                T = SingleRotateWithRight(T);
            }else{
                // 右左
                T = DoubleRotateWithRight(T);
            }
        }
    }
    T->height = (T->lchild->height > T->rchild->height ? T->lchild->height : T->rchild->height) + 1;
}

// 构造哈夫曼树
typedef struct HuffmanNode{
    int weight;  // 权值
    int parent, lchild, rchild;  // 双亲，左孩子，右孩子
}HuffmanNode, *HuffmanTree;
// 构造哈夫曼树
void CreateHuffmanTree(HuffmanTree &T, int n){
    int i, j, k;
    int *w = (int *)malloc(sizeof(int) * n);
    for(i = 0; i < n; i++){
        std::cout << "请输入第" << i + 1 << "个结点的权值：";
        std::cin >> w[i];
    }
    for(i = 0; i < n; i++){
        for(j = i + 1; j < n; j++){
            if(w[i] > w[j]){
                k = w[i];
                w[i] = w[j];
                w[j] = k;
            }
        }
    }
    T = (HuffmanTree)malloc(sizeof(HuffmanNode) * n);
    for(i = 0; i < n; i++){
        T[i].weight = w[i];
        T[i].parent = T[i].lchild = T[i].rchild = -1;
    }
    for(i = n - 1; i > 0; i--){
        T[i].parent = i - 1;
        T[i - 1].lchild = i;
    }
}
```