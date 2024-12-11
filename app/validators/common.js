const Zod = require('zod');
const {ParameterException} = require('@core/http-exception');

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
    }).optional(),
    orderBy: Zod.string({
        invalid_type_error: 'orderBy 类型错误'
    }).optional()
};

const commonId = {
    id: Zod.number({
        required_error: 'id 不能为空',
        invalid_type_error: 'id 类型错误'
    })
};

const validate = (schema, parameter) => {
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

const commonIdValidator = parameter => {
    const schema = Zod.object({...commonId});
    return validate(schema, parameter);
};

module.exports = {
    validate,
    commonIdValidator,
    commonList,
    commonId
};
