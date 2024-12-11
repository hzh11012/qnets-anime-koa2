const {User} = require('@models/user');
const {Anime} = require('@models/anime');
const {Rating} = require('@models/rating');
const {NotFound, Existing} = require('@core/http-exception');
const {col} = require('sequelize');
const WhereFilter = require('@lib/where-filter');

class RatingDao {
    // 创建评分
    static async create(params) {
        const {uid, aid, score, content} = params;
        try {
            const hasAnime = await Anime.findByPk(aid);
            if (!hasAnime) throw new NotFound('动漫不存在');

            const hasRating = await Rating.findOne({
                where: {
                    uid,
                    aid,
                    deleted_at: null
                }
            });
            if (hasRating) throw new Existing('已评分');

            const rating = new Rating();
            rating.uid = uid;
            rating.aid = aid;
            rating.score = score;
            rating.content = content;
            await rating.save();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 评分列表
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
            const list = await Rating.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                attributes: {
                    exclude: ['uid', 'aid', 'updated_at', 'deleted_at']
                },
                distinct: true,
                include: [
                    {
                        model: Anime,
                        as: 'anime',
                        attributes: [
                            'id',
                            'name',
                            'cover',
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

    // 评分列表 - admin
    static async adminList(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            order = 'DESC',
            orderBy = 'created_at'
        } = params;

        const where_filter = new WhereFilter();
        where_filter.setSearch(
            ['$User.nickname$', '$Anime.name$', 'content'],
            keyword
        );
        const filter = where_filter.getFilter();

        try {
            const list = await Rating.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                attributes: {
                    exclude: ['updated_at', 'deleted_at'],
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
                            'cover',
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

    // 删除评分
    static async delete(params) {
        const {uid, aid} = params;
        try {
            const rating = await Rating.findOne({
                where: {
                    uid,
                    aid,
                    deleted_at: null
                }
            });
            if (!rating) throw new NotFound('评分不存在');
            await rating.destroy();
            return [(null, null)];
        } catch (err) {
            return [err, null];
        }
    }

    // 删除评分 - admin
    static async adminDelete(params) {
        const {id} = params;
        try {
            const rating = await Rating.findByPk(id);
            if (!rating) throw new NotFound('评分不存在');
            await rating.destroy();
            return [(null, null)];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    RatingDao
};
