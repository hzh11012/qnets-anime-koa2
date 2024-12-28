<div align="center"><a name="readme-top"></a>
<img height="180" src="https://cdn.qnets.cn/logo.svg" />
<h1 style="margin-top: 1.5rem">Qnets 轻动漫服务端</h1>

Qnets 轻动漫服务端, 基于 Koa + Sequelize 实现

[English](./README.md) · 中文

</div>

## 简介

- 前后端分离式开发，本项目仅为服务端。前台详见 [qnets-anime](https://github.com/hzh11012/qnets-anime)，后台详见 [qnets-anime-admin](https://github.com/hzh11012/qnets-anime-admin)
- 登录服务由 [qnets-sso](https://github.com/hzh11012/qnets-sso)、[qnets-sso-koa2](https://github.com/hzh11012/qnets-sso-koa2) 提供支持，用户只需要登录一次即可访问所有Qnets项目，且支持7天内免登录。

### 实现接口

[接口文档](https://github.com/hzh11012/qnets-sso-koa2/tree/master/doc)

### 技术栈

- koa2 框架
- sequelize 对象关系映射
- zod 规则校验
- eslint + prettier 格式化
- module-alias 路径别名
- mysql 数据库

## 项目结构

### 目录结构

```js
│
├─app
   ├─api                // 接口定义
   ├─dao                // DAO层
   ├─lib                // 工具包
   ├─models             // 模型定义
   └─validators         // 校验规则定义
├─core                  // 基础核心配置
├─doc                   // 接口文档
├─logs                  // 日志
├─middlewares           // 中间件
├─  app.js              // 主入口
└─...
```

## 配置

### 环境变量

> 环境变量不完整将会导致服务不可用, 请前往补充

[开发环境变量](https://github.com/hzh11012/qnets-anime-koa2/tree/master/.env.development) ·
[生产环境变量](https://github.com/hzh11012/qnets-anime-koa2/tree/master/.env.production)

- <code>NODE_PORT</code>：服务端口，默认 <code>5200</code>
- <code>DB_NAME</code>：MySQL数据库名，默认 <code>test</code>
- <code>DB_HOST</code>：MySQL数据库地址，默认 <code>localhost</code>
- <code>DB_PORT</code>：MySQL数据库端口，默认 <code>3306</code>
- <code>DB_USER</code>：MySQL数据库用户名，默认 <code>root</code>
- <code>DB_PASSWORD</code>：MySQL数据库密码，默认 <code>123456</code>
- <code>REDIS_HOST</code>：Redis地址，默认 <code>localhost</code>
- <code>REDIS_PORT</code>：Redis端口，默认 <code>33637906</code>
- <code>REDIS_PASSWORD</code>：Redis密码，默认为空，选填
- <code>SSO_BASE_URL</code>：SSO登录服务端部署地址，默认 <code>http://localhost:4800</code>
- <code>DANMAKU_BASE_URL</code>：DANMAKU弹幕库服务端部署地址，默认 <code>http://localhost:3000</code>

## 快速开始

```bash
$ git clone https://github.com/hzh11012/qnets-anime-koa2.git

## 注意必须先配置好sso、danmaku server端，否则登录和弹幕会失效

## 安装依赖
$ yarn

## 开启开发模式
$ yarn dev

## 开启生产模式
$ yarn prd
```

### 星历史

[![Star History Chart](https://api.star-history.com/svg?repos=hzh11012/qnets-anime-koa2&type=Date)](https://star-history.com/#hzh11012/qnets-anime-koa2)

### 贡献者

<a href="https://github.com/hzh11012/qnets-anime-koa2/graphs/contributors"><img src="https://contrib.rocks/image?repo=hzh11012/qnets-anime-koa2"></a>

### 许可证

[MIT](https://github.com/hzh11012/qnets-anime-koa2/blob/master/LICENSE)
