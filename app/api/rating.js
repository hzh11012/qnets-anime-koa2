const Router = require('koa-router');
const {RatingDao} = require('@dao/rating');
const {
    RatingCreateValidator,
    RatingListValidator,
    RatingDeleteValidator
} = require('@validators/rating');
const {ADMIN_SCOPE, GENERAL_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/rating'
});

// 创建评分
router.post('/create', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = RatingCreateValidator(ctx.request.body);

    const [err] = await RatingDao.create({
        user_id: ctx.auth.id,
        anime_id: parameter.id,
        score: parameter.score,
        content: parameter.content
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('评分成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 评分列表 - admin
router.post('/admin/list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = RatingListValidator(ctx.request.body);
    const [err, data] = await RatingDao.adminList({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        keyword: parameter.keyword
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取评分列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除评分 - admin
router.post('/admin/delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = RatingDeleteValidator(ctx.request.body);
    const [err] = await RatingDao.adminDelete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除评分成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
