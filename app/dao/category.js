const {Category} = require('@models/category');
const {NotFound, Existing} = require('@core/http-exception');
const WhereFilter = require('@lib/where-filter');

class CategoryDao {
    /**
     * @title 创建分类
     * @param {string} name - 分类名称
     */
    static async create(params) {
        const {name} = params;

        const where = new WhereFilter().setWhere('name', name).getFilter();

        try {
            const category = await Category.findOne({where});
            if (category) throw new Existing('分类已存在');

            await Category.create({name});
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 分类列表 - admin
     * @param {number} page - 页码 [可选]
     * @param {number} pageSize - 每页数量 [可选]
     * @param {string} keyword - 搜索关键词 [可选]
     * @param {string} type - 搜索类型 [可选]
     * @param {string} order - 排序 [可选]
     * @param {string} orderBy - 排序字段 [可选]
     */
    static async adminList(params) {
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
            const list = await Category.findAndCountAll({
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
     * @title 删除分类 - admin
     * @param {number} id - 分类ID
     */
    static async delete(params) {
        const {id} = params;
        try {
            // 与动漫表存在多对多关系，需要先查询是否存在关联，再进行删除
            const category = await Category.findByPk(id);
            if (!category) throw new NotFound('分类不存在');

            const anime = await category.getAnimes();
            if (anime.length > 0)
                throw new Existing('分类存在关联动漫，无法删除');

            await category.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    CategoryDao
};
