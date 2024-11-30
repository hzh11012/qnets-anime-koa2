const secondsToHms = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.round(seconds % 60);
    return [hours, minutes, secs].map(v => (v < 10 ? '0' + v : v)).join(':');
};

module.exports = {
    secondsToHms
};
