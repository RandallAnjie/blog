---
title: Linux下C语言进程管理（创建子进程的原理）——操作系统实验2
tags: []
id: '165'
categories:
  - - Linux
  - - 操作系统
date: 2021-10-18 23:19:05
---

## 实验目的

(1)通过实验使学生了解Linux C程序的编译和运行;

(2)掌握fork函数的编程方法;

(3)热悉并发进程的程序的编写。

## 实验预备知识

(1)Linux文本编辑器vi和gedit；

(2)gcc编译器。

## 实验内容

1 父进程创建子进程 1)父进程显示“11111” 2)子进程显示“22222” 3）多次执行该程序观察结果。

2 父进程创建子进程 1)父进程显示“I am parent\\n”5次，每次输出后使用sleep(1)延时1秒，然后再进入下次循环。 2)子进程显示“I am child\\n”5次，每次输出后使用 sleep(1)延时1秒，然后再进入下次循环。

3.进程家族树：在原程序中连续使用4个fork()，然后输出 字母“A”。观察并分析输出结果。

## 实验步骤

1.先打开终端输入

```
$ sudo apt-get install gcc
```

安装C、C++编译器gcc

2.编写代码，在代码所在文件夹下打开终端，运行

```
$ gcc C语言源文件文件名 -o 输出文件名
$ ./输出文件名
```

编译运行C语言文件

## 代码

### E2-3-1.c

```
#include <unistd.h>
#include <stdio.h>

int main ()
{
    int pid = fork();
    if (pid < 0) {
        printf("Error in fork!");
    } else if (pid == 0) {
        printf("子进程:\n22222\npid:%d \n",getpid());
    } else {
        printf("父进程:\n11111\npid:%d \n",getpid());
    }
    return 0;
}
```

### E2-3-2.c

```
#include <unistd.h>
#include <stdio.h>

int main ()
{
    int pid = fork();
    if (pid < 0) {
        printf("Error in fork!");
    } else if (pid == 0) {
        for(int i=0; i < 5; i++){
            printf("I am child.\n");
            sleep(1);
        }
    } else {
        for(int i=0; i < 5; i++){
            printf("I am parent.\n");
            sleep(1);
        }
    }
    return 0;
}
```

### E2-3-3.c

```

#include <unistd.h>
#include <stdio.h>

int main ()
{
    int pid1 = fork();
    if (pid1 < 0) {
        printf("Error in fork!");
    } else if (pid1 == 0) {
        printf("A\n");
        int pid2 = fork();
        if (pid2 < 0) {
            printf("Error in fork!");
        } else if (pid2 == 0) {
            printf("A\n");
            int pid3 = fork();
            if (pid3 < 0) {
                printf("Error in fork!");
            } else if (pid3 == 0) {
                printf("A\n");
                int pid4 = fork();
                if (pid4 < 0) {
                    printf("Error in fork!");
                } else if (pid4 == 0) {
                    printf("A\n");
                } else {
                    printf("A\n");
                }
            } else {
                printf("A\n");
            }
        } else {
            printf("A\n");
        }
    } else {
        printf("A\n");
    }
    return 0;
}
```

## 截图

![](http://blog.zhuanjie.ltd/img/uploads/2021/10/q-3.png)

E2-3-1.c编译运行截图

![](http://blog.zhuanjie.ltd/img/uploads/2021/10/w.png)

E2-3-2.c编译运行截图

![](http://blog.zhuanjie.ltd/img/uploads/2021/10/image-9.png)

E2-3-3.c编译运行截图

## 进程创建方法与创建进程数

fork()函数的原理：以当前进程作为父进程创建出一个新的子进程，并且将父进程的所有资源拷贝给子进程，这样子进程作为父进程的一个副本存在。父子进程几乎时完全相同的，但也有不同的如父子进程ID不同。即为创建一个新的进程里面从新进程（即fork处）运行，新的进程拷贝原本进程的所有状态（包括变量，输入输出流等），这两个进程有pid不同（原进程大于0，子进程等于0）、 getpid()（该函数返回当前进程的id号）返回值不同；

### 利用循环(for)(循环里无判断)/顺序并列创建进程

循环次数n→进程数n^2（父进程1个+子进程n^2-1个）

#### 示例代码

```
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>


int main()
{
    int pid[3];
    for(int i=0;i<3;i++){
        pid[i]=fork();
    }
    if(pid[0]*pid[1]*pid[2]==0){
        printf("子进程ID=%d\n",getpid());
    }
    printf("父进程ID=%d\n",getpid());
    return 0;
}
```

#### 运行结果

```
randall@ubuntu:~/Desktop$ gcc exper.c
randall@ubuntu:~/Desktop$ ./a.out
父进程ID=2344
randall@ubuntu:~/Desktop$ 子进程ID=2345
父进程ID=2345
子进程ID=2346
子进程ID=2347
父进程ID=2347
父进程ID=2346
子进程ID=2348
子进程ID=2349
父进程ID=2349
子进程ID=2350
父进程ID=2350
父进程ID=2348
子进程ID=2351
父进程ID=2351
```

### 利用循环(for)(循环里有判断)/嵌套创建进程

循环次数n→进程数n+1（父进程1个+子进程n个）

#### 示例代码

```
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>


int main()
{
    int pid[3];
    for(int i=0;i<3;i++){
        pid[i]=fork();
        if(pid[i]>0){// 该处是让子进程去创建子进程，可以把判断条件改成pid[i]==0变成让父进程循环去创建子进程
            break;
        }
    }
    if(pid[0]*pid[1]*pid[2]==0){
        printf("子进程ID=%d\n",getpid());
    }
    printf("父进程ID=%d\n",getpid());
    return 0;
}
```

#### 运行结果

```
randall@ubuntu:~/Desktop$ gcc exper.c
randall@ubuntu:~/Desktop$ ./a.out
父进程ID=2446
randall@ubuntu:~/Desktop$ 子进程ID=2447
父进程ID=2447
子进程ID=2448
父进程ID=2448
子进程ID=2449
父进程ID=2449
```