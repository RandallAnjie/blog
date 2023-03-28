#!/bin/bash

# 配置环境
echo '开始配置环境'
echo '安装hexo-cli'
npm install -g hexo-cli
echo '安装完成hexo，设置hexo路径'
echo 'PATH="$PATH:./node_modules/.bin"' >> ~/.profile
source ~/.profile

echo '开始部署'

hexo clean
hexo generate
hexo deploy