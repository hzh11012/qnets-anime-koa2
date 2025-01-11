const Router = require('koa-router');
const {CategoryDao} = require('@dao/category');
const {
    CategoryCreateValidator,
    CategoryListValidator,
    CategoryDeleteValidator
} = require('@validators/category');
const {ADMIN_SCOPE, GENERAL_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/category'
});

// 创建分类 - admin
router.post('/admin/create', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = CategoryCreateValidator(ctx.request.body);
    const [err] = await CategoryDao.create({
        name: parameter.name
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('创建分类成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 分类列表 - admin
router.post('/admin/list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = CategoryListValidator(ctx.request.body);
    const [err, data] = await CategoryDao.adminList({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        orderBy: parameter.orderBy,
        keyword: parameter.keyword
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取分类列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除分类 - admin
router.post('/admin/delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = CategoryDeleteValidator(ctx.request.body);
    const [err] = await CategoryDao.delete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除分类成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
