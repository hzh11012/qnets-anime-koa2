const basicAuth = require('basic-auth');
const {Forbidden, AuthFailed, HttpException} = require('@core/http-exception');
const {got} = require('got-cjs');
const {encodeBase64} = require('@core/utils');
const {UserDao} = require('@app/dao/user');

class Auth {
    constructor(level) {
        // 权限等级 0-游客 1-正式会员 2-管理员
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
        const [err, res] = await UserDao.init({phone});

        if (err) {
            throw new HttpException();
        }

        return {
            phone: res.phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2'),
            scope: res.scope,
            nickname: res.nickname,
            avatar: res.avatar,
            created_at: res.created_at
        };
    }

    get m() {
        return async (ctx, next) => {
            const tokenToken = basicAuth(ctx.req);

            let errMsg = '无效的token';

            if (!tokenToken || !tokenToken.name) {
                errMsg = '需要携带token值';
                throw new AuthFailed(errMsg);
            }

            try {
                var decode = await this.verifyToken(tokenToken.name);
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    errMsg = 'token已过期';
                }
                throw new AuthFailed(errMsg);
            }

            if (decode.scope < this.level) {
                errMsg = '权限不足';
                throw new Forbidden(errMsg);
            }

            ctx.auth = {
                ...decode
            };

            await next();
        };
    }
}

module.exports = {
    Auth
};
