const Zod = require('zod');
const {ParameterException} = require('@core/http-exception');
const {commonList, commonId} = require('@validators/common');

const COVER_REG = /^(https?:)?\/\/.*\.(jpe?g|png|webp)$/;
const YEAR_REG = /^\d{4}$/;

const AnimeCreateValidator = parameter => {
    const schema = Zod.object({
        name: Zod.string({
            required_error: 'name 不能为空',
            invalid_type_error: 'name 类型错误'
        })
            .max(50, {
                message: 'name 长度不能超过50'
            })
            .min(1, 'name 不能为空'),
        description: Zod.string({
            required_error: 'description 不能为空',
            invalid_type_error: 'description 类型错误'
        })
            .max(255, {
                message: 'description 长度不能超过255'
            })
            .min(1, 'description 不能为空'),
        cover: Zod.string({
            required_error: 'cover 不能为空',
            invalid_type_error: 'cover 类型错误'
        })
            .max(255, {
                message: 'cover 长度不能超过255'
            })
            .min(1, 'cover 不能为空')
            .regex(COVER_REG, {
                message: 'cover 格式不正确'
            }),
        remark: Zod.string({
            invalid_type_error: 'remark 类型错误'
        })
            .max(50, {
                message: 'remark 长度不能超过50'
            })
            .nullish(),
        status: Zod.number({
            required_error: 'status 不能为空',
            invalid_type_error: 'status 类型错误'
        })
            .int('status 必须为整数')
            .min(0, 'status 最小为0')
            .max(2, 'status 最大为2'),
        type: Zod.number({
            required_error: 'type 不能为空',
            invalid_type_error: 'type 类型错误'
        })
            .int('type 必须为整数')
            .min(0, 'type 最小为0')
            .max(3, 'type 最大为3'),
        director: Zod.string({
            invalid_type_error: 'director 类型错误'
        })
            .max(25, {
                message: 'director 长度不能超过25'
            })
            .nullish(),
        cv: Zod.string({
            invalid_type_error: 'cv 类型错误'
        })
            .max(255, {
                message: 'cv 长度不能超过255'
            })
            .nullish(),
        year: Zod.string({
            required_error: 'year 不能为空',
            invalid_type_error: 'year 类型错误'
        })
            .min(1, {
                message: 'year 不能为空'
            })
            .regex(YEAR_REG, {
                message: 'year 格式不正确'
            }),
        month: Zod.number({
            required_error: 'month 不能为空',
            invalid_type_error: 'month 类型错误'
        })
            .int('month 必须为整数')
            .min(0, 'month 最小为0')
            .max(3, 'month 最大为3'),
        category: Zod.number({
            invalid_type_error: 'category 类型错误'
        })
            .array()
            .optional()
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

const AnimeListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        searchType: Zod.enum(['name', 'director', 'cv', '', null], {
            message: 'type 参数错误'
        }).nullish(),
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).nullish(),
        status: Zod.number({
            invalid_type_error: 'status 类型错误'
        })
            .array()
            .optional(),
        type: Zod.number({
            invalid_type_error: 'type 类型错误'
        })
            .array()
            .optional(),
        year: Zod.number({
            invalid_type_error: 'year 类型错误'
        })
            .array()
            .optional(),
        month: Zod.number({
            invalid_type_error: 'month 类型错误'
        })
            .array()
            .optional(),
        category: Zod.number({
            invalid_type_error: 'category 类型错误'
        })
            .array()
            .optional()
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

const AnimeDeleteValidator = parameter => {
    const schema = Zod.object({
        ...commonId
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

module.exports = {
    AnimeCreateValidator,
    AnimeListValidator,
    AnimeDeleteValidator
};
