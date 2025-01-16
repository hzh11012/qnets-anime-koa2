const Zod = require('zod');
const {
    commonId,
    commonList,
    validate,
    commonIdValidator
} = require('@validators/common');

const COVER_REG = /^(https?:)?\/\/.*\.(jpe?g|png|webp)$/,
    BANNER_REG = /^(https?:)?\/\/.*\.(jpe?g|png|webp)$/;

const animeCreateSchema = {
    series_id: Zod.number({
        required_error: 'series_id 不能为空',
        invalid_type_error: 'series_id 类型错误'
    }),
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
        .max(1000, {
            message: 'description 长度不能超过1000'
        })
        .min(1, 'description 不能为空'),
    cover_url: Zod.string({
        required_error: 'cover_url 不能为空',
        invalid_type_error: 'cover_url 类型错误'
    })
        .max(255, {
            message: 'cover_url 长度不能超过255'
        })
        .min(1, 'cover_url 不能为空')
        .regex(COVER_REG, {
            message: 'cover_url 格式不正确'
        }),
    banner_url: Zod.string({
        required_error: 'banner_url 不能为空',
        invalid_type_error: 'banner_url 类型错误'
    })
        .max(255, {
            message: 'banner_url 长度不能超过255'
        })
        .min(1, 'banner_url 不能为空')
        .regex(BANNER_REG, {
            message: 'banner_url 格式不正确'
        }),
    remark: Zod.string({
        invalid_type_error: 'remark 类型错误'
    })
        .max(50, {
            message: 'remark 长度不能超过50'
        })
        .optional(),
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
        .optional(),
    cv: Zod.string({
        invalid_type_error: 'cv 类型错误'
    })
        .max(255, {
            message: 'cv 长度不能超过255'
        })
        .optional(),
    year: Zod.number({
        required_error: 'year 不能为空',
        invalid_type_error: 'year 类型错误'
    })
        .int('year 必须为整数')
        .min(1970, 'year 最小为1970')
        .max(2099, 'year 最大为2099'),
    month: Zod.number({
        required_error: 'month 不能为空',
        invalid_type_error: 'month 类型错误'
    })
        .int('month 必须为整数')
        .min(0, 'month 最小为0')
        .max(3, 'month 最大为3'),
    season_name: Zod.string({
        invalid_type_error: 'season_name 类型错误'
    })
        .max(10, {
            message: 'season_name 长度不能超过10'
        })
        .optional(),
    season: Zod.number({
        required_error: 'season 不能为空',
        invalid_type_error: 'season 类型错误'
    })
        .int('season 必须为整数')
        .min(1, 'season 最小为1'),
    category: Zod.number({
        required_error: 'category 不能为空',
        invalid_type_error: 'category 类型错误'
    })
        .array()
        .nonempty({
            message: `category 不能为空`
        })
};

const animeEditSchema = {
    series_id: Zod.number({
        invalid_type_error: 'series_id 类型错误'
    }).optional(),
    name: Zod.string({
        invalid_type_error: 'name 类型错误'
    })
        .max(50, {
            message: 'name 长度不能超过50'
        })
        .optional(),
    description: Zod.string({
        invalid_type_error: 'description 类型错误'
    })
        .max(1000, {
            message: 'description 长度不能超过1000'
        })
        .optional(),
    cover_url: Zod.string({
        invalid_type_error: 'cover_url 类型错误'
    })
        .max(255, {
            message: 'cover_url 长度不能超过255'
        })
        .regex(COVER_REG, {
            message: 'cover_url 格式不正确'
        })
        .optional(),
    banner_url: Zod.string({
        invalid_type_error: 'banner_url 类型错误'
    })
        .max(255, {
            message: 'banner_url 长度不能超过255'
        })
        .regex(BANNER_REG, {
            message: 'banner_url 格式不正确'
        })
        .optional(),
    remark: Zod.string({
        invalid_type_error: 'remark 类型错误'
    })
        .max(50, {
            message: 'remark 长度不能超过50'
        })
        .optional(),
    status: Zod.number({
        invalid_type_error: 'status 类型错误'
    })
        .int('status 必须为整数')
        .min(0, 'status 最小为0')
        .max(2, 'status 最大为2')
        .optional(),
    type: Zod.number({
        invalid_type_error: 'type 类型错误'
    })
        .int('type 必须为整数')
        .min(0, 'type 最小为0')
        .max(3, 'type 最大为3')
        .optional(),
    director: Zod.string({
        invalid_type_error: 'director 类型错误'
    })
        .max(25, {
            message: 'director 长度不能超过25'
        })
        .optional(),
    cv: Zod.string({
        invalid_type_error: 'cv 类型错误'
    })
        .max(255, {
            message: 'cv 长度不能超过255'
        })
        .optional(),
    year: Zod.number({
        invalid_type_error: 'year 类型错误'
    })
        .int('year 必须为整数')
        .min(1970, 'year 最小为1970')
        .max(2099, 'year 最大为2099')
        .optional(),
    month: Zod.number({
        invalid_type_error: 'month 类型错误'
    })
        .int('month 必须为整数')
        .min(0, 'month 最小为0')
        .max(3, 'month 最大为3')
        .optional(),
    season_name: Zod.string({
        invalid_type_error: 'season_name 类型错误'
    })
        .max(10, {
            message: 'season_name 长度不能超过10'
        })
        .optional(),
    season: Zod.number({
        invalid_type_error: 'season 类型错误'
    })
        .int('season 必须为整数')
        .min(1, 'season 最小为1')
        .optional(),
    category: Zod.number({
        invalid_type_error: 'category 类型错误'
    })
        .array()
        .optional()
};

const AnimeCreateValidator = parameter => {
    const schema = Zod.object(animeCreateSchema);
    return validate(schema, parameter);
};

const AnimeEditValidator = parameter => {
    const schema = Zod.object({
        ...commonId,
        ...animeEditSchema
    }).refine(
        obj =>
            obj.series_id !== undefined ||
            obj.name !== undefined ||
            obj.description !== undefined ||
            obj.cover_url !== undefined ||
            obj.banner_url !== undefined ||
            obj.remark !== undefined ||
            obj.status !== undefined ||
            obj.type !== undefined ||
            obj.director !== undefined ||
            obj.cv !== undefined ||
            obj.year !== undefined ||
            obj.month !== undefined ||
            obj.season_name !== undefined ||
            obj.season !== undefined ||
            obj.category !== undefined,
        '缺少参数'
    );
    return validate(schema, parameter);
};

const AnimeListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).optional(),
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
    return validate(schema, parameter);
};

module.exports = {
    AnimeCreateValidator,
    AnimeListValidator,
    AnimeDeleteValidator: commonIdValidator,
    AnimeEditValidator,
    AnimeDetailValidator: commonIdValidator
};
