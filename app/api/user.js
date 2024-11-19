const Router = require('koa-router');
const {UserDao} = require('@app/dao/user');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const {UserListValidator} = require('@app/validators/user');
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

router.post('/list', new Auth(2).m, async ctx => {
    const parameter = UserListValidator(ctx.request.body);
    const [err, data] = await UserDao.list({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        scope: parameter.scope,
        keyword: parameter.keyword
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取用户列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
