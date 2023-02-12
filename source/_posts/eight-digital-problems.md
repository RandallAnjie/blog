---
title: 八数码问题
tags: []
id: '475'
categories:
  - - C++
  - - 人工智能
date: 2022-03-10 17:23:51
---

## 题目

在3×3的棋盘上，摆有八个棋子，每个棋子上标有1至8的某一数字。棋盘中留有一个空格，空格用0来表示。空格周围的棋子可以移到空格中。要求解的问题是：给出一种初始布局（初始状态）和目标布局，找到一种移动方法，实现从初始布局到目标布局的转变。

* * *

## 思路

依据题意可以优先考虑**广度优先算法**(BFS)，创建一个队列先将根结点（初始状态）入队，然后再依次取出队列中队首元素，判断队首结点数据是否与目标数据相同。如果不同再，将空格可以移动的几个方向移动后的状态保存到结点后依次入队，重复上述出队操作直至找到目标数据或者队空。

* * *

**深度优先算法**要优先给出遍历的深度，因为数码移动没有限制，除了深度限制没有其他情况可以结束深度遍历，按照一个顺序（如上下左右）进行遍历，待循环到深度限制后开始回溯，回溯到第一个可以新增子节点的结点即可继续顺序往下遍历，此时需要跳过回溯到此节点次数个遍历方向（如第二次回溯到此结点，此结点能向上下左，第二次回溯到此节点要跳过往上和下的方向而去遍历左方向）。

* * *

**启发式搜索(A\*)** ，在BFS搜索算法中，如果能在搜索的每一步都利用估价函数**f(n)=g(n)+h(n)**对表**(队列)**中的节点进行排序(**g(n)表示从初始结点到任意结点n的实际代价，h(n)表示从结点n到目标点的启发式评估代价**)，则该搜索算法为A\*算法。由于估价函数中带有问题自身的启发性信息，因此，A算法又称为启发式搜索算法。对启发式搜索算法，又可根据搜索过程中选择扩展节点的范围，将其分为全局择优搜索算法和局部择优搜索算法。

在全局择优搜索中，每当需要扩展节点时，总是从表的所有节点中选择一个估价函数值最小的节点进行扩展。其搜索过程可能描述如下：

1.  把初始节点originalData放入表中，f(originalData)=g(originalData)+h(originalData)；
2.  如果表空则问题无解，如果表非空，取出表(队列)的第一个记录为temp；
3.  判断temp是否是目标结点，如果是targetData则输出信息，结束运行；如果不是targetData则判断其是否有可拓展结点；
4.  如果其不可拓展，则返回步骤2；
5.  如果可拓展，则生成其可拓展的结点，计算每个结点的f(n)，并且设置指针指向其父节点后将其存入表中；
6.  根据表中结点的f(n)值进行从小到大排序后返回步骤2；

1

2

3

1

2

3

**2**

**8**

**3**

**2**

**3**

8

**1**

**6**

**4**

4

8

**1**

**8**

**4**

4

**7**

**5**

5

**7**

**6**

**5**

5

7

6

7

6

不带空格(0)的计算h(n)

例如上左表中h(n) = 1+1+0+0+0+1+0+2 = 5；上右表中h(n) = 1+1+0+0+0+0+0+1 = 2

* * *

## 代码及运行结果

### 广度优先

#### C++

