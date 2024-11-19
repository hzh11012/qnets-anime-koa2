const Zod = require('zod');
const {ParameterException} = require('@core/http-exception');
const {commonList} = require('@app/validators/common');

const UserListValidator = parameter => {
    const schema = Zod.object({
        ...commonList,
        scope: Zod.number({
            invalid_type_error: 'scope 类型错误'
        })
            .array()
            .optional(),
        keyword: Zod.string({
            invalid_type_error: 'keyword 类型错误'
        }).nullish()
    });
    const result = schema.safeParse(parameter);

    if (!result.success) {
        throw new ParameterException(result.error.issues[0].message);
    }
    return result.data;
};

module.exports = {
    UserListValidator
};
