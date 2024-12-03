const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');
const {Anime} = require('@app/models/anime');

// 视频信息表
class Video extends Model {}

Video.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '视频信息主键ID'
        },
        aid: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '动漫id'
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '视频标题'
        },
        season: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '季数编号'
        },
        episode: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '集数编号'
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '视频链接'
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
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '删除时间',
            get() {
                return formatDate(this.getDataValue('deleted_at'));
            }
        }
    },
    {
        sequelize,
        modelName: 'video',
        tableName: 'video'
    }
);

// 动漫与视频之间的一对多关系
Anime.hasMany(Video);
Video.belongsTo(Anime, {foreignKey: 'aid'});

module.exports = {
    Video
};
