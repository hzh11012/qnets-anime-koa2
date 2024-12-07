const Zod = require('zod');
const {ParameterException} = require('@core/http-exception');
const {commonList, commonId} = require('@validators/common');

const CategoryCreateValidator = parameter => {
    const schema = Zod.object({
        category: Zod.string({
            required_error: 'category 不能为空',
            invalid_type_error: 'category 类型错误'
        })
            .max(25, {
                message: 'category 长度不能超过25'
            })
            .min(1, 'category 不能为空')
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

const CategoryListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).optional()
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

const CategoryDeleteValidator = parameter => {
    const schema = Zod.object({
        ...commonId
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

module.exports = {
    CategoryCreateValidator,
    CategoryListValidator,
    CategoryDeleteValidator
};
