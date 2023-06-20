---
title: leetcode刷题记录12-寻找两个正序数组的中位数
date: 2023-06-16 13:50:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 寻找两个正序数组的中位数

>  [原题传送门](https://leetcode.cn/problems/median-of-two-sorted-arrays/description/)

给定两个大小分别为`m`和`n`的正序（从小到大）数组`nums1`和`nums2`。请你找出并返回这两个正序数组的**中位数**。

## 示例

### 示例1

输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2

### 示例2


输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5



提示：

- `nums1.length == m`
- `nums2.length == n`
- `0 <= m <= 1000`
- `0 <= n <= 1000`
- `1 <= m + n <= 2000`
- `-10^6 <= nums1[i], nums2[i] <= 10^6`

## 解答

### C++1

暴力循环，类二路归并排序

```c++

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int lan1 = nums1.size();
        int lan2 = nums2.size();
        int middle = (lan1 + lan2) / 2;

        int flag1 = 0, flag2 = 0, tmpNum = 0;

        if(lan1 == 0){
            if(lan2 % 2 == 1){
                return nums2[lan2/2];
            }else{
                return (nums2[lan2/2] + nums2[lan2/2-1]) / 2.0;
            }
        }else if(lan2 == 0){
            if(lan1 % 2 == 1){
                return nums1[lan1/2];
            }else{
                return (nums1[lan1/2] + nums1[lan1/2-1]) / 2.0;
            }
        }

        // 类似插入排序扫码
        while(flag1 + flag2 < middle) {
            if (flag1 == lan1) {
                tmpNum = nums2[flag2];
                flag2++;
            } else if (flag2 == lan2) {
                tmpNum = nums1[flag1];
                flag1++;
            } else if (nums1[flag1] < nums2[flag2]) {
                tmpNum = nums1[flag1];
                flag1++;
            } else {
                tmpNum = nums2[flag2];
                flag2++;
            }
        }

//         cout << "flag1: " << flag1 << " flag2: " << flag2 << endl;
//         cout << "lan1+lan2: " << lan1+lan2 << endl;
//         cout << "tmpNum: " << tmpNum << endl;

        if((lan1 + lan2) % 2 == 1){
            if(flag1 == lan1){
                return nums2[flag2];
            }else if(flag2 == lan2){
                return nums1[flag1];
            }else if(nums1[flag1] < nums2[flag2]){
                return nums1[flag1];
            }else{
                return nums2[flag2];
            }
        }else{
            if(flag1 == lan1){
                return (tmpNum + nums2[flag2]) / 2.0;
            }else if(flag2 == lan2){
                return (tmpNum + nums1[flag1]) / 2.0;
            }else if(nums1[flag1] < nums2[flag2]){
                return (tmpNum + nums1[flag1]) / 2.0;
            }else{
                return (tmpNum + nums2[flag2]) / 2.0;
            }
        }

    }
};
```
> leetcode运行时间：28 ms；内存：87.2 MB



### C++2

利用函数getTwoElements()找到第 k (k>1) 小的元素和第k+1小的元素，要找到第 k 小的元素，那么就取 pivot1 = nums1[k/2-1] 和 pivot2 = nums2[k/2-1] 进行比较。代码中使用二分查找法在两个有序数组中找到第k小的元素。在每个迭代中，比较两个数组中的元素，并且丢弃较小的那部分，直到找到第k小的元素。如果数组的总长度是偶数，那么还需要找到第k+1小的元素，最后返回这两个元素的平均值作为中位数。

```c++
class Solution {
public:
    // 辅助函数，用于从两个有序数组中找到第k个和第k+1个元素
    pair<int, int> getTwoElements(const vector<int>& nums1, const vector<int>& nums2, int k) {
        int m = nums1.size();
        int n = nums2.size();
        int index1 = 0, index2 = 0;
        int element1 = 0, element2 = 0;

        while (true) {
            // 如果nums1已经遍历完，返回nums2的第k个和第k+1个元素
            if (index1 == m) {
                return make_pair(nums2[index2 + k - 1], index2 + k < n ? nums2[index2 + k] : INT_MAX);
            }
            // 如果nums2已经遍历完，返回nums1的第k个和第k+1个元素
            if (index2 == n) {
                return make_pair(nums1[index1 + k - 1], index1 + k < m ? nums1[index1 + k] : INT_MAX);
            }
            // 如果k是1，我们已经找到第k个元素，现在找下一个最小的元素作为第k+1个元素
            if (k == 1) {
                element1 = min(nums1[index1], nums2[index2]);
                // 增加我们已经找到第k个元素的数组的索引，找下一个最小的元素
                if (element1 == nums1[index1]) {
                    index1++;
                    if (index1 < m) {
                        element2 = min(index1 < m ? nums1[index1] : INT_MAX, nums2[index2]);
                    }
                    else {
                        element2 = nums2[index2];
                    }
                }
                else {
                    index2++;
                    if (index2 < n) {
                        element2 = min(nums1[index1], index2 < n ? nums2[index2] : INT_MAX);
                    }
                    else {
                        element2 = nums1[index1];
                    }
                }
                return make_pair(element1, element2);
            }

            // 在正常情况下，将索引向数组的较小元素的方向移动
            int newIndex1 = min(index1 + k / 2 - 1, m - 1);
            int newIndex2 = min(index2 + k / 2 - 1, n - 1);
            int pivot1 = nums1[newIndex1];
            int pivot2 = nums2[newIndex2];
            if (pivot1 <= pivot2) {
                k -= newIndex1 - index1 + 1;
                index1 = newIndex1 + 1;
            }
            else {
                k -= newIndex2 - index2 + 1;
                index2 = newIndex2 + 1;
            }
        }
    }

    // 主函数，找到两个有序数组的中位数
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int totalLength = nums1.size() + nums2.size();
        // 如果总长度是奇数，中位数是中间的元素
        if (totalLength % 2 == 1) {
            return getTwoElements(nums1, nums2, (totalLength + 1) / 2).first;
        }
        // 如果总长度是偶数，中位数是中间两个元素的平均值
        else {
            pair<int, int> elements = getTwoElements(nums1, nums2, totalLength / 2);
            return (elements.first + elements.second) / 2.0;
        }
    }
};
```

> leetcode运行时间：28 ms；内存：87.2 MB

