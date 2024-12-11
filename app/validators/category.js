const Zod = require('zod');
const {commonList, validate, commonIdValidator} = require('@validators/common');

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
    return validate(schema, parameter);
};

const CategoryListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).optional()
    });
    return validate(schema, parameter);
};

module.exports = {
    CategoryCreateValidator,
    CategoryListValidator,
    CategoryDeleteValidator: commonIdValidator
};
