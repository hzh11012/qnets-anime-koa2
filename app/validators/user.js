const Zod = require('zod');
const {ParameterException} = require('@core/http-exception');
const {commonList, commonId} = require('@validators/common');

const UserListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        scope: Zod.number({
            invalid_type_error: 'scope 类型错误'
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

const UserDeleteValidator = parameter => {
    const schema = Zod.object({
        ...commonId
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

const UserAdminEditValidator = parameter => {
    const schema = Zod.object({
        ...commonId,
        nickname: Zod.string({
            required_error: 'nickname 不能为空',
            invalid_type_error: 'nickname 类型错误'
        })
            .max(25, {
                message: 'nickname 长度不能超过25'
            })
            .min(1, 'nickname 不能为空'),
        avatar: Zod.string({
            invalid_type_error: 'avatar 类型错误'
        })
            .max(255, {
                message: 'avatar 长度不能超过255'
            })
            .nullish(),
        scope: Zod.number({
            required_error: 'scope 不能为空',
            invalid_type_error: 'scope 类型错误'
        })
            .int('scope 必须为整数')
            .min(-1, 'scope 最小为-1')
            .max(3, 'scope 最大为3')
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

module.exports = {
    UserListValidator,
    UserDeleteValidator,
    UserAdminEditValidator
};