```
/*
 * @Author: 转接
 * @Date: 2022-03-12 13:10:57
 * @LastEditors: 转接
 * @LastEditTime: 2022-03-14 12:28:26
 * @Description: 八数码问题广度优先求解
 */

#include <iostream>
#include <queue>
#include <time.h>

typedef struct Data{
    int data[9]; // 存放数据
    int step; // 记录步数
    int last; // 上一步操作 上 下 左 右 1 2 3 4
    int *action = new int[step];// 每一步操作 上 下 左 右 1 2 3 4
} Data;

int tempPosition[9][2] = { // 位置 上下左右 
    {0, 5}, // 0号位 0 1 0 1 = 5
    {1, 7}, // 1号位 0 1 1 1 = 7
    {2, 6}, // 2号位 0 1 1 0 = 6
    {3, 13}, // 3号位 1 1 0 1 = 13
    {4, 15}, // 4号位 1 1 1 1 = 15
    {5, 14}, // 5号位 1 1 1 0 = 14
    {6, 9}, // 6号位 1 0 0 1 = 9
    {7, 11}, // 7号位 1 0 1 1 = 11
    {8, 10}, // 8号位 1 0 1 0 = 10
};  // 上tempPosition[i][1]>=8 下tempPosition[i][1]%8>=4 左tempPosition[i][1]%8%4>=2 右tempPosition[i][1]%8%4%2>=1

int GetNextAction(Data data){
    int *temp = data.data;
    int i = 0;
    for(i = 0; i < 9; i++){
        if(temp[i] == 0){
            break;
        }
    }
    int tp = tempPosition[i][1];
    int last = data.last;
    if(last == 1){ // 上一步向上移动
        tp = tp - 4; // 不让其向下移动
    }else if(last == 2){ // 上一步向下移动
        tp = tp - 8; // 不让其向上移动
    }else if(last == 3){ // 上一步向左移动
        tp = tp - 1; // 不让其向右移动
    }else if(last == 4){ // 上一步向右移动
        tp = tp - 2; // 不让其向左移动
    }
    return tp;
}

int Judge(int *arr1, int *arr2){
    for(int i = 0; i < 9; i++){
        if(arr1[i] != arr2[i]){
            return 0;
        }
    }
    return 1;
}

void Print(Data data){
    for(int i = 0; i < 3; i++){
        for(int j = 0; j < 3; j++){
            std::cout << data.data[i * 3 + j] << " ";
        }
        std::cout << std::endl;
    }
    std::cout << std::endl;
}

int main(){
    Data originalData, targetArray;
    int *arraytest1 = new int[9];
    int *arraytest2 = new int[9];
    originalData.step = 0;
    std::cout << "请输入原始数据：" << std::endl;
    for(int i = 0; i < 9; i++){
        std::cin >> originalData.data[i];
    }
    std::cout << "请输入变换后数据：" << std::endl;
    for(int i = 0; i < 9; i++){
        std::cin >> targetArray.data[i];
    }
    // 数组输到arraytest
    for(int i = 0; i < 9; i++){
        arraytest1[i] = originalData.data[i];
        arraytest2[i] = targetArray.data[i];
    }
    // 判断问题是否有解
    int cnt1 = 0, cnt2 = 0;
    for(int i = 0; i < 9; i++){
        if(arraytest1[i] == 0){
            continue;
        }
        for(int j = i - 1; j >= 0; j--){
            if(arraytest1[j] > arraytest1[i]){
                cnt1++;
            }
        }
    }
    for(int i = 0; i < 9; i++){
        if(arraytest2[i] == 0){
            continue;
        }
        for(int j = i - 1; j >= 0; j--){
            if(arraytest2[j] > arraytest2[i]){
                cnt2++;
            }
        }
    }
    if(cnt1%2 != cnt2%2){
        std::cout << "E0: 输入有误！问题无解" << std::endl;
        return 0;
    }
    // 排序
    for(int i = 0; i < 9; i++){
        for(int j = 0; j < 9; j++){
            if(arraytest1[i] < arraytest1[j]){
                int temp = arraytest1[i];
                arraytest1[i] = arraytest1[j];
                arraytest1[j] = temp;
            }
        }
    }
    for(int i = 0; i < 9; i++){
        for(int j = 0; j < 9; j++){
            if(arraytest2[i] < arraytest2[j]){
                int temp = arraytest2[i];
                arraytest2[i] = arraytest2[j];
                arraytest2[j] = temp;
            }
        }
    }
    //判断排序后的数组是否相等
    for(int i = 0; i < 9; i++){
        if(arraytest1[i] != arraytest2[i]){
            std::cout << "E1: 输入有误！请检查输入" << std::endl;
            return 0;
        }
    }
    delete[] arraytest1;
    delete[] arraytest2;
    clock_t start, finish;
double Total_time;
    start = clock();
    std::queue<Data> q;
    q.push(originalData);
    int action = 0;
    Data temp;
    while(true){ // 没必要设置成!q.empty()，只要循环继续就不可避免增加队列中的数据
        temp = q.front();
        q.pop();
        // std::cout << "==========当前取出的元素：=========" << std::endl;
        // Print(temp);
        if(Judge(temp.data, targetArray.data)){
            std::cout << "找到了！需要" << temp.step << "步" << std::endl;
            break;
        }
        int i = 0; // 找到空(0)位置
        for(i = 0; i < 9; i++){
            if(temp.data[i] == 0){
                break;
            }
        }
        int nextAction = GetNextAction(temp);
        if(nextAction>=8){
            int arrayList[9];
            for(int j = 0; j < 9; j++){
                arrayList[j] = temp.data[j];
            }
            arrayList[i] = arrayList[i-3];
            arrayList[i-3] = 0;
            Data nextData;
            for(int j = 0; j < 9; j++){
                nextData.data[j] = arrayList[j];
            }
            nextData.step = temp.step + 1;
            nextData.last = 1;
            for(int j = 0; j < temp.step; j++){
                nextData.action[j] = temp.action[j];
            }
            nextData.action[temp.step] = 1;
            q.push(nextData);
            // std::cout << "上nextData" << std::endl;
            // Print(nextData);
        }
        if(nextAction%8>=4){
            int arrayList[9];
            for(int j = 0; j < 9; j++){
                arrayList[j] = temp.data[j];
            }
            arrayList[i] = arrayList[i+3];
            arrayList[i+3] = 0;
            Data nextData;
            for(int j = 0; j < 9; j++){
                nextData.data[j] = arrayList[j];
            }
            nextData.step = temp.step + 1;
            nextData.last = 2;
            for(int j = 0; j < temp.step; j++){
                nextData.action[j] = temp.action[j];
            }
            nextData.action[temp.step] = 2;
            q.push(nextData);
            // std::cout << "下nextData" << std::endl;
            // Print(nextData);
        }
        if(nextAction%8%4>=2){
            int arrayList[9];
            for(int j = 0; j < 9; j++){
                arrayList[j] = temp.data[j];
            }
            arrayList[i] = arrayList[i-1];
            arrayList[i-1] = 0;
            Data nextData;
            for(int j = 0; j < 9; j++){
                nextData.data[j] = arrayList[j];
            }
            nextData.step = temp.step + 1;
            nextData.last = 3;
            for(int j = 0; j < temp.step; j++){
                nextData.action[j] = temp.action[j];
            }
            nextData.action[temp.step] = 3;
            q.push(nextData);
            // std::cout << "左nextData" << std::endl;
            // Print(nextData);
        }
        if(nextAction%8%4%2>=1){
            int arrayList[9];
            for(int j = 0; j < 9; j++){
                arrayList[j] = temp.data[j];
            }
            arrayList[i] = arrayList[i+1];
            arrayList[i+1] = 0;
            Data nextData;
            for(int j = 0; j < 9; j++){
                nextData.data[j] = arrayList[j];
            }
            nextData.step = temp.step + 1;
            nextData.last = 4;
            for(int j = 0; j < temp.step; j++){
                nextData.action[j] = temp.action[j];
            }
            nextData.action[temp.step] = 4;
            q.push(nextData);
            // std::cout << "右nextData" << std::endl;
            // Print(nextData);
        }
        
    }
    finish = clock();
    // 输出结果
    int steps = temp.step;
    std::cout << "步骤为：" << std::endl;
    int *result = new int[temp.step];
    for(int i = 0; i < temp.step; i++){
        result[i] = temp.action[i];
    }
    Print(originalData);
    int tempArray[9];
    for(int i = 0; i < 9; i++){
        tempArray[i] = originalData.data[i];
    }
    int position;
    for(position = 0; position < 9; position++){
        if(tempArray[position] == 0){
            break;
        }
    }
    for(int i = 0; i < temp.step; i++){
        if(result[i] == 1){
            tempArray[position] = tempArray[position-3];
            tempArray[position-3] = 0;
            position -= 3;
        }else if(result[i] == 2){
            tempArray[position] = tempArray[position+3];
            tempArray[position+3] = 0;
            position += 3;
        }else if(result[i] == 3){
            tempArray[position] = tempArray[position-1];
            tempArray[position-1] = 0;
            position -= 1;
        }else if(result[i] == 4){
            tempArray[position] = tempArray[position+1];
            tempArray[position+1] = 0;
            position += 1;
        }else{
            std::cout << "E2: 计算错误！请重试" << std::endl;
        }
        for(int j = 0; j < 3; j++){
            for(int k = 0; k < 3; k++){
                std::cout << tempArray[j*3+k] << " ";
            }
            std::cout << std::endl;
        }
        std::cout << std::endl;
    }
    delete[] result;
    std::cout << steps << "步，搜索用时：" << (double)(finish - start) / CLOCKS_PER_SEC << "s" << std::endl;
    return 0;
}
```

