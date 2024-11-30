const Router = require('koa-router');
const {
    DanmakuListValidator,
    DanmakuDeleteValidator
} = require('@validators/danmaku');
const {ADMIN_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const {got} = require('got-cjs');
const {secondsToHms, colorRgbToHex} = require('@lib/utils');
const res = new Resolve();

const router = new Router({
    prefix: '/api/danmaku'
});

// 弹幕列表
router.post('/list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = DanmakuListValidator(ctx.request.body);
    const {page = 1, pageSize = 10, keyword} = parameter;

    const BASE_URL =
        process.env.DANMAKU_BASE_URL + `${keyword ? '?ac=so' : '?ac=list'}`;

    try {
        const {data, count} = await got(
            BASE_URL + `&page=${page}&limit=${pageSize}`,
            {
                method: 'get'
            }
        ).json();

        const rows = data.map(item => {
            return {
                id: item[0],
                content: item[5],
                time_dot: secondsToHms(item[1]),
                color: colorRgbToHex(item[3]),
                source: item[9],
                ip: item[6],
                del_id: item[4],
                created_at: item[7]
            };
        });

        ctx.response.status = 200;
        ctx.body = res.json(
            {
                count,
                rows
            },
            '获取弹幕列表成功'
        );
    } catch (err) {
        ctx.body = res.fail('获取弹幕列表失败');
    }
});

// 删除弹幕
router.post('/delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = DanmakuDeleteValidator(ctx.request.body);
    const {id} = parameter;

    const BASE_URL = `${process.env.DANMAKU_BASE_URL}?ac=del&type=list&id=${id}}`;
    try {
        await got(BASE_URL, {
            method: 'get'
        }).json();

        ctx.response.status = 200;
        ctx.body = res.success('删除弹幕成功');
    } catch (err) {
        ctx.body = res.fail('删除弹幕失败');
    }
});

module.exports = router;
