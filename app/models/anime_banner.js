const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');

/**
 * @title 动漫轮播模型
 */
class AnimeBanner extends Model {}

AnimeBanner.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '动漫轮播图ID'
        },
        anime_id: {
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
        modelName: 'anime_banner',
        tableName: 'anime_banner'
    }
);

module.exports = {
    AnimeBanner
};