#### C++运行结果

请输入原始数据：
1 2 3
0 4 5
6 7 8
请输入变换后数据：
0 2 3
1 7 5
4 6 8
找到了！需要5步
步骤为：
1 2 3
0 4 5
6 7 8

1 2 3
4 0 5
6 7 8

1 2 3
4 7 5
6 0 8

1 2 3
4 7 5
0 6 8

1 2 3
0 7 5
4 6 8

0 2 3
1 7 5
4 6 8

5步，搜索用时：0.001s

* * *

### 深度优先

#### C++

> ATT: 此段代码存在bug，数据规模过大可能出现计算失败，空位在中间的时候为了节省内存可能不是最优先算法而将其先向上移动一格再进行计算

```
/*
 * @Author: 转接
 * @Date: 2022-03-10 12:24:48
 * @LastEditors: 转接
 * @LastEditTime: 2022-03-14 12:22:57
 * @Description: 八数码问题深度优先求解
 */

#include <iostream>
#include <stack>
#include <algorithm>
#include <time.h>

// 数据
typedef struct data{
    int data[9];
    int step;
}Data;

// 链树
typedef struct NodeTag{
    Data data;
    int childNum;
    NodeTag *father; // 父结点
    NodeTag *child1; // 子结点1
    NodeTag *child2; // 子结点2
    NodeTag *child3; // 子结点3
    int lastFunction = 0; // 上一个功能 上下左右 1234
    int skip = 0; // 回溯到该结点的使用次数
    int back = 0; // 是否回溯到该结点过
}NodeTag, *NodeTree;

// 链表存储回溯结点
typedef struct NodeLink{
    NodeTree node; // 溯结点
    NodeLink *next;
}NodeLink, *NodeLinkList;

int childNum[] = { // 子结点数量
        1,2,1,
        2,3,2,
        1,2,1
        /*
        1,2,3,
        4,5,6,
        7,8,9
        */
    };
int tempPosition[9][2] = { // 位置 上下左右 
    {0, 5}, // 0号位 0 1 0 1 = 5
    {1, 7}, // 1号位 0 1 1 1 = 7
    {2, 6}, // 2号位 0 1 1 0 = 6
    {3, 13}, // 3号位 1 1 0 1 = 13
    {4, 15}, // 4号位 1 1 1 1 = 15
    {5, 14}, // 5号位 1 1 1 0 = 14
    {6, 9}, // 6号位 1 0 0 1 = 9
    {7, 11}, // 7号位 1 0 1 1 = 11
    {8, 10}, // 8号位 1 0 1 0 = 10
};  // 上tempPosition[i][1]>=8 下tempPosition[i][1]%8>=4 左tempPosition[i][1]%8%4>=2 右tempPosition[i][1]%8%4%2>=1

// 初始化树 将原始数据originalData存入第一个结点
int InitTree(NodeTree &tree, Data originalData){
    tree = new NodeTag;
    tree->data = originalData;
    tree->childNum = 0;
    int i = 0;
    for(i = 0; i < 9; i++){
        if(tree->data.data[i] == 0){
            tree->childNum = childNum[i]+1; // 设置子结点数量
        }
    }
    tree->father = NULL;
    tree->child1 = NULL;
    tree->child2 = NULL;
    tree->child3 = NULL;
    tree->lastFunction = 0;
    return i-1; // 将0的位置返回
}

// 插入结点到树
int InsertNode(NodeTree &tree, NodeTree &node){
    if(tree->childNum == 1){ // 只能有一个子结点的结点
        if(tree->child1 == NULL){
            tree->child1 = node;
            node->father = tree;
        }else{
            std::cout << "E2.1:数据规模错误" << std::endl;
            return 1;
        }
    }else if(tree->childNum == 2){ // 只能有两个子结点的结点
        if(tree->child1 == NULL){
            tree->child1 = node;
            node->father = tree;
        }else if(tree->child2 == NULL){
            tree->child2 = node;
            node->father = tree;
        }else{
            std::cout << "E2.2:数据规模错误" << std::endl;
            return 1;
        }
    }else if(tree->childNum == 3){ // 只能有三个子结点的结点
        if(tree->child1 == NULL){
            tree->child1 = node;
            node->father = tree;
        }else if(tree->child2 == NULL){
            tree->child2 = node;
            node->father = tree;
        }else if(tree->child3 == NULL){
            tree->child3 = node;
            node->father = tree;
        }else{
            std::cout << "E2.3:数据规模错误" << std::endl;
            return 1;
        }
    }
    return 0;
}

// 初始化链表
void InitLink(NodeLinkList &link){
    link = new NodeLink;
    link->node = NULL;
    link->next = NULL;
}

// 插入结点到链表
void InsertLink(NodeLinkList &link, NodeTree &node){
    NodeLinkList temp = link;
    while(temp->next != NULL){
        temp = temp->next;
    }
    temp->next = new NodeLink;
    temp->next->node = node;
    temp->next->next = NULL;
}

// 在链表中查找结点是否存在
int SearchLink(NodeLinkList &link, NodeTree &node){
    NodeLinkList temp = link;
    while(temp->next != NULL){
        if(temp->next->node == node){
            return 1;
        }
        temp = temp->next;
    }
    return 0;
}

// 判断两Data中的数据是否相等
int judge(Data data1, Data data2){
    for(int i = 0; i < 9; i++){
        if(data1.data[i] != data2.data[i]){
            return 0;
        }
    }
    return 1;
}

// 规范输出结点中的数据
void Print(NodeTree tempNode){
    for(int i = 0; i < 3; i++){
        for(int j = 0; j < 3; j++){
            std::cout << tempNode->data.data[i*3+j] << " ";
        }
        std::cout << std::endl;
    }
    std::cout << std::endl;
}

int main(){
    Data originalData, targetArray; // 原始数据 和 目标数据
    int *arraytest1 = new int[9];
    int *arraytest2 = new int[9];
    originalData.step = 0; // 初始化步数
    targetArray.step = -1;
    int state = 1; // 程序错误状态
    int middle = 0; // 判断0是否为中间结点
    int deep;
    std::cout << "请输入原始数据：" << std::endl;
    for(int i = 0; i < 9; i++){
        std::cin >> originalData.data[i];
    }
    if(originalData.data[4] == 0){
        middle = 1;
        originalData.data[4] = originalData.data[1];
        originalData.data[1] = 0;
    }
    std::cout << "请输入变换后数据：" << std::endl;
    for(int i = 0; i < 9; i++){
        std::cin >> targetArray.data[i];
    }
    std::cout << "请输入搜索深度：" << std::endl;
    std::cin >> deep;
    clock_t start, finish;
double Total_time;
    start = clock();
    // 数组输到arraytest
    for(int i = 0; i < 9; i++){
        arraytest1[i] = originalData.data[i];
        arraytest2[i] = targetArray.data[i];
    }
    // 判断问题是否有解
    int cnt1 = 0, cnt2 = 0;
    for(int i = 0; i < 9; i++){
        if(arraytest1[i] == 0){
            continue;
        }
        for(int j = i - 1; j >= 0; j--){
            if(arraytest1[j] > arraytest1[i]){
                cnt1++;
            }
        }
    }
    for(int i = 0; i < 9; i++){
        if(arraytest2[i] == 0){
            continue;
        }
        for(int j = i - 1; j >= 0; j--){
            if(arraytest2[j] > arraytest2[i]){
                cnt2++;
            }
        }
    }
    if(cnt1%2 != cnt2%2){
        std::cout << "E0: 输入有误！问题无解" << std::endl;
        return 0;
    }
    // 排序
    for(int i = 0; i < 9; i++){
        for(int j = 0; j < 9; j++){
            if(arraytest1[i] < arraytest1[j]){
                int temp = arraytest1[i];
                arraytest1[i] = arraytest1[j];
                arraytest1[j] = temp;
            }
        }
    }
    for(int i = 0; i < 9; i++){
        for(int j = 0; j < 9; j++){
            if(arraytest2[i] < arraytest2[j]){
                int temp = arraytest2[i];
                arraytest2[i] = arraytest2[j];
                arraytest2[j] = temp;
            }
        }
    }
    //判断排序后的数组是否相等
    for(int i = 0; i < 9; i++){
        if(arraytest1[i] != arraytest2[i]){
            state = 0;
        }
    }
    free(arraytest1);
    free(arraytest2);
    NodeTree tree;
    int tempNum = InitTree(tree, originalData);
    if(tree->childNum == 0 && state){
        std::cout << "E1:数据输入有误" << std::endl;
        std::cout << "输入的数据要用表示空位，请检查输入！" << std::endl;
        return 0;
    }
    NodeTree tempNode = tree; // 临时当前结点
    NodeLinkList link; // 创建链表用来存储回溯结点
    InitLink(link);
    int step = 1;
    while(true){
        // 判断是否到达目标状态
        if(judge(tempNode->data, targetArray) == 1){
            if(middle){
                tempNode->data.step++;
            }
            std::cout << "搜索完成，步数为：" << tempNode->data.step << std::endl;
            break;
        }
        // 开始搜索
        // 空格(0)向上移动
        if(tempNode->data.step<deep && tempPosition[tempNum][1] >= 8 && tempNode->lastFunction != 4 && (tempNode->back == 0  --tempNode->skip <= 0)){ 
            // 保证深度未达到目标深度，能向上交换的同时上一次不是向下移动，且不是跳过状态
            Data tempData;
            tempData.step = tempNode->data.step + 1;
            for(int i = 0; i < 9; i++){ // 复制
                tempData.data[i] = tempNode->data.data[i];
            }
            // 交换
            tempData.data[tempNum] = tempData.data[tempNum-3];
            tempData.data[tempNum-3] = 0;
            tempNum = tempNum-3; // 标记交换后的位置
            NodeTree node = new NodeTag;
            node->data = tempData;
            node->childNum = childNum[tempNum];
            node->father = tempNode;
            node->child1 = NULL;
            node->child2 = NULL;
            node->child3 = NULL;
            node->lastFunction = 1;
            if(InsertNode(tempNode, node)){
                std::cout << "查找失败！尝试增加查找深度!" << std::endl;
                return 0;
            }
            tempNode = node;
            
        }
        // 下
        else if(tempNode->data.step<deep && tempPosition[tempNum][1]%8>=4 && tempNode->lastFunction != 1 && (tempNode->back == 0  --tempNode->skip <= 0)){
            // 保证深度未达到目标深度，能向下交换的同时上一次不是向上移动，且不是跳过状态
            Data tempData;
            tempData.step = tempNode->data.step + 1;
            for(int i = 0; i < 9; i++){ // 复制
                tempData.data[i] = tempNode->data.data[i];
            }
            // 交换
            tempData.data[tempNum] = tempData.data[tempNum+3];
            tempData.data[tempNum+3] = 0;
            tempNum = tempNum+3; // 标记交换后的位置
            NodeTree node = new NodeTag;
            node->data = tempData;
            node->childNum = childNum[tempNum];
            node->father = tempNode;
            node->child1 = NULL;
            node->child2 = NULL;
            node->child3 = NULL;
            node->lastFunction = 4;
            if(InsertNode(tempNode, node)){
                std::cout << "查找失败！尝试增加查找深度!" << std::endl;
                return 0;
            }
            tempNode = node;
        }
        // 左
        else if(tempNode->data.step<deep && tempPosition[tempNum][1]%8%4>=2 && tempNode->lastFunction != 3 && (tempNode->back == 0  --tempNode->skip <= 0)){ 
            // 保证深度未达到目标深度，能向左交换的同时上一次不是向右移动，且不是跳过状态
            Data tempData;
            tempData.step = tempNode->data.step + 1;
            for(int i = 0; i < 9; i++){ // 复制
                tempData.data[i] = tempNode->data.data[i];
            }
            // 交换
            tempData.data[tempNum] = tempData.data[tempNum-1];
            tempData.data[tempNum-1] = 0;
            tempNum = tempNum-1; // 标记交换后的位置
            NodeTree node = new NodeTag;
            node->data = tempData;
            node->childNum = childNum[tempNum];
            node->father = tempNode;
            node->child1 = NULL;
            node->child2 = NULL;
            node->child3 = NULL;
            node->lastFunction = 2;
            if(InsertNode(tempNode, node)){
                std::cout << "查找失败！尝试增加查找深度!" << std::endl;
                return 0;
            }
            tempNode = node;
        }
        // 右
        else if(tempNode->data.step<deep && tempPosition[tempNum][1]%8%4%2>=1 && tempNode->lastFunction != 2 && (tempNode->back == 0  --tempNode->skip <= 0)){
            // 保证深度未达到目标深度，能向右交换的同时上一次不是向左移动，且不是跳过状态
            Data tempData;
            tempData.step = tempNode->data.step + 1;
            for(int i = 0; i < 9; i++){ // 复制
                tempData.data[i] = tempNode->data.data[i];
            }
            // 交换
            tempData.data[tempNum] = tempData.data[tempNum+1];
            tempData.data[tempNum+1] = 0;
            tempNum = tempNum+1; // 标记交换后的位置
            NodeTree node = new NodeTag;
            node->data = tempData;
            node->childNum = childNum[tempNum];
            node->father = tempNode;
            node->child1 = NULL;
            node->child2 = NULL;
            node->child3 = NULL;
            node->lastFunction = 3;
            if(InsertNode(tempNode, node)){
                std::cout << "查找失败！尝试增加查找深度!" << std::endl;
                return 0;
            }
            tempNode = node;
        }
        else{
            do{
                tempNode = tempNode->father;
                if(tempNode->childNum == 2 && tempNode->child2 == NULL){
                    // 将结点插入链表
                    if(SearchLink(link, tempNode) == 0){
                        InsertLink(link, tempNode);
                        tempNode->skip++;
                    }
                    tempNode->skip++;
                    tempNode->back = 1;
                    step--;
                    break;
                }else if(tempNode->childNum == 3 && tempNode->child3 == NULL){
                    if(SearchLink(link, tempNode) == 0){
                        InsertLink(link, tempNode);
                        tempNode->skip++;
                    }
                    tempNode->skip++;
                    tempNode->back = 1;
                    step--;
                    break;
                }else{
                    continue;
                }
            }while(tempNode != tree);
            int i = 0;
            for(i = 0; i < 9; i++){
                if(tempNode->data.data[i] == 0){
                    break;
                }
            }
            tempNum = i;
        }
        // std::cout << "step: " << step << std::endl;
        // Print(tempNode);
    }
    finish = clock();
    int steps = tempNode->data.step;
    // 判断是否搜索完成将结点压入栈中
    std::stack <NodeTree> tempStack;
    while(tempNode != tree){
        tempStack.push(tempNode);
        tempNode = tempNode->father;
    }
    // 打印输出栈
    std::cout << "输出步骤：" << std::endl;
    if(middle){ //如果最开始空格(0)位置在中间
        tree->data.data[1]=tree->data.data[4];
        tree->data.data[4]=0;
        Print(tree);
        tree->data.data[4]=tree->data.data[1];
        tree->data.data[1]=0;
    }
    Print(tree);
    while(!tempStack.empty()){
        tempNode = tempStack.top();
        tempStack.pop();
        Print(tempNode);
    }
    std::cout << steps << "步，搜索用时：" << (double)(finish - start) / CLOCKS_PER_SEC << "s" << std::endl;
    return 0;
}
```

