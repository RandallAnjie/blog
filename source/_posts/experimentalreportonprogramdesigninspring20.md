---
title: 20春小学期程序设计实验报告
tags: []
id: '29'
categories:
  - - C
  - - C++
  - - JAVA
  - - 算法
date: 2020-06-27 06:11:00
---

Experimental report on program design in spring 20

# 1\. 最长公字串

## 题目

编写一个程序，对输入的字符串s和t，求其最长的公共子字符串。输入形式：从屏幕分行读入串s和t。s和t由任意字符构成，长度都不超50个字符。输入数据确保只有唯一的最长公共子串。如果没有公共子串，打印No Answer。

输出形式：在单独行上输出串s和串t的最长公共子串，在结尾输出一个回车符。

## 分析

根据题意，将对应的行内字符串存入对应的数组a，b中，再比较a和b的长度，将较短的信息存入a，较长的存入b中。将a中以依次减少1个长度的原则取出对应的数组存入test数组中，再在b中取出相同长度的数组存入card数组中，比较test和card的区别来判断是否存在最大相同子串，如果相同就输出该子串，并且离开循环。如果最后循环完还未输出就输出No Answer。

## 代码（c）

```
#include<stdio.h>
#include<string.h>
#include<stdlib.h>
char *mystrncpy(char *string, int n){//指向字符串的指针可以改变 
char*p=string;
if(p==NULL){//如果截取的字符串是空的直接返回
return NULL;
}
else{
int i=0;
while(*p!='\0'){//循环直到达n个字符串终止
if(i==n){
break;
}
i++;
p++;
}
*(p++)='\0';//赋值结束字符串
return string;
}
}

int main(){
char a[50],b[50];
char c[50];//中间变量 
int flag=0;
int i,j,k,m,n;
gets(a);//第一行字符串 
gets(b);//第二行字符串 
int lentha=strlen(a);//第一行字符串长度 
int lenthb=strlen(b);//第二行字符串长度 
/*检测输入*/ 
//printf("%s",a); 
//printf("\n-------------------------\n");
//printf("%s",b);
//printf("\n-------------------------\n");
//printf("lentha=%d,lenthb=%d",lentha,lenthb);
//printf("\n-------------------------\n");
/*初处理数据，将短的的数据变到a*/
if(lentha>lenthb){
for(i=0;i<50;i++){
c[i]=a[i];
a[i]=b[i];
b[i]=c[i];
}
i=lentha;
lentha=lenthb;
lenthb=i; 
}
/*初处理检测*/ 
//printf("初处理%s",a); 
//printf("\n-------------------------\n");
//printf("初处理%s",b);
//printf("\n-------------------------\n");
//printf("初处理lentha=%d,lenthb=%d",lentha,lenthb);
//printf("\n-------------------------\n");
/*运算部分*/ 
for(i=lentha;i>0;i--){//从a的最长长度截取，依次减少 
char test[i];//对应a中取得的值 
char card[i];//对应b中取得的值 
for(j=0;j<=lentha-i;j++){
for(k=0;k<i;k++){//将a中对应值覆到test 
test[k]=a[k+j];
}
for(m=0;m<lenthb-i+1;m++){
for(n=0;n<i;n++){//将b中对应值覆到card 
card[n]=b[n+m];
}
int judge=1; 
for(n=0;n<i;n++){//判断card和test是否一致 
if(test[n]!=card[n]){
judge=0;
}
}
if(judge){
printf("%s",mystrncpy(test,i));
flag=1;
}
if(flag){
break; 
}
}
if(flag){
break;
}
}
if(flag){
break;
}
}
if(flag==0){
printf("No Answer"); 
} 
 
}

```

## 总结

本题用到了get();来获取字符串。gets()用于从标准输入流stdin读入一个整行（以bai'\\n'或EOF）结束，写入ptr指向的字符数组，并返回这个指针；出错或遇到文件结束时则返回NULL。行末的'\\n'从流中取出，但不写入数组。gets()不检查被写入的数组大小。程序运用逐个尝试的方法来获取最长公子串。在获取字符串时检查字符串长度，当a的长度大于b的长度时，运用了逐个代换的方法，将a，b中的元素互换位置。

# 2\. CCF 201712-5 商路

## 题目

