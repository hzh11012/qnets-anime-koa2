const {User} = require('@app/models/user');
const {NotFound, Existing} = require('@core/http-exception');
const {random} = require('@core/utils');

class UserDao {
    // 用户信息创建/获取
    static async init(params) {
        const {phone} = params;

        const hasUser = await User.findOne({
            where: {
                phone,
                deleted_at: null
            }
        });

        if (hasUser) {
            return [null, hasUser];
        }

        const user = new User();
        user.phone = phone;
        user.nickname = '用户' + random(8);
        user.scope = 0;

        try {
            const res = await user.save();
            return [null, res];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    UserDao
};
