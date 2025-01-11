const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate, formatTime} = require('@core/utils');

/**
 * @title 新番导视模型
 */
class AnimeGuide extends Model {}

AnimeGuide.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '新番导视ID'
        },
        anime_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            unique: true,
            comment: '动漫ID'
        },
        update_day: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            comment: '动漫更新日 1-7 分别对应周一到周日'
        },
        update_time: {
            type: DataTypes.TIME,
            allowNull: false,
            comment: '动漫更新时间',
            get() {
                return formatTime(this.getDataValue('update_time'));
            }
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
        modelName: 'anime_guide',
        tableName: 'anime_guide'
    }
);

module.exports = {
    AnimeGuide
};
