<div align="center"><a name="readme-top"></a>
<img height="180" src="https://cdn.qnets.cn/logo.svg" />
<h1 style="margin-top: 1.5rem">Qnets Anime Server</h1>

Qnets Anime Server, Based on Koa + Sequelize

English · [中文](./README-zh_CN.md)

</div>

## Introduction

-   Front end and back-end separated development, this project is only for the server side. Please refer to [qnets-anime](https://github.com/hzh11012/qnets-anime) for details on the front desk, Please refer to [qnets-anime-admin](https://github.com/hzh11012/qnets-anime-admin) for details on the backend.
-   SSO service is supported by [qnets-sso](https://github.com/hzh11012/qnets-sso)、[qnets-sso-koa2](https://github.com/hzh11012/qnets-sso-koa2), Users only need to log in once to access all Qnets projects, and support free login for 7 days.

### Completed API

[API Document](https://github.com/hzh11012/qnets-sso-koa2/tree/master/doc)

### Technology Stack

-   koa2
-   sequelize
-   zod
-   eslint + prettier
-   module-alias
-   mysql

## Project Structure

### Directory Structure

```js
│
├─app
   ├─api
   ├─dao
   ├─lib
   ├─models
   └─validators
├─core
├─doc
├─logs
├─middlewares
├─  app.js
└─...
```

## Configuration

### Environment Variables

> Incomplete environment variables will result in service unavailability. Please go to supplement

[Development Env](https://github.com/hzh11012/qnets-anime-koa2/tree/master/.env.development) ·
[Production Env](https://github.com/hzh11012/qnets-anime-koa2/tree/master/.env.production)

-   <code>NODE_PORT</code>：Service port, default <code>4800</code>
-   <code>DB_NAME</code>：MySQL database name, default <code>test</code>
-   <code>DB_HOST</code>：MySQL database host, default <code>localhost</code>
-   <code>DB_PORT</code>：MySQL database port, default <code>3306</code>
-   <code>DB_USER</code>：MySQL database user, default <code>root</code>
-   <code>DB_PASSWORD</code>：MySQL database password, default <code>123456</code>
-   <code>SSO_BASE_URL</code>：SSO server host，default <code>http://localhost:4800</code>
-   <code>DANMAKU_BASE_URL</code>：DANMAKU server host，default，default <code>http://localhost:3000</code>

## Quick Start

```bash
$ git clone https://github.com/hzh11012/qnets-anime-koa2.git

## Please note that SSO and Danmaku server-side must be configured first, otherwise login and barrage will become invalid

## Install dependencies
$ yarn

## Activate development mode
$ yarn dev

## Activate production mode
$ yarn prd
```

### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=hzh11012/qnets-anime-koa2&type=Date)](https://star-history.com/#hzh11012/qnets-anime-koa2)

### Contributors

<a href="https://github.com/hzh11012/qnets-anime-koa2/graphs/contributors"><img src="https://contrib.rocks/image?repo=hzh11012/qnets-anime-koa2"></a>

### License

[MIT](https://github.com/hzh11012/qnets-anime-koa2/blob/master/LICENSE)
