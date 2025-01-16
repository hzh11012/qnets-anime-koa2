const {User} = require('@models/user');
const {Message} = require('@models/message');
const {NotFound} = require('@core/http-exception');
const {col} = require('sequelize');
const WhereFilter = require('@lib/where-filter');

class MessageDao {
    /**
     * @title 创建留言
     * @param {number} user_id - 用户ID
     * @param {number} type - 留言类型
     * @param {string} content - 留言内容
     */
    static async create(params) {
        const {user_id, type, content} = params;

        try {
            await Message.create({
                user_id,
                type,
                content
            });
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 留言列表 - admin
     * @param {number} page - 页码 [可选]
     * @param {number} pageSize - 每页数量 [可选]
     * @param {string} keyword - 关键词 [可选]
     * @param {string} order - 排序 [可选]
     * @param {string} orderBy - 排序字段 [可选]
     * @param {string} type - 类型 [可选]
     * @param {number} status - 状态 [可选]
     */
    static async list(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            order = 'DESC',
            orderBy = 'created_at',
            searchType = 'content',
            type,
            status
        } = params;

        const where = new WhereFilter()
            .setFilter('type', type)
            .setFilter('status', status)
            .setSearch(searchType, keyword)
            .getFilter();

        try {
            const list = await Message.findAndCountAll({
                where,
                attributes: {
                    exclude: ['updated_at'],
                    include: [[col('User.nickname'), 'nickname']]
                },
                include: [
                    {
                        model: User,
                        attributes: []
                    }
                ],
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
     * @title 删除留言 - admin
     * @param {number} id - 留言ID
     */
    static async delete(params) {
        const {id} = params;
        try {
            const message = await Message.findByPk(id);
            if (!message) throw new NotFound('留言不存在');
            await message.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 留言修改 - admin
     * @param {number} id - 留言ID
     * @param {string} reply_content - 回复内容 [可选]
     * @param {number} status - 状态 [可选]
     */
    static async edit(params) {
        const {id, ...rest} = params;
        try {
            const message = await Message.findByPk(id);
            if (!message) throw new NotFound('留言不存在');

            await message.update(rest);
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    MessageDao
};
