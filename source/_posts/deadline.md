---
title: 算法分析与设计大作业——截止日期
tags: []
id: '48'
categories:
  - - C
  - - C++
  - - JAVA
  - - 算法
date: 2021-05-20 06:11:00
---

## **问题描述：**

某学科老师布置了n个题目，每个题目都有相应的分数及截止日期。各个题目的分数及截止日期可能并不相同。对某题目而言，如果在该题目的截止日期前完成则可获得对应的分数，否则无法得分。假设每个题目均需要花费一天的时间来完成，这期间无法完成其他题目。请你设计算法指定题目的完成计划，从而使总的得分最大。 下面给出一个包含了7个题目及相应的分数、截止日期的实例：  

题目

1

2

3

4

5

6

7

分数

6

7

2

1

4

5

1

截止日期（天）

1

1

3

3

2

2

4

对该实例而言，得分最大的作业完成方案为花费4天时间依次完成题目2,6,3,7。得分为15。

【输入形式】  
输入数据第一行为一个整数n (0 <= n <= 10000), 表示题目数目 之后n行各有两个整数, 第i行为 pi, di (1 <= pi, di <= 10000)，分别表示第i个题目的分数和截止时间  
【输出形式】  
一个整数, 为当前条件下的最大得分  
【样例输入】  
4  
50 2  
10 1  
20 2  
30 1  
【样例输出】  
80

## **分析**

本题适合用贪心算法来求解，先按照任务价值从大到小排序，然后依次取出后对任务进行判断。如果取出任务截至当天未被占用，则将该任务价值加入总价值后将当天标记为占用。如果之前判断的时间被占用，则往前推算一天后再进行判断。

## **伪代码**

```
对于i = 0 ~ n{
如果任务i截止日期当天没有被占用{
结果加上第i个任务的分数
任务i截止日期当天标记为已被占用;
}
如果任务截止日期当天被占用{
对于j = 任务i截止日期-1 ~ 0){
如果第j天被占用{
结果加上第i个任务的分数
第j天标记为已被占用
跳出循环
}
}
}

```

## **代码（JAVA1）**

### deadline类：

```
public class deadline {
int score;
int day;
public deadline(int score,int day) {
this.score = score;
this.day = day;
}
public int getScore() {
return score;
}
}

```

### test类：

```
import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

public class test{
public static void Sort(deadline[] overdays) {
Arrays.sort(overdays, new Comparator<deadline>() {
   public int compare(deadline o1, deadline o2) {
    return (int) (o2.getScore() - o1.score);
   }
  });
}
public static void main(String args[]) {
int n,a,b,number=0,count=0;
Scanner input = new Scanner(System.in);
n=input.nextInt();
if(n==0){
System.out.println("0");

}
deadline[] overdays = new deadline[n];
for (int i=0;i<n;i++){
overdays[i]=new deadline(input.nextInt(),input.nextInt());
}
input.close();
Sort(overdays);
int max=overdays[0].day;
for (int i=1;i<n;i++){
if(max<overdays[i].day)
max=overdays[i].day;
}
int[] days = new int[max+1];
for (int i=0;i <= max;i++)
days[i]=1;
for (int i=0;i<n;i++){
if(days[overdays[i].day]==1){
number+=overdays[i].score;
days[overdays[i].day]=0;
}
else{
for(int j=overdays[i].day-1;j>0;j--){
if(days[j]==1)
{
number+=overdays[i].score;
days[j]=0;
break;
}
}
}
}
System.out.println(number);
}
}

```

## 代码（JAVA2）

```
import java.util.Scanner;

public class deadline {
public static int maxinarr(int[] a,int len) {
int max = a[0];
for(int i=0;i<len;i++){
if(max<a[i])
max = a[i];
}
return max;
}
public static void swaparr(int a[], int b[], int len) {
int k;
for(int i=0;i<len;i++){
for(int j=0;j<len-1;j++){
if(a[j]<a[j+1]){
k=a[j];
a[j]=a[j+1];
a[j+1]=k;
k=b[j];
b[j]=b[j+1];
b[j+1]=k;
}
}
}
}
public static boolean judge(int day[], int data[], int n) {
boolean ret = false;
for(int i=data[n]-1;i>=0;i--){
if(day[i]==0){
day[i]=1;
ret = true;
break;
}
}
return ret;
}
public static void main(String[] args) {
int n;
Scanner input = new Scanner(System.in);
n = input.nextInt();
int[] score = new int[n];//成绩 
int[] data = new int[n];//截止日期 
for(int i=0;i<n;i++){
score[i] = input.nextInt();
data[i] = input.nextInt();
}
input.close();
swaparr(score, data, n);
int a=maxinarr(data,n); 
int allscore=0;
int[] day = new int[a];//每天任务情况
for(int i=0;i<a;i++){
day[i]=0;
}

for(int i=0;i<n;i++){
if(judge(day,data,i)){
allscore += score[i];
a--;
if(a==-1)
break;
}
}
System.out.println(allscore);
}
}
```

