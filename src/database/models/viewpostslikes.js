'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class ViewPostsLikes extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {

        }
    }
    ViewPostsLikes.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4,
            references: {
                model: 'posts',
                key: 'id'
            }
        },
        likes: {
            type: DataTypes.FLOAT
        }
    }, {
        sequelize,
        tableName: 'view_posts_likes',
        modelName: 'ViewPostsLikes',
        timestamps: false,
        underscored: true
    })
    return ViewPostsLikes
}