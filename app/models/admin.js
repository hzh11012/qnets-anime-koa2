const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcryptjs');
const moment = require('moment');

// 管理表模型
class Admin extends Model {}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '管理员主键ID'
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: '登录手机号'
        },
        password: {
            type: DataTypes.STRING,
            set(val) {
                // 加密
                const salt = bcrypt.genSaltSync(10);
                // 生成加密密码
                const psw = bcrypt.hashSync(val, salt);
                this.setDataValue('password', psw);
            },
            allowNull: false,
            comment: '登录密码'
        },
        nickname: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '管理员昵称'
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
        }
    },
    {
        sequelize,
        modelName: 'admin',
        tableName: 'admin'
    }
);

module.exports = {
    Admin
};