## 代码（C++1）

```
#include<iostream> 
using namespace std;

//定义结构体用来存放题目分数及截止日期
struct sdata{
int score;
int deadline;
};

//用来给结构体内数据按照成绩排序 
void arrSort(sdata* pData, int length){
sdata temp;
for (int i = 0; i < length; i++){
for (int j = 0; j < length-1; j++){
if (pData[j].score < pData[j+1].score){
   temp = pData[j];
   pData[j] = pData[j+1];
   pData[j+1] = temp;
  }
 }
}
}
 
int main(){
int n,a,b;
int answer = 0;
int x = 0;

cin >> n;
//输入值n总天数如果为0则不需要计算 
if(n==0){
cout << "0";
return 0;
}
sdata *Data = new sdata[n];
for (int i = 0; i < n; i++){
cin >> a;
cin >> b;
//如果题目分数或者截止日期存在0，则该条数据无效 
if(a*b==0){
x++;
continue;
}
Data[i].score=a; Data[i].deadline=b;
}
n -= x;

//排序 
arrSort(Data, n);
//寻需要最大时间的任务的天数max 
int max=Data[0].deadline;
for (int i = 1; i < n; i++){
if(max<Data[i].deadline)
max=Data[i].deadline;
}

//根据max定义并且初始化时间表 
int schedule[max+1]; 
for (int i = 0; i <= max; i++)
schedule[i]=1;

//计算过程（根据分数从大到小遍历每个任务） 
for (int i = 0; i < n; i++){
//如果任务截止日期当天没有被占用 
if(schedule[Data[i].deadline]==1){
answer += Data[i].score;
schedule[Data[i].deadline]=0;
}
//如果任务截止日期当天被占用
else{
for(int j=Data[i].deadline-1;j>0;j--){
if(schedule[j]==1){
answer+=Data[i].score;
schedule[j]=0;
break;
}
}
}

}
cout << answer;
return 0;
}

```

## 代码（C++2）

```
#include <iostream>

using namespace std;

//将两个数组按照前面数组的降序排列(数组a，数组b，数组长度len)
void swaparr(int a[], int b[], int len){
for(int i=0;i<len;i++){
for(int j=0;j<len-1;j++){
if(a[j]<a[j+1]){
swap(a[j],a[j+1]);
swap(b[j],b[j+1]);
}
}
}
}

//寻找数组中数字最大值(数组a，数组a长度len) 
int maxinarr(int a[],int len){
int max = a[0];
for(int i=0;i<len;i++){
if(max<a[i])
max = a[i];
}
return max;
} 

bool judge(int day[], int data[], int n){
bool ret=0;
for(int i=data[n]-1;i>=0;i--){
if(day[i]==0){
day[i]=1;
ret = 1;
break;
}
}
return ret;
}

int main(){
int n;
cin >> n;
int score[n];//成绩 
int data[n];//截止日期 
for(int i=0;i<n;i++){
cin >> score[i];
cin >> data[i];
}
swaparr(score, data, n);
int a=maxinarr(data,n); 
int allscore=0;
int day[a];//每天任务情况
for(int i=0;i<a;i++){
day[i]=0;
}

for(int i=0;i<n;i++){
if(judge(day,data,i)){
allscore += score[i];
a--;
if(a==-1)
break;
}
}
cout << allscore;
return 0; 
}

```

## **算法正确性分析**

本算法对规定范围下不同的输入数据能够得出满足要求的结构，对于精心选择的典型、苛刻而带有刁难性的输入数据能够得出满足要求的结果，对于一切合法的输入数据都产生满足要求的结果。  
对于核心算法，先按照任务价值从大到小排序，然后依次取出后对任务进行判断。如果取出任务截至当天未被占用，则将该任务价值加入总价值后将当天标记为占用。如果取出任务截止当天被占用，则往前推算一天进行判断。

## **总结**

本题采用贪心算法，通过这次学习，我了解到贪心算法需要建立数学模型来描述问题；把求解的问题分成若干个子问题；对每一子问题求解，得到子问题的局部最优解；把子问题的解局部最优解合成原来解问题的一个解。解决问题需要从问题的某个初始解出发，采用循环语句，当可以向求解目标前进一步时，就根据局部最优策略，得到一个部分解，缩小问题的范围或规模，最后将所有部分解综合起来，得到问题的最终解。