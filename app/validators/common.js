const Zod = require('zod');

const commonList = {
    page: Zod.number({
        invalid_type_error: 'page 类型错误'
    })
        .int('page 必须为整数')
        .min(1, 'page 最小为1')
        .nullish(),
    pageSize: Zod.number({
        invalid_type_error: 'pageSize 类型错误'
    })
        .int('pageSize 必须为整数')
        .min(1, 'pageSize 最小为1')
        .nullish(),
    order: Zod.enum(['ASC', 'asc', 'desc', 'DESC', '', null], {
        message: 'order 参数错误'
    }).nullish()
};

module.exports = {
    commonList
};
