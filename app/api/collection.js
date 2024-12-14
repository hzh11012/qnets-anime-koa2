const Router = require('koa-router');
const {CollectionDao} = require('@dao/collection');
const {
    CollectionCreateValidator,
    CollectionListValidator,
    CollectionDeleteValidator
} = require('@validators/collection');
const {ADMIN_SCOPE, GENERAL_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/collection'
});

// 创建收藏
router.post('/create', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = CollectionCreateValidator(ctx.request.body);

    const [err] = await CollectionDao.create({
        uid: ctx.auth.id,
        aid: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('收藏成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 收藏列表
router.post('/list', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = CollectionListValidator(ctx.request.body);
    const [err, data] = await CollectionDao.list({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        keyword: parameter.keyword
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取收藏列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 收藏列表 - admin
router.post('/admin_list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = CollectionListValidator(ctx.request.body);
    const [err, data] = await CollectionDao.adminList({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        keyword: parameter.keyword
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取收藏列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 取消收藏
router.post('/delete', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = CollectionDeleteValidator(ctx.request.body);
    const [err] = await CollectionDao.delete({
        uid: ctx.auth.id,
        aid: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('取消收藏成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 取消收藏 - admin
router.post('/admin_delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = CollectionDeleteValidator(ctx.request.body);
    const [err] = await CollectionDao.adminDelete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('取消收藏成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
