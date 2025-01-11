const Router = require('koa-router');
const {AnnouncementDao} = require('@dao/announcement');
const {
    AnnouncementCreateValidator,
    AnnouncementListValidator,
    AnnouncementDeleteValidator,
    AnnouncementReadValidator,
    AnnouncementUserListValidator,
    AnnouncementUserDeleteValidator,
    AnnouncementUserAdminDeleteValidator
} = require('@validators/announcement');
const {ADMIN_SCOPE, GENERAL_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/announcement'
});

// 创建公告 - admin
router.post('/admin/create', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = AnnouncementCreateValidator(ctx.request.body);
    const [err] = await AnnouncementDao.create({
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
router.post('/admin/list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = AnnouncementListValidator(ctx.request.body);
    const [err, data] = await AnnouncementDao.adminList({
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
router.post('/admin/delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = AnnouncementDeleteValidator(ctx.request.body);
    const [err] = await AnnouncementDao.adminDelete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除公告成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 标记公告已读
router.post('/read', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = AnnouncementReadValidator(ctx.request.body);
    const [err] = await AnnouncementDao.read({
        announcement_id: parameter.id,
        user_id: ctx.auth.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('标记公告已读成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 用户公告列表
router.post('/user/list', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = AnnouncementUserListValidator(ctx.request.body);
    const [err, data] = await AnnouncementDao.userList({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        keyword: parameter.keyword,
        status: parameter.status,
        user_id: ctx.auth.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取用户公告列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除用户公告
router.post('/user/delete', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = AnnouncementUserDeleteValidator(ctx.request.body);
    const [err] = await AnnouncementDao.userDelete({
        user_id: ctx.auth.id,
        announcement_id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除用户公告成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
