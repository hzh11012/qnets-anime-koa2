const {Base64} = require('js-base64');
const moment = require('moment');

const random = length => {
    const chars = '0123456789';
    let result = '';

    while (length > 0) {
        length--;
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
};

const encodeBase64 = access_token => {
    const base64 = Base64.encode(access_token + ':');
    return 'Basic ' + base64;
};

const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    return date ? moment(date).format(format) : null;
};

module.exports = {
    random,
    encodeBase64,
    formatDate
};
