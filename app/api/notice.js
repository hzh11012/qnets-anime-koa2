const Router = require('koa-router');
const {NoticeDao} = require('@dao/notice');
const {
    NoticeCreateValidator,
    NoticeListValidator,
    NoticeDeleteValidator
} = require('@validators/notice');
const {ADMIN_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/notice'
});

// 创建公告 - admin
router.post('/admin_create', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = NoticeCreateValidator(ctx.request.body);

    const [err] = await NoticeDao.create({
        title: parameter.title,
        content: parameter.content
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('创建公告成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 公告列表 - admin
router.post('/admin_list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = NoticeListValidator(ctx.request.body);
    const [err, data] = await NoticeDao.list({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        keyword: parameter.keyword
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取公告列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除公告 - admin
router.post('/admin_delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = NoticeDeleteValidator(ctx.request.body);
    const [err] = await NoticeDao.delete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除公告成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
