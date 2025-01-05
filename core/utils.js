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

const formatTime = (date, format = 'HH:mm') => {
    return date ? moment(date, 'LTS').format(format) : null;
};

const secondsToHms = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.round(seconds % 60);
    return [hours, minutes, secs].map(v => (v < 10 ? '0' + v : v)).join(':');
};

const colorRgbToHex = rgbStr => {
    //十六进制颜色值的正则表达式
    const reg =
        /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8}|[0-9a-fA-f]{6}[0-9]{2})$/;
    if (reg.test(rgbStr)) {
        return rgbStr;
    } else {
        const rgbArray = rgbStr
            .replace(/(?:\(|\)|rgba|rgb|RGBA|RGB)*/g, '')
            .split(',');
        let strHex = '#';
        for (let i = 0; i < rgbArray.length; i++) {
            if (i !== 3) {
                if (rgbArray[i] == '0') {
                    strHex += '00';
                } else {
                    let newItem = Number(rgbArray[i]).toString(16);
                    if (newItem.length < 2) {
                        newItem = '0' + newItem;
                    }
                    strHex += newItem;
                }
            } else {
                strHex += rgbArray[i] == '0' ? '' : Number(rgbArray[i]) * 100;
            }
        }
        return strHex;
    }
};

module.exports = {
    random,
    encodeBase64,
    formatDate,
    formatTime,
    secondsToHms,
    colorRgbToHex
};
