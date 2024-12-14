const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');
const {User} = require('@models/user');

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
        modelName: 'correction',
        tableName: 'correction'
    }
);

// 用户与纠错信息之间的一对一关系
User.hasOne(Correction, {foreignKey: 'uid', onDelete: 'CASCADE'});
Correction.belongsTo(User, {foreignKey: 'uid'});

module.exports = {
    Correction
};
