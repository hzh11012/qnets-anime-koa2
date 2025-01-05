const Zod = require('zod');
const {
    commonList,
    commonId,
    validate,
    commonIdValidator
} = require('@validators/common');

const NewAnimeCreateValidator = parameter => {
    const schema = Zod.object({
        ...commonId,
        update_day: Zod.number({
            required_error: 'update_day 不能为空',
            invalid_type_error: 'update_day 类型错误'
        })
            .int('update_day 必须为整数')
            .min(1, 'update_day 最小为1')
            .max(7, 'update_day 最大为7'),
        update_time: Zod.string({
            required_error: 'update_time 不能为空',
            invalid_type_error: 'update_time 类型错误'
        }).time({
            message: 'update_time 格式错误'
        })
    });
    return validate(schema, parameter);
};

const NewAnimeListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        update_day: Zod.number({
            invalid_type_error: 'update_day 类型错误'
        })
            .array()
            .optional(),
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).optional()
    });
    return validate(schema, parameter);
};

module.exports = {
    NewAnimeCreateValidator,
    NewAnimeListValidator,
    NewAnimeDeleteValidator: commonIdValidator
};
