const Redis = require('ioredis');

class RedisService {
    constructor() {
        this.redis = new Redis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD
        });
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.redis.get(key, (err, result) => {
                if (err) reject('获取redis数据失败');
                resolve(result);
            });
        });
    }

    set(key, value) {
        this.redis.set(key, value);
    }
}

module.exports = new RedisService();
