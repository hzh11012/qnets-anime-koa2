const Router = require('koa-router');
const {UserDao} = require('@dao/user');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const {ADMIN_SCOPE, VISITOR_SCOPE} = require('@lib/scope');
const {
    UserListValidator,
    UserDeleteValidator,
    UserAdminEditValidator
} = require('@validators/user');
const res = new Resolve();

const router = new Router({
    prefix: '/api/user'
});

// 用户信息
router.get('/info', new Auth(VISITOR_SCOPE).m, async ctx => {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(ctx.auth);
});

// 用户列表 - admin
router.post('/admin_list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = UserListValidator(ctx.request.body);
    const [err, data] = await UserDao.list({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
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

// 用户删除 - admin
router.post('/admin_delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = UserDeleteValidator(ctx.request.body);
    const [err] = await UserDao.delete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除用户成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 用户信息修改 - admin
router.post('/admin_edit', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = UserAdminEditValidator(ctx.request.body);
    const [err] = await UserDao.adminEdit({
        id: parameter.id,
        nickname: parameter.nickname,
        avatar: parameter.avatar,
        scope: parameter.scope
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('修改用户信息成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
