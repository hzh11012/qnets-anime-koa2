const {Op} = require('sequelize');

class WhereFilter {
    constructor(params) {
        this.filter = params || {
            deleted_at: null
        };
    }

    setFilter(key, condition, operator = Op.in) {
        if (Array.isArray(condition)) {
            this.filter[key] = {[operator]: condition};
        }
    }

    setSearch(key, keyword) {
        if (keyword) {
            this.filter[key] = {
                [Op.like]: `%${keyword}%`
            };
        }
    }

    // 追加额外的过滤条件
    append(key, filter) {
        this.filter[key] = {...this.filter[key], ...filter};
    }

    getFilter() {
        return this.filter;
    }
}

module.exports = WhereFilter;
