const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate, formatTime} = require('@core/utils');
const {Anime} = require('@models/anime');

// 定义新番更新时间表模型
class NewAnime extends Model {}

NewAnime.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '新番时间主键ID'
        },
        aid: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            unique: true,
            comment: '动漫ID'
        },
        update_day: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '新番更新天'
        },
        update_time: {
            type: DataTypes.TIME,
            allowNull: false,
            comment: '新番更新时间',
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
        modelName: 'new_anime',
        tableName: 'new_anime'
    }
);

// 新番更新时间与动漫之间的一对一关系
Anime.hasOne(NewAnime, {foreignKey: 'aid', onDelete: 'CASCADE'});
NewAnime.belongsTo(Anime, {foreignKey: 'aid'});

module.exports = {
    NewAnime
};
