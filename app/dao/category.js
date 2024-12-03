const {Category} = require('@app/models/category');
const {NotFound, Existing} = require('@core/http-exception');
const {Op} = require('sequelize');

class CategoryDao {
    // 创建动漫分类
    static async create(params) {
        const {category: _category} = params;

        try {
            const hasCategory = await Category.findOne({
                where: {
                    category: _category,
                    deleted_at: null
                }
            });

            if (hasCategory) throw new Existing('动漫分类已存在');

            const category = new Category();
            category.category = _category;
            await category.save();
            return [null, null];
        } catch (err) {
            console.log(err);
            return [err, null];
        }
    }

    // 动漫分类列表
    static async list(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            type = 'category',
            order = 'DESC',
            orderBy = 'created_at'
        } = params;
        let filter = {
            deleted_at: null
        };

        if (keyword) {
            filter[type] = {
                [Op.like]: `%${keyword}%`
            };
        }

        try {
            const list = await Category.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                where: filter,
                attributes: {
                    exclude: ['updated_at', 'deleted_at']
                },
                order: [[orderBy, order]]
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
            // TODO 与 动漫表建立多对多关系后，需要先查询是否存在关联，再进行删除

            const category = await Category.destroy({
                where: {
                    id,
                    deleted_at: null
                }
            });

            if (!category) throw new NotFound('动漫分类不存在');

            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    CategoryDao
};
