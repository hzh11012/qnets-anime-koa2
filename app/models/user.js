const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');

/**
 * @title 用户模型
 */
class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '用户ID'
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: '用户手机号'
        },
        nickname: {
            type: DataTypes.STRING(25),
            allowNull: false,
            comment: '用户昵称'
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: '用户头像'
        },
        // TODO 目前权限先这样，后续看情况再细分
        scope: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            comment: '用户权限 -1-封禁 0-游客 1-普通用户 2-正式会员 3-管理员'
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
        modelName: 'user',
        tableName: 'user'
    }
);

module.exports = {
    User
};
