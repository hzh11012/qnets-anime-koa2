const {sequelize} = require('@core/db');
const {Announcement} = require('@app/models/announcement');
const {UserAnnouncement} = require('@app/models/user_announcement');
const {User} = require('@models/user');
const {NotFound} = require('@core/http-exception');
const WhereFilter = require('@lib/where-filter');
const {literal} = require('sequelize');

class AnnouncementDao {
    /**
     * @title 创建公告
     * @param {string} title - 公告标题
     * @param {string} content - 公告内容
     */
    static async create(params) {
        const {title, content} = params;

        try {
            await sequelize.transaction(async t => {
                const announcement = await Announcement.create(
                    {title, content},
                    {transaction: t}
                );

                const user_announcements = await User.findAll({
                    attributes: ['id'],
                    raw: true,
                    transaction: t
                }).then(users =>
                    users.map(user => {
                        return {
                            user_id: user.id,
                            announcement_id: announcement.id
                        };
                    })
                );

                await UserAnnouncement.bulkCreate(user_announcements, {
                    transaction: t
                });
            });
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 公告列表 - admin
     * @param {number} page - 页码 [可选]
     * @param {number} pageSize - 每页数量 [可选]
     * @param {string} keyword - 搜索关键词 [可选]
     * @param {string} order - 排序 [可选]
     * @param {string} orderBy - 排序字段 [可选]
     */
    static async adminList(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            order = 'DESC',
            orderBy = 'created_at'
        } = params;

        const where = new WhereFilter()
            .setSearch(['title', 'content'], keyword)
            .getFilter();

        try {
            const list = await Notice.findAndCountAll({
                where,
                attributes: {
                    exclude: ['updated_at'],
                    include: [
                        [
                            literal(`(
                                SELECT COUNT(*)
                                    FROM user_announcement
                                    WHERE
                                    user_announcement.announcement_id = announcement.id
                                )`),
                            'count'
                        ]
                    ]
                },
                include: [
                    {
                        model: UserAnnouncement,
                        attributes: []
                    }
                ],
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
     * @title 用户公告列表
     * @param {number} page - 页码 [可选]
     * @param {number} pageSize - 每页数量 [可选]
     * @param {string} keyword - 搜索关键词 [可选]
     * @param {string} order - 排序 [可选]
     * @param {string} orderBy - 排序字段 [可选]
     * @param {boolean[]} is_read - 是否已读 [可选]
     * @param {number} user_id - 用户ID
     */
    static async userList(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            is_read,
            order = 'DESC',
            orderBy = 'created_at',
            user_id
        } = params;

        const where = new WhereFilter()
            .setWhere('user_id', user_id)
            .setSearch(
                ['$Announcement.title$', '$Announcement.content$'],
                keyword
            )
            .setFilter('is_read', is_read)
            .getFilter();

        try {
            const list = await UserAnnouncement.findAndCountAll({
                where,
                attributes: {
                    exclude: ['updated_at'],
                    include: [
                        [col('Announcement.title'), 'title'],
                        [col('Announcement.content'), 'content']
                    ]
                },
                distinct: true,
                include: [
                    {
                        model: Announcement,
                        attributes: []
                    }
                ],
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
     * @title 删除公告 - admin
     * @param {number} id - 公告ID
     */
    static async adminDelete(params) {
        const {id} = params;
        try {
            const announcement = await Announcement.findByPk(id);
            if (!announcement) throw new NotFound('公告不存在');
            await announcement.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 标记公告已读
     * @param {number} announcement_id - 公告ID
     * @param {number} user_id - 用户ID
     */
    static async read(params) {
        const {announcement_id, user_id} = params;

        const where = new WhereFilter()
            .setWhere('announcement_id', announcement_id)
            .setWhere('user_id', user_id)
            .getFilter();

        try {
            const user_announcement = await UserAnnouncement.findOne({where});
            if (!user_announcement) throw new NotFound('公告不存在');

            await user_announcement.update({is_read: true});
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 删除用户公告 - admin
     * @param {number} id - 公告ID
     */
    static async userAdminDelete(params) {
        const {id} = params;
        try {
            const user_announcement = await UserAnnouncement.findByPk(id);
            if (!user_announcement) throw new NotFound('用户公告不存在');
            await user_announcement.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 删除用户公告
     * @param {number} user_id - 用户ID
     * @param {number} announcement_id - 公告ID
     */
    static async userDelete(params) {
        const {user_id, announcement_id} = params;

        const where = new WhereFilter()
            .setWhere('user_id', user_id)
            .setWhere('announcement_id', announcement_id)
            .getFilter();

        try {
            const user_announcement = await UserAnnouncement.findOne({where});
            if (!user_announcement) throw new NotFound('用户公告不存在');
            await user_announcement.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    AnnouncementDao
};
