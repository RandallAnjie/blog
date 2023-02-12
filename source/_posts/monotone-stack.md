---
title: 单调栈的解释及应用
tags: []
id: '386'
categories:
  - - JAVA
  - - 算法
date: 2022-01-15 01:43:03
---

## 单调栈定义

从名字上就听的出来，单调栈中存放的数据应该是有序的，所以单调栈也分为单调递增栈和单调递减栈

单调递增栈：单调递增栈就是从栈底到栈顶数据是从大到小  
单调递减栈：单调递减栈就是从栈底到栈顶数据是从小到大

参考：[\[数据结构\]——单调栈\_lucky52529的博客-CSDN博客\_单调递增栈](https://blog.csdn.net/lucky52529/article/details/89155694)

## 定义简例

假如有一个单调栈（单调递增）现有以下数字：7，3，5，6，10

*   7入栈时（栈空），7入栈，栈内：7
*   3入栈时（3比7小），3入栈，栈内：7，3
*   5入栈时（5比3大，比7小），3弹栈，5入栈，栈内：7，5
*   6入栈时（6比5大，比7小），5弹栈，6入栈，栈内：7，6
*   10入栈时（10比6大，比7大），6弹栈，7弹栈，栈内：10

## 伪代码

定义数组或者栈;
for (遍历原始数据数组)
{
if (栈空  栈顶元素大于等于当前比较元素)
{
入栈;
}
else
{
while (栈不为空 && 栈顶元素小于当前元素)
{
栈顶元素出栈;
更新结果;
}
当前数据入栈;
}
}

## 应用

### 题目

*   小Q在周末的时候和他的小伙伴来到大城市逛街，一条步行街上有很多高楼，共有n座高楼排成一行。小Q从第一栋一直走到了最后一栋，小Q从来都没有见到这么多的楼，所以他想知道他在每栋楼的位置处能看到多少栋楼呢？（当前面的楼的高度大于等于后面的楼时，后面的楼将被挡住）

### 输入样例

*   \[5,3,8,3,2,5\]

### 输出样例

*   \[3,3,5,4,4,4\]

### 样例说明

*   当小Q处于位置3时，他可以向前看到位置2,1处的楼，向后看到位置4,6处的楼，加上第3栋楼，共可看到5栋楼。当小Q处于位置4时，他可以向前看到位置3处的楼，向后看到位置5,6处的楼，加上第4栋楼，共可看到4栋楼。

### 函数代码（利用动态数组ArrayList模拟栈）

```
public static int[] findBuilding (int[] heights) {
int[] number = new int[heights.length];
ArrayList<Integer> LTR = new ArrayList<Integer>(); // 从大到小（从左往右从大到小）
ArrayList<Integer> RTL = new ArrayList<Integer>(); // 从小到大（从右往左从大到小）
for (int i = 0, j = number.length-1; i < number.length; i++,j--) {
// 每次i，j游标指向的是小Q所在的房子的左边的房子或者右边的房子在内的单调栈
// 因为第一次循环的时候是最左边的房子和最右边的房子入栈，所以要先记录左右两边单调栈里的数
// 且最后一次循环不出现问题，LYT单调栈到最右边的时候即不出现最右边的房子为某个房子左边的房子，RTL同理
number[i] += LTR.size();
number[j] += RTL.size();
while (LTR.size()>0 && heights[i]>(int)LTR.get(LTR.size()-1)) {
LTR.remove(LTR.size()-1); // LTR出栈
}
while (RTL.size()>0 && heights[j]>(int)RTL.get(RTL.size()-1)) {
RTL.remove(RTL.size()-1); // RT出栈
}
LTR.add(heights[i]); // LTR入栈
RTL.add(heights[j]); // RTL入栈
}
for (int i = 0; i < number.length; i++) {
number[i] ++;
}
return number;
    }
```

### 更换栈类型函数代码为

```
public static int[] findBuilding (int[] heights) {
int[] number = new int[heights.length];
Stack<Integer> LTR = new Stack<>(); // 从大到小（从左往右从大到小）
Stack<Integer> RTL = new Stack<>(); // 从小到大（从右往左从大到小）
for (int i = 0, j = number.length-1; i < number.length; i++,j--) {
// 每次i，j游标指向的是小Q所在的房子的左边的房子或者右边的房子在内的单调栈
// 因为第一次循环的时候是最左边的房子和最右边的房子入栈，所以要先记录左右两边单调栈里的数
// 且最后一次循环不出现问题，LYT单调栈到最右边的时候即不出现最右边的房子为某个房子左边的房子，RTL同理
number[i] += LTR.size();
number[j] += RTL.size();
while (!LTR.isEmpty() && heights[i]>LTR.peek()) {
LTR.pop(); // LTR出栈
}
while (!RTL.isEmpty() && heights[j]>RTL.peek()) {
RTL.pop(); // RT出栈
}
LTR.push(heights[i]); // LTR入栈
RTL.push(heights[j]); // RTL入栈
}
for (int i = 0; i < number.length; i++) {
number[i] ++;
}
return number;
    }
```

## 灵感来源

```
#include <stdio.h>
  
int main() {
    int i,n,j, x[100001],LtoR[100001],RtoL[100001],sum[100001];
    scanf("%d",&n);
    for(i=0;i<n;i++)
    scanf("%d",&x[i]);
    int indl=0,indr=0;
    for(i=0,j=n-1;i<n,j>=0;i++,j--){
    sum[i]+=indl;
    sum[n-i-1]+=indr;
//从左往右遍历（从右往左看）
    while(LtoR[indl-1]<=x[i]&&indl>0){
    indl --;//出栈操作
}
//从右往左遍历（从左往右看）
while(RtoL[indr-1]<=x[j]&&indr>0){
    indr --;//出栈操作
}
    LtoR[indl]=x[i];//入栈
    indl ++;
    RtoL[indr]=x[j];//入栈
    indr ++;
}
//注意加一
for(i=0;i<n-1;i++)
printf("%d ",sum[i]+1);
printf("%d\n",sum[n-1]+1);
    return 0;
}
```

[逛街【 腾讯2020校园招聘-后台&综合-第一次笔试】（单调栈的应用）\_Twinkle\_sone的博客-CSDN博客](https://blog.csdn.net/Twinkle_sone/article/details/104593171)