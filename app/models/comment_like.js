const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');

/**
 * @title 评论点赞模型
 */
class CommentLike extends Model {}

CommentLike.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '评论点赞ID'
        },
        user_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '用户ID'
        },
        comment_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '评论ID'
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
        modelName: 'comment_like',
        tableName: 'comment_like',
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'comment_id'],
                name: 'idx__comment_like__user_id__comment_id'
            }
        ]
    }
);

module.exports = {
    CommentLike
};
