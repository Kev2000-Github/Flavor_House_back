'use strict'
const {
    Model
} = require('sequelize')
const { enumFields } = require('../helper')
const { POST_TYPE } = require('../constants')
module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Posts.belongsTo(models.Users, {
                foreignKey: 'madeBy'
            })
            Posts.hasOne(models.ViewPostsLikes, {
                foreignKey: 'id'
            })
            Posts.hasMany(models.Likes, {
                foreignKey: 'post_id'
            })
            Posts.hasMany(models.Favorites, {
                foreignKey: 'post_id'
            })
        }
    }
    Posts.init({
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
    }, {
        sequelize,
        tableName: 'posts',
        modelName: 'Posts',
        underscored: true,
        timestamps: true,
        paranoid: true
    })

    Posts.prototype.getLikes = () => {
        return this.ViewPost?.likes ?? 0
    }

    return Posts
}