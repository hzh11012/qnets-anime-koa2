const Zod = require('zod');
const {ParameterException} = require('@core/http-exception');
const {commonList, commonId} = require('@app/validators/common');

const VideoCategoryCreateValidator = parameter => {
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

const VideoCategoryListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).nullish()
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

const VideoCategoryDeleteValidator = parameter => {
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
    VideoCategoryCreateValidator,
    VideoCategoryListValidator,
    VideoCategoryDeleteValidator
};
