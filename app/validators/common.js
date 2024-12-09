const Zod = require('zod');

const commonList = {
    page: Zod.number({
        invalid_type_error: 'page 类型错误'
    })
        .int('page 必须为整数')
        .min(1, 'page 最小为1')
        .optional(),
    pageSize: Zod.number({
        invalid_type_error: 'pageSize 类型错误'
    })
        .int('pageSize 必须为整数')
        .min(1, 'pageSize 最小为1')
        .optional(),
    order: Zod.enum(['ASC', 'asc', 'desc', 'DESC', ''], {
        message: 'order 参数错误'
    }).optional()
};

const commonId = {
    id: Zod.number({
        required_error: 'id 不能为空',
        invalid_type_error: 'id 类型错误'
    })
};

module.exports = {
    commonList,
    commonId
};
