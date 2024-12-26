const Zod = require('zod');
const {commonList, validate, commonIdValidator} = require('@validators/common');

const BannerCreateValidator = parameter => {
    const schema = Zod.object({
        ids: Zod.number({
            invalid_type_error: 'id 类型错误'
        })
            .array()
            .min(1, 'ids 不能为空')
    });
    return validate(schema, parameter);
};

const BannerListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).optional()
    });
    return validate(schema, parameter);
};

module.exports = {
    BannerCreateValidator,
    BannerListValidator,
    BannerDeleteValidator: commonIdValidator
};
