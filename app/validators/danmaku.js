const Zod = require('zod');
const {ParameterException} = require('@core/http-exception');
const {commonList} = require('@validators/common');

const DanmakuListValidator = parameter => {
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

const DanmakuDeleteValidator = parameter => {
    const schema = Zod.object({
        id: Zod.string({
            required_error: 'id 不能为空',
            invalid_type_error: 'id 类型错误'
        })
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

module.exports = {
    DanmakuListValidator,
    DanmakuDeleteValidator
};
