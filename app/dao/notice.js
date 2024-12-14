const {sequelize} = require('@core/db');
const {Notice} = require('@models/notice');
const {NoticeRecord} = require('@models/notice_record');
const {User} = require('@models/user');
const {NotFound} = require('@core/http-exception');
const WhereFilter = require('@lib/where-filter');
const {literal} = require('sequelize');

class NoticeDao {
    // 创建公告
    static async create(params) {
        const {title, content} = params;

        try {
            await sequelize.transaction(async t => {
                const users = await User.findAll({}, {transaction: t});

                const notice = await Notice.create(
                    {
                        title,
                        content
                    },
                    {transaction: t}
                );

                const records = users.map(user => {
                    return {
                        uid: user.id,
                        nid: notice.id
                    };
                });

                await NoticeRecord.bulkCreate(records, {transaction: t});
            });
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 公告列表
    static async list(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            order = 'DESC',
            orderBy = 'created_at'
        } = params;

        const where_filter = new WhereFilter();
        where_filter.setSearch(['title', 'content'], keyword);
        const filter = where_filter.getFilter();

        try {
            const list = await Notice.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                where: filter,
                attributes: {
                    exclude: ['updated_at'],
                    include: [
                        [
                            literal(`(
                                SELECT COUNT(*)
                                    FROM notice_record AS record
                                    WHERE
                                    record.nid = notice.id
                                )`),
                            'count'
                        ]
                    ]
                },
                include: [
                    {
                        model: NoticeRecord,
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

    // 公告删除
    static async delete(params) {
        const {id} = params;
        try {
            const notice = await Notice.findByPk(id);
            if (!notice) throw new NotFound('公告不存在');
            await notice.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    NoticeDao
};