#### C++运行结果

请输入原始数据：
1 2 3
4 5 6
7 8 0  
请输入变换后数据：
1 2 3
4 5 6
0 7 8
请输入搜索深度：
3
搜索完成，步数为：2
输出步骤：
1 2 3
4 5 6
7 8 0

1 2 3
4 5 6
7 0 8

1 2 3
4 5 6
0 7 8

2步，搜索用时：0.002s

#### Python

```
'''
Author: 转接
Date: 2022-03-14 12:41:19
LastEditors: 转接
LastEditTime: 2022-03-14 14:16:59
Description: 八数码问题深度优先求解
'''

import numpy as np
import copy
from datetime import datetime

# 找到空位
def local(tempData):
    a = np.array(tempData)
    i,j = np.where(a == 0)
    return i[0],j[0]

# 向上移动
def ToUp(tempData):
    i,j =  local(tempData)
    arr = copy.deepcopy(tempData)
    if i in (1,len(tempData)-1):
        arr[i][j],arr[i-1][j] = arr[i-1][j],arr[i][j]       
        return arr

# 向下移动
def ToDown(tempData):
    i,j =  local(tempData)
    arr = copy.deepcopy(tempData)
    if i in (0,len(tempData)-2):
        arr[i][j],arr[i+1][j] = arr[i+1][j],arr[i][j]
        return arr

# 向左移动
def ToRight(tempData):
    i,j =  local(tempData)
    arr = copy.deepcopy(tempData)
    if j in (0,len(tempData)-2):
        arr[i][j], arr[i][j+1] = arr[i][j+1],arr[i][j]
        return arr
# 向右移动
def ToLeft(tempData):
    i,j =  local(tempData)
    arr = copy.deepcopy(tempData)
    if j in (1,len(tempData)-1):
        arr[i][j],arr[i][j-1] = arr[i][j-1],arr[i][j]
    return arr

# 格式化输出
def OutPrint(tempData):
    for arr in tempData:
        print(arr[0],arr[1],arr[2])
    print()

# 定义一个节点类用于存放必要的数据
class Node:
    def __init__(self,data,level,parent):
        self.data=data
        self.level=level
        self.parent = parent


if __name__ == "__main__":
    # 输入数据
    originalData = [list(map(int,input("请输入原始数据：\n").split())), list(map(int,input().split())), list(map(int,input().split()))]
    targetArray = [list(map(int,input("请输入变换后数据：\n").split())), list(map(int,input().split())), list(map(int,input().split()))]
    list1 = []
    list2 = []
    # 数组输到list
    for arr in originalData:
        list1.append(arr[0])
        list1.append(arr[1])
        list1.append(arr[2])
    for arr in targetArray:
        list2.append(arr[0])
        list2.append(arr[1])
        list2.append(arr[2])
    cnt1 = 0
    cnt2 = 0
    for i in range(0,9):
        if i == 0:
            continue
        for j in range(i-1,0):
            if i < list1[j]:
                cnt1 = cnt1 + 1
    for i in range(0,9):
        if i == 0:
            continue
        for j in range(i-1,0):
            if i < list2[j]:
                cnt2 = cnt2 + 1
    if cnt1%2 != cnt2%2:
        print("E0: 输入有误！问题无解")
        exit(0)
    list1.sort()
    list2.sort()
    for i in range (0, 9):
        if list1[i] != list2[i]:
            print("E1: 输入有误！请检查输入")
            exit(0)
    Node0 = Node(originalData,0,"None")
    deep_level = int(input("请输入搜索深度："))
    open_ = [Node0]
    close = []
    step = 0
    steps = 0
    start = datetime.now()
    while len(open_) > 0:
        step = step + 1
        n = open_.pop(0)
        close.append(n)
        # 找到结果，则输出其最优路径
        if n.data == targetArray:
            print('搜索完毕！步骤为：')
            result = []
            result.append(n)
            while n.parent!="None":
                result.append(n.parent)
                n = n.parent
            steps = len(result)-1
            for j in range(len(result)):
                result_0 = result.pop(-1)
                OutPrint(result_0.data)
            break
        else:
            if n.level<=int(deep_level):
                local(n.data)
                Up = ToUp(n.data)
                if Up not in [open_[i].data for i in range(len(open_))] and Up not in [close[i].data for i in range(len(close))] and Up is not None:
                    Node0 = Node(Up,n.level+1,n)
                    open_.insert(0,Node0)

                Down = ToDown(n.data)
                if Down not in [open_[i].data for i in range(len(open_))] and Down not in [close[i].data for i in range(len(close))] and Down is not None:
                    Node0 = Node(Down,n.level+1,n)
                    open_.insert(0,Node0)

                Left = ToLeft(n.data)
                if Left not in [open_[i].data for i in range(len(open_))] and Left not in [close[i].data for i in range(len(close))] and Left is not None:
                    Node0 = Node(Left,n.level+1,n)
                    open_.insert(0,Node0)

                Right = ToRight(n.data)
                if Right not in [open_[i].data for i in range(len(open_))] and Right not in [close[i].data for i in range(len(close))] and Right is not None:
                    Node0 = Node(Right,n.level+1,n)
                    open_.insert(0,Node0)         
    end = datetime.now()
    print(steps,'步，搜索用时：', end - start)
```

