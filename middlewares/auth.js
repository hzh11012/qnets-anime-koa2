const basicAuth = require('basic-auth');
const {Forbidden, AuthFailed, HttpException} = require('@core/http-exception');
const {got} = require('got-cjs');
const {encodeBase64} = require('@core/utils');
const {UserDao} = require('@dao/user');

class Auth {
    constructor(level) {
        // 权限等级 -1-封禁 0-游客 1-普通用户 2-正式会员 3-管理员
        this.level = level;
    }

    async verifyToken(token) {
        // 验证token
        const {data} = await got(
            process.env.SSO_BASE_URL + '/api/sso/token_check',
            {
                method: 'POST',
                headers: {
                    Authorization: encodeBase64(token)
                }
            }
        ).json();

        const {phone} = data;
        const [err, res] = await UserDao.createOrFind({phone});
        if (err) throw new HttpException();

        return {
            id: res.id,
            phone: res.phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2'),
            scope: res.scope,
            nickname: res.nickname,
            avatar: res.avatar,
            created_at: res.created_at
        };
    }

    get m() {
        return async (ctx, next) => {
            const token = basicAuth(ctx.req);

            if (!token?.name) throw new AuthFailed('需要携带token值');

            try {
                const user = await this.verifyToken(token.name);

                if (user.scope < this.level) throw new Forbidden('权限不足');

                ctx.auth = user;
            } catch (error) {
                const errMsg =
                    error.name === 'TokenExpiredError'
                        ? 'token已过期'
                        : '无效的token';
                throw new AuthFailed(errMsg);
            }
            await next();
        };
    }
}

module.exports = {
    Auth
};
