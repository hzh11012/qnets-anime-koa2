class HttpException extends Error {
    constructor(msg = '服务端异常', errorCode = 10001, code = 500) {
        super();
        Object.assign(this, {msg, errorCode, code});
    }
}

// 定义通用的异常工厂函数
const createHttpException = (defaultMsg, defaultErrorCode, statusCode) =>
    class extends HttpException {
        constructor(msg = defaultMsg, errorCode = defaultErrorCode) {
            super(msg, errorCode, statusCode);
        }
    };

// 使用工厂函数创建具体的异常类
const ParameterException = createHttpException('参数错误', 10002, 400);
const AuthFailed = createHttpException('授权失败', 10004, 401);
const Forbidden = createHttpException('禁止访问', 10005, 403);
const NotFound = createHttpException('404找不到', 10006, 404);
const Existing = createHttpException('已存在', 10007, 412);

module.exports = {
    HttpException,
    ParameterException,
    AuthFailed,
    NotFound,
    Forbidden,
    Existing
};
