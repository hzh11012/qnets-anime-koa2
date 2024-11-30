const {User} = require('@models/user');
const {VideoCategory} = require('@app/models/video_category');
const {NotFound, Existing} = require('@core/http-exception');
const {col, Op} = require('sequelize');

class VideoCategoryDao {
    // 创建视频分类
    static async create(params) {
        const {id, category} = params;

        try {
            const hasCategory = await VideoCategory.findOne({
                where: {
                    category,
                    deleted_at: null
                }
            });

            if (hasCategory) throw new Existing('视频分类已存在');

            const video_category = new VideoCategory();
            video_category.created_by = id;
            video_category.category = category;
            await video_category.save();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 视频分类列表
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
            const list = await VideoCategory.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                where: filter,
                attributes: {
                    exclude: ['updated_at', 'deleted_at'],
                    include: [[col('User.nickname'), 'created_by']]
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

    // 视频分类删除
    static async delete(params) {
        const {id} = params;
        try {
            // TODO 与 视频表建立多对多关系后，需要先查询是否存在关联，再进行删除

            const category = await VideoCategory.destroy({
                where: {
                    id,
                    deleted_at: null
                }
            });

            if (!category) throw new NotFound('视频分类不存在');

            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // // 纠错信息修改
    // static async edit(params) {
    //     const {id, message, status} = params;

    //     try {
    //         const correction = await Correction.findOne({
    //             where: {
    //                 id,
    //                 deleted_at: null
    //             }
    //         });

    //         if (!correction) throw new NotFound('纠错信息不存在');

    //         correction.message = message;
    //         correction.status = status;

    //         const res = await correction.save();
    //         return [null, res];
    //     } catch (err) {
    //         return [err, null];
    //     }
    // }
}

module.exports = {
    VideoCategoryDao
};
