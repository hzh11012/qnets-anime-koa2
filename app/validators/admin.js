const Zod = require('zod');
const {ParameterException} = require('@core/http-exception');

const PHONE_REG = /^1[3456789]\d{9}$/;
const PASSWORD_REG = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d_=+.]{8,24}$/;

const RegisterValidator = parameter => {
    const schema = Zod.object({
        phone: Zod.string({
            required_error: '手机号不能为空',
            invalid_type_error: '手机号类型错误'
        }).regex(PHONE_REG, {
            message: '手机号格式错误'
        }),
        password: Zod.string({
            required_error: '密码不能为空',
            invalid_type_error: '密码类型错误'
        }).regex(PASSWORD_REG, {
            message:
                '密码至少需要包含一个字母、一个数字，且长度为8-24位（允许存在特殊符号_=+.）'
        })
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

const LoginValidator = parameter => {
    const schema = Zod.object({
        phone: Zod.string({
            required_error: '手机号不能为空',
            invalid_type_error: '手机号类型错误'
        }).regex(PHONE_REG, {
            message: '手机号格式错误'
        }),
        password: Zod.string({
            required_error: '密码不能为空',
            invalid_type_error: '密码类型错误'
        })
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

module.exports = {
    RegisterValidator,
    LoginValidator
};
