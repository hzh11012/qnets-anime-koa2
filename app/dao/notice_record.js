const {Notice} = require('@models/notice');
const {User} = require('@models/user');
const {NoticeRecord} = require('@models/notice_record');
const {NotFound} = require('@core/http-exception');
const WhereFilter = require('@lib/where-filter');
const {col} = require('sequelize');

class NoticeRecordDao {
    // 阅读公告记录
    static async read(params) {
        const {nid, uid} = params;
        try {
            const noticeRecord = await NoticeRecord.findOne({
                where: {
                    nid,
                    uid
                }
            });
            if (!noticeRecord) throw new NotFound('公告记录不存在');
            noticeRecord.status = 1;
            await noticeRecord.save();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 公告记录列表
    static async list(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            status,
            order = 'DESC',
            orderBy = 'created_at',
            uid
        } = params;

        const where_filter = new WhereFilter();
        where_filter.setWhere('uid', uid);
        where_filter.setSearch(['$Notice.title$', '$Notice.content$', '$User.nickname$'], keyword);
        where_filter.setFilter('status', status);
        const filter = where_filter.getFilter();

        try {
            const list = await NoticeRecord.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                where: filter,
                attributes: {
                    exclude: ['updated_at'],
                    include: [
                        [col('Notice.title'), 'title'],
                        [col('Notice.content'), 'content'],
                        [col('User.nickname'), 'nickname']
                    ]
                },
                distinct: true,
                include: [
                    {
                        model: Notice,
                        attributes: []
                    },
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

    // 公告记录删除
    static async delete(params) {
        const {nid, uid} = params;
        try {
            const noticeRecord = await NoticeRecord.findOne({
                where: {
                    nid,
                    uid
                }
            });
            if (!noticeRecord) throw new NotFound('公告记录不存在');
            await noticeRecord.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 公告记录删除
    static async adminDelete(params) {
        const {id} = params;
        try {
            const noticeRecord = await NoticeRecord.findByPk(id);
            if (!noticeRecord) throw new NotFound('公告记录不存在');
            await noticeRecord.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    NoticeRecordDao
};
