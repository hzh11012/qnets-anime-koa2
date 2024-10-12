const {AdminDao} = require('@dao/admin');
const {generateToken} = require('@core/utils');
const {Auth} = require('@middlewares/auth');

class LoginManager {
    // 管理员登录
    static async adminLogin(params) {
        // 验证账号密码是否正确
        const [err, admin] = await AdminDao.verify(params);
        if (!err) {
            return [null, generateToken(admin.id, 2)];
        } else {
            return [err, null];
        }
    }
}

module.exports = {
    LoginManager
};
