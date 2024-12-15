const {Video} = require('@models/video');
const {Existing, NotFound} = require('@core/http-exception');

class VideoDao {
    // 添加视频
    static async create(params) {
        const {aid, title, season, episode, url} = params;

        try {
            const hasVideo = await Video.findOne({
                where: {
                    aid,
                    season,
                    episode
                }
            });
            if (hasVideo) throw new Existing('视频已存在');

            const video = new Video();
            video.aid = aid;
            video.title = title;
            video.season = season;
            video.episode = episode;
            video.url = url;
            await video.save();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 播放
    static async play(params) {
        const {id} = params;

        try {
            const video = await Video.findByPk(id);
            if (!video) throw new NotFound('视频不存在');

            video.play_count += 1;
            await video.save();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 删除视频
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
