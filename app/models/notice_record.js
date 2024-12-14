const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');
const {Notice} = require('@models/notice');
const {User} = require('@models/user');

// 定义公告记录表模型
class NoticeRecord extends Model {}

NoticeRecord.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '公告记录主键ID'
        },
        nid: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '公告id'
        },
        uid: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '用户id'
        },
        // 公告阅读状态 0-未读 1-已读
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            comment: '公告阅读状态'
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
        modelName: 'notice_record',
        tableName: 'notice_record'
    }
);

// 用户与公告记录之间的一对多关系
User.hasMany(NoticeRecord, {foreignKey: 'uid', onDelete: 'CASCADE'});
NoticeRecord.belongsTo(User, {foreignKey: 'uid'});

// 公告与公告记录之间的一对多关系
Notice.hasMany(NoticeRecord, {foreignKey: 'nid', onDelete: 'CASCADE'});
NoticeRecord.belongsTo(Notice, {foreignKey: 'nid'});

module.exports = {
    NoticeRecord
};