#### Python运行结果

请输入原始数据：
1 2 3
0 4 5
6 7 8
请输入变换后数据：
0 2 3
1 7 5
4 6 8
请输入搜索深度：6
搜索完毕！步骤为：
1 2 3
0 4 5
6 7 8

1 2 3
4 0 5
6 7 8

1 2 3
4 7 5
6 0 8

1 2 3
4 7 5
0 6 8

1 2 3
0 7 5
4 6 8

0 2 3
1 7 5
4 6 8

5 步，搜索用时： 0:00:00.004012

* * *

### 启发式搜索

#### C++

```
/*
 * @Author: 转接
 * @Date: 2022-03-12 20:31:24
 * @LastEditors: 转接
 * @LastEditTime: 2022-03-13 19:01:10
 * @Description: 八数码问题启发式搜索
 */

#include <iostream>
#include <stack>
#include <time.h>

// 创建链表
typedef struct Data{
    int data[9]; // 存放数据
    int value; // 存f(n)
    int step; // 记录步数
    int lastAction; // 上一步操作 上 下 左 右 1 2 3 4
    Data *next; // 链表中下一个结点
    Data *last; // 操作图中对应的上一个结点
}Data, *DataList;

int tempPosition[9][2] = { // 位置 上下左右 
    {0, 5}, // 0号位 0 1 0 1 = 5
    {1, 7}, // 1号位 0 1 1 1 = 7
    {2, 6}, // 2号位 0 1 1 0 = 6
    {3, 13}, // 3号位 1 1 0 1 = 13
    {4, 15}, // 4号位 1 1 1 1 = 15
    {5, 14}, // 5号位 1 1 1 0 = 14
    {6, 9}, // 6号位 1 0 0 1 = 9
    {7, 11}, // 7号位 1 0 1 1 = 11
    {8, 10}, // 8号位 1 0 1 0 = 10
};

int distance[9][9] = { // 位置 上下左右 
    {0, 1, 2, 1, 2, 3, 2, 3, 4},
    {1, 0, 1, 2, 1, 2, 3, 2, 3},
    {2, 1, 0, 3, 2, 1, 4, 3, 2},
    {1, 2, 3, 0, 1, 2, 1, 2, 3},
    {2, 1, 2, 1, 0, 1, 2, 1, 2},
    {3, 2, 1, 2, 1, 0, 3, 2, 1},
    {2, 3, 4, 1, 2, 3, 0, 1, 2}, 
    {3, 2, 3, 2, 1, 2, 1, 0, 1},
    {4, 3, 2, 3, 2, 1, 2, 1, 0}, 
};

int GetNextAction(Data data){
    int *temp = data.data;
    int i = 0;
    for(i = 0; i < 9; i++){
        if(temp[i] == 0){
            break;
        }
    }
    int tp = tempPosition[i][1];
    int last = data.lastAction;
    if(last == 1){ // 上一步向上移动
        tp = tp - 4; // 不让其向下移动
    }else if(last == 2){ // 上一步向下移动
        tp = tp - 8; // 不让其向上移动
    }else if(last == 3){ // 上一步向左移动
        tp = tp - 1; // 不让其向右移动
    }else if(last == 4){ // 上一步向右移动
        tp = tp - 2; // 不让其向左移动
    }
    return tp;
}

int Judge(int *arr1, int *arr2){
    for(int i = 0; i < 9; i++){
        if(arr1[i] != arr2[i]){
            return 0;
        }
    }
    return 1;
}

void Print(Data data){
    for(int i = 0; i < 3; i++){
        for(int j = 0; j < 3; j++){
            std::cout << data.data[i * 3 + j] << " ";
        }
        std::cout << std::endl;
    }
    std::cout << std::endl;
}

// 初始化链表
void InitList(DataList &head){
    head = (Data *)malloc(sizeof(Data));
    head->lastAction = 0;
    head->next = NULL;
    head->last = NULL;
}

int Gn(int *arr){
    int sum = 0;
    for(int i = 0; i < 9; i++){
        sum += distance[arr[i]][i];
    }
    return sum;
}

// 按照f(n)值的大小插入链表 链表 数组 价值 上一步操作
void InsertList(DataList &head, int *arr, int value, int lastAction){
    Data *temp = head;
    Data *newNode = (Data *)malloc(sizeof(Data));

    for(int i = 0; i < 9; i++){
        newNode->data[i] = arr[i];
    }
    newNode->value = value;
    newNode->step = head->step + 1;
    newNode->next = NULL;
    newNode->last = head;
    // if(lastAction == 0){
    //     newNode->last = NULL;
    // }
    while(temp->next != NULL){
        if(temp->next->value < value){
            temp = temp->next;
        }else{
            break;
        }
    }
    newNode->next = temp->next;
    temp->next = newNode;
}

int main(){
    int *originalData = new int[9];
    int *targetArray = new int[9];
    int *arraytest1 = new int[9];
    int *arraytest2 = new int[9];
    std::cout << "请输入原始数据：" << std::endl;
    for(int i = 0; i < 9; i++){
        std::cin >> originalData[i];
    }
    std::cout << "请输入变换后数据：" << std::endl;
    for(int i = 0; i < 9; i++){
        std::cin >> targetArray[i];
    }
    // 复制数组到arraytest
    for(int i = 0; i < 9; i++){
        arraytest1[i] = originalData[i];
        arraytest2[i] = targetArray[i];
    }
    // 判断问题是否有解
    int cnt1 = 0, cnt2 = 0;
    for(int i = 0; i < 9; i++){
        if(arraytest1[i] == 0){
            continue;
        }
        for(int j = i - 1; j >= 0; j--){
            if(arraytest1[j] > arraytest1[i]){
                cnt1++;
            }
        }
    }
    for(int i = 0; i < 9; i++){
        if(arraytest2[i] == 0){
            continue;
        }
        for(int j = i - 1; j >= 0; j--){
            if(arraytest2[j] > arraytest2[i]){
                cnt2++;
            }
        }
    }
    if(cnt1%2 != cnt2%2){
        std::cout << "E0: 输入有误！问题无解" << std::endl;
        return 0;
    }
    // 排序
    for(int i = 0; i < 9; i++){
        for(int j = 0; j < 9; j++){
            if(arraytest1[i] < arraytest1[j]){
                int temp = arraytest1[i];
                arraytest1[i] = arraytest1[j];
                arraytest1[j] = temp;
            }
        }
    }
    for(int i = 0; i < 9; i++){
        for(int j = 0; j < 9; j++){
            if(arraytest2[i] < arraytest2[j]){
                int temp = arraytest2[i];
                arraytest2[i] = arraytest2[j];
                arraytest2[j] = temp;
            }
        }
    }
    //判断排序后的数组是否相等
    for(int i = 0; i < 9; i++){
        if(arraytest1[i] != arraytest2[i]){
            std::cout << "E1: 输入有误！请检查输入" << std::endl;
            return 0;
        }
    }
    delete[] arraytest1;
    delete[] arraytest2;
    clock_t start, finish;
double Total_time;
    start = clock();
    DataList head; // 定义链表存放数据
    InitList(head);  // 初始化链表 即创建头节点
    head->step = -1;
    DataList temp = head;
    InsertList(head, originalData, Gn(originalData), 0); // 将原始数据结点存放到头节点后的数据区域
    while(true){
        temp = temp->next;
        if(Judge(targetArray, temp->data)){
            std::cout << "找到了！需要" << temp->step << "步" << std::endl;
            break;
        }
        int i = 0; // 找到空(0)位置
        for(i = 0; i < 9; i++){
            if(temp->data[i] == 0){
                break;
            }
        }
        // int tempArraylist[9];
        // for(int j = 0; j < 9; j++){
        //     tempArraylist[j] = temp->next->data[j];
        // }
        int nextAction = GetNextAction(*temp);
        if(nextAction>=8){
            int arrayList[9];
            for(int j = 0; j < 9; j++){
                arrayList[j] = temp->data[j];
            }
            arrayList[i] = arrayList[i-3];
            arrayList[i-3] = 0;
            InsertList(temp, arrayList, Gn(arrayList)+temp->step, 1);
        }
        if(nextAction%8>=4){
            int arrayList[9];
            for(int j = 0; j < 9; j++){
                arrayList[j] = temp->data[j];
            }
            arrayList[i] = arrayList[i+3];
            arrayList[i+3] = 0;
            InsertList(temp, arrayList, Gn(arrayList)+temp->step, 2);
        }
        if(nextAction%8%4>=2){
            int arrayList[9];
            for(int j = 0; j < 9; j++){
                arrayList[j] = temp->data[j];
            }
            arrayList[i] = arrayList[i-1];
            arrayList[i-1] = 0;
            InsertList(temp, arrayList, Gn(arrayList)+temp->step, 3);
        }
        if(nextAction%8>=4){
            int arrayList[9];
            for(int j = 0; j < 9; j++){
                arrayList[j] = temp->data[j];
            }
            arrayList[i] = arrayList[i+1];
            arrayList[i+1] = 0;
            InsertList(temp, arrayList, Gn(arrayList)+temp->step, 4);
        }
    }
    finish = clock();
    std::stack<int *>s;
    int steps = temp->step;
    std::cout << "步骤为：" << std::endl;
    while(temp->last != NULL){
        s.push(temp->data);
        temp = temp->last;
    }
    
    while(!s.empty()){
        int *arr = s.top();
        s.pop();
        for(int i = 0; i < 3; i++){
            for(int j = 0; j < 3; j++){
                std::cout << arr[i * 3 + j] << " ";
            }
            std::cout << std::endl;
        }
        std::cout << std::endl;
    }
    std::cout << steps << "步，搜索用时：" << (double)(finish - start) / CLOCKS_PER_SEC << "s" << std::endl;
    return 0;
}
```

