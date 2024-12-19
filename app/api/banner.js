const Router = require('koa-router');
const {BannerDao} = require('@dao/banner');
const {
    BannerCreateValidator,
    BannerListValidator,
    BannerDeleteValidator
} = require('@validators/banner');
const {ADMIN_SCOPE, GENERAL_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/banner'
});

// 新增动漫轮播图 - admin
router.post('/admin_create', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = BannerCreateValidator(ctx.request.body);

    const [err] = await BannerDao.create({
        aid: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('新增动漫轮播图成功');
    } else {
        ctx.body = res.fail(err);
    }
});

//动漫轮播图列表
router.post('/list', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = BannerListValidator(ctx.request.body);
    const [err, data] = await BannerDao.list({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        keyword: parameter.keyword
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取动漫轮播图列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除动漫轮播图 - admin
router.post('/admin_delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = BannerDeleteValidator(ctx.request.body);
    const [err] = await BannerDao.delete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除动漫轮播图成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
