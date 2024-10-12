const jwt = require('jsonwebtoken');

// 颁布令牌
const generateToken = function (uid, scope) {
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

module.exports = {
    generateToken
};
