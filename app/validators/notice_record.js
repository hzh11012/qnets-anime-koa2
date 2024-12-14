const Zod = require('zod');
const {commonList, validate, commonIdValidator} = require('@validators/common');

const NoticeRecordListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).optional(),
        status: Zod.number({
            invalid_type_error: 'status 类型错误'
        })
            .array()
            .optional()
    });
    return validate(schema, parameter);
};

module.exports = {
    NoticeRecordReadValidator: commonIdValidator,
    NoticeRecordListValidator,
    NoticeRecordDeleteValidator: commonIdValidator
};
