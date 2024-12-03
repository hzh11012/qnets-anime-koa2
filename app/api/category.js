const Router = require('koa-router');
const {CategoryDao} = require('@app/dao/category');
const {
    CategoryCreateValidator,
    CategoryListValidator,
    CategoryDeleteValidator
} = require('@app/validators/category');
const {ADMIN_SCOPE} = require('@lib/scope');
const {Auth} = require('@middlewares/auth');
const {Resolve} = require('@lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/api/category'
});

// 创建动漫分类 - admin
router.post('/admin_create', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = CategoryCreateValidator(ctx.request.body);
console.log(parameter);
    const [err] = await CategoryDao.create({
        category: parameter.category
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('创建动漫分类成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 动漫分类列表 - admin
router.post('/admin_list', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = CategoryListValidator(ctx.request.body);
    const [err, data] = await CategoryDao.list({
        page: parameter.page,
        pageSize: parameter.pageSize,
        order: parameter.order,
        keyword: parameter.keyword
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data, '获取动漫分类列表成功');
    } else {
        ctx.body = res.fail(err);
    }
});

// 删除动漫分类 - admin
router.post('/admin_delete', new Auth(ADMIN_SCOPE).m, async ctx => {
    const parameter = CategoryDeleteValidator(ctx.request.body);
    const [err] = await CategoryDao.delete({
        id: parameter.id
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除动漫分类成功');
    } else {
        ctx.body = res.fail(err);
    }
});

module.exports = router;
