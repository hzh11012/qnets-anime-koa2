const {Category} = require('@models/category');
const {NotFound, Existing} = require('@core/http-exception');
const WhereFilter = require('@lib/where-filter');

class CategoryDao {
    // 创建动漫分类
    static async create(params) {
        const {category: _category} = params;

        try {
            const hasCategory = await Category.findOne({
                where: {category: _category}
            });

            if (hasCategory) throw new Existing('动漫分类已存在');

            const category = new Category();
            category.category = _category;
            await category.save();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 动漫分类列表 - admin
    static async adminList(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            type = 'category',
            order = 'DESC',
            orderBy = 'created_at'
        } = params;

        const where_filter = new WhereFilter();
        where_filter.setSearch(type, keyword);
        const filter = where_filter.getFilter();

        try {
            const list = await Category.findAndCountAll({
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

    // 动漫分类
    static async list() {
        try {
            const list = await Category.findAll({
                attributes: {
                    exclude: ['created_at', 'updated_at']
                }
            });
            return [null, list];
        } catch (err) {
            return [err, null];
        }
    }

    // 动漫分类删除
    static async delete(params) {
        const {id} = params;
        try {
            // 与动漫表存在多对多关系，需要先查询是否存在关联，再进行删除
            const category = await Category.findByPk(id);
            if (!category) throw new NotFound('动漫分类不存在');

            const anime = await category.getAnimes();
            if (anime.length > 0)
                throw new Existing('动漫分类存在关联动漫，无法删除');
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
