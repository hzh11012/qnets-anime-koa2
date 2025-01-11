const Router = require('koa-router');
const {SeriesDao} = require('@dao/series');
const {
    SeriesCreateValidator,
    SeriesListValidator,
    SeriesDeleteValidator
} = require('@validators/series');
const {ADMIN_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/series'
});

// 创建系列 - admin
router.post('/admin/create', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = SeriesCreateValidator(ctx.request.body);

    const [err] = await SeriesDao.create({
        name: parameter.name
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('创建系列成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 系列列表 - admin
router.post('/admin/list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = SeriesListValidator(ctx.request.body);
    const [err, data] = await SeriesDao.list({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        keyword: parameter.keyword
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取系列列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除系列 - admin
router.post('/admin/delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = SeriesDeleteValidator(ctx.request.body);
    const [err] = await SeriesDao.delete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除系列成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
