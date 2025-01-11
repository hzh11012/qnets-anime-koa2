const Router = require('koa-router');
const {MessageDao} = require('@dao/message');
const {
    MessageCreateValidator,
    MessageListValidator,
    MessageDeleteValidator,
    MessageEditValidator
} = require('@validators/message');
const {ADMIN_SCOPE, GENERAL_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/message'
});

// 创建留言
router.post('/create', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = MessageCreateValidator(ctx.request.body);

    const [err] = await MessageDao.create({
        user_id: ctx.auth.id,
        type: parameter.type,
        content: parameter.content
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('提交留言成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 留言列表 - admin
router.post('/admin/list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = MessageListValidator(ctx.request.body);
    const [err, data] = await MessageDao.list({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        status: parameter.status,
        keyword: parameter.keyword
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取留言列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除留言 - admin
router.post('/admin/delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = MessageDeleteValidator(ctx.request.body);
    const [err] = await MessageDao.delete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除留言成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 修改留言 - admin
router.post('/admin/edit', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = MessageEditValidator(ctx.request.body);
    const [err] = await MessageDao.edit({
        id: parameter.id,
        reply_content: parameter.reply_content,
        status: parameter.status
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('修改留言成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
