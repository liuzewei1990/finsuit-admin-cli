## 比财H5活动开发架构
[TOC]
> layui + vue
> 预览:[demo](http://liuup.com/admin/)

### npm命令说明

``` bash
# install dependencies
npm install

# 启动开发环境 代表启动全部微项目 并设置开发环境配置
npm run dev
# 启动开发环境 代表启动指定微项目 并设置开发环境配置
npm run dev -project1 -project2 -project3 -project4......

# 发布测试包 打包指定的微项目 并设置测试环境配置
npm run build:test [项目名称必填]

# 发布生产包 打包指定的微项目 并设置生产环境配置
npm run build:prod [项目名称必填]

# 查看打包报告
npm run build:xxx [xxx] --report
```

### 微前端架构特点
- **项目规范 - 约束规范** ：多个微项目应用一套脚手架，一套公共库，一套公共模块，统一项目规范。
- **开发阶段 - 独立开发** ：一键启动所有微项目开发环境，支持微项目之间间接联调。独立开发所属项目包，完全解决代码冲突问题，公共模块分离；
- **发布阶段 - 独立发布** ：支持测试环境和生产环境发布，走不通配置，微项目单独打包，单独生成dist包；
- **部署阶段 - 独立部署** ：支持一键部署所有微项目生产包，支持独立项目部署，利用浏览器缓存机制，优化公共库的缓存。

### 源码目录结构
``` bash
├─common
│  ├─finsuit-assets --------------------所有微项目的公共资源
│  │  ├─icomoon
│  │  │  ├─demo-files
│  │  │  └─fonts
│  │  ├─images
│  │  └─less
│  ├─finsuit-components ----------------所有微项目的公共组件
│  │  ├─Button
│  │  │  └─less
│  │  ├─Confirm
│  │  ├─EllipsisText
│  │  ├─HttpErrorDialog
│  │  ├─Loading
│  │  ├─MaskBox
│  │  ├─Popup
│  │  └─Toast
│  ├─finsuit-h5 ------------------------所有微项目的比财H5开发插件包
│  │  └─libs
│  ├─finsuit-http ----------------------所有微项目的请求封装处理
│  └─finsuit-store ---------------------所有微项目的H5开发插件包辅助store
└─pages
    └─templateA ------------------------微项目A
    │ ├─apis
    │ ├─config
    │ ├─router
    │ ├─store
    │ └─view
    │      └─main
    │          └─modules
    └─templateB ------------------------微项目B
    │ ├─apis
    │ ├─config
    │ ├─router
    │ ├─store
    │ └─view
    │     └─main
    │         └─modules
```
### 打包目录结构
``` bash
├─templateA -------------------------- 微项目A dist包
│  └─static
│      ├─css
│      ├─fonts
│      ├─img
│      └─js
└─templateB -------------------------- 微项目B dist包
    └─static
        ├─css
        ├─fonts
        └─js
```
-------------------

### 部署

``` bash

```