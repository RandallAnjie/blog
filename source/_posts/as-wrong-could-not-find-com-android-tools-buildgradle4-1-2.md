---
title: 'AS报错“Could not find com.android.tools.build:gradle:4.1.2.”'
tags: []
id: '115'
categories:
  - - AndroidStudio
date: 2021-10-14 14:14:57
---

更改build.gradle文件，换用阿里镜像

解决报错：Using insecure protocols with repositories, without explicit opt-in, is unsupported. Switch Maven repository 'maven(http://maven.aliyun.com/nexus/content/groups/public/)' to redirect to a secure protocol (like HTTPS) or allow insecure protocols.

```
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        google()
        jcenter()
        //allowInsecureProtocol = true
        maven { url "https://maven.aliyun.com/nexus/content/groups/public/" }
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:4.1.2'
    }
}

allprojects {
    repositories {
        google()
        jcenter()
        //allowInsecureProtocol = true
        maven { url "https://maven.aliyun.com/nexus/content/groups/public/" }
    }
}
```