const Zod = require('zod');
const {commonList, validate, commonIdValidator} = require('@validators/common');

const NoticeCreateValidator = parameter => {
    const schema = Zod.object({
        title: Zod.string({
            required_error: 'title 不能为空',
            invalid_type_error: 'title 类型错误'
        })
            .max(25, {
                message: 'title 长度不能超过25'
            })
            .min(1, 'title 不能为空'),
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

const NoticeListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).optional()
    });
    return validate(schema, parameter);
};

module.exports = {
    NoticeCreateValidator,
    NoticeListValidator,
    NoticeDeleteValidator: commonIdValidator
};
