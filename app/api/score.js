const Router = require('koa-router');
const {ScoreDao} = require('@dao/score');
const {
    ScoreCreateValidator,
    ScoreListValidator,
    ScoreDeleteValidator
} = require('@validators/score');
const {ADMIN_SCOPE, GENERAL_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/score'
});

// 创建评分
router.post('/create', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = ScoreCreateValidator(ctx.request.body);

    const [err] = await ScoreDao.create({
        uid: ctx.auth.id,
        aid: parameter.id,
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

// 评分列表
router.post('/list', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = ScoreListValidator(ctx.request.body);
    const [err, data] = await ScoreDao.list({
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

// 评分列表 - admin
router.post('/admin_list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = ScoreListValidator(ctx.request.body);
    const [err, data] = await ScoreDao.adminList({
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

// 删除评分
router.post('/delete', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = ScoreDeleteValidator(ctx.request.body);
    const [err] = await ScoreDao.delete({
        uid: ctx.auth.id,
        aid: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除评分成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除评分 - admin
router.post('/admin_delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = ScoreDeleteValidator(ctx.request.body);
    const [err] = await ScoreDao.adminDelete({
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
