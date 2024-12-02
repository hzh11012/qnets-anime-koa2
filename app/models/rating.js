const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const moment = require('moment');
const {User} = require('@app/models/user');
const {Anime} = require('@app/models/anime');

// 动漫评分表模型
class Rating extends Model {}

Rating.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '动漫评分主键ID'
        },
        uid: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '用户id'
        },
        aid: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '动漫id'
        },
        score: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '动漫评分'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '创建时间',
            get() {
                return moment(this.getDataValue('created_at')).format(
                    'YYYY-MM-DD HH:mm:ss'
                );
            }
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '更新时间',
            get() {
                return moment(this.getDataValue('updated_at')).format(
                    'YYYY-MM-DD HH:mm:ss'
                );
            }
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '删除时间',
            get() {
                if (this.getDataValue('deleted_at')) {
                    return moment(this.getDataValue('deleted_at')).format(
                        'YYYY-MM-DD HH:mm:ss'
                    );
                }
                return null;
            }
        }
    },
    {
        sequelize,
        modelName: 'rating',
        tableName: 'rating'
    }
);

// 用户与评分之间的一对多关系
User.hasMany(Rating);
Rating.belongsTo(User, {foreignKey: 'uid'});

// 动漫与评分之间的一对多关系
Anime.hasMany(Rating);
Rating.belongsTo(Anime, {foreignKey: 'aid'});

module.exports = {
    Rating
};
