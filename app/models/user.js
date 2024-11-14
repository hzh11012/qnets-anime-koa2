const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const moment = require('moment');

// 用户表模型
class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '用户主键ID'
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
        scope: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            comment: '用户权限'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '创建时间',
            get() {
                return moment(this.getDataValue('created_at')).format(
                    'YYYY-MM-DD HH:mm:ss'
                );
            }
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '更新时间',
            get() {
                return moment(this.getDataValue('updated_at')).format(
                    'YYYY-MM-DD HH:mm:ss'
                );
            }
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '删除时间',
            get() {
                return moment(this.getDataValue('deleted_at')).format(
                    'YYYY-MM-DD HH:mm:ss'
                );
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
