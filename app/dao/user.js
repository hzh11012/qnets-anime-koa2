const {User} = require('@models/user');
const {random} = require('@core/utils');
const WhereFilter = require('@lib/where-filter');

class UserDao {
    /**
     * @title 用户创建/获取
     * @param {string} phone 手机号
     */
    static async createOrFind(params) {
        const {phone} = params;

        const where = new WhereFilter().setWhere('phone', phone).getFilter();
        try {
            const user = await User.findOrCreate({
                where,
                defaults: {
                    phone,
                    nickname: `用户${random(8)}`,
                    scope: 0
                }
            });
            return [null, user[0]];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 用户列表
     * @param {number} page 页码 [可选]
     * @param {number} pageSize 每页数量 [可选]
     * @param {number[]} scope 用户权限 -1-封禁 0-游客 1-普通用户 2-正式会员 3-管理员 [可选]
     * @param {string} keyword 搜索关键词 [可选]
     * @param {string} type 搜索类型 默认 nickname [可选]
     * @param {string} order 排序方向 默认 DESC [可选]
     * @param {string} orderBy 排序字段 默认 created_at [可选]
     */
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

        const where = new WhereFilter()
            .setFilter('scope', scope)
            .setSearch(type, keyword)
            .getFilter();

        try {
            const list = await User.findAndCountAll({
                where,
                attributes: {exclude: ['updated_at']},
                order: [[orderBy, order]],
                limit: pageSize,
                offset: (page - 1) * pageSize
            });
            return [null, list];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 用户删除
     * @param {string} id 用户ID
     */
    static async delete(params) {
        const {id} = params;
        try {
            const user = await User.findByPk(id);
            if (!user) throw new NotFound('用户不存在');
            await user.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 用户修改
     * @param {string} id 用户ID
     * @param {string} nickname 用户昵称 [可选]
     * @param {string} avatar 用户头像 [可选]
     * @param {number} scope 用户权限 -1-封禁 0-游客 1-普通用户 2-正式会员 3-管理员 [可选]
     */
    static async edit(params) {
        const {id, ...rest} = params;
        try {
            const user = await User.findByPk(id);
            if (!user) throw new NotFound('用户不存在');
            const res = await user.update(rest);
            return [null, res];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    UserDao
};
