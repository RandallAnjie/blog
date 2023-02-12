---
title: 关于Linux下软中断通信子进程不输出（接收不到信号问题）
tags: []
id: '274'
categories:
  - - C
  - - Linux
  - - 操作系统
date: 2021-11-05 02:38:09
---

软中断通信的一题：

编写程序：用`fork( )`创建两个子进程，再用系统调用`signal( )`让父进程捕捉键盘上来的中断信号(即按^c键)；捕捉到中断信号后，父进程用系统调用`kill( )`向两个子进程发出信号，子进程捕捉到信号后分别输出下列信息后终止：

```
Child process1 is killed by parent!
Child process2 is killed by parent!
```

父进程等待两个子进程终止后，输出如下的信息后终止：

```
Parent process is killed!
```

编译运行后发现如果不在父进程添加`sleep()`就会导致子进程无法输出：

我用输出不同数字夹在进程通信的代码周围：

```
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <sys/types.h>
#include <sys/wait.h>

int flag_signal=1;
void int_func(int sig){
    flag_signal=0;
}

int main (){
    int pid1 = fork();
    if (pid1 < 0) {
        printf("Error in fork!");
    } else if (pid1 == 0) {
        printf("4\n");
        signal(SIGUSR1,int_func);
        printf("5\n");
        while(flag_signal==1){sleep(1);}
        printf("Child progress 1 is killed by parent!\n");
        exit(0);
    } else {
        int pid2 = fork();
        if (pid2 < 0) {
            printf("Error in fork!");
        } else if (pid2 == 0) {
            printf("6\n");
            signal(SIGUSR2,int_func);
            printf("7\n");
            while(flag_signal==1){sleep(1);}
            printf("Child progress 2 is killed by parent!\n");
            exit(0);
        } else {
            sleep(1);
            printf("1\n");
            kill(pid1,SIGUSR1);
            printf("2\n");
            kill(pid2,SIGUSR2);
            printf("3\n");
            wait(0);
            wait(0);
            printf("Parent progress is killed!\n");
        }
    }
    return 0;
}
```

此时输出是：

```
randall@ubuntu:~/Desktop$ gcc helloword.c
randall@ubuntu:~/Desktop$ ./a.out
4
5
6
7
1
2
3
Child progress 1 is killed by parent!
Child progress 2 is killed by parent!
Parent progress is killed!
randall@ubuntu:~/Desktop$ 
```

去掉`sleep(1)`;后输出变成了

```
randall@ubuntu:~/Desktop$ gcc helloword.c
randall@ubuntu:~/Desktop$ ./a.out
1
4
2
3
Parent progress is killed!
randall@ubuntu:~/Desktop$ 
```

可以看出没有加`sleep()`的时候根本没有运行到子进程

原因：没有使主线程`sleep`会导致主线程优先运行，主线程运行完了kill指令，发送信号给了子线程，但是子线程没有加载到`signal`命令，把主线程丢给子线程的信号抛弃，最后子线程随着主线程关闭关闭导致不输出子线程的数据。