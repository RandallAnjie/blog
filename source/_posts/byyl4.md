---
title: 编译原理实验4
tags: []
id: '661'
categories:
  - - Python
  - - 编译原理
date: 2022-06-11 23:33:27
---

编译器设计与实现

## **实验内容**

定义一个程序设计语言，确定编译器设计方法，构造相应的属性文法。根据属性文法设计编译器（可以手工设计亦可自动生成），并设计中间代码解释器，其能够解释执行编译后的中间代码。

要求输入一个合法的源程序，输出其中间代码形式的目标程序并能够解释执行生成的目标代码，并得到预期人结果。

## **实验目的**

通过实验完整地了解编译器设计过程，掌握编译原理中各种算法及算法的应用。

## **实验准备**

### 程序设计语言的文法定义

可以定义PL/1语言的文法，亦可根据C语言定义一个简单的C语言文法。

**lexical 词法分析**：token类型token\_type、分隔符号split\_char\_type、注释note\_char\_type、正则表达式字典regex\_dict

**syntax 语法分析**：Sign类为符号类。Production类为产生式。

**semantic 语义分析**：定义一个符号表池，每次调用函数的时候使用深拷贝从这里取局部变量表。SemanticRule类别为语义规则。SemanticRuleFactory类为语义规则工厂，根据给出的 rule\_key 返回相应的实例。

### 确定编译器设计方法，构造相应的属性文法

```
def put_source(self, source):
        """
        装填词法分析结果
        :param source: 词法分析结果
        """
        self.__source.clear()
        self.__terminals.clear()
        # 装填词法分析结果
        for s in source:
            self.__source.append(s)
        # 将 tokens 转换成终结符
        for s in self.__source:
            self.__terminals.append(Sign(s.type, s.str, s.line))
        # 在所有 tokens 的最后填入一个 #
        self.__terminals.append(Sign('pound'))
```

## 实验过程

### 实验源码

[Randall Chu / 编译原理实验4 · GitLab (zhuanjie.ltd)](http://gitlab.zhuanjie.ltd/Randall/byyl4)

### 输出代码

```
int gcd(int u, int v) {
    if (v == 0) {
        return u;
    } else {
        return gcd(v, u-u/v*v);
    }
    /* u-u/v*v* == u mod v */
}

void main() {
    int x;
    int y;
    x = input();
    y = input();
    output(gcd(x, y));
    return;
}
```

### 实验截图

![](http://blog.zhuanjie.ltd/wp-content/uploads/2022/06/1.png)

![](http://blog.zhuanjie.ltd/wp-content/uploads/2022/06/2.png)

![](http://blog.zhuanjie.ltd/wp-content/uploads/2022/06/3.png)

## 实验总结

通过这次编译器设计，我完整地了解编译器设计过程，掌握编译原理中各种算法及算法的应用。首先是词法分析识别Token序列，syntax 语法分析和semantic 语义分析。词法分析使用正则表达式，语法分析使用LL(1)文法分析器， 语义分析使用自上而下翻译，使用 Python 语言编写。main.py 编译器主程序；error.py 存放错误相关的类和代码；test.c 要编译的文件。三大分析中 rule.py 即是支持编译器的所有文法、词法、语义规则。