const Zod = require('zod');
const {commonId, validate, commonIdValidator} = require('@validators/common');

const URL_REG = /^(https?:)?\/\/.*\.(m3u8)$/;

const VideoCreateValidator = parameter => {
    const schema = Zod.object({
        ...commonId,
        title: Zod.string({
            required_error: 'title 不能为空',
            invalid_type_error: 'title 类型错误'
        })
            .max(50, {
                message: 'title 长度不能超过50'
            })
            .min(1, 'title 不能为空'),
        url: Zod.string({
            required_error: 'url 不能为空',
            invalid_type_error: 'url 类型错误'
        })
            .max(255, {
                message: 'url 长度不能超过255'
            })
            .min(1, 'url 不能为空')
            .regex(URL_REG, {
                message: 'url 格式不正确'
            }),
        season: Zod.number({
            required_error: 'season 不能为空',
            invalid_type_error: 'season 类型错误'
        })
            .int('season 必须为整数')
            .min(1, 'season 最小为1'),
        episode: Zod.number({
            required_error: 'episode 不能为空',
            invalid_type_error: 'episode 类型错误'
        })
            .int('episode 必须为整数')
            .min(1, 'episode 最小为1')
    });
    return validate(schema, parameter);
};

module.exports = {
    VideoCreateValidator,
    VideoPlayValidator: commonIdValidator,
    VideoDeleteValidator: commonIdValidator
};
