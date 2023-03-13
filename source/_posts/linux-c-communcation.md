---
title: Linux下C语言进程间通信——创建共享区
tags: []
id: '286'
categories:
  - - C
  - - Linux
  - - 操作系统
date: 2021-11-11 23:49:19
---

与信号量一样，在Linux中也提供了一组函数接口用于使用共享内存，而且使用共享共存的接口还与信号量的非常相似，而且比使用信号量的接口来得简单。它们声明在头文件 sys/shm.h 中。

## **shmget()函数**

int shmget(key\_t key, size\_t size, int shmflg);

第一个参数为共享内存段命名，需要提供一个参数key（非0整数），shmget()函数成功时返回一个与key相关的共享内存标识符（非负整数），用于后续的共享内存函数。调用**失败返回-1**。设置**参数为IPC\_PRIVATE时，每次都创建新的共享区**，通常在父进程创建，子进程获取共享区内容。参数为数值时候，会创建固定共享区。

第二个参数，size以字节为单位指定需要共享的内存容量

第三个参数，shmflg是权限标志，它的作用与open函数的mode参数一样，如果要想在key标识的共享内存不存在时，创建它的话，可以与IPC\_CREAT做或操作。共享内存的权限标志与文件的读写权限一样，举例来说，0644,它表示允许一个进程创建的共享内存被内存创建者所拥有的进程向共享内存读取和写入数据，同时其他用户创建的进程只能读取共享内存。

```shell
-rw------- (600)    只有拥有者有读写权限。
-rw-r--r-- (644)    只有拥有者有读写权限；而属组用户和其他用户只有读权限。
-rwx------ (700)    只有拥有者有读、写、执行权限。
-rwxr-xr-x (755)    拥有者有读、写、执行权限；而属组用户和其他用户只有读、执行权限。
-rwx--x--x (711)    拥有者有读、写、执行权限；而属组用户和其他用户只有执行权限。
-rw-rw-rw- (666)    所有用户都有文件读、写权限。
-rwxrwxrwx (777)    所有用户都有读、写、执行权限。
```

## **shmat()函数    -- at：attach**

`void \*shmat(int shm\_id, const void \*shm\_addr, int shmflg);`

第一次创建完共享内存时，它还不能被任何进程访问，shmat()函数的作用就是用来启动对该共享内存的访问，并把共享内存连接到当前进程的地址空间。

第一个参数，shm\_id是由shmget()函数返回的共享内存标识。

第二个参数，shm\_addr指定共享内存连接到当前进程中的地址位置，通常为空，表示让系统来选择共享内存的地址。

第三个参数，shm\_flg是一组标志位，通常为0。

调用成功时返回一个指向共享内存第一个字节的指针，如果调用失败返回-1。

## **shmdt()函数    -- dt：detach**

`int shmdt(const void \*shmaddr);`

该函数用于将共享内存从当前进程中分离。注意，将共享内存分离并不是删除它，只是使该共享内存对当前进程不再可用。

参数shmaddr是shmat()函数返回的地址指针，调用成功时返回0，失败时返回-1。

## **shmctl()函数    -- ctl：control**

`int shmctl(int shm\_id, int command, struct shmid\_ds \*buf);`

与信号量的semctl()函数一样，用来控制共享内存。

第一个参数，shm\_id是shmget()函数返回的共享内存标识符。

第二个参数，command是要采取的操作，它可以取下面的三个值 ：

1.  IPC\_STAT：把shmid\_ds结构中的数据设置为共享内存的当前关联值，即用共享内存的当前关联值覆盖shmid\_ds的值。
2.  IPC\_SET：如果进程有足够的权限，就把共享内存的当前关联值设置为shmid\_ds结构中给出的值
3.  IPC\_RMID：删除共享内存段

第三个参数，buf是一个结构指针，它指向共享内存模式和访问权限的结构。

## 例题

### 题目1：父子进程之间数据交流

创建子进程输入字符串到共享区，在子进程输入end后进入父进程输出共享区内容

