const Zod = require('zod');
const {
    commonList,
    commonId,
    validate,
    commonIdValidator
} = require('@validators/common');

const RatingCreateValidator = parameter => {
    const schema = Zod.object({
        ...commonId,
        score: Zod.number({
            required_error: 'score 不能为空',
            invalid_type_error: 'score 类型错误'
        })
            .int('score 必须为整数')
            .min(1, 'score 最小为1')
            .max(5, 'score 最大为5'),
        content: Zod.string({
            required_error: 'content 不能为空',
            invalid_type_error: 'content 类型错误'
        })
            .max(255, {
                message: 'content 长度不能超过255'
            })
            .min(1, 'content 不能为空')
    });
    return validate(schema, parameter);
};

const RatingListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).optional()
    });
    return validate(schema, parameter);
};

module.exports = {
    RatingCreateValidator,
    RatingListValidator,
    RatingDeleteValidator: commonIdValidator
};