国王小w总共有八座城市，用1到n的整数编号。除首都1号城市外，每座城市都有唯一的直接上级城市，并有一条道路连接二者，即这些城市和道路构成了一棵有根树。对于城市i，我们记它的直接上级城市为ui，它到该城市道路的长度为si；同时，称i是么ui的直接下级城市。城市i的直接下级城市和直接下级城市的下级城市统称为城市i的下级城市。  
每座城市的长官都想要建立一条由自己管辖的商路。对于城市i的长官，他管辖的商路必须形如a1a2…ak，其中a1=i：对于1≤j<k,aj+1是aj的下级城市：k可以是你指定的正整数。即，一条商路是从城市i出发，依次向下级延伸的一条路径。注意路径只用向下级城市延伸即可，不限定为直接下级。城市i的价值由vi和fi两个参数描述。商路a1a2…ak的总价值为：

![](http://blog.zhuanjie.ltd/img/uploads/2022/02/图片1.png)

其中d(aj.aj+1）是连接aj和aj+1的道路总长度。形象地说，商路的总价值等于每小段的价值之和：vi和fi分别描述了i作为起点的最理想小段价值和最佳的小段长度：小段的价值等于以它们为参数，两座城市距离为自变量的二次函数。  
如有必要，一条商路允许只包含长官所在的那一座城市，即k=1，此时商路的总价值为0。此外，不同城市长官建立的道路之间互相不影响，价值独立计算。  
国王小W希望所有的n条商路的总价值之和最大，他现在请你帮忙。你可以替每座城市的长官决定商路的长度k和路径上除起点之外的城市，问最大的总价值之和是多少。

输入格式  
从标准输入读入数据。  
输入的第一行包含一个正整数个，表示数据的组数。对于测试数据，保证T=10。  
接下来有T个部分，每个部分描述一组数据，其中：  
每个部分第一行包含一个正整数n，表示城市的数量。  
接下米n行，每行包含4个非负整数ui，si,vi,fi，分别表示直接上级城市的编号，连接直接上级城市道路的长度，最理想小段价值和最佳的小段长度。保证：0≤vi≤10^13，0≤fi≤10^9；对于2≤i≤n，保证1≤ui<i,1≤si≤10^4；u1=s1=0，仅占位无实际意义（首都没有上级城市）。

## 分析

根据题意输入的顺序是城市编号的顺序，而城市编号的顺序又直接决定了城市之间的上下级关系。虽然编号小的不一定是大编号的下级，但下级城市的编号一定比上级城市的编号小，如何利用这一点非常重要。假如城市A的下级城市是B,C,D ；那如果B,C,D 本身的商路价值都是最大话之后，A 只能在B,C,D 中挑选一个与之相连，或者不相连，来使自己的商路价值最大话。也就是如果B,C,D的商路价值都是已知的了，那A 的商路价值就都是已知的了。 如此以来，只需要按照逆序从后向前分别计算商路的最大值就可以了。

## 代码（c++）

```
#include<iostream>
#include<algorithm>
#include<bits/stdc++.h>
#include<queue>
using namespace std;
typedef long long ll;
const ll MOD=1e18;
const int N=1e5+10;
ll v[N],f[N],u[N],s[N];
ll ans[N];
int vis[N];
void init()
{
memset(ans,0,sizeof(ans));
memset(vis,0,sizeof(vis));
}
queue<int>q;
int main()
{
int T,n;
scanf("%d",&T);
while(T--)
{
init(); //初始化 
scanf("%d",&n);
for(int i=1;i<=n;i++)
{
scanf("%d%d%d%d",&u[i],&s[i],&v[i],&f[i]);
vis[u[i]]++; //vis数组保存这个点的直接下级数量 
}

for(int i=1;i<=n;i++) //这里类似拓扑排序，直接下级数量为零入队 
if(!vis[i]) q.push(i);
while(!q.empty())
{
int k=q.front();q.pop();
int t=u[k],d=s[k];
vis[t]--;
if(!vis[t]) q.push(t);//直接下级全都处理过了，入队 
while(t) //寻找所有上级，计算上级城市到这里的获利，取最大值 
{
ans[t]=max(ans[t],(ans[k]+v[t]-(f[t]-d)*(f[t]-d))); //ans里保存了以这个城市为开头的商路最大价值 
d+=s[t];
t=u[t];
}
}
ll sum=0;
for(int i=1;i<=n;i++) sum=(sum+ans[i])%MOD; //计算总价值 
printf("%lld\n",sum);
}
return 0;
}
```

## 总结

此程序涉及到了未学过的知识点，了解了拓扑排序。由某个集合上的一个偏序得到该集合上的一个全序，这个操作称之为拓扑排序。

# 3\. Vigenere加密算法

## 题目

单一字母替换密码很容易通过字母频率分析而破解。而一种被称为Vigenere的密码克服了这一缺点，其方法是对于待加密信息中不同位置上的字母应用不同的字母加密对应关系。首先选择一个密钥，例如TIGER，然后，对于待加密信息中的第一个字符，采用如下的字母对应关系加密：上述加密字母表是经过固定移位的字母表，其首字母是T（TIGER的首字母，先是T～Z，然后是A～S）。例如：字母A加密转换成T，字母Q转换成J，不在A～Z之间的字符，不进行转换。对待加密信息中的第二个字符，采用如下的字母对应关系加密：

对于待加密信息的第3个、第4个、第5个字符，分别采用以G、E、R开头的移位字母表对其加密。因为密钥只有5个字母长，所以对于待加密信息中的第6个字符，将采用与第1个字符相同的对应关系加密，以此类推。假定待加密信息中的字母全为大写字母，并且输入的密钥也全为大写字母；密钥长度不超过20，待加密信息不超过200个字符。

输入形式：从标准输入中输入密钥串，然后在下一行输入待加密信息（末尾有回车换行）。

输出形式：加密后结果输出到标准输出（末尾要有回车换行）。

## 分析

由题意，创建两个数组，依次存放密钥跟密文，再利用循环依次获取每一位的加密后的文字并输出。如果不在A~Z之间就直接输出。

## 代码（c）

```
#include<stdio.h>
#include<string.h>
int main(){
char key[20];
char mas[200];
gets(key);
gets(mas);
int i,j;//循环次数标识，i表示加密信息的下标，j表示key的下标 
int lkey=strlen(key);
int lmas=strlen(mas);//获取key和mas的长度，除去'\n' 
for(i=0,j=0;i<lmas;i++,j++){ 
if(j>=lkey){//如果key下标超出最大值，将其初始化为0 
j=0;
} 
if(65>mas[i]mas[i]>90){//如果加密信息不在A~Z之间就直接输出 
printf("%c",mas[i]);
continue;
}
char out=mas[i]+(key[j]-65);//新的加密后信息运算 
if(out>90){
out-=26; 
}
printf("%c",out);
}
}
```

## 总结

本题利用大写字母所对应的ASCII码字母和后移实际上就是ASCII码的后移，超过90的ASCII码就利用判断，将其减少26就在65到90之间了。如果ASCII码不在65~90之间就直接输出。

# 4\. 字符串转换双精度浮点数

## 题目

编写函数atof(s),把字符串s转化成相应的双精度浮点数.输入字符串可能含有如下几部分：正负号，整数部分，小数点，小数部分。该函数还能够处理形如123.45e-5的指数型字符串输入.输入字符串中不含有空格.编写一个程序,使用该函数,将输入的字符串转换成相应的双精度浮点数。

输入形式：控制台输入字符串s.它可以含有正负号,小数点,整数部分和小数部分,以及字符&rsquo;e&rsquo;和相应的指数部分。

输出形式：控制台输出转换后的双精度数.格式化输出,使用"%f",即不需指定字段宽度,由系统自动指定,使整数部分全部如数输出，并保留6位小数部分。

## 分析

根据题意，将字符串存入scr数组中，利用java中的Double.parseDouble()获得double类型数据，然后控制输出位数。

## 代码（Java）

```
import java.util.Scanner;

public class atof {
public static void main(String[] args) {
Scanner inp = new Scanner(System.in);
String scr = inp.next();
inp.close();
double d = Double.parseDouble(scr);
System.out.printf("%.6f",d);
}
}
```

## 总结

该程序将字符串存入scr数组中，利用java中的Double.parseDouble()获得double类型数据d，然后利用System.out.printf("%.6f",d)控制输出位数。

# 5\. 素数判断

## 题目

编写一个函数isprime(n).判断整数n是否为素数.编写程序使用此函数,当输入一个整数时,对它进行判断,当为素数时,输出1.否则,输出0.

输入形式：控制台输入一个整数.

输出形式：控制台输出判断结果0或者1.

## 分析

判断一个数字n是否为素数要用该数字依次除以从2到根号n，一旦有一个可以除尽的数字就不是素数。

## 代码（c）

```
#include<stdio.h>
int isprime(int n){
int i;
int flag=1;
for(i=2;i<n;i++){
if(n%i==0){
flag=0;
break;
}
}
return flag;
}
int main(){
int n;
int m;
scanf("%d",&n);
m=isprime(n);
printf("%d",m);
return 0;
}
```

## 总结

本程序创建isprime()函数，其中参数为数字n，利用循环，将n除以2一直除到根号n，判断是否能除尽，有一个能除尽就返回0，否则返回1。

# 6\. 消除游戏

## 题目

消除类游戏是深受大众欢迎的一种游戏，游戏在一个包含有n行m列的游戏棋盘上进行，棋盘的每一行每一列的方格上放着一个有颜色的棋子，当一行或一列上有连续三个或更多的相同颜色的棋子时，这些棋子都被消除。当有多处可以被消除时，这些地方的棋子将同时被消除。

现在给定一个n行m列的棋盘，棋盘中的每一个方格上有一个棋子（用数字1-9表示各种颜色的棋子），请给出经过消除后的棋盘。

请注意：一个棋子可能在某一行和某一列同时被消除。

输入形式：从标准输入读取数据，第一行包含两个整数n和m，分别表示棋盘的行数和列数（行数和列数都大于等于3，小于等于9），以一个空格分隔这两个整数。

接下来输入n行，每行m个整数，用一个空格分隔各个整数，这些整数分别表示每一个方格中棋子的颜色（大于等于1，小于等于9）。

输出形式：向标准输出上输出n行，每行m个整数，相邻整数之间以一个空格分隔，表示经过消除后的棋盘。如果一个方格中的棋子被消除，则对应的方格输出数字0，否则输出代表原棋子颜色的整数。每行最后一个整数后也要有一个空格。

## 分析

根据题意创建二维数组存放原始数据。将原始数据复制到两个新的数组中，利用循环依次判断行与列该消除的数只需要按行遍历一次，再按列遍历一次，每次只需要判断三个数，就可以解决这个问题。将其变为0，最后合并这两个数组并输出。

## 代码（Java）

```
import java.util.Scanner;

public class exam1 {
static void output(int[][] a, int n, int m) {//输出函数output，参数：数据存放数组a，行n，列m
for (int i = 0; i < n; i++) {
for (int j = 0; j < m; j++) {
System.out.print(a[i][j]);
if (j==m-1) {
break;
}
System.out.print(" ");
}
if (i==n-1) {
break;
}
System.out.println();
}
}
public static void main(String[] args) {
Scanner input = new Scanner(System.in);
int n = input.nextInt();
int m = input.nextInt();
int[][] a = new int[n][m];
for (int i = 0; i < n; i++) {//输入
for (int j = 0; j < m; j++) {
a[i][j] = input.nextInt();
}
}
input.close();
//output(a,n,m);
int[][] row = new int[n][m];//行变换消除后的数据
int[][] col = new int[n][m];//列变换消除后的数据
int[][] fin = new int[n][m];//最终整合的数据
for (int i = 0; i < n; i++) {
for (int j = 0; j < m; j++) {
row[i][j] = a[i][j];
col[i][j] = a[i][j];
fin[i][j] = a[i][j];
}
}
//output(row,n,m);
for (int i = 0; i < n; i++) {//行变换消除数据
for (int j = 0; j < m-2; j++) {
if (a[i][j]==a[i][j+1]&&a[i][j]==a[i][j+2]) {
row[i][j] = 0;
row[i][j+1] = 0;
row[i][j+2] = 0;
}
}
}
//output(row,n,m);
//System.out.println();
//System.out.println();
for (int i = 0; i < m; i++) {
for (int j = 0; j < n-2; j++) {
if (a[j][i]==a[j+1][i]&&a[j][i]==a[j+2][i]) {
col[j][i] = 0;
col[j+1][i] = 0;
col[j+2][i] = 0;
}
}
}
//output(col,n,m);
//System.out.println();
//System.out.println();
for (int i = 0; i < n; i++) {
for (int j = 0; j < m; j++) {
if (row[i][j]==0col[i][j]==0) {
fin[i][j] = 0;
}
}
}
output(fin, n, m);
//System.out.println();
//System.out.println();
//output(a,n,m);
}
}
```

## 总结

本程序要保留下来原始数组，以免判断完行后列的数据不全导致判断错误。我都程序新建了一个output方法，将输出部分区块化方便在代码中间判断输出情况。

# 7\. 合数分解2

## 题目

由数学基本定理可知：任何一个大于1的非素数整数（即合数）都可以唯一分解成若干个素数的乘积。编写程序，从控制台读入一个合数（合数的大小不会超过int数据类型表示的范围），求这个合数可以分解成的多次出现的素数（即出现次数大于1的素数）。例如合数1260分解成素数乘积为：2\*2\*3\*3\*5\*7,2和3出现两次，5和7出现一次，所以求得的结果为2和3。

输入形式：从控制台输入一个合数。

输出形式：在标准输出上按照由小到大的顺序输出分解后的多次出现的素数，各素数之间以一个空格分隔，最后一个素数后也可以有一个空格。若没有多次出现的素数，则什么都不输出。

## 分析

根据题意，应该先判断输入数字num的所有质因子。然后循环将num依次除以从2到num的数字i，如果能整除，i不加1，同时再加入一个循环向其中添加一个参数，多次出现的质因子输出出来。

## 代码（Java）

```
import java.util.Scanner;

public class primes {
public static void main(String[] args) {
Scanner input = new Scanner(System.in);
int num = input.nextInt();
input.close();
for (int i = 2; i < num; i++) {
if (num%i==0) {
for (int j = 0; num%i==0; j++) {
num = num/i;
if (j==1) {
System.out.print(i+" ");
}
}
}
}
}
}
```

## 总结

该程序运用到了两层for循环嵌套，其中里面还有俩if判断，其中参数j在等于1的时候才会输出数字，其意义就是该质因子出现两次的时候会输出，同题目中的意思出现多次时输出一次该数字。

# 8\. 摄氏华氏温度转换

## 题目

假如用C表示摄氏温度，F表示华氏温度，则有：F=C\*9/5+32。输入一整数表示摄氏温度，根据该公式编程求对应的华氏温度，结果小数点后保留一位有效数字。

输入形式：从控制台读入一个整数，表示摄氏温度。

输出形式：向控制台输出转换后的华氏温度，结果小数点后保留一位有效数字。

## 分析

由题意，题目中给出了公式，利用scanf读取数字然后按照题目中的公式计算，然后输出数据即可。

## 代码（c）

```
#include<stdio.h>
int main(){
double m,n;
scanf("%lf",&m);
n=m*9/5+32;
printf("%.1lf",n);
}
```

## 总结

本题程序中，输入的数据m也要变为double以免利用公式运算的时候出现小数部分没有计算入内的情况，输出的保留一位小数利用printf(“%.2lf”)即可完成题目要求。

# 9\. CCF 201612-1 中间数

## 题目

在一个整数序列a1, a2, …, an中，如果存在某个数，大于它的整数数量等于小于它的整数数量，则称其为中间数。在一个序列中，可能存在多个下标不相同的中间数，这些中间数的值是相同的。给定一个整数序列，请找出这个整数序列的中间数的值。

输入形式：输入的第一行包含了一个整数n，表示整数序列中数的个数。第二行包含n个正整数，依次表示a1, a2, …, an。

输出形式：如果约定序列的中间数存在，则输出中间数的值，否则输出-1表示不存在中间数。

## 分析

由题意，由于输入的数据没有排序要求，本题采用暴力法，依次判断每个数字前比它小的数字，每个数字后比他大的数字的个数是否相等。

## 代码（c）

```
#include<stdio.h>
int main(){
int n;
scanf("%d",&n);
int a[n];
int i,j,e,f;
int flag=1;
for(i=0;i<n;i++){
scanf("%d",&a[i]);
}
for(i=0;i<n;i++){
e=0;
f=0;
for(j=0;j<n;j++){
if(a[j]<a[i]){
e++;
}
else if(a[j]>a[i]){
f++;
}
}
if(e==f&&e!=0){
printf("%d",a[i]);
flag=0;
break;
}
}
if(flag){
printf("-1");
}
return 0;
}
```

## 总结

本程序用暴力法依次计算前后大小的数字是否一致，利用flag来表示是否存在这样的数字，如果不存在这样的数字，根据flag等于0会输出-1。

# 10\. 最小素数集

## 题目

由数学基本定理可知：任何一个大于1的非素数整数都可以唯一分解成若干个素数的乘积。编写程序，从控制台读入一组大于1的整数（小于等于20个，且每个整数的大小不会超过int数据类型表示的范围），求这些整数分解成素数的最小集。该最小素数集是所有整数分解成的素数的并集（若输入的整数是素数，则该素数可以直接加入最小素数集），并且重复的素数只保留一个。按从小到大的顺序输出求得的最小素数集。

输入形式：先从控制台输入整数的个数，然后在下一行输入所有整数，各整数之间以一个空格分隔。

输出形式：在标准输出上按从小到大顺序输出求得的最小素数集，各素数之间以一个空格分隔，最后一个整数后也可以有一个空格。

## 分析

根据题意先求出所有的数字的质因子，放在同一个数组里，然后从小到大依次排列，最后在依次输出，每个数字只输出一遍。

代码（Java）

```
import java.util.ArrayList;
import java.util.Scanner;

public class primes {
public static boolean judge(int x) {//判断是否为素数，是素数返回true
boolean flag = true;
for(int i = 2; i <= Math.sqrt((double)x); i++) {
if(x%i==0) {
flag = false;
}
}
return flag;
}
public static int sti(String a) {//string形转int型
int result = 0;
try { 
    result = Integer.parseInt(a); 
} catch (NumberFormatException e) { 
    e.printStackTrace(); 
}
return result;
}
public static void main(String[] args) {
Scanner input = new Scanner(System.in);
int n = input.nextInt();//输入数组个数
int[] a = new int[n];//表示存放数字的数组
ArrayList<String> midarray = new ArrayList<String>();
for (int i = 0; i < a.length; i++) {
a[i] = input.nextInt();

}
for (int i = 0; i < a.length; i++) {
for (int j = 2; j <= a[i]; j++) {
if (judge(a[i])) {
midarray.add(""+a[i]);
break;
}
else {
if(a[i]%j==0) {
for (; a[i]%j==0; ) {
a[i] /= j;
}
midarray.add(""+j);
}
}
}
}
input.close();
int w = 0;
int l = midarray.size();
int[] num = new int[l];
for (int i = 0; i < l; i++) {
num[i] = sti(midarray.get(i));
}
for (int i = 0; i < l; i++) {
for (int j = 0; j < l-1; j++) {
if(num[j]>num[j+1]) {
int k = num[j];
num[j] = num[j+1];
num[j+1] = k;
}
}
}
if (l>2) {
boolean flag = false;
for (int i = 0; i < l-1; i++) {
if (num[i]<num[i+1]) {
w = i+1;
System.out.print(num[i]);
if (i==l-2) {
flag = true;
break;
}
System.out.print(" ");
}
}
if (num[l-1]>num[l-2]) {
if (flag) {
System.out.print(" ");
}
System.out.print(num[l-1]);
}
else if (num[l-1]==num[w]) {
System.out.print(num[w]);
}
}
else if (l==1) {
System.out.print(num[0]);
}
else if (l==2) {
if (num[0]==num[1]) {
System.out.print(num[0]);
}
else {
System.out.print(num[0]+" "+num[1]);
}
}
}

}
```

## 总结

本程序中用judge方法来判断是否为素数，是素数返回true，用sti方法将string形数据转为int型数据。并在输出的时候建立一个标识w，让w称为最后一个数字的初始下标，以免少数出一个数字。

# 11\. 求三角形面积

## 题目

若已知三角形三个边的长度分别为a,b,c（并假设三个边长度的单位一致，在本编程题中忽略其单位），则可以利用公式 求得三角形的面积，其中：s=(a+b+c)/2。编程实现从控制台读入以整数表示的三个边的长度（假设输入的长度肯定可以形成三角形），然后利用上述公式计算面积并输出，结果小数点后保留3位有效数字。

输入形式：从控制台输入三个整数表示三角形三个边的长度，以空格分隔三个整数。

输出形式：向控制台输出求得的三角形的面积，小数点后保留三位有效数字。

## 分析

由题意，题目中给出了公式，利用scanf读取数字然后按照题目中的公式计算，然后输出数据即可。

## 代码（c）

```
#include<stdio.h>
#include<math.h>
int main(){
double a,b,c,p,s;
scanf("%lf %lf %lf",&a,&b,&c);
p=(a+b+c)/2;
s=sqrt(p*(p-a)*(p-b)*(p-c));
printf("%.3lf",s);
} 
```

## 总结

本程序中用p表示半周长，然后根据公式计算得出面积的值，最后利用printf(“%.3lf”)输出保留了小数点后的三位数字。

# 12\. 回文数

## 题目

"回文数"是一种数字。如：98789, 这个数字正读是98789,倒读也是98789,正读倒读一样，所以这个数字就是回文数。编写一个程序，判断给出的数m是否为回文数（m的位数<=1000）。

输入描述：一个整数m

输出描述：如果m是回文数，则输出yes，否则输出no（yes和no均为小写）

## 分析

根据题意，我将输入的数字视为字符串存入数组，然后判断数组实际长度，反过来存到另一个数组里，比较实际长度那么多的字符是否一致即可

代码（c）

```
#include<stdio.h>
#include<string.h>
int main(){
char a[100],b[100];
gets(a);
int lentha=strlen(a);
int i=lentha-1,j;
for(j=0;i>=0;i--){
b[j]=a[i];
j++;
}
int key=1;
for(i=0;i<lentha;i++){
if(a[i]!=b[i]){
key=0;
break;
}
}
if(key){
printf("yes");
}
else{
printf("no");
}
return 0;
}
```

## 总结

本题用到了get();来获取字符串。gets()用于从标准输入流stdin读入一个整行（以bai'\\n'或EOF）结束，写入ptr指向的字符数组，并返回这个指针；出错或遇到文件结束时则返回NULL。行末的'\\n'从流中取出，但不写入数组。gets()不检查被写入的数组大小。利用strlen()判断数组实际长度，然后反向写入另一个数组。依次判断两个数组中的每个数字是否一样，一旦出现一个不一样，将key标记为0。最后根据key输出yes或no。

# 13\. CCF 201703-4 地铁修建

## 题目

A市有n个交通枢纽，其中1号和n号非常重要，为了加强运输能力，A市决定在1号到n号枢纽间修建一条地铁。地铁由很多段隧道组成，每段隧道连接两个交通枢纽。经过勘探，有m段隧道作为候选，两个交通枢纽之间最多只有一条候选的隧道，没有隧道两端连接着同一个交通枢纽。现在有n家隧道施工的公司，每段候选的隧道只能由一个公司施工，每家公司施工需要的天数一致。而每家公司最多只能修建一条候选隧道。所有公司同时开始施工。作为项目负责人，你获得了候选隧道的信息，现在你可以按自己的想法选择一部分隧道进行施工，请问修建整条地铁最少需要多少天。

输入形式：输入的第一行包含两个整数n, m，用一个空格分隔，分别表示交通枢纽的数量和候选隧道的数量。第2行到第m+1行，每行包含三个整数a, b, c，表示枢纽a和枢纽b之间可以修建一条隧道，需要的时间为c天。

输出形式：输出一个整数，修建整条地铁线路最少需要的天数。

## 分析

由题意本体就是最小生成树的题目。

代码（Java）

```
import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.Scanner;

public class subway {
static int[] fathers;
static Comparator<int[]> cmp = new Comparator<int[]>() {
@Override
public int compare(int[] o1, int[] o2) {
return o1[2] - o2[2];
}
};

// 优先队列方法
// 85分，超时
static void MST() {
Scanner scanner = new Scanner(System.in);
int num = scanner.nextInt();
int route = scanner.nextInt();
PriorityQueue<int[]> queue = new PriorityQueue<>(cmp);
// 初始化并查集
fathers = new int[num + 1];
for (int i = 1; i <= num; i++) {
fathers[i] = i;
}
// 读取边
for (int i = 0; i < route; i++) {
int[] arr = new int[3];
for (int j = 0; j < 3; j++) {
arr[j] = scanner.nextInt();
}
queue.add(arr);
}
scanner.close();

// Kruskal算法
for (int i = 0; i < route; i++) {
int[] edges = queue.poll();
int a = edges[0], b = edges[1];
int father_a = findfathers(a);
int father_b = findfathers(b);
if (father_a != father_b) {
fathers[father_a] = father_b;
}
if (findfathers(1) == findfathers(num)) {
System.out.println(edges[2]);
break;
}
}
}


static int findfathers(int child) {
int father = child;
while (fathers[father] != father) {
father = fathers[father];
}
// 路径压缩
int i = child, j;
while (i != father) {
j = fathers[i];
fathers[i] = father;
i = j;
}
return father;
}

public static void main(String[] args) {
MST();
}
}
```

## 总结

利用最小生成树算法。最小生成树性质：设G=(V，E）是一个连通网络，U是顶点集V的一个非空真子集。若(u，v）是G中一条“一个端点在U中（例如：u∈U），另一个端点不在U中的边（例如：v∈V-U），且（u，v）具有最小权值，则一定存在G的一棵最小生成树包括此边（u，v）。

# 14\. CCF 201512-1 数位之和

## 题目

给定一个十进制整数n，输出n的各位数字之和。

输入形式：输入一个整数n。

输出形式：输出一个整数，表示答案。

## 分析

根据题意将数字看成字符串然后根据每个字符串改为数字，最后将所有的数字加在一起能得出答案。

## 代码（c）

```
#include<stdio.h>
#include<string.h>
#define chartonumber(x) (x-'0')
int main(){
char a[10];
fgets(a, 10, stdin);
int sum=0;
int i;
for(i=0;i<strlen(a)-1;i++){
sum+=chartonumber(a[i]);
}
printf("%d",sum);
} 
```

## 总结

本程序用fgets()获取字符，fgets函数功能为从指定的流中读取数据，每次读取一行。其原型为：char \*fgets(char \*str, int n, FILE \*stream);从指定的流 stream 读取一行，并把它存储在 str 所指向的字符串内。当读取 (n-1) 个字符时，或者读取到换行符时，或者到达文件末尾时，它会停止，具体视情况而定。利用宏定义#define chartonumber(x) (x-'0')将char类型数据转换为int类型数据。

# 15\. 逆序乘积式

## 题目

若两个正整数的乘积，等于两正整数各自逆序后的乘积，则称其为逆序乘积式。编写程序读入两个正整数，然后判断这两个正整数能否构成逆序乘积式。假设两个正整数的乘积不会超过int数据类型的表示范围。

输入形式：从控制台输入以一个空格分隔的两个正整数。

输出形式：若两个正整数能够构成逆序乘积式，则输出两个正整数及其逆序的乘积形式，并且中间用一个等号相连；若不能构成逆序乘积式，则输出两个正整数及其逆序的乘积形式，并且中间用一个不等号相连。

注意：输出的字符之间没有空格分隔。若逆序后最高位为0，则为0的最高位不输出。

## 分析

根据题意，本程序结合了将数字反过来读取，和判断乘积是否相等。

## 代码（Java）

```
import java.util.Scanner;

public class exam {
static int changetonumber(String y) {
int result = 0;
try { 
    result = Integer.parseInt(y); 
} catch (NumberFormatException e) { 
    e.printStackTrace(); 
}
return result;
}
public static void main(String[] args) {
boolean flag = true;
Scanner input = new Scanner(System.in);
StringBuilder a = new StringBuilder(input.next());
StringBuilder b = new StringBuilder(input.next());
String sa = ""+a;
String sb = ""+b;
StringBuilder backa = a;
StringBuilder backb = b;
backa.reverse();
backb.reverse();
String sbacka = ""+backa;
String sbackb = ""+backb;
int numa = changetonumber(sa);
int numb = changetonumber(sb);
int numba = changetonumber(sbacka);
int numbb = changetonumber(sbackb);
if (numa*numb==numba*numbb) {
flag = false;
}
input.close();
System.out.print(numa+"*"+numb);
if (flag) {
System.out.print("!");
}
System.out.print("="+numba+"*"+numbb);
}
}
```

## 总结

本程序利用一个changetonumber方法将字符串转换为数字返回，先读取字符串，然后将字符串复制到另一个StringBuilder类型数据里，将其反向，然后利用新建的方法将其转换为数字，最后判断输出结果。