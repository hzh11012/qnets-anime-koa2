const {Series} = require('@models/series');
const {NotFound, Existing} = require('@core/http-exception');
const WhereFilter = require('@lib/where-filter');

class SeriesDao {
    // 创建动漫系列
    static async create(params) {
        const {name} = params;

        try {
            const hasSeries = await Series.findOne({
                where: {name}
            });
            if (hasSeries) throw new Existing('动漫系列已存在');

            const series = new Series();
            series.name = name;
            await series.save();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 动漫系列列表
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
            const list = await Series.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                where: filter,
                attributes: {
                    exclude: ['updated_at']
                },
                order: [[orderBy, order]]
            });
            return [null, list];
        } catch (err) {
            return [err, null];
        }
    }

    // 动漫系列删除
    static async delete(params) {
        const {id} = params;
        try {
            const series = await Series.findByPk(id);
            if (!series) throw new NotFound('动漫系列不存在');

            await series.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    SeriesDao
};
