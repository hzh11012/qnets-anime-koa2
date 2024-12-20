const {User} = require('@models/user');
const {Anime} = require('@models/anime');
const {Collection} = require('@models/collection');
const {NotFound, Existing} = require('@core/http-exception');
const {col} = require('sequelize');
const WhereFilter = require('@lib/where-filter');

class CollectionDao {
    // 创建收藏
    static async create(params) {
        const {uid, aid} = params;
        try {
            const hasAnime = await Anime.findByPk(aid);
            if (!hasAnime) throw new NotFound('动漫不存在');

            const hasCollection = await Collection.findOne({
                where: {
                    uid,
                    aid
                }
            });
            if (hasCollection) throw new Existing('已收藏');

            const collection = new Collection();
            collection.uid = uid;
            collection.aid = aid;
            await collection.save();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 收藏列表
    static async list(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            type = 'name',
            order = 'DESC',
            orderBy = 'created_at'
        } = params;

        const where_filter = new WhereFilter();
        where_filter.setSearch(type, keyword);
        const filter = where_filter.getFilter();

        try {
            const list = await Collection.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                attributes: {
                    exclude: ['uid', 'aid', 'updated_at']
                },
                distinct: true,
                include: [
                    {
                        model: Anime,
                        as: 'anime',
                        attributes: [
                            'id',
                            'name',
                            'cover_url',
                            'remark',
                            'status',
                            'type'
                        ],
                        where: filter
                    }
                ],
                order: [[orderBy, order]]
            });
            return [null, list];
        } catch (err) {
            return [err, null];
        }
    }

    // 收藏列表 - admin
    static async adminList(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            order = 'DESC',
            orderBy = 'created_at'
        } = params;

        const where_filter = new WhereFilter();
        where_filter.setSearch(['$User.nickname$', '$Anime.name$'], keyword);
        const filter = where_filter.getFilter();

        try {
            const list = await Collection.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
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
                        as: 'anime',
                        attributes: [
                            'name',
                            'cover_url',
                            'remark',
                            'status',
                            'type'
                        ]
                    }
                ],
                where: filter,
                order: [[orderBy, order]]
            });
            return [null, list];
        } catch (err) {
            return [err, null];
        }
    }

    // 取消收藏
    static async delete(params) {
        const {uid, aid} = params;
        try {
            const collection = await Collection.findOne({
                where: {
                    uid,
                    aid
                }
            });
            if (!collection) throw new NotFound('收藏不存在');
            await collection.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 取消收藏 - admin
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
