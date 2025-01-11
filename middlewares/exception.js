const {HttpException} = require('@core/http-exception');

module.exports = {
    json: (err, ctx) => {
        const baseResponse = {
            request: `${ctx.method}: ${ctx.path}`
        };

        if (err instanceof HttpException) {
            // 已知异常
            ctx.body = {
                ...baseResponse,
                msg: err.msg,
                errorCode: err.errorCode,
                ...(err.data && {data: err.data})
            };
            ctx.status = err.code;
        } else {
            // 未知异常
            ctx.body = {
                ...baseResponse,
                msg: err.errors?.[0]?.message || err.message,
                errorCode: 99999
            };
            ctx.status = 500;
        }
    },
    accepts: () => 'json'
};
