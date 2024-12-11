const Router = require('koa-router');
const {CorrectionDao} = require('@dao/correction');
const {
    CorrectionCreateValidator,
    CorrectionListValidator,
    CorrectionDeleteValidator,
    CorrectionEditValidator
} = require('@validators/correction');
const {ADMIN_SCOPE, GENERAL_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/correct'
});

// 创建纠错
router.post('/create', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = CorrectionCreateValidator(ctx.request.body);

    const [err] = await CorrectionDao.create({
        id: ctx.auth.id,
        message: parameter.message
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('提交纠错信息成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 纠错信息列表
router.post('/admin_list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = CorrectionListValidator(ctx.request.body);
    const [err, data] = await CorrectionDao.list({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        status: parameter.status,
        keyword: parameter.keyword
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取纠错信息列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除纠错信息 - admin
router.post('/admin_delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = CorrectionDeleteValidator(ctx.request.body);
    const [err] = await CorrectionDao.delete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除纠错信息成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 修改纠错信息 - admin
router.post('/admin_edit', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = CorrectionEditValidator(ctx.request.body);
    const [err] = await CorrectionDao.edit({
        id: parameter.id,
        message: parameter.message,
        status: parameter.status
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('修改纠错信息成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
