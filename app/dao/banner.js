const {Banner} = require('@models/banner');
const {Anime} = require('@models/anime');
const {NotFound, Existing} = require('@core/http-exception');
const {col} = require('sequelize');
const WhereFilter = require('@lib/where-filter');

class BannerDao {
    // 新增轮播图
    static async create(params) {
        const {aids} = params;

        const where_filter = new WhereFilter();
        where_filter.setFilter('id', aids);
        const filter = where_filter.getFilter();

        const banner_where_filter = new WhereFilter();
        banner_where_filter.setFilter('aid', aids);
        const banner_filter = banner_where_filter.getFilter();

        try {
            const hasAnime = await Anime.findAll({
                where: filter
            });
            if (hasAnime.length !== aids.length)
                throw new NotFound('动漫不存在');

            const hasBanner = await Banner.findAll({
                where: banner_filter
            });

            if (hasBanner.length) throw new Existing('轮播图已存在');

            const banners = aids.map(id => {
                return {
                    aid: id
                };
            });
            await Banner.bulkCreate(banners);
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
            const list = await Banner.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
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
                where: filter,
                order: [[orderBy, order]]
            });
            return [null, list];
        } catch (err) {
            console.log(err);
            return [err, null];
        }
    }

    // 删除轮播图
    static async delete(params) {
        const {id} = params;
        try {
            const banner = await Banner.findOne({
                where: {
                    aid: id
                }
            });
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
