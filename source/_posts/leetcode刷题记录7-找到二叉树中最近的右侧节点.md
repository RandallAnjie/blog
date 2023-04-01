---
title: leetcode刷题记录7-找到二叉树中最近的右侧节点
date: 2023-04-01 16:28:00
categories:
  - - leetcode
  - - C++
  - - 每日一题
tags:
  - - leetcode
---

## 找到二叉树中最近的右侧节点

>  [原题传送门](https://leetcode.cn/problems/find-nearest-right-node-in-binary-tree/description/)

给定一棵二叉树的根节点 `root` 和树中的一个节点 `u` ，返回与 `u` **所在层**中**距离最近**的**右侧**节点，当 `u` 是所在层中最右侧的节点，返回 `null` 。

## 示例

### 示例1

![示例1](https://pan.zhuanjie.ltd/f/9MSX/%E6%89%BE%E5%88%B0%E4%BA%8C%E5%8F%89%E6%A0%91%E4%B8%AD%E6%9C%80%E8%BF%91%E7%9A%84%E5%8F%B3%E4%BE%A7%E8%8A%82%E7%82%B9%E5%9B%BE1.png)

输入：root = [1,2,3,null,4,5,6], u = 4
输出：5
解释：节点 4 所在层中，最近的右侧节点是节点 5。



### 示例2

![示例2](https://pan.zhuanjie.ltd/f/63C5/%E6%89%BE%E5%88%B0%E4%BA%8C%E5%8F%89%E6%A0%91%E4%B8%AD%E6%9C%80%E8%BF%91%E7%9A%84%E5%8F%B3%E4%BE%A7%E8%8A%82%E7%82%B9%E5%9B%BE2.png)


输入：root = [3,null,4,2], u = 2
输出：null
解释：2 的右侧没有节点。




### 示例3


输入：root = [1], u = 1
输出：null



### 示例4

输入：root = [3,4,2,null,null,null,1], u = 4
输出：2



提示：

- 树中节点个数的范围是 `[1, 10^5^]` 。
- `1 <= Node.val <= 10^5^`
- 树中所有节点的值是**唯一**的。
- `u` 是以 `root` 为根的二叉树的一个节点。

## 解答

### C++1

利用层序遍历来求解：因为右边的结点必然为层序遍历的后一个结点，只需要判断该结点和后一个结点是不是在同一层即可（给出求结点所处层的函数使用的是递归算法，可改用其他数据结构来实现）

```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int findDeep(TreeNode* root, TreeNode* u, int tmpDeep){
        if(root == nullptr){
            return 0;
        }
        if(root == u){
            return tmpDeep;
        }
        int leftDeep = findDeep(root->left, u, tmpDeep+1);
        int rightDeep = findDeep(root->right, u, tmpDeep+1);
        return leftDeep > rightDeep ? leftDeep : rightDeep;
    }

    TreeNode* findNearestRightNode(TreeNode* root, TreeNode* u) {
        // 层序遍历判断是否有右节点
        queue<TreeNode*> q;
        q.push(root);
        TreeNode* resultNode;
        while(!q.empty()){
            TreeNode* tmpNode = q.front();
            q.pop();
            if(tmpNode == u){
                if(q.empty()){
                    return nullptr;  // 返回空指针
                }else{
                    resultNode = q.front();
                }
                break;
            }
            // 左右孩子结点入队
            if(tmpNode->left != nullptr){
                q.push(tmpNode->left);
            }
            if(tmpNode->right != nullptr){
                q.push(tmpNode->right);
            }
        }
        int a = findDeep(root, u, 0);
        int b = findDeep(root, resultNode, 0);
        cout << a << endl;
        cout << b << endl;
        if(findDeep(root, u, 0) == findDeep(root, resultNode, 0)) {
            return resultNode;
        }else{
            return nullptr;
        }
    }
};
```
> leetcode运行时间：172 ms；内存：84.4 MB



### C++2

将求解层数放到寻找u结点的过程中，创建两个queue，一个存层数，另一个存结点指针

```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* findNearestRightNode(TreeNode* root, TreeNode* u) {
        // 层序遍历判断是否有右节点
        queue<TreeNode*> q;
        q.push(root);
        queue<int> deep;
        deep.push(0);
        while(!q.empty()){
            TreeNode* tmpNode = q.front();
            int tmpDeep = deep.front();
            q.pop();
            deep.pop();
            if(tmpNode == u){
                if(q.empty()){
                    return nullptr;
                }else{
                    if(deep.front() == tmpDeep){
                        return q.front();
                    }else{
                        return nullptr;
                    }
                }
            }
            if(tmpNode->left != nullptr){
                q.push(tmpNode->left);
                deep.push(tmpDeep + 1);
            }
            if(tmpNode->right != nullptr){
                q.push(tmpNode->right);
                deep.push(tmpDeep + 1);
            }
        }
        return nullptr;
    }
};
```

> leetcode运行时间：152 ms；内存：84.8 MB



### C++3

看到一个新方法，利用size来解决是否处于同一层的问题

```
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* findNearestRightNode(TreeNode* root, TreeNode* u) {
    	// 新建队列并入队根节点
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()){
            int size=q.size();  // 这个size保证了该次while循环会循环掉该层的所有结点，不会出现两个结点不在同层的情况
            for(int i=0; i<size; i++){
            	// 获取队首结点，并且把队首结点出队
                TreeNode* p=q.front();
                q.pop();
                if(p == u){
                    if(i == size-1){  // 这里就是找到了u结点是该层最后一个结点，直接返回空指针
                    	return nullptr;
                    }else{
                    	return q.front();
                    }
                }
                if(p->left){
                	q.push(p->left);
                }
                if(p->right){
                	q.push(p->right);
                }
            }
        }
        return nullptr;
    }
};
```

> leetcode运行时间：148 ms；内存：84.4 MB





