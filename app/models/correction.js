const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const moment = require('moment');
const {User} = require('@app/models/user');

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
        // 纠错信息状态 0-待处理 1-已处理
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
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
                if (this.getDataValue('deleted_at')) {
                    return moment(this.getDataValue('deleted_at')).format(
                        'YYYY-MM-DD HH:mm:ss'
                    );
                }
                return null;
            }
        }
    },
    {
        sequelize,
        modelName: 'correction',
        tableName: 'correction'
    }
);

Correction.belongsTo(User, {foreignKey: 'uid', targetKey: 'id'});

module.exports = {
    Correction
};
