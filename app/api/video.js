const Router = require('koa-router');
const {VideoDao} = require('@dao/video');
const {
    VideoCreateValidator,
    VideoPlayValidator,
    VideoDeleteValidator
} = require('@validators/video');
const {ADMIN_SCOPE, GENERAL_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/video'
});

// 添加视频 - admin
router.post('/admin_create', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = VideoCreateValidator(ctx.request.body);

    const [err] = await VideoDao.create({
        aid: parameter.id,
        title: parameter.title,
        url: parameter.url,
        episode: parameter.episode
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('添加视频成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 视频播放
router.post('/play', new Auth(GENERAL_SCOPE).m, async ctx => {
    const parameter = VideoPlayValidator(ctx.request.body);
    const [err] = await VideoDao.play({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('播放视频成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除视频 - admin
router.post('/admin_delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = VideoDeleteValidator(ctx.request.body);
    const [err] = await VideoDao.delete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除视频成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
