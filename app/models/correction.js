const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const moment = require('moment');

// 定义纠错信息表模型
class Correction extends Model {}

Correction.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '纠错信息主键ID'
        },
        uid: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '用户id'
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '纠错留言'
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            comment: '纠错信息状态'
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
        modelName: 'correction',
        tableName: 'correction'
    }
);

module.exports = {
    Correction
};
