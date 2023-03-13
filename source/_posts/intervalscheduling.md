---
title: 区间调度IntervalScheduling
tags: ["TODO"]
id: '87'
categories:
  - - C++
  - - 算法
date: 2021-05-25 06:11:00
---

## 代码：

```c++
#include <iostream>
#include <vector>

using namespace std;

int _count[100][100]; //构造最优矩阵
int p[100][100];
int numbers[100];
void dp(int start[], int finish[],int TASK_COUNT) {
    for (int len = 2; len <= TASK_COUNT + 2; len++) {
        for (int begin = 0; begin <= TASK_COUNT + 1; begin++) {
            int end = begin + len - 1;
            int max = 0;
            int slice = 0;
            int k;
            for (k = begin + 1; k <= end - 1; k++) {
                if (start[k] >= finish[begin]&&finish[k]<=start[end]) {
                    int temp = _count[begin][k] + _count[k][end] + 1;
                    if (temp > max) {
                        max = temp;
                        slice = k;
                    }
                }
            }
            p[begin][end] = slice;
            _count[begin][end] = max;
        }
    }
}
void printDp( int begin, int end) {
    int pos = p[begin][end];
    if (pos == 0)
        return;
    cout << numbers[pos] << " ";
    printDp(begin, pos);
    printDp(pos, end);
}
int main() {
    vector<int> vfinish;
    vector<int> vstart;
    //插入数组前置数值-1
    vstart.push_back(-1);
    vfinish.push_back(-1);
    int number;
    cout << "请分别输入各个事件的开始跟结束时间：" << endl;
    while (1){
        cin >> number;
        vstart.push_back(number);
        cin >> number;
        vfinish.push_back(number);
        if (cin.get() == '\n')
            break;
    }
    //插入数组后置数值255
    vstart.push_back(255);
    vfinish.push_back(255);
    int *start = new int[vstart.size()];
    if (!vstart.empty())
        memcpy(start, &vstart[0], vstart.size()*sizeof(int));
    int *finish = new int[vfinish.size()];
    if (!vfinish.empty())
        memcpy(finish, &vfinish[0], vfinish.size()*sizeof(int));
    int TASK_COUNT = vstart.size()-2;
    for(int i=0;i<vstart.size();i++)
        numbers[i]=i;
    cout << "图例如下：" << endl; //输出图示
    for (int i = 0; i <= TASK_COUNT; i++) {
        cout << i << ":";
        for (int j = 0; j < start[i]; j++) {
            cout << "  ";
        }
        for (int j = start[i]; j < finish[i]; j++)
            cout << "■";
        cout << endl;
    }
    for(int i=0;i<TASK_COUNT+2;i++){//按照结束时间排序
        for(int j=0;j<TASK_COUNT+1;j++){
            if(finish[j]>finish[j+1]){
                std::swap(finish[j],finish[j+1]);
                std::swap(start[j],start[j+1]);
                std::swap(numbers[j],numbers[j+1]);
            }
        }
    }
    for (int i = 0; i <= TASK_COUNT + 2; i++) {
        for (int j = 0; j <= TASK_COUNT + 2; j++) {
            _count[i][j] = 0;
            p[i][j] = 0;
        }
    }
    dp(start, finish, TASK_COUNT);
    cout << "总共可完成的事件个数为：" << _count[0][TASK_COUNT + 1] << endl;
    cout << "完成的事件为：";
    printDp(0, TASK_COUNT + 1);
    return 0;
}

```

## 总结：

区间调度的实验采用了结束时间先后为顺序排序。按照排序依次比较看事件是否匹配，如果匹配则加入。贪心算法，优先选择最早结束的需求，确保资源尽可能早地被释放，把留下来满足其他需求的时间最大化。具体伪代码如下所示，算法结束后集合A中会保留所有相容请求，A的大小即是最大相容数量。Aijj为Sij最优解，另其中的任务按照结束时间递增排序,令ak是Aij的第一个结束的任务,如果ak=am,则证明成立。否则我们将ak用am替换，则它成为了另一个解A’ij，同样是最优解。所以即将任务以结束时间递增排序，第一个结束的任务一定在最优解中，依次找出子问题中最先结束，且开始时间在前一个解最后一个任务结束之间之后。复杂度为O(n)。同时很容易得出有递归和递推两种形式，一般采用递推。