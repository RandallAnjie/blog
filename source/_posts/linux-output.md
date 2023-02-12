---
title: 关于Linux下子进程输出问题
tags: []
id: '193'
categories:
  - - C
  - - Linux
  - - 操作系统
date: 2021-10-22 01:28:44
---

子进程输出的个数跟是否换行有关？

```
printf("before fork with  换行符\n");  
printf("before fork without换行符");  
pid = fork();
if(pid == 0){　　//子进程
　　printf("I am is  child process,pid=%d\n",getpid());   
　　printf("my parentprocess's pid=%d\n",getppid()); 
}else if(pid > 0){　　//父进程
　　printf("this is parentprocess,pid=%d\n",getpid()); 
}
```

执行结果如下：

```
　　before fork with  换行符
　　before fork without换行符I am is  child process,pid=4123
　　my parentprocess's pid=4000
　　before fork without换行符this is parentprocess,pid=4000
```

问题：两个printf为什么一个打印一次，另外一个打印了两次？

解答： 我们要知道printf函数是有缓冲机制的，类似于我们使用的write函数，但我们将想要的东西输出的时候，系统仅仅是把内容放到stdout标准输出的缓冲队列的。当遇到“\\n”的时候，系统就把缓冲里的东西给清掉，输出到屏幕上。执行后，缓冲里没有了数据，自然子进程再次执行的时候没有内容可输出了。但是printf("before fork without换行符");的时候，子进程也会把stdout的内容再次输出来。也就是导致了内容出处了两边。