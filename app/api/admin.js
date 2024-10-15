const Router = require('koa-router');
const {AdminDao} = require('@dao/admin');
const {RegisterValidator, LoginValidator} = require('@validators/admin');
const {LoginManager} = require('@service/login');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/admin'
});

// 管理员注册
router.post('/register', async ctx => {
    const parameter = RegisterValidator(ctx.request.body);

    const [err, data] = await AdminDao.create({
        nickname: parameter.phone,
        phone: parameter.phone,
        password: parameter.password
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('注册成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 管理员登录
router.post('/login', async ctx => {
    const parameter = LoginValidator(ctx.request.body);

    const [err, token] = await LoginManager.adminLogin({
        phone: parameter.phone,
        password: parameter.password
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json({token}, '登录成功');
    } else {
        ctx.body = res.fail(err, err.msg);
    }
});

// 管理员信息
router.get('/info', new Auth(2).m, async ctx => {
    // 获取用户ID
    const id = ctx.auth.uid;

    const [err, data] = await AdminDao.info(id);

    if (!err) {
        // 返回结果
        ctx.response.status = 200;
        ctx.body = res.json(data);
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
