const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');
const {Anime} = require('@models/anime');

// 定义动漫轮播图表模型
class Banner extends Model {}

Banner.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '动漫轮播图主键ID'
        },
        aid: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            unique: true,
            comment: '动漫ID'
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
        modelName: 'banner',
        tableName: 'banner'
    }
);

// 动漫轮播图与动漫之间的一对一关系
Anime.hasOne(Banner, {foreignKey: 'aid', onDelete: 'CASCADE'});
Banner.belongsTo(Anime, {foreignKey: 'aid'});

module.exports = {
    Banner
};
