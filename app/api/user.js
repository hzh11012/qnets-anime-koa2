const Router = require('koa-router');
const {UserDao} = require('@app/dao/user');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/user'
});

// 用户信息
router.get('/info', new Auth(0).m, async ctx => {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(ctx.auth);
});

module.exports = router;
