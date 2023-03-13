---
title: 12届蓝桥杯C++决赛试题
tags: []
id: '113'
categories:
  - - C++
date: 2021-06-06 06:11:00
---

## 1.大写

**题目**

> 给定一个只包含大写字母和小写字母的字符串，请将其中所有的小写字母转换成大写字母后将字符串输出。

**输入**

> 输入一行包含一个字符串。

**输入样例**

> LanQiao

**输出**

> 输出转换成大写后的字符串。

**输出样例**

> LANQIAO

**评测用例规模与约定**

> 对于所有评测用例，字符串的长度不超过100。

**代码**

```c++
#include <iostream>
#include <string.h>
using namespace std;
int main(){
    char s[100];
    fgets(s,100,stdin);
    for(int i=0;i<strlen(s);i++){
        if(s[i]>='a'&&s[i]<='z'){
            s[i]=s[i]-('a'-'A');
        }
    }
    puts(s);
} 
```

## 2.二进制问题

**题目**

小蓝最近在学习二进制。他想知道1到N中有多少个数满足其二进制表示中恰好有K个1。你能帮助他吗?

**输入**

> 输入两个数N，K。N表示从1到N这么多数字，K表示二进制数字中有K个1。

**输入样例**

> 7 2

**输出**

> 输出一个数字，表示从1到N这么多数字的二进制数字中有多少个二进制数字中有K个1.

**输出样例**

> 3

**评测用例规模与约定**

> 对于30%的评测用例，1<N≤ 10^8^,1 <K ≤10。
> 对于60%的评测用例，1≤N≤2×10^9^,1<K ≤30。
> 对于所有评测用例，1≤N≤ 10^18^,1≤K ≤50。

**代码**

```c++
#include <iostream>
#include <math.h>
using namespace std;
long long sheet[10000][10000];

int judge(int n){
    int c;
    for(int i=0;i<=n;i++){
        if(pow(2,i)>=n){
            c=i-1;
            break;
        }
    }
    if(n==1){
        return 1;
    }
    else
        return c;
}

int main(){
    int n,k;
    cin >> n;
    cin >> k;
    int c=judge(n);
    for(int i=0;i<=c;i++){
        for(int j=0;j<=i&&j<=k;j++){
            if(j==0){
                sheet[i][j]=1;
            }
            else if(i==j){
                sheet[i][j]=1;
            }
            else{
                sheet[i][j]=sheet[i-1][j]+sheet[i-1][j-1];
            }
            //cout << sheet[i][j] << " ";
        }
        //cout << endl;
    }
    int sum=sheet[c][k];
    while(n>1&&k>=1){
        n=n-pow(2,c);
        k--;
        c=judge(n);
        sum=sum+sheet[c][k];
    }
    cout << sum;
}
```

## 思路总结：

按照二进制长度（1的二进制长度为1，5的二进制长度为3）为行，二进制数中1的个数为列进行列表，利用动态规划求解。先求出表中右下角值，再在表中找出(N-pow(2,最大列数),k-循环次数)的值相加，最后结果就是总个数。



|      |  0   |  1   |           2            |  3   |  4   | ...  |              K               |
| :--: | :--: | :--: | :--------------------: | :--: | :--: | :--: | :--------------------------: |
|  0   |  1   |      |                        |      |      |      |                              |
|  1   |  1   |  1   |                        |      |      |      |                              |
|  2   |  1   |      |           1            |      |      |      |                              |
|  3   |  1   |      |                        |  1   |      |      |                              |
|  4   |  1   |      | =sheet(3,2)+sheet(3,1) |      |  1   |      |                              |
| ...  |      |      |                        |      |      |      |                              |
|  N   |  1   |      |                        |      |      |      | =sheet(n-1,k)+sheet(n-1,k-1) |