#### C++运行结果

请输入原始数据：
1 2 3
0 4 5
6 7 8
请输入变换后数据：
0 2 3
1 7 5
4 6 8
找到了！需要5步
步骤为：
1 2 3
0 4 5
6 7 8

1 2 3
4 0 5
6 7 8

1 2 3
4 7 5
6 0 8 

1 2 3
4 7 5
0 6 8

1 2 3
0 7 5
4 6 8

0 2 3
1 7 5
4 6 8

5步，搜索用时：0.005s

* * *

## 代码说明

### 判断可移动方向变量：tempPosition

```
int tempPosition[9][2] = { // 位置 上下左右 
    {0, 5},  // 0号位 0 1 0 1 = 5
    {1, 7},  // 1号位 0 1 1 1 = 7
    {2, 6},  // 2号位 0 1 1 0 = 6
    {3, 13}, // 3号位 1 1 0 1 = 13
    {4, 15}, // 4号位 1 1 1 1 = 15
    {5, 14}, // 5号位 1 1 1 0 = 14
    {6, 9},  // 6号位 1 0 0 1 = 9
    {7, 11}, // 7号位 1 0 1 1 = 11
    {8, 10}, // 8号位 1 0 1 0 = 10
}; 
```

通过四个二进制数字来表示四个方向移动（交换）的可行性再将二进制数字转换为十进制数字存在二维数组中。通过判断其值来判断能否向指定方向移动。如**能向上**则**tempPosition\[i\]\[1\]>=8**， **能向下**则**tempPosition\[i\]\[1\]%8>=4**， **能向左**则**tempPosition\[i\]\[1\]%8%4>=2**， **能向右**则**tempPosition\[i\]\[1\]%8%4%2>=1**。

* * *

### 判断两个点之间距离变量：distance

```
int distance[9][9] = { // 位置 上下左右 
    {0, 1, 2, 1, 2, 3, 2, 3, 4},
    {1, 0, 1, 2, 1, 2, 3, 2, 3},
    {2, 1, 0, 3, 2, 1, 4, 3, 2},
    {1, 2, 3, 0, 1, 2, 1, 2, 3},
    {2, 1, 2, 1, 0, 1, 2, 1, 2},
    {3, 2, 1, 2, 1, 0, 3, 2, 1},
    {2, 3, 4, 1, 2, 3, 0, 1, 2}, 
    {3, 2, 3, 2, 1, 2, 1, 0, 1},
    {4, 3, 2, 3, 2, 1, 2, 1, 0}, 
};
```

通过**distance\[i\]\[j\]**来表示i号位置和j号位置的距离，进而去计算启发函数中的g(n)。

* * *

### 判断问题是否有解

```
// 判断问题是否有解
    int cnt1 = 0, cnt2 = 0;
    for(int i = 0; i < 9; i++){
        if(arraytest1[i] == 0){
            continue;
        }
        for(int j = i - 1; j >= 0; j--){
            if(arraytest1[j] > arraytest1[i]){
                cnt1++;
            }
        }
    }
    for(int i = 0; i < 9; i++){
        if(arraytest2[i] == 0){
            continue;
        }
        for(int j = i - 1; j >= 0; j--){
            if(arraytest2[j] > arraytest2[i]){
                cnt2++;
            }
        }
    }
    if(cnt1%2 != cnt2%2){
        std::cout << "E0: 输入有误！问题无解" << std::endl;
        return 0;
    }
```

*   逆序：即在某个数字的前面比它大的数字个数。

左右移动，不影响逆序数；上下移动，逆序数加2或者减2。即如果初始状态能通过移动空格(0)来到达移动目标状态，则**初始状态和目标状态的逆序数应该为同奇同偶**。

* * *

### 广度优先代码优化思路 (DBFS)

可以将循环代码优化，使得不仅仅从原始数据广度优先开始搜索，也可以同时从目标数据广度优先进行搜索，能缩短约一半时间（双向广度优先算法DBFS）

![](http://blog.zhuanjie.ltd/wp-content/uploads/2022/03/image.png)

* * *

### 启发式函数 f(n) = g(n) + h(n) 的分析

1.  **g(n)=0**，一种极端情况如果g(n)=0，则只有h(n)起作用，此时A\*演变成贪心算法。
2.  **h(n)=0**，一种极端情况如果h(n)=0，则只有g(n)起作用，此时**A\*演变成Dijkstra算法**，这保证能找到最短路径，但效率不到。
3.  **h(n)<实际代价** 如果h(n)经常都比从n移动到目标的实际代价小（或者相等），则A\*保证**能找到一条最短路径**。**h(n)越小**，A扩展的结点越多，**运行就越慢**。
4.  **h(n)=实际代价** 如果h(n)精确地等于从n移动到目标的实际代价，则A\*将会仅仅寻找最佳路径而不扩展别的任何结点，这会运行得非常快。尽管这不可能在所有情况下发生，你仍可以在一些特殊情况下让它们精确地相等（指让h(n)精确地等于实际代价）。只要提供完美的信息，A\*就会运行得很完美。
5.  **h(n)>实际代价** 如果h(n)有时比从n移动到目标的实际代价大，则A\***不能保证找到一条最短路径**，但它**运行得更快**。
6.  **h(n)>>实际代价**，即**h(n)>>g(n)**，则只有h(n)起作用，**A\*演变成BFS算法**。