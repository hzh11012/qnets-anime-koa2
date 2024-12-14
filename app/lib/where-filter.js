const {Op} = require('sequelize');

class WhereFilter {
    constructor(params) {
        this.filter = params || {};
    }

    setWhere(key, value) {
        if (key && value) {
            this.filter[key] = value;
        }
    }

    setFilter(key, condition, operator = Op.in) {
        if (Array.isArray(condition)) {
            this.filter[key] = {[operator]: condition};
        }
    }

    setSearch(key, keyword) {
        if (keyword) {
            if (Array.isArray(key)) {
                this.filter[Op.or] = [
                    ...key.map(k => ({
                        [k]: {
                            [Op.like]: `%${keyword}%`
                        }
                    }))
                ];
            } else {
                this.filter[key] = {
                    [Op.like]: `%${keyword}%`
                };
            }
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
