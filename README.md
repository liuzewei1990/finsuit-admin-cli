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