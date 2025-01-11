const {sequelize} = require('@core/db');
const {Anime} = require('@models/anime');
const {Video} = require('@models/video');
const {Series} = require('@models/series');
const {Rating} = require('@app/models/rating');
const {AnimeBanner} = require('@models/anime_banner');
const {Collection} = require('@models/collection');
const {Existing, NotFound} = require('@core/http-exception');
const WhereFilter = require('@lib/where-filter');
const {Category} = require('@models/category');
const {AnimeGuide} = require('@models/anime_guide');
const {Op, literal} = require('sequelize');

class AnimeDao {
    /**
     * @title 验证分类是否存在
     * @param {number[]} category 分类id
     */
    static async validateCategoryExists(category) {
        const where = new WhereFilter().setFilter('id', category).getFilter();
        const res = await Category.findAll({where});
        if (res.length !== category.length) throw new NotFound('分类不存在');
        return true;
    }

    /**
     * @title 验证系列是否存在
     * @param {number} series_id 系列id
     */
    static async validateSeriesExists(series_id) {
        const where = new WhereFilter().setWhere('id', series_id).getFilter();
        const res = await Series.findOne({where});
        if (!res) throw new NotFound('系列不存在');
        return true;
    }

    /**
     * @title 验证动漫是否存在
     * @param {number} series_id 系列id
     * @param {string} name 动漫名称
     * @param {number} season 动漫季数编号
     */
    static async validateAnimeExists(series_id, name, season, id) {
        const where = new WhereFilter()
            .setWhere(
                'id',
                id
                    ? {
                          [Op.ne]: id
                      }
                    : undefined
            )
            .setWhere('series_id', series_id)
            .setWhere('season', season)
            .setWhere('name', name)
            .getFilter();

        const res = await Anime.findOne({where});
        if (res) throw new Existing('动漫已存在');
        return true;
    }

    /**
     * @title 创建动漫
     * @param {number} series_id 系列id
     * @param {string} name 动漫名称
     * @param {string} description 动漫简介
     * @param {string} cover_url 动漫封面
     * @param {string} banner_url 动漫横幅
     * @param {string} remark 动漫备注 [可选]
     * @param {number} status 动漫状态 0-即将上线 1-连载中 2-已完结
     * @param {number} type 动漫类型 0-剧场版 1-日番 2-美番 3-国番 4-里番
     * @param {string} director 动漫导演 [可选]
     * @param {string} cv 动漫声优 [可选]
     * @param {number} year 动漫发行年份
     * @param {number} month 动漫发行月份 0-一月番 1-四月番 2-七月番 3-十月番
     * @param {number} season 动漫季数编号
     * @param {string} season_name 动漫季数名称 [可选]
     * @param {number[]} category 动漫分类
     */
    static async create(params) {
        const {series_id, name, season, category, ...rest} = params;

        try {
            await this.validateSeriesExists(series_id);
            await this.validateAnimeExists(series_id, name, season);
            await this.validateCategoryExists(category);

            await sequelize.transaction(async t => {
                const anime = await Anime.create(
                    {
                        series_id,
                        name,
                        season,
                        category,
                        ...rest
                    },
                    {transaction: t}
                );

                await anime.setCategories(category, {transaction: t});
            });

            return [null, null];
        } catch (err) {
            console.log(err);
            return [err, null];
        }
    }

