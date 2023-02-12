---
title: 计算机网络计算UDP校验和
tags: []
id: '182'
categories:
  - - C
  - - 计算机网络
date: 2021-10-19 16:52:38
---

![](http://blog.zhuanjie.ltd/wp-content/uploads/2021/10/image-6.png)

wireshark抓包截图

源IP地址：123.151.78.47(0x7b97, 0x4e2f)

目的IP地址：10.66.149.117(0xa42, 0x9575)

源端口：8000(0x1f40)

目的端口：4006(0xfa6)

UDP长度：39(0x27)

数据：0x023a, 0x2700, 0xcd27, 0x6784, 0xc57e, 0xf400, 0x0000, 0x5ad0, 0xc585, 0xf70f, 0xf03a, 0x71fa, 0x294d, 0xe354, 0x2bdf, 0x0300 校验和：0x9ab9

```
// C语言计算校验和
#include<stdio.h>
unsigned short checksum(unsigned short *buf,int nword){
unsigned long sum;
for(sum=0;nword>0;nword--){
sum += *buf++;
sum = (sum>>16) + (sum&0xffff);
}
return ~sum;
}

int main(){
unsigned short buffer[26] = {
0x7b97, 0x4e2f, // 源IP地址： 123.151.78.47(0x7b97, 0x4e2f)
0x0a42, 0x9575, // 目的IP地址：10.66.149.117(0xa42, 0x9575)
0x0011, 0x0027, // UDP协议字段值17(0x0011) UDP长度： 39(0x27)
0x1f40, 0x0fa6, // 源端口： 8000(0x1f40) 目的端口： 4006(0xfa6)
0x0027, 0x0000, // UDP长度： 39(0x27) 校验和（计算时置0）（0x0000） 
0x023a, 0x2700, // 数据字段，不够位数最后补0 
0xcd27, 0x6784, 
0xc57e, 0xf400, 
0x0000, 0x5ad0, 
0xc585, 0xf70f, 
0xf03a, 0x71fa, 
0x294d, 0xe354, 
0x2bdf, 0x0300};
int n=26;  
unsigned short re_checksum;     
re_checksum=checksum(buffer,n);
printf("%x\t",re_checksum); 
if(re_checksum == 0x9ab9) 
printf("校验和正确!\n"); 
else          
printf("校验和不正确!\n");
} 
```

![](http://blog.zhuanjie.ltd/wp-content/uploads/2021/10/image-8.png)

运行截图