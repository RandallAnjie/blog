---
title: 快速排序QuickSort
tags: []
id: '83'
categories:
  - - C++
  - - 算法
date: 2021-05-25 06:11:00
---

## 代码：

```c++
#include <stdio.h>
#include <iostream>
#include <vector>
using namespace std;

//快速排序算法(从小到大)
//arr:需要排序的数组，begin:需要排序的区间左边界，end:需要排序的区间的右边界
void QuickSort(int *arr,int begin,int end)
{
	//如果区间不只一个数
    if(begin < end){
        int temp = arr[begin]; //将区间的第一个数作为基准数
        int i = begin; //从左到右进行查找时的“指针”，指示当前左位置
        int j = end; //从右到左进行查找时的“指针”，指示当前右位置
		//不重复遍历
        while(i < j){
		//当右边的数大于基准数时，略过，继续向左查找
			//不满足条件时跳出循环，此时的j对应的元素是小于基准元素的
            while(i<j && arr[j] > temp){
                j--;
            }
			//将右边小于等于基准元素的数填入右边相应位置
            arr[i] = arr[j];
            //当左边的数小于等于基准数时，略过，继续向右查找
            //(重复的基准元素集合到左区间)
            //不满足条件时跳出循环，此时的i对应的元素是大于等于基准元素的
            while(i<j && arr[i] <= temp){
                i++;
            }
            //将左边大于基准元素的数填入左边相应位置
            arr[j] = arr[i];
        }
		//将基准元素填入相应位置
        arr[i] = temp;
        //此时的i即为基准元素的位置
        //对基准元素的左边子区间进行相似的快速排序
        QuickSort(arr,begin,i-1);
        //对基准元素的右边子区间进行相似的快速排序
        QuickSort(arr,i+1,end);
    }
    //如果区间只有一个数，则返回
    else{
    	return;
    }
}

int main()
{
	//定义容器num存入原始数据 
    vector<int> num;//定义一个vector数组array
    int number;
    while (1) {
        cin >> number;
        num.push_back(number);//每输入一个数字就把它添加到数组的最后
        if (cin.get() == '\n'){//如果是回车符则跳出循环
            break;
        }
    }
    int n = num.size();//返回数组长度为len
	//将容器转换为int数组buffer 
    int *buffer = new int[num.size()];
    if (!num.empty()){
        memcpy(buffer, &num[0], num.size()*sizeof(int));
    }
	//将数组参与排序 
    QuickSort(buffer,0,n-1);
    cout << "排序后的数组为：" << endl;
	//输出数组 
    for(int i=0;i<n;i++){
        cout << buffer[i] << ' ';
    }
    cout << endl;
    return 0;
}

```

## 总结：

读取数组定义了一个vactor容器num，将数值存入容器后再将容器转换为普通数组buffer。函数排序定义了一个快速排序函数QuickSort，需要主函数的数组buffer，数组需要参与排序的第一个数字的下标，数组需要参与排序的最后一个数字的下标。在QuickSort函数中如果区间中不止一个数字，将区间的一个数作为基准数，定义从左到右进行查找时的“指针”i，指示当前左位置，定义从右到左进行查找时的“指针”j，指示当前右位置。当右边的数大于基准数时，略过，继续向左查找，不满足条件时跳出循环，此时的j对应的元素是小于基准元素的。在循环中将右边小于等于基准元素的数填入右边相应位置，当左边的数小于等于基准数时，略过，继续向右查找(重复的基准元素集合到左区间)不满足条件时跳出循环，此时的i对应的元素是大于等于基准元素的。将左边大于基准元素的数填入左边相应位置。然后将基准元素填入相应位置。最后，对基准元素的左边和右边子区间进行相似的快速排序。