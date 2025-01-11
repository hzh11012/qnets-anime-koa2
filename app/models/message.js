const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');

/**
 * @title 留言模型
 */
class Message extends Model {}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '留言ID'
        },
        user_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '用户ID'
        },
        type: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '留言类型 0-咨询 1-建议 2-投诉 3-其他'
        },
        content: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            comment: '留言内容'
        },
        reply_content: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            comment: '回复留言内容'
        },
        status: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '留言状态 0-待处理 1-处理中 2-已完成 3-已关闭'
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
        modelName: 'message',
        tableName: 'message'
    }
);

module.exports = {
    Message
};
