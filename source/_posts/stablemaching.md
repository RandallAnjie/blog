---
title: 稳定匹配StableMaching
tags: []
id: '80'
categories:
  - - C++
  - - 算法
date: 2021-05-25 06:11:00
---

## 代码：

```c++
#include<queue>
#include <iostream>
#define MAX 10      //医院学生最多为MAX个 

using namespace std;

int main(){
    int hospital_num, student_num;    //医院学生的个数，需要输入 
    int HospitalPref[MAX][MAX], StudentPref[MAX][MAX];     //喜欢序列，需要输入（用数字表示医院学生） 
    int HospitalInverse[MAX][MAX], StudentInverse[MAX][MAX];
    int confernstudent[MAX], confernhospital[MAX];    //表示各个配对 
    int count[MAX];    // count[m]表示m提出配对的次数 
    queue<int> FreeHospitals;   // 表示未被配对的医院 
    cout << "请输入医院或学生的总数：" << endl;
    cin >> hospital_num;
    student_num = hospital_num;
    for (int i = 0; i < hospital_num; i++){
        cout << "请输入第" << i+1 << "个医院的喜好排序" << endl;
        FreeHospitals.push(i);
        for (int j = 0; j < student_num; j++){
            cin >> HospitalPref[i][j];
            HospitalPref[i][j]--;
        }
    }
    for (int i = 0; i < student_num; i++){
        cout << "请输入第" << i+1 << "个学生的喜好排序" << endl;
        for (int j = 0; j < hospital_num; j++){
            cin >> StudentPref[i][j];
            StudentPref[i][j]--;
        }
    }
    for (int i = 0; i < hospital_num; i++){
        for (int j = 0; j < student_num; j++){
            HospitalInverse[i][HospitalPref[i][j]] = j;
        }
    }
    for (int i = 0; i < student_num; i++){
        for (int j = 0; j < hospital_num; j++){
            StudentInverse[i][StudentPref[i][j]] = j;
        }
    }

    //初始化每个医院和学生的状态，并将每个医院提出配对的次数赋值成0 
    for (int i = 0; i < hospital_num; i++){
        confernstudent[i] = -1;
        confernhospital[i] = -1;
        count[i] = 0;
    }

    // 当FreeHospitals的队列为空时结束循环 
    while(FreeHospitals.size() != 0){
        // 取出队列中的第一个医院，hospital代表该医院的序号 
        int hospital = FreeHospitals.front();
        // 医院按照自己的喜欢序列降序对学生提出配对直到医院被配对 
        for (int i = count[hospital]; i < student_num; count[hospital]++, i++){
            // 如果这个学生未被配对 
            if (confernstudent[HospitalPref[hospital][i]] == -1){
                confernstudent[HospitalPref[hospital][i]] = hospital;
                confernhospital[hospital] = HospitalPref[hospital][i];   //将医院学生配对 
                FreeHospitals.pop();   // 将该医院从队列删除 
                break;
            }

                // 如果学生较之已配对医院更喜欢这个医院 
            else if (StudentInverse[hospital] < StudentInverse[confernstudent[HospitalPref[hospital][i]]]){
                FreeHospitals.push(confernstudent[HospitalPref[hospital][i]]); //将原配对医院加入未配对医院队列 
                confernhospital[confernstudent[HospitalPref[hospital][i]]] = -1; //将医院的状态设置成未配对
                //（也可以不用设置） 
                confernstudent[HospitalPref[hospital][i]] = hospital;
                confernhospital[hospital] = HospitalPref[hospital][i];       //重新配对 
                FreeHospitals.pop();  // 将该医院从队列删除  
                break;
            }

                // 否则学生拒绝医院的配对 
            else {
            }
        }
    }

    for (int i = 0; i < hospital_num; i++){
        cout << "医院" << i+1 << "-----学生" << confernhospital[i]+1 << endl;
    }
}


```

## 总结：

稳定匹配算法的实现我采用的是c++语言。在程序中，将医院与学生的喜好和医院与学生实际的匹配结果分别建立了四个二维数组；定义了配对次数和一个表示未配对医院的线性表。  
程序首先读取医院（学生）的总数，再依次读取每个医院和学生的喜好排序，然后初始化每个医院和学生的状态，并将每个医院提出配对的次数赋值成0。进入循环依次取出队列中的第一个医院， 医院按照自己的喜欢序列降序对学生提出配对直到医院被配对，如果这个学生未被配对，将医院学生配对，将该医院从队列删除，如果学生较之已配对医院更喜欢这个医院，则将原配对医院加入未配对医院队列且医院的状态设置成未配对。待FreeHospitals的队列为空时结束循环后输出匹配结果。  
程序使用了线性表queue，相比于数组而言大大缩短了运行所需时间。然而，在这样的场景中G-S匹配并不是公平的，由于每次迭代按照M中递减偏好尝试匹配，它是一种偏向于M节点的算法。算法产出的稳态匹配结果，所有的学校都匹配了尽可能好好的结果，而所有学生都匹配了尽可能不好的结果。