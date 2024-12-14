const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');

// 定义公告表模型
class Notice extends Model {}

Notice.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '公告主键ID'
        },
        title: {
            type: DataTypes.STRING(25),
            allowNull: false,
            comment: '公告标题'
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '公告内容'
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
        modelName: 'notice',
        tableName: 'notice'
    }
);

module.exports = {
    Notice
};
