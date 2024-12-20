const {Banner} = require('@models/banner');
const {Anime} = require('@models/anime');
const {NotFound, Existing} = require('@core/http-exception');
const {col} = require('sequelize');
const WhereFilter = require('@lib/where-filter');

class BannerDao {
    // 新增轮播图
    static async create(params) {
        const {aid} = params;
        try {
            const hasAnime = await Anime.findByPk(aid);
            if (!hasAnime) throw new NotFound('动漫不存在');

            const hasBanner = await Banner.findOne({
                where: {
                    aid
                }
            });
            if (hasBanner) throw new Existing('轮播图已存在');

            const banner = new Banner();
            banner.aid = aid;
            await banner.save();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 轮播图列表
    static async list(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            order = 'DESC',
            orderBy = 'created_at'
        } = params;

        const where_filter = new WhereFilter();
        where_filter.setSearch('$Anime.name$', keyword);
        const filter = where_filter.getFilter();

        try {
            const list = await Rating.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                attributes: {
                    exclude: ['updated_at'],
                    include: [
                        [col('Anime.name'), 'title'],
                        [col('Anime.description'), 'description'],
                        [col('Anime.banner'), 'banner'],
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
        const {id} = params;
        try {
            const banner = await Banner.findByPk(id);
            if (!banner) throw new NotFound('轮播图不存在');
            await banner.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    BannerDao
};
