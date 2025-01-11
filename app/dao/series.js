const {Series} = require('@models/series');
const {NotFound, Existing} = require('@core/http-exception');
const WhereFilter = require('@lib/where-filter');

class SeriesDao {
    /**
     * @title 系列创建
     * @param {string} name 系列名
     */
    static async create(params) {
        const {name} = params;

        const where = new WhereFilter().setWhere('name', name).getFilter();

        try {
            const hasSeries = await Series.findOne({where});
            if (hasSeries) throw new Existing('动漫系列已存在');
            await Series.create({name});
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 系列列表
     * @param {number} page 页码 [可选]
     * @param {number} pageSize 每页数量 [可选]
     * @param {string} keyword 搜索关键词 [可选]
     * @param {string} type 搜索类型 默认 name [可选]
     * @param {string} order 排序方向 默认 DESC [可选]
     * @param {string} orderBy 排序字段 默认 created_at [可选]
     */
    static async list(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            type = 'name',
            order = 'DESC',
            orderBy = 'created_at'
        } = params;

        const where = new WhereFilter().setSearch(type, keyword).getFilter();

        try {
            const list = await Series.findAndCountAll({
                where,
                attributes: {exclude: ['updated_at']},
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
     * @title 系列删除
     * @param {string} id 系列ID
     */
    static async delete(params) {
        const {id} = params;
        try {
            const series = await Series.findByPk(id);
            if (!series) throw new NotFound('系列不存在');
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
