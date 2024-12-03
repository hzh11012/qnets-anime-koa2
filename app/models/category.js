const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');

// 定义动漫分类表模型
class Category extends Model {}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '动漫分类主键ID'
        },
        category: {
            type: DataTypes.STRING(25),
            allowNull: false,
            comment: '动漫分类'
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
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '删除时间',
            get() {
                return formatDate(this.getDataValue('deleted_at'));
            }
        }
    },
    {
        sequelize,
        modelName: 'category',
        tableName: 'category'
    }
);

module.exports = {
    Category
};
