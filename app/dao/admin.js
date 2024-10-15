const {Admin} = require('@models/admin');
const {NotFound, Existing, AuthFailed} = require('@core/http-exception');
const bcrypt = require('bcryptjs');

class AdminDao {
    // 创建用管理员
    static async create(params) {
        const {phone, password, nickname} = params;

        const hasAdmin = await Admin.findOne({
            where: {
                deleted_at: null
            }
        });

        if (hasAdmin) {
            throw new Existing('已存在管理员，不支持新注册');
        }

        const admin = new Admin();
        admin.nickname = nickname;
        admin.phone = phone;
        admin.password = password;

        try {
            const res = await admin.save();
            const data = {
                phone: res.phone,
                nickname: res.nickname
            };

            return [null, data];
        } catch (err) {
            return [err, null];
        }
    }

    // 验证密码
    static async verify(params) {
        const {phone, password} = params;
        try {
            // 查询用户是否存在
            const admin = await Admin.findOne({
                where: {
                    phone
                }
            });

            if (!admin) {
                throw new NotFound('手机号不存在');
            }

            // 验证密码是否正确
            const correct = bcrypt.compareSync(password, admin.password);

            if (!correct) {
                throw new AuthFailed('密码错误');
            }

            return [null, admin];
        } catch (err) {
            return [err, null];
        }
    }

    // 获取信息
    static async info(id) {
        try {
            // 查询管理员是否存在
            const admin = await Admin.findOne({
                where: {
                    id
                },
                attributes: {
                    exclude: [
                        'password',
                        'updated_at',
                        'deleted_at',
                        'created_at'
                    ]
                }
            });

            if (!admin) {
                throw new NotFound('管理员不存在');
            }

            return [null, admin];
        } catch (err) {
            return [err, null];
        }
    }
}

module.exports = {
    AdminDao
};
