const {User} = require('@app/models/user');
const {random} = require('@core/utils');
const {Op} = require('sequelize');

class UserDao {
    // 用户信息创建/获取
    static async init(params) {
        const {phone} = params;

        try {
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

            const res = await user.save();
            return [null, res];
        } catch (err) {
            return [err, null];
        }
    }

    // 用户信息列表
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

    // 用户信息删除
    static async delete(params) {
        const {id} = params;

        try {
            const user = await User.destroy({
                where: {
                    id,
                    deleted_at: null
                }
            });

            if (!user) throw new NotFound('用户不存在');

            // Todo 后续可能要连带删除其他表中该用户的数据

            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 用户信息修改 - admin
    static async adminEdit(params) {
        const {id, nickname, avatar, scope} = params;

        try {
            const user = await User.findOne({
                where: {
                    id,
                    deleted_at: null
                }
            });

            if (!user) throw new NotFound('用户不存在');

            user.nickname = nickname;
            user.avatar = avatar;
            user.scope = scope;

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
