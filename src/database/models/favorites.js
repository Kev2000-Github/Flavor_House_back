'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Favorites extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    Favorites.init({
        userId: {
            type: DataTypes.STRING,
            field: 'user_id',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        postId: {
            type: DataTypes.STRING,
            field: 'post_id',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'posts',
                key: 'id'
            }
        },
    }, {
        sequelize,
        modelName: 'Favorites',
        tableName: 'favorites',
        underscored: true,
        timestamps: true,
        paranoid: true
    })
    return Favorites
}