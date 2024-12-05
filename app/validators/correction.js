const Zod = require('zod');
const {ParameterException} = require('@core/http-exception');
const {commonList, commonId} = require('@validators/common');

const CorrectionCreateValidator = parameter => {
    const schema = Zod.object({
        message: Zod.string({
            required_error: 'message 不能为空',
            invalid_type_error: 'message 类型错误'
        })
            .max(255, {
                message: 'message 长度不能超过255'
            })
            .min(1, 'message 不能为空')
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

const CorrectionListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        status: Zod.number({
            invalid_type_error: 'status 类型错误'
        })
            .array()
            .optional(),
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

const CorrectionDeleteValidator = parameter => {
    const schema = Zod.object({
        ...commonId
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

const CorrectionEditValidator = parameter => {
    const schema = Zod.object({
        ...commonId,
        message: Zod.string({
            required_error: 'message 不能为空',
            invalid_type_error: 'message 类型错误'
        })
            .max(255, {
                message: 'message 长度不能超过255'
            })
            .min(1, 'message 不能为空'),
        status: Zod.number({
            required_error: 'status 不能为空',
            invalid_type_error: 'status 类型错误'
        })
            .int('status 必须为整数')
            .min(0, 'status 最小为0')
            .max(1, 'status 最大为1')
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

module.exports = {
    CorrectionCreateValidator,
    CorrectionListValidator,
    CorrectionDeleteValidator,
    CorrectionEditValidator
};
