const {sequelize} = require('@core/db');
const {Model, DataTypes} = require('sequelize');
const {formatDate} = require('@core/utils');
const {User} = require('@models/user');
const {Anime} = require('@models/anime');

// 动漫收藏表模型
class Collection extends Model {}

Collection.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '动漫收藏主键ID'
        },
        uid: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '用户id'
        },
        aid: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '动漫id'
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
        modelName: 'collection',
        tableName: 'collection'
    }
);

// 用户与收藏之间的一对多关系
User.hasMany(Collection, {foreignKey: 'uid'});
Collection.belongsTo(User, {foreignKey: 'uid'});

// 动漫与收藏之间的一对多关系
Anime.hasMany(Collection, {foreignKey: 'aid'});
Collection.belongsTo(Anime, {foreignKey: 'aid'});

module.exports = {
    Collection
};
