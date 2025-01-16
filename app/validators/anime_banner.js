const Zod = require('zod');
const {commonList, validate, commonIdValidator} = require('@validators/common');

const AnimeBannerListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).optional()
    });
    return validate(schema, parameter);
};

module.exports = {
    AnimeBannerCreateValidator: commonIdValidator,
    AnimeBannerListValidator,
    AnimeBannerDeleteValidator: commonIdValidator
};
