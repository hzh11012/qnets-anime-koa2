const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');

// 动漫信息表
class Anime extends Model {}

Anime.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '动漫信息主键ID'
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            comment: '动漫名称'
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '动漫简介'
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '动漫封面'
        },
        remark: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '动漫备注'
        },
        // 动漫状态  0-即将上线 1-连载中 2-已完结
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '动漫状态'
        },
        // 动漫类型 0-剧场版 1-日番 2-美番 3-国番 4-里番
        type: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '动漫类型'
        },
        director: {
            type: DataTypes.STRING(25),
            allowNull: true,
            comment: '动漫导演'
        },
        cv: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: '动漫声优'
        },
        year: {
            type: DataTypes.STRING(4),
            allowNull: false,
            comment: '动漫发行年份'
        },
        // 动漫发行月份  0-一月番 1-四月番 2-七月番 3-十月番
        month: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '动漫发行月份'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '创建时间',
            get() {
                return formatDate(this.getDataValue('created_at'));
            }
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '更新时间',
            get() {
                return formatDate(this.getDataValue('updated_at'));
            }
        }
    },
    {
        sequelize,
        modelName: 'anime',
        tableName: 'anime'
    }
);

module.exports = {
    Anime
};
