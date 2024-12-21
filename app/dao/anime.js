const {sequelize} = require('@core/db');
const {Anime} = require('@models/anime');
const {Video} = require('@models/video');
const {Rating} = require('@models/rating');
const {Collection} = require('@models/collection');
const {Existing, NotFound} = require('@core/http-exception');
const WhereFilter = require('@lib/where-filter');
const {Category} = require('@models/category');
const {Op, literal} = require('sequelize');

class AnimeDao {
    // 创建动漫
    static async create(params) {
        const {
            sid,
            name,
            description,
            cover_url,
            banner_url,
            remark,
            status,
            type,
            director,
            cv,
            year,
            month,
            category,
            season,
            season_name
        } = params;

        const where_filter = new WhereFilter();
        where_filter.setWhere(Op.or, [
            {
                name
            },
            {
                sid,
                season
            }
        ]);
        const filter = where_filter.getFilter();

        const category_where_filter = new WhereFilter();
        category_where_filter.setFilter('id', category);
        const category_filter = category_where_filter.getFilter();

        try {
            const hasAnime = await Anime.findOne({
                where: filter
            });
            if (hasAnime) throw new Existing('动漫已存在');

            const hasCategory = await Category.findAll({
                where: category_filter
            });
            if (hasCategory.length !== category.length)
                throw new NotFound('分类不存在');

            await sequelize.transaction(async t => {
                const anime = await Anime.create(
                    {
                        sid,
                        name,
                        description,
                        cover_url,
                        banner_url,
                        remark,
                        status,
                        type,
                        director,
                        cv,
                        year,
                        month,
                        season,
                        season_name
                    },
                    {transaction: t}
                );

                await anime.setCategories(category, {transaction: t});
            });

            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 动漫列表
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

        const where_filter = new WhereFilter();
        where_filter.setFilter('status', status);
        where_filter.setFilter('type', type);
        where_filter.setFilter('year', year);
        where_filter.setFilter('month', month);
        where_filter.setSearch(['name', 'director', 'cv'], keyword);
        const filter = where_filter.getFilter();

        const child_where_filter = new WhereFilter({});
        child_where_filter.setFilter('id', category);
        const child_filter = child_where_filter.getFilter();

        try {
            const list = await Anime.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                where: filter,
                attributes: {
                    exclude: ['updated_at']
                },
                distinct: true,
                include: {
                    model: Category,
                    through: {
                        attributes: []
                    },
                    as: 'categories',
                    attributes: ['id', 'category'],
                    where: child_filter
                },
                order: [[orderBy, order]]
            });
            return [null, list];
        } catch (err) {
            return [err, null];
        }
    }

    // 动漫删除
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

    // 动漫修改
    static async edit(params) {
        const {
            id,
            sid,
            name,
            description,
            cover_url,
            banner_url,
            remark,
            status,
            type,
            director,
            cv,
            year,
            month,
            category,
            season,
            season_name
        } = params;

        const where_filter = new WhereFilter();
        where_filter.setFilter('id', category);
        const filter = where_filter.getFilter();

        try {
            const anime = await Anime.findByPk(id);
            if (!anime) throw new NotFound('动漫不存在');

            const hasAnime = await Anime.findOne({where: {name, season}});
            if (hasAnime) throw new Existing('动漫已存在');

            const hasCategory = await Category.findAll({
                where: filter
            });
            if (hasCategory.length !== category.length)
                throw new NotFound('分类不存在');

            anime.sid = sid;
            anime.name = name;
            anime.description = description;
            anime.cover_url = cover_url;
            anime.banner_url = banner_url;
            anime.remark = remark;
            anime.status = status;
            anime.type = type;
            anime.director = director;
            anime.cv = cv;
            anime.year = year;
            anime.month = month;
            anime.season = season;
            anime.season_name = season_name;
            anime.setCategories(category);
            const res = await anime.save();
            return [null, res];
        } catch (err) {
            return [err, null];
        }
    }

    // 动漫详情
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
                        through: {
                            attributes: []
                        },
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
                                    video.aid = anime.id
                                )`),
                            'play_count'
                        ],
                        [
                            literal(`(
                                SELECT COUNT(*)
                                    FROM rating
                                    WHERE
                                    rating.aid = anime.id
                                )`),
                            'score_count'
                        ],
                        [
                            literal(`(
                                SELECT COUNT(*)
                                    FROM collection
                                    WHERE
                                    collection.aid = anime.id
                                )`),
                            'collection_count'
                        ],
                        [
                            literal(`(
                                SELECT ROUND(AVG(score), 1)
                                    FROM rating
                                    WHERE
                                    rating.aid = anime.id
                                )`),
                            'score'
                        ]
                    ]
                },
                order: [['videos', 'episode', 'ASC']]
            });
            if (!anime) throw new NotFound('动漫不存在');

            const where_filter = new WhereFilter();
            where_filter.setWhere('sid', anime.sid);
            where_filter.setWhere('id', {
                [Op.ne]: id
            });
            const filter = where_filter.getFilter();

            const relatedAnime = await Anime.findAll({
                where: filter,
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
                    related: relatedAnime
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
