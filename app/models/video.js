const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');

/**
 * @title 视频模型
 */
class Video extends Model {}

Video.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '视频ID'
        },
        anime_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '动漫ID'
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '视频标题'
        },
        episode: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            comment: '集数编号'
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '视频链接'
        },
        play_count: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '视频播放次数'
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
        modelName: 'video',
        tableName: 'video'
    }
);

module.exports = {
    Video
};
