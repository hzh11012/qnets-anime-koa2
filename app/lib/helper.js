const {HttpException} = require('@core/http-exception');

class Resolve {
    fail(err = {}, msg = '操作失败', errorCode = 10001) {
        if (err instanceof HttpException) {
            return err;
        }
        return {
            msg,
            err,
            errorCode
        };
    }

    success(msg = 'success', code = 200) {
        return {
            code,
            msg
        };
    }

    json(data, msg = 'success', code = 200) {
        return {
            code,
            msg,
            data
        };
    }
}

module.exports = {
    Resolve
};
