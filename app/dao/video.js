const {Anime} = require('@models/anime');
const {Video} = require('@models/video');
const {Existing, NotFound} = require('@core/http-exception');
const WhereFilter = require('@app/lib/where-filter');

class VideoDao {
    /**
     * @title 添加视频
     * @param {number} anime_id 动漫ID
     * @param {string} title 视频标题
     * @param {number} episode 视频集数
     * @param {string} url 视频链接
     */
    static async create(params) {
        const {anime_id, title, episode, url} = params;

        const where = new WhereFilter()
            .setWhere('anime_id', anime_id)
            .setWhere('episode', episode);

        try {
            const anime = await Anime.findByPk(anime_id);
            if (!anime) throw new NotFound('动漫不存在');

            const video = await Video.findOne({where});
            if (video) throw new Existing('视频已存在');

            await Video.create({
                anime_id,
                title,
                episode,
                url
            });
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 播放视频
     * @param {number} id 视频ID
     */
    static async play(params) {
        const {id} = params;

        try {
            const video = await Video.findByPk(id);
            if (!video) throw new NotFound('视频不存在');

            await video.update({
                play_count: video.play_count + 1
            });
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    /**
     * @title 删除视频
     * @param {number} id 视频ID
     */
    static async delete(params) {
        const {id} = params;

        try {
            const video = await Video.findByPk(id);
            if (!video) throw new NotFound('视频不存在');

            await video.destroy();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    VideoDao
};
