const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');

/**
 * @title 公告模型
 */
class Announcement extends Model {}

Announcement.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '公告ID'
        },
        title: {
            type: DataTypes.STRING(25),
            allowNull: false,
            comment: '公告标题'
        },
        content: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            comment: '公告内容'
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
        modelName: 'announcement',
        tableName: 'announcement'
    }
);

module.exports = {
    Announcement
};
