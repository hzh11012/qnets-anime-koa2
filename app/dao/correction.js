const {User} = require('@models/user');
const {Correction} = require('@models/correction');
const {NotFound} = require('@core/http-exception');
const {col} = require('sequelize');
const WhereFilter = require('@lib/where-filter');

class CorrectionDao {
    // 创建纠错
    static async create(params) {
        const {id, message} = params;

        try {
            const correction = new Correction();
            correction.uid = id;
            correction.message = message;
            await correction.save();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 纠错信息列表
    static async list(params) {
        const {
            page = 1,
            pageSize = 10,
            status,
            keyword,
            type = 'message',
            order = 'DESC',
            orderBy = 'created_at'
        } = params;

        const where_filter = new WhereFilter();
        where_filter.setFilter('status', status);
        where_filter.setSearch(type, keyword);
        const filter = where_filter.getFilter();

        try {
            const list = await Correction.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                where: filter,
                attributes: {
                    exclude: ['updated_at', 'deleted_at'],
                    include: [[col('User.nickname'), 'nickname']]
                },
                include: [
                    {
                        model: User,
                        attributes: []
                    }
                ],
                order: [[orderBy, order]]
            });
            return [null, list];
        } catch (err) {
            return [err, null];
        }
    }

    // 纠错信息删除
    static async delete(params) {
        const {id} = params;
        try {
            const correction = await Correction.findByPk(id);
            if (!correction) throw new NotFound('纠错信息不存在');
            await correction.destroy();
            return [(null, null)];
        } catch (err) {
            return [err, null];
        }
    }

    // 纠错信息修改
    static async edit(params) {
        const {id, message, status} = params;
        try {
            const correction = await Correction.findByPk(id);
            if (!correction) throw new NotFound('纠错信息不存在');

            correction.message = message;
            correction.status = status;
            const res = await correction.save();
            return [null, res];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    CorrectionDao
};
