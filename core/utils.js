const {Base64} = require('js-base64');
const random = length => {
    const chars = '0123456789';
    let result = '';

    while (length > 0) {
        length--;
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
};

const encodeBase64 = (access_token) => {
    const base64 = Base64.encode(access_token + ':');
    return 'Basic ' + base64;
};

module.exports = {
    random,
    encodeBase64
};
