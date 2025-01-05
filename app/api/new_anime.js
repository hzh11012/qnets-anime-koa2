const Router = require('koa-router');
const {NewAnimeDao} = require('@app/dao/new_anime');
const {
    NewAnimeCreateValidator,
    NewAnimeListValidator,
    NewAnimeDeleteValidator
} = require('@validators/new_anime');
const {ADMIN_SCOPE, GENERAL_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/new_anime'
});

// 添加新番 - admin
router.post('/admin_create', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = NewAnimeCreateValidator(ctx.request.body);

    const [err] = await NewAnimeDao.create({
        aid: parameter.id,
        update_day: parameter.update_day,
        update_time: parameter.update_time
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('添加新番成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 新番列表
router.post('/list', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = NewAnimeListValidator(ctx.request.body);
    const [err, data] = await NewAnimeDao.adminList({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        update_day: parameter.update_day,
        keyword: parameter.keyword
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取新番列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除新番 - admin
router.post('/admin_delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = NewAnimeDeleteValidator(ctx.request.body);
    const [err] = await NewAnimeDao.delete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除新番成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
