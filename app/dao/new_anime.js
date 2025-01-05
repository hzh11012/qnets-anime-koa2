const {NewAnime} = require('@models/new_anime');
const {Anime} = require('@models/anime');
const {Video} = require('@app/models/video');
const {NotFound, Existing} = require('@core/http-exception');
const WhereFilter = require('@lib/where-filter');

class NewAnimeDao {
    // 添加新番
    static async create(params) {
        const {aid, update_day, update_time} = params;

        const where_filter = new WhereFilter();
        where_filter.setWhere('aid', aid);
        const filter = where_filter.getFilter();

        try {
            const hasAnime = await Anime.findByPk(aid);
            if (!hasAnime) throw new NotFound('动漫不存在');

            const hasNewAnime = await NewAnime.findOne({
                where: filter
            });

            if (hasNewAnime) throw new Existing('新番已存在');

            const new_anime = new NewAnime();
            new_anime.aid = aid;
            new_anime.update_day = update_day;
            new_anime.update_time = update_time;
            await new_anime.save();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 新番列表
    static async list(params) {
        const {
            page = 1,
            pageSize = 10,
            keyword,
            update_day,
            order = 'DESC',
            orderBy = 'created_at'
        } = params;

        const where_filter = new WhereFilter();
        where_filter.setFilter('update_day', update_day);
        where_filter.setSearch('$Anime.name$', keyword);
        const filter = where_filter.getFilter();

        try {
            const list = await NewAnime.findAndCountAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                where: filter,
                attributes: {
                    exclude: ['updated_at']
                },
                distinct: true,
                include: [
                    {
                        model: Anime,
                        attributes: [
                            'id',
                            'name',
                            'description',
                            'cover_url',
                            'status',
                            'remark'
                        ],
                        include: [
                            {
                                model: Video,
                                attributes: ['id', 'episode'],
                                limit: 1,
                                order: [['episode', 'DESC']],
                                separate: true
                            }
                        ]
                    }
                ],
                order: [[orderBy, order]]
            });

            const data = list.rows.map(item => {
                const {id, aid, update_day, update_time, created_at, anime} =
                    item;
                const {name, description, cover_url, videos, status, remark} =
                    anime;

                return {
                    id,
                    aid,
                    update_day,
                    update_time,
                    title: name,
                    description,
                    cover_url,
                    status,
                    remark,
                    created_at,
                    latest_video: videos[0]
                };
            });

            return [
                null,
                {
                    ...list,
                    rows: data
                }
            ];
        } catch (err) {
            return [err, null];
        }
    }

    // 新番删除
    static async delete(params) {
        const {id} = params;

        try {
            const new_anime = await NewAnime.findByPk(id);
            if (!new_anime) throw new NotFound('新番不存在');
            await new_anime.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    NewAnimeDao
};
