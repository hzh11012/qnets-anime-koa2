const {User} = require('@models/user');
const {Anime} = require('@models/anime');
const {Rating} = require('@app/models/rating');
const {NotFound, Existing} = require('@core/http-exception');
const {col} = require('sequelize');
const WhereFilter = require('@lib/where-filter');

class RatingDao {
    /**
     * @title 创建评分
     * @param {number} user_id 用户ID
     * @param {number} anime_id 动漫ID
     * @param {number} score 评分
     * @param {string} content 评论
     */
    static async create(params) {
        const {user_id, anime_id, score, content} = params;

        const where = new WhereFilter()
            .setWhere('user_id', user_id)
            .setWhere('anime_id', anime_id);

        try {
            const anime = await Anime.findByPk(anime_id);
            if (!anime) throw new NotFound('动漫不存在');

            const rating = await Rating.findOne({where});
            if (rating) throw new Existing('已评分');

            await Rating.create({
                user_id,
                anime_id,
                score,
                content
            });

            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 评分列表 - admin
     * @param {number} page 分页 [可选]
     * @param {number} pageSize 每页数量 [可选]
     * @param {string} keyword 搜索关键词 [可选]
     * @param {string} order 排序 [可选]
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
            .setSearch(['$User.nickname$', '$Anime.name$', 'content'], keyword)
            .getFilter();

        try {
            const list = await Rating.findAndCountAll({
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
     * @title 删除评分 - admin
     * @param {number} id 评分ID
     */
    static async adminDelete(params) {
        const {id} = params;
        try {
            const rating = await Rating.findByPk(id);
            if (!rating) throw new NotFound('评分不存在');

            await rating.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    RatingDao
};
