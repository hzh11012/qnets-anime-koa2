const Router = require('koa-router');

const router = new Router();

router.get('/', async ctx => {
    ctx.body = `
        <!doctype html>
        <html lang="zh">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Qnets Anime Koa2</title>
                <style>
                    body {
                        line-height: 1em;
                    }
                    .container {
                        width: 60%;
                        margin: 32px auto;
                    }
                    li {
                        margin: 24px 0;
                    }
                    h1 {
                        font-size: 30px;
                    }
                    h2 {
                        font-size: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Qnets Anime Koa2 使用手册</h1>
                    <h2>快速开始</h2>
                    <ul>
                        <li>
                            可以先看看接口文档：<a target="_blank" href="https://github.com/hzh11012/qnets-anime-koa2/tree/main/doc">Documents</a>
                        </li>
                        <li>
                            本地下载 Postman API 调试工具：<a target="_blank" href="https://www.postman.com/downloads/">Download Postman</a>
                        </li>
                    </ul>
                    <h2>接口说明</h2>
                    <ul>
                        <li>
                            按模块进行拆解，前缀是 <strong>/api</strong> 开头，比如获取用户列表，整个API请求是：<a target="_blank" href="/api/user/admin_list">/api/user/admin_list</a>
                        </li>
                        <li>
                            比如获取弹幕列表，整个API请求是：<a target="_blank" href="/api/danmaku/list">/api/danmaku/list</a>，其他模块一样，建议在 Postman 工具进行调试
                        </li>
                    </ul>
                    <h2>特别说明</h2>
                    <div>有些接口需要登录token权限才能操作，如何获取 token 呢？</div>
                    <ul>
                        <li>
                            首先，在接口文档中找到注册管理员的接口，在 postman 进行注册一个账号
                        </li>
                        <li>
                            注册成功后，进行登录会返回 token，然后把 token 复制一下
                        </li>
                        <li>
                            最后配置一下 Postman
                        </li>
                    </ul>
                </div>
            </body>
        </html>
    `;
});

module.exports = router;
