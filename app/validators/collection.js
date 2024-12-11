const Zod = require('zod');
const {commonList, commonIdValidator, validate} = require('@validators/common');

const CollectionListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).optional()
    });
    return validate(schema, parameter);
};

module.exports = {
    CollectionCreateValidator: commonIdValidator,
    CollectionListValidator,
    CollectionCancelValidator: commonIdValidator
};
