---
title: JAVA继承问题
tags: []
categories:
  - - JAVA
date: 2023-03-14 00:27:25
---



## 子类拥有父类非private的属性，方法；子类可以拥有自己的属性和方法，即子类可以对父类进行扩展；子类可以用自己的方式实现父类的方法（重定义）。

### 测试代码

```java
public class A {
	int i = 10;
	public void add(){
	    System.out.println("add function in Class A is running...");
		i = i + 2;
		System.out.print("i = " + i);
	}
    public static void main(String []args) {
		A a = new B();
		System.out.println("before running function add: a.i = " + a.i);
    	a.add();
    	System.out.println("after running function add: a.i = " + a.i);
    }
}

class B extends A{
	int i = 20;
	public void add(){
	    System.out.println("add function in Class B is running...");
		i = i + 3;
		System.out.print("i = "+i);
	}
}

```

### 运行结果

```shell
before running function add: a.i = 10
add function in Class B is running...
i = 23after running function add: a.i = 10
```