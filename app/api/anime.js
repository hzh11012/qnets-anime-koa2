const Router = require('koa-router');
const {AnimeDao} = require('@dao/anime');
const {
    AnimeCreateValidator,
    AnimeListValidator,
    AnimeDeleteValidator,
    AnimeEditValidator,
    AnimeDetailValidator
} = require('@validators/anime');
const {ADMIN_SCOPE, GENERAL_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/anime'
});

// 创建动漫 - admin
router.post('/admin/create', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = AnimeCreateValidator(ctx.request.body);

    const [err] = await AnimeDao.create({
        series_id: parameter.series_id,
        name: parameter.name,
        description: parameter.description,
        cover_url: parameter.cover_url,
        banner_url: parameter.banner_url,
        remark: parameter.remark,
        status: parameter.status,
        type: parameter.type,
        director: parameter.director,
        cv: parameter.cv,
        year: parameter.year,
        month: parameter.month,
        season_name: parameter.season_name,
        season: parameter.season,
        category: parameter.category
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('创建动漫成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 动漫列表
router.post('/list', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = AnimeListValidator(ctx.request.body);

    const [err, data] = await AnimeDao.list({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        keyword: parameter.keyword,
        type: parameter.type,
        status: parameter.status,
        year: parameter.year,
        month: parameter.month,
        category: parameter.category,
        scope: ctx.auth.scope
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取动漫列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除动漫 - admin
router.post('/admin/delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = AnimeDeleteValidator(ctx.request.body);
    const [err] = await AnimeDao.delete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除动漫成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 修改动漫 - admin
router.post('/admin/edit', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = AnimeEditValidator(ctx.request.body);

    const [err] = await AnimeDao.edit({
        id: parameter.id,
        series_id: parameter.series_id,
        name: parameter.name,
        description: parameter.description,
        cover_url: parameter.cover_url,
        banner_url: parameter.banner_url,
        remark: parameter.remark,
        status: parameter.status,
        type: parameter.type,
        director: parameter.director,
        cv: parameter.cv,
        year: parameter.year,
        month: parameter.month,
        season_name: parameter.season_name,
        season: parameter.season,
        category: parameter.category
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('修改动漫成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 动漫详情 - admin
router.post('/admin/detail', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = AnimeDetailValidator(ctx.request.body);
    const [err, data] = await AnimeDao.detail({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取动漫详情成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
