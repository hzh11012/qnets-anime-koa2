const jwt = require('jsonwebtoken');
const basicAuth = require('basic-auth');
const {Forbidden} = require('@core/http-exception');

class Auth {
    constructor(level) {
        this.level = level || 1;
    }

    get m() {
        return async (ctx, next) => {
            const tokenToken = basicAuth(ctx.req);

            let errMsg = '无效的token';

            if (!tokenToken || !tokenToken.name) {
                errMsg = '需要携带token值';
                throw new Forbidden(errMsg);
            }

            try {
                var decode = jwt.verify(
                    tokenToken.name,
                    process.env.SECRET_KEY
                );
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    errMsg = 'token已过期';
                }
                throw new Forbidden(errMsg);
            }

            if (decode.scope < this.level) {
                errMsg = '权限不足';
                throw new Forbidden(errMsg);
            }

            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            };

            await next();
        };
    }
}

module.exports = {
    Auth
};
