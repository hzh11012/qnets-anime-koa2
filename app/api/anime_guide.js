const Router = require('koa-router');
const {AnimeGuideDao} = require('@app/dao/anime_guide');
const {
    AnimeGuideCreateValidator,
    AnimeGuideListValidator,
    AnimeGuideDeleteValidator
} = require('@validators/anime_guide');
const {ADMIN_SCOPE, GENERAL_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/anime_guide'
});

// 添加新番导视 - admin
router.post('/admin/create', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = AnimeGuideCreateValidator(ctx.request.body);
    const [err] = await AnimeGuideDao.create({
        anime_id: parameter.id,
        update_day: parameter.update_day,
        update_time: parameter.update_time
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('添加新番导视成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 新番导视列表
router.post('/list', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = AnimeGuideListValidator(ctx.request.body);
    const [err, data] = await AnimeGuideDao.list({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        update_day: parameter.update_day,
        keyword: parameter.keyword
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取新番导视列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除新番导视 - admin
router.post('/admin/delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = AnimeGuideDeleteValidator(ctx.request.body);
    const [err] = await AnimeGuideDao.delete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除新番导视成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
