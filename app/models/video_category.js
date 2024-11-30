const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const moment = require('moment');
const {User} = require('@app/models/user');

// 定义视频分类表模型
class VideoCategory extends Model {}

VideoCategory.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '视频分类主键ID'
        },
        category: {
            type: DataTypes.STRING(25),
            allowNull: false,
            comment: '视频分类'
        },
        created_by: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '创建用户id'
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
        modelName: 'video_category',
        tableName: 'video_category'
    }
);

VideoCategory.belongsTo(User, {foreignKey: 'created_by', targetKey: 'id'});

module.exports = {
    VideoCategory
};