代码：

```c
#include <stdio.h>
#include <sys/types.h>
#include <sys/shm.h>
#include <sys/wait.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

int main(){
    int shmid;
    char *p, *q;
    char buffer[BUFSIZ];
    int pid;
    // 创建共享区
    shmid=shmget(IPC_PRIVATE,128,IPC_CREAT  0666); // 成功创建值>0
    if(shmid <0){ // 创建失败为-1
        printf("创建共享内存失败\n");
        return -1;
    }
    printf("创建共享内存成功 shmid=%d\n",shmid);
    pid=fork();//创建进程pid
    if(pid==0){//这是子进程
        // 绑定地址p到共享区
        p=(char *)shmat(shmid,0,0);
        if(p==NULL){
            printf("子进程映射失败\n");
            return -2;
        }
        while(1){
            printf("子进程：写入信息：");
            fgets(buffer,128,stdin);
            strcat(p,buffer); 
            if(strncmp(buffer,"end",3)==0){
                break;
            }
        }
        shmdt(p);
        exit(0);
    }else if(pid > 0){// 父进程
        wait(0);
        q=(char *)shmat(shmid,0,0);
        if(q==NULL){
            printf("父进程映射失败\n");
            return -3;
        }
        printf("父进程：读取数据：\n%s",q);
        shmdt(q);
    }
    // 删除共享区
    shmctl(shmid,IPC_RMID,NULL);
    return 0;
}
```

输出：

```shell
randall@ubuntu:~/Desktop/experiment5$ ./E5-3-2.out
创建共享内存成功 shmid=29
子进程：写入信息：1
子进程：写入信息：2
子进程：写入信息：3
子进程：写入信息：randall
子进程：写入信息：end
父进程：读取数据：
1
2
3
randall
end
randall@ubuntu:~/Desktop/experiment5$ 
```

### 题目2：两个程序之间数据交流

在程序shmsnd.c创建共享区然后输入字符串到共享区，再在shmrcv.c输出共享区内容

#### 代码：

##### **shmsnd.c**

```c
#include <stdio.h>
#include <sys/types.h>
#include <sys/shm.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

int main(){
    int shmid;
    char *p;
    char buffer[BUFSIZ];
    shmid=shmget(1234,BUFSIZ,IPC_CREAT  0666);
    if(shmid <0){
        printf("创建共享内存失败\n");
        return -1;
    }
    printf("创建共享内存成功 shmid=%d\n",shmid);
    p=(char *)shmat(shmid,0,0);
    if(p==NULL){
        printf("shmsnd映射失败\n");
        return -2;
    }
    while(1){
        printf("写入信息：");
        fgets(buffer,BUFSIZ,stdin);
        strcat(p,buffer); 
        if(strncmp(buffer,"end",3)==0){
            break;
        }
    }
    shmdt(p);
    return 0;
}
```

##### shmrcv.c

```c

#include <stdio.h>
#include <sys/types.h>
#include <sys/shm.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

int main(){
    int shmid;
    char *q;
    shmid=shmget(1234,BUFSIZ,IPC_CREAT  0644);
    if(shmid <0){
        printf("创建共享内存失败\n");
        return -1;
    }
    printf("创建共享内存成功 shmid=%d\n",shmid);
    q=(char *)shmat(shmid,NULL,0);
    if(q==NULL){
        printf("shmrcv映射失败\n");
        return -3;
    }
    printf("读取共享区数据:\n%s",q);
    shmdt(q);
    shmctl(shmid,IPC_RMID,NULL);
    return 0;
}
```

#### 输出：

```shell
randall@ubuntu:~/Desktop/experiment5$ ./shmsnd.out
写入信息：1 2 3 4 5
写入信息：randall
写入信息：end
randall@ubuntu:~/Desktop/experiment5$ ./shmrcv.out
读取共享区数据:
1 2 3 4 5
randall
end
randall@ubuntu:~/Desktop/experiment5$ 
```