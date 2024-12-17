const Zod = require('zod');
const {commonList, validate, commonIdValidator} = require('@validators/common');

const SeriesCreateValidator = parameter => {
    const schema = Zod.object({
        name: Zod.string({
            required_error: 'name 不能为空',
            invalid_type_error: 'name 类型错误'
        })
            .max(50, {
                message: 'name 长度不能超过50'
            })
            .min(1, 'name 不能为空')
    });
    return validate(schema, parameter);
};

const SeriesListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).optional()
    });
    return validate(schema, parameter);
};

module.exports = {
    SeriesCreateValidator,
    SeriesListValidator,
    SeriesDeleteValidator: commonIdValidator
};
