const {User} = require('@models/user');
const {Anime} = require('@models/anime');
const {Collection} = require('@models/collection');
const {NotFound, Existing} = require('@core/http-exception');
const {col} = require('sequelize');
const WhereFilter = require('@lib/where-filter');

class CollectionDao {
    /**
     * @title 创建收藏
     * @param {number} user_id 用户ID
     * @param {number} anime_id 动漫ID
     */
    static async create(params) {
        const {user_id, anime_id} = params;

        const where = new WhereFilter()
            .setWhere('user_id', user_id)
            .setWhere('anime_id', anime_id)
            .getFilter();

        try {
            const anime = await Anime.findByPk(anime_id);
            if (!anime) throw new NotFound('动漫不存在');

            const collection = await Collection.findOne({where});
            if (collection) throw new Existing('已收藏');

            await Collection.create({user_id, anime_id});
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 收藏列表 - admin
     * @param {number} page 页码 [可选]
     * @param {number} pageSize 每页数量 [可选]
     * @param {string} keyword 搜索关键字 [可选]
     * @param {string} order 排序方式 [可选]
     * @param {string} orderBy 排序字段 [可选]
     */
    static async adminList(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            order = 'DESC',
            orderBy = 'created_at'
        } = params;

        const where = new WhereFilter()
            .setSearch(['$User.nickname$', '$Anime.name$'], keyword)
            .getFilter();

        try {
            const list = await Collection.findAndCountAll({
                where,
                attributes: {
                    exclude: ['updated_at'],
                    include: [[col('User.nickname'), 'nickname']]
                },
                distinct: true,
                include: [
                    {
                        model: User,
                        attributes: []
                    },
                    {
                        model: Anime,
                        attributes: [
                            'name',
                            'cover_url',
                            'remark',
                            'status',
                            'type'
                        ]
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
     * @title 取消收藏
     * @param {number} user_id 用户ID
     * @param {number} anime_id 动漫ID
     */
    static async delete(params) {
        const {user_id, anime_id} = params;

        const where = new WhereFilter()
            .setWhere('user_id', user_id)
            .setWhere('anime_id', anime_id)
            .getFilter();

        try {
            const collection = await Collection.findOne({where});
            if (!collection) throw new NotFound('收藏不存在');

            await collection.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 取消收藏 - admin
     * @param {number} id 收藏ID
     */
    static async adminDelete(params) {
        const {id} = params;
        try {
            const collection = await Collection.findByPk(id);
            if (!collection) throw new NotFound('收藏不存在');

            await collection.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    CollectionDao
};
