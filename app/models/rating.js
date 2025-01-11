const {sequelize} = require('@core/db');
const {Model, DataTypes, fn, col} = require('sequelize');
const {formatDate} = require('@core/utils');

/**
 * @title 动漫评分模型
 */
class Rating extends Model {
    /**
     * @title 获取动漫平均分
     * @param {number} animeId - 动漫ID
     * @returns {Promise<number>} - 动漫平均分
     */
    static async getAverageScore(animeId) {
        return await this.findOne({
            where: {anime_id: animeId},
            attributes: [[fn('AVG', col('score')), 'average_score']]
        });
    }
}

Rating.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '动漫评分ID'
        },
        user_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '用户ID'
        },
        anime_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '动漫ID'
        },
        score: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            comment: '动漫评分分数'
        },
        content: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            comment: '动漫评分内容'
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
        modelName: 'rating',
        tableName: 'rating',
        indexes: [
            {
                fields: ['user_id', 'anime_id'],
                unique: true,
                name: 'idx__rating__user_id__anime_id'
            }
        ]
    }
);

module.exports = {
    Rating
};
