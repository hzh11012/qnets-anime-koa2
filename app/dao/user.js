const {User} = require('@app/models/user');
const {random} = require('@core/utils');
const {Op} = require('sequelize');

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

    static async list(params) {
        const {
            page = 1,
            pageSize = 10,
            scope,
            keyword,
            type = 'nickname',
            order = 'DESC',
            orderBy = 'created_at'
        } = params;
        let filter = {
            deleted_at: null
        };

        if (Array.isArray(scope)) {
            filter.scope = {
                [Op.in]: scope
            };
        }

        if (keyword) {
            filter[type] = {
                [Op.like]: `%${keyword}%`
            };
        }

        try {
            const list = await User.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                where: filter,
                attributes: {
                    exclude: ['updated_at', 'deleted_at']
                },
                order: [[orderBy, order]]
            });
            return [null, list];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    UserDao
};
