const Router = require('koa-router');
const {VideoCategoryDao} = require('@dao/video_category');
const {
    VideoCategoryCreateValidator,
    VideoCategoryListValidator,
    VideoCategoryDeleteValidator
} = require('@validators/video_category');
const {ADMIN_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/video_category'
});

// 创建视频分类 - admin
router.post('/admin_create', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = VideoCategoryCreateValidator(ctx.request.body);

    const [err] = await VideoCategoryDao.create({
        id: ctx.auth.id,
        category: parameter.category
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('创建视频分类成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 视频分类列表 - admin
router.post('/admin_list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = VideoCategoryListValidator(ctx.request.body);
    const [err, data] = await VideoCategoryDao.list({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        keyword: parameter.keyword
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取视频分类列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除视频分类 - admin
router.post('/admin_delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = VideoCategoryDeleteValidator(ctx.request.body);
    const [err] = await VideoCategoryDao.delete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除视频分类成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
