const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const moment = require('moment');

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
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
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
            allowNull: false,
            comment: '动漫备注'
        },
        // 动漫状态  1-连载中 2-已完结
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '动漫状态'
        },
        // 动漫类型  1-日番 2-美番 3-里番 4-剧场版
        type: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '动漫类型'
        },
        director: {
            type: DataTypes.STRING(25),
            allowNull: false,
            comment: '动漫导演'
        },
        cv: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '动漫声优'
        },
        year: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '动漫发行年份',
            get() {
                return moment(this.getDataValue('released_at')).format('YYYY');
            }
        },
        // 动漫发行月份  1-一月番 2-四月番 3-七月番 4-十月番
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
        modelName: 'anime',
        tableName: 'anime'
    }
);

module.exports = {
    Anime
};
