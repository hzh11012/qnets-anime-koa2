const {Anime} = require('@models/anime');
const {Existing, NotFound} = require('@core/http-exception');
const WhereFilter = require('@lib/where-filter');
const {Category} = require('@models/category');
const {Op} = require('sequelize');

class AnimeDao {
    // 创建动漫
    static async create(params) {
        const {
            name,
            description,
            cover,
            remark,
            status,
            type,
            director,
            cv,
            year,
            month,
            category
        } = params;

        try {
            const hasAnime = await Anime.findOne({
                where: {
                    name,
                    deleted_at: null
                }
            });
            if (hasAnime) throw new Existing('动漫已存在');

            const anime = new Anime();
            anime.name = name;
            anime.description = description;
            anime.cover = cover;
            anime.remark = remark;
            anime.status = status;
            anime.type = type;
            anime.director = director;
            anime.cv = cv;
            anime.year = year;
            anime.month = month;
            await anime.save();
            anime.setCategories(category);

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
            searchType = 'name',
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
        where_filter.setSearch(searchType, keyword);
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
                    exclude: ['updated_at', 'deleted_at']
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
            return [(null, null)];
        } catch (err) {
            return [err, null];
        }
    }

    // 动漫修改
    static async edit(params) {
        const {
            id,
            name,
            description,
            cover,
            remark,
            status,
            type,
            director,
            cv,
            year,
            month,
            category
        } = params;

        try {
            const anime = await Anime.findByPk(id);
            if (!anime) throw new NotFound('动漫不存在');

            const hasAnime = await Anime.findOne({
                where: {
                    name,
                    deleted_at: null
                }
            });
            if (hasAnime) throw new Existing('动漫已存在');

            anime.name = name;
            anime.description = description;
            anime.cover = cover;
            anime.remark = remark;
            anime.status = status;
            anime.type = type;
            anime.director = director;
            anime.cv = cv;
            anime.year = year;
            anime.month = month;
            anime.setCategories(category);

            const res = await anime.save();
            return [null, res];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    AnimeDao
};
