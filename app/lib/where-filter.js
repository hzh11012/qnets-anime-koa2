const {Op} = require('sequelize');

class WhereFilter {
    constructor(params = {}) {
        this.filter = params;
    }

    setWhere(key, value) {
        if (!key || value === undefined) return this;
        this.filter[key] = value;
        return this;
    }

    setFilter(key, condition, operator = Op.in) {
        if (!Array.isArray(condition) || !condition.length) return this;
        this.filter[key] = {[operator]: condition};
        return this;
    }

    setSearch(key, keyword) {
        if (!keyword) return this;

        const likePattern = `%${keyword}%`;

        if (Array.isArray(key)) {
            this.filter[Op.or] = key.map(k => ({
                [k]: {[Op.like]: likePattern}
            }));
        } else {
            this.filter[key] = {[Op.like]: likePattern};
        }
        return this;
    }

    // 追加额外的过滤条件
    append(key, filter) {
        if (!key || !filter) return this;
        this.filter[key] = {...this.filter[key], ...filter};
        return this;
    }

    getFilter() {
        return this.filter;
    }
}

module.exports = WhereFilter;
