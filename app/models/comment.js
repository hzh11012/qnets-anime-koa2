const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');

/**
 * @title 评论模型
 */
class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '评论ID'
        },
        user_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '用户ID'
        },
        video_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '视频ID'
        },
        parent_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
            comment: '父评论ID'
        },
        content: {
            type: DataTypes.STRING(500),
            allowNull: false,
            comment: '评论内容'
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
        modelName: 'comment',
        tableName: 'comment'
    }
);

module.exports = {
    Comment
};