    /**
     * @title 动漫列表
     * @param {number} scope 用户权限 -1-封禁 0-游客 1-普通用户 2-正式会员 3-管理员
     * @param {number} page 页码 [可选]
     * @param {number} pageSize 每页数量 [可选]
     * @param {string} keyword 搜索关键词 [可选]
     * @param {number} status 动漫状态 0-即将上线 1-连载中 2-已完结 [可选]
     * @param {number} year 动漫发行年份 [可选]
     * @param {number} month 动漫发行月份 0-一月番 1-四月番 2-七月番 3-十月番 [可选]
     * @param {number[]} category 动漫分类 [可选]
     * @param {string} order 排序方式 [可选]
     * @param {string} orderBy 排序字段
     */
    static async list(params) {
        const {
            scope,
            page = 1,
            pageSize = 10,
            keyword,
            status,
            year,
            month,
            category,
            order = 'DESC',
            orderBy = 'created_at'
        } = params;

        let type = params.type;
        // 权限不够的时候 过滤掉类型4动漫
        if (scope === 1) type = type.filter(item => item !== 4);

        const where = new WhereFilter()
            .setFilter('status', status)
            .setFilter('type', type)
            .setFilter('year', year)
            .setFilter('month', month)
            .setSearch(['name', 'director', 'cv'], keyword)
            .getFilter();

        // 分类筛选 - 子查询，通过关联会出现分类丢失的情况
        if (category && category.length > 0) {
            where.id = {
                [Op.in]: literal(`(
                    SELECT DISTINCT anime_id 
                    FROM anime_category 
                    WHERE category_id IN (${category.join(',')})
                )`)
            };
        }

        try {
            const list = await Anime.findAndCountAll({
                where,
                attributes: {
                    exclude: ['updated_at'],
                    include: [
                        [
                            literal(`(
                                SELECT COUNT(*)
                                    FROM anime_banner
                                    WHERE
                                    anime_banner.anime_id = anime.id
                                )`),
                            'is_swiper'
                        ]
                    ]
                },
                distinct: true,
                include: [
                    {
                        model: Category,
                        through: {attributes: []},
                        as: 'categories',
                        attributes: ['id', 'name']
                    },
                    {
                        model: AnimeBanner,
                        attributes: []
                    },
                    {
                        model: AnimeGuide,
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
     * @title 动漫删除
     * @param {number} id 动漫id
     */
    static async delete(params) {
        const {id} = params;

        try {
            const anime = await Anime.findByPk(id);
            if (!anime) throw new NotFound('动漫不存在');
            await anime.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 动漫修改
     * @param {number} id 动漫id
     * @param {number} series_id 系列id [可选]
     * @param {string} name 动漫名称 [可选]
     * @param {string} description 动漫简介 [可选]
     * @param {string} cover_url 动漫封面 [可选]
     * @param {string} banner_url 动漫横幅 [可选]
     * @param {string} remark 动漫备注 [可选]
     * @param {number} status 动漫状态 0-即将上线 1-连载中 2-已完结 [可选]
     * @param {number} type 动漫类型 0-剧场版 1-日番 2-美番 3-国番 4-里番 [可选]
     * @param {string} director 动漫导演 [可选]
     * @param {string} cv 动漫声优 [可选]
     * @param {number} year 动漫发行年份 [可选]
     * @param {number} month 动漫发行月份 0-一月番 1-四月番 2-七月番 3-十月番 [可选]
     * @param {string} season_name 动漫季数名称 [可选]
     * @param {number} season 动漫季数编号 [可选]
     * @param {number[]} category 动漫分类 [可选]
     */
    static async edit(params) {
        const {id, series_id, name, season, category, ...rest} = params;

        try {
            const anime = await Anime.findByPk(id);
            if (!anime) throw new NotFound('动漫不存在');

            if (series_id || season || name) {
                await this.validateAnimeExists(
                    series_id || anime.series_id,
                    name || anime.name,
                    season || anime.season,
                    id
                );
            }

            if (category && category.length) {
                await this.validateCategoryExists(category);
                await anime.setCategories(category);
            }

            const res = await anime.update({
                ...rest,
                series_id,
                name,
                season
            });

            return [null, res];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 动漫详情
     * @param {number} id 动漫id
     */
    static async detail(params) {
        const {id} = params;

        try {
            const anime = await Anime.findByPk(id, {
                include: [
                    {
                        model: Video,
                        as: 'videos',
                        attributes: [
                            'id',
                            'title',
                            'episode',
                            'url',
                            'play_count'
                        ]
                    },
                    {
                        model: Category,
                        through: {attributes: []},
                        as: 'categories',
                        attributes: ['id', 'category']
                    },
                    {
                        model: Rating,
                        attributes: []
                    },
                    {
                        model: Collection,
                        attributes: []
                    }
                ],
                attributes: {
                    exclude: ['updated_at'],
                    include: [
                        [
                            literal(`(
                                SELECT SUM(play_count)
                                    FROM video
                                    WHERE
                                    video.anime_id = anime.id
                                )`),
                            'play_count'
                        ],
                        [
                            literal(`(
                                SELECT COUNT(*)
                                    FROM rating
                                    WHERE
                                    rating.anime_id = anime.id
                                )`),
                            'score_count'
                        ],
                        [
                            literal(`(
                                SELECT COUNT(*)
                                    FROM collection
                                    WHERE
                                    collection.anime_id = anime.id
                                )`),
                            'collection_count'
                        ],
                        [
                            literal(`(
                                SELECT ROUND(AVG(score), 1)
                                    FROM rating
                                    WHERE
                                    rating.anime_id = anime.id
                                )`),
                            'score'
                        ]
                    ]
                },
                order: [['videos', 'episode', 'ASC']]
            });
            if (!anime) throw new NotFound('动漫不存在');

            const where = new WhereFilter()
                .setWhere('series_id', anime.series_id)
                .setWhere('id', {
                    [Op.ne]: id
                })
                .getFilter();

            const related_anime = await Anime.findAll({
                where,
                attributes: [
                    'id',
                    'name',
                    'cover_url',
                    'banner_url',
                    'year',
                    'month',
                    'cv',
                    'director',
                    'status',
                    'type'
                ]
            });

            return [
                null,
                {
                    ...anime.toJSON(),
                    related: related_anime
                }
            ];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    AnimeDao
};
