const Router = require('koa-router');
const {AnimeBannerDao} = require('@dao/anime_banner');
const {
    AnimeBannerCreateValidator,
    AnimeBannerListValidator,
    AnimeBannerDeleteValidator
} = require('@validators/anime_banner');
const {ADMIN_SCOPE, GENERAL_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/anime_banner'
});

// 新增动漫轮播图 - admin
router.post('/admin/create', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = AnimeBannerCreateValidator(ctx.request.body);

    const [err] = await AnimeBannerDao.create({
        anime_ids: parameter.anime_id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('新增动漫轮播图成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 动漫轮播图列表 - admin
router.post('/admin_list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = AnimeBannerListValidator(ctx.request.body);
    const [err, data] = await AnimeBannerDao.adminList({
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

// 动漫轮播图列表
router.get('/list', new Auth(GENERAL_SCOPE).m, async ctx => {
    const [err, data] = await AnimeBannerDao.list({
        user_id: ctx.auth.id
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
    const parameter = AnimeBannerDeleteValidator(ctx.request.body);
    const [err] = await AnimeBannerDao.delete({
        anime_id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除动漫轮播图成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
