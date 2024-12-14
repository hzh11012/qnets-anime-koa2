const Router = require('koa-router');
const {NoticeRecordDao} = require('@dao/notice_record');
const {
    NoticeRecordReadValidator,
    NoticeRecordListValidator,
    NoticeRecordDeleteValidator
} = require('@validators/notice_record');
const {ADMIN_SCOPE, GENERAL_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/notice_record'
});

// 阅读公告记录
router.post('/read', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = NoticeRecordReadValidator(ctx.request.body);
    const [err] = await NoticeRecordDao.create({
        nid: parameter.nid,
        uid: ctx.auth.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('阅读公告成功');
    } else {
        console.log(err);
        ctx.body = res.fail(err);
    }
});

// 公告记录列表
router.post('/list', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = NoticeRecordListValidator(ctx.request.body);
    const [err, data] = await NoticeRecordDao.list({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        keyword: parameter.keyword,
        uid: ctx.auth.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取公告记录列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 公告记录列表 - admin
router.post('/admin_list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = NoticeRecordListValidator(ctx.request.body);
    const [err, data] = await NoticeRecordDao.list({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        keyword: parameter.keyword,
        status: parameter.status
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取公告记录列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除公告记录
router.post('/delete', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = NoticeRecordDeleteValidator(ctx.request.body);
    const [err] = await NoticeRecordDao.delete({
        nid: parameter.id,
        uid: ctx.auth.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除公告记录成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除公告记录 - admin
router.post('/admin_delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = NoticeRecordDeleteValidator(ctx.request.body);
    const [err] = await NoticeRecordDao.adminDelete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除公告记录成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
