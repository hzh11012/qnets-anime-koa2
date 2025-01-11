const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');

/**
 * @title 评论通知模型
 */
class CommentNotice extends Model {}

CommentNotice.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '评论通知ID'
        },
        comment_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '评论ID'
        },
        form_user_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '评论用户ID'
        },
        to_user_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '被评论用户ID'
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: '是否已读'
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
        modelName: 'comment_notice',
        tableName: 'comment_notice'
    }
);

module.exports = {
    CommentNotice
};
