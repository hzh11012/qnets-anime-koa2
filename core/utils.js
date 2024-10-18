const jwt = require('jsonwebtoken');

// 颁布令牌
const generateToken = (uid, scope) => {
    const token = jwt.sign(
        {
            uid,
            scope
        },
        process.env.SECRET_KEY,
        {
            expiresIn: process.env.EXPIRES_IN
        }
    );
    return token;
};

// 验证令牌
const verifyToken = token => {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    return decode;
};

module.exports = {
    generateToken,
    verifyToken
};
