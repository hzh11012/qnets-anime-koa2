const Zod = require('zod');
const {ParameterException} = require('@core/http-exception');

const CorrectionCreateValidator = parameter => {
    const schema = Zod.object({
        message: Zod.string({
            required_error: 'message 不能为空',
            invalid_type_error: 'message 类型错误'
        }).max(255, {
            message: 'message 长度不能超过255'
        })
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

const CorrectionUpdateValidator = parameter => {
    const schema = Zod.object({
        id: Zod.number({
            required_error: 'id 不能为空',
            invalid_type_error: 'id 类型错误'
        }),
        status: Zod.number({
            required_error: 'status 不能为空',
            invalid_type_error: 'status 类型错误'
        })
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

module.exports = {
    CorrectionCreateValidator,
    CorrectionUpdateValidator
};
