const {User} = require('@models/user');
const {random} = require('@core/utils');
const WhereFilter = require('@lib/where-filter');

class UserDao {
    // 用户信息创建/获取
    static async init(params) {
        const {phone} = params;

        try {
            const hasUser = await User.findOne({where: {phone}});

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

        const where_filter = new WhereFilter();
        where_filter.setFilter('scope', scope);
        where_filter.setSearch(type, keyword);
        const filter = where_filter.getFilter();

        try {
            const list = await User.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                where: filter,
                attributes: {
                    exclude: ['updated_at']
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
            const user = await User.findByPk(id);
            if (!user) throw new NotFound('用户不存在');
            await user.destroy();
            // TODO: 后续可能要连带删除其他表中该用户的数据
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 用户信息修改 - admin
    static async adminEdit(params) {
        const {id, nickname, avatar, scope} = params;
        try {
            const user = await User.findByPk(id);
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
