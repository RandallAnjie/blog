#!/bin/bash

# 配置环境
npm install -g hexo-cli
npm install
hexo clean
hexo generate
hexo deploy