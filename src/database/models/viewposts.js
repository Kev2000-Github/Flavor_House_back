'use strict'
const {
    Model
} = require('sequelize')
const { enumFields } = require('../helper')
const { POST_TYPE } = require('../constants')
module.exports = (sequelize, DataTypes) => {
    class ViewPosts extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            ViewPosts.belongsTo(models.Users, {
                foreignKey: 'madeBy'
            })
            ViewPosts.hasMany(models.Likes, {
                foreignKey: 'post_id'
            })
            ViewPosts.hasMany(models.Favorites, {
                foreignKey: 'post_id'
            })
        }
    }
    ViewPosts.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4
        },
        madeBy: {
            type: DataTypes.STRING,
            field: 'made_by',
            references: {
                model: 'users',
                key: 'id'
            },
            allowNull: false
        },
        type: enumFields(DataTypes, POST_TYPE, POST_TYPE.MOMENT),
        likes: {
            type: DataTypes.FLOAT
        }
    }, {
        sequelize,
        tableName: 'view_posts',
        modelName: 'ViewPosts',
        timestamps: true,
        underscored: true
    })
    return ViewPosts
}