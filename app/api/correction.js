const Router = require('koa-router');
const {CorrectionDao} = require('@dao/correction');
const {
    CorrectionCreateValidator,
    CorrectionUpdateValidator
} = require('@validators/correction');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/correct'
});

// 提交纠错
router.post('/create', new Auth(1).m, async ctx => {
    const parameter = CorrectionCreateValidator(ctx.request.body);
    // 获取用户ID
    const id = ctx.auth.uid;

    const [err] = await CorrectionDao.create({
        uid: id,
        message: parameter.message
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('提交成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 更新状态
router.post('/updateStatus', new Auth(2).m, async ctx => {
    const parameter = CorrectionUpdateValidator(ctx.request.body);

    const [err] = await CorrectionDao.updateStatus({
        id: parameter.id,
        status: parameter.status
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('更新状态成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
