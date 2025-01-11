const Zod = require('zod');
const {
    commonList,
    commonId,
    validate,
    commonIdValidator
} = require('@validators/common');

const MessageCreateValidator = parameter => {
    const schema = Zod.object({
        type: Zod.number({
            required_error: 'type 不能为空',
            invalid_type_error: 'type 类型错误'
        })
            .int('type 必须为整数')
            .min(0, 'type 最小为0')
            .max(3, 'type 最大为3'),
        content: Zod.string({
            required_error: 'content 不能为空',
            invalid_type_error: 'content 类型错误'
        })
            .max(1000, {
                message: 'content 长度不能超过1000'
            })
            .min(1, 'content 不能为空')
    });
    return validate(schema, parameter);
};

const MessageListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        status: Zod.number({
            invalid_type_error: 'status 类型错误'
        })
            .array()
            .optional(),
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).optional()
    });
    return validate(schema, parameter);
};

const MessageEditValidator = parameter => {
    const schema = Zod.object({
        ...commonId,
        reply_content: Zod.string({
            invalid_type_error: 'reply_content 类型错误'
        })
            .max(1000, {
                message: 'reply_content 长度不能超过1000'
            })
            .optional(),
        status: Zod.number({
            invalid_type_error: 'status 类型错误'
        })
            .int('status 必须为整数')
            .min(0, 'status 最小为0')
            .max(1, 'status 最大为3')
            .optional()
    }).refine(
        obj => obj.reply_content !== undefined || obj.status !== undefined,
        '缺少参数'
    );
    return validate(schema, parameter);
};

module.exports = {
    MessageCreateValidator,
    MessageListValidator,
    MessageDeleteValidator: commonIdValidator,
    MessageEditValidator
};
