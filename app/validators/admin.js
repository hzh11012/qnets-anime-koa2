const Joi = require('joi');
const {ParameterException} = require('@core/http-exception');

const PHONE_REG = /^1[3456789]\d{9}$/;
const PASSWORD_REG = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d_=+.]{8,24}$/;

const RegisterValidator = parameter => {
    const schema = Joi.object({
        phone: Joi.string().required().pattern(PHONE_REG).messages({
            'any.required': '手机号不能为空',
            'string.empty': '手机号不能为空',
            'string.pattern.base': '手机号格式错误'
        }),
        password: Joi.string().required().pattern(PASSWORD_REG).messages({
            'any.required': '密码不能为空',
            'string.empty': '密码不能为空',
            'string.pattern.base':
                '密码至少需要包含一个字母、一个数字，且长度为8-24位（允许存在特殊符号_=+.）'
        })
    });
    const result = schema.validate(parameter);

    if (result.error) {
        throw new ParameterException(result.error.details[0].message);
    }
    return result.value;
};

module.exports = {
    RegisterValidator,
    LoginValidator: RegisterValidator
};
