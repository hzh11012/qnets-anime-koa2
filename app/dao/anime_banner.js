const {AnimeBanner} = require('@models/anime_banner');
const {Anime} = require('@models/anime');
const {Video} = require('@app/models/video');
const {Collection} = require('@app/models/collection');
const {NotFound, Existing} = require('@core/http-exception');
const {col} = require('sequelize');
const WhereFilter = require('@lib/where-filter');

class AnimeBannerDao {
    /**
     * @title 新增轮播图
     * @param {number[]} anime_ids - 动漫ID数组
     */
    static async create(params) {
        const {anime_ids} = params;

        const where = new WhereFilter().setFilter('id', anime_ids).getFilter();

        const banner_where = new WhereFilter()
            .setFilter('anime_id', anime_ids)
            .getFilter();

        try {
            const anime = await Anime.findAll({where});
            if (anime.length !== anime_ids.length)
                throw new NotFound('动漫不存在');

            const anime_banner = await AnimeBanner.findAll({
                where: banner_where
            });
            if (anime_banner.length) throw new Existing('轮播图已存在');

            const id_array = anime_ids.map(id => {
                return {anime_id: id};
            });
            await AnimeBanner.bulkCreate(id_array);
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 轮播图列表 - admin
     * @param {number} page - 页码 [可选]
     * @param {number} pageSize - 每页数量 [可选]
     * @param {string} keyword - 搜索关键词 [可选]
     * @param {string} order - 排序方式 [可选]
     * @param {string} orderBy - 排序字段 [可选]
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
            .setSearch('$Anime.name$', keyword)
            .getFilter();

        try {
            const list = await AnimeBanner.findAndCountAll({
                where,
                attributes: {
                    exclude: ['updated_at'],
                    include: [
                        [col('Anime.name'), 'title'],
                        [col('Anime.description'), 'description'],
                        [col('Anime.banner_url'), 'banner_url'],
                        [col('Anime.type'), 'type']
                    ]
                },
                distinct: true,
                include: [
                    {
                        model: Anime,
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
     * @title 轮播图展示
     * @param {number} user_id - 用户ID
     */
    static async list(params) {
        const {user_id} = params;

        try {
            const list = await AnimeBanner.findAll({
                attributes: ['id', 'anime_id'],
                distinct: true,
                include: [
                    {
                        model: Anime,
                        attributes: ['id', 'name', 'description', 'banner_url'],
                        include: [
                            {
                                model: Video,
                                attributes: ['id', 'episode', 'title'],
                                limit: 1,
                                order: [['episode', 'DESC']],
                                separate: true
                            },
                            {
                                model: Collection,
                                attributes: ['id'],
                                where: {user_id},
                                separate: true
                            }
                        ]
                    }
                ],
                order: [['created_at', 'DESC']],
                limit: 6,
                offset: 0
            });

            const data = list.map(item => {
                const {id, anime_id, anime} = item;
                const {name, description, banner_url, videos, collections} =
                    anime;
                return {
                    id,
                    anime_id,
                    title: name,
                    description,
                    banner_url,
                    is_collected: !!collections.length,
                    latest_video: videos[0]
                };
            });

            return [null, data];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 删除轮播图
     * @param {number} anime_id - 动漫ID
     */
    static async delete(params) {
        const {anime_id} = params;

        const where = new WhereFilter()
            .setFilter('anime_id', anime_id)
            .getFilter();

        try {
            const anime_banner = await AnimeBanner.findOne({where});
            if (!anime_banner) throw new NotFound('轮播图不存在');

            await anime_banner.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    AnimeBannerDao
};
