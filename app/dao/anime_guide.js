const {AnimeGuide} = require('@models/anime_guide');
const {Anime} = require('@models/anime');
const {Video} = require('@app/models/video');
const {NotFound, Existing} = require('@core/http-exception');
const WhereFilter = require('@lib/where-filter');

class AnimeGuideDao {
    /**
     * @title 添加新番导视
     * @param {number} anime_id 动漫ID
     * @param {string} update_day 动漫更新日 1-7 分别对应周一到周日
     * @param {string} update_time 动漫更新时间
     */
    static async create(params) {
        const {anime_id, update_day, update_time} = params;

        const where = new WhereFilter()
            .setWhere('anime_id', anime_id)
            .getFilter();

        try {
            const anime = await Anime.findByPk(anime_id);
            if (!anime) throw new NotFound('动漫不存在');

            const anime_guide = await AnimeGuide.findOne({where});
            if (anime_guide) throw new Existing('新番导视已存在');

            await AnimeGuide.create({
                anime_id,
                update_day,
                update_time
            });
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 新番导视列表
     * @param {number} page 页码 [可选]
     * @param {number} pageSize 每页数量 [可选]
     * @param {string} keyword 搜索关键词 [可选]
     * @param {number} update_day 更新日 1-7 分别对应周一到周日 [可选]
     * @param {string} order 排序方式 [可选]
     * @param {string} orderBy 排序字段 [可选]
     */
    static async list(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            update_day,
            order = 'DESC',
            orderBy = 'created_at'
        } = params;

        const where = new WhereFilter()
            .setFilter('update_day', update_day)
            .setSearch('$Anime.name$', keyword)
            .getFilter();

        try {
            const list = await AnimeGuide.findAndCountAll({
                where,
                attributes: {exclude: ['updated_at']},
                distinct: true,
                include: [
                    {
                        model: Anime,
                        attributes: [
                            'id',
                            'name',
                            'description',
                            'cover_url',
                            'status',
                            'remark'
                        ],
                        include: [
                            {
                                model: Video,
                                attributes: ['id', 'episode'],
                                limit: 1,
                                order: [['episode', 'DESC']],
                                separate: true
                            }
                        ]
                    }
                ],
                order: [[orderBy, order]],
                limit: pageSize,
                offset: (page - 1) * pageSize
            });

            const data = list.rows.map(item => {
                const {
                    id,
                    anime_id,
                    update_day,
                    update_time,
                    created_at,
                    anime
                } = item;
                const {name, description, cover_url, videos, status, remark} =
                    anime;

                return {
                    id,
                    anime_id,
                    update_day,
                    update_time,
                    title: name,
                    description,
                    cover_url,
                    status,
                    remark,
                    created_at,
                    latest_video: videos[0]
                };
            });

            return [
                null,
                {
                    ...list,
                    rows: data
                }
            ];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 新番导视删除
     * @param {number} id 新番导视ID
     */
    static async delete(params) {
        const {id} = params;

        try {
            const anime_guide = await AnimeGuide.findByPk(id);
            if (!anime_guide) throw new NotFound('新番导视不存在');
            await anime_guide.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    AnimeGuideDao
};
