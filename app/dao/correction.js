const {Correction} = require('@models/correction');
const {NotFound} = require('@core/http-exception');

class CorrectionDao {
    // 创建纠错
    static async create(params) {
        const {uid, message} = params;
        const correction = new Correction();
        correction.uid = uid;
        correction.message = message;
        try {
            await correction.save();
            return [null, null];
        } catch (err) {
            return [err, null];
        }
    }

    // 更新状态
    static async updateStatus(params) {
        const {id, status} = params;
        const correction = await Correction.findByPk(id);

        if (!correction) {
            throw new NotFound('纠错信息不存在');
        }

        if (Boolean(correction.status) === Boolean(status)) {
            return [null, correction];
        }

        correction.status = Boolean(status) ? 1 : 0;
        try {
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
