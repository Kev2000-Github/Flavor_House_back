'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Reviews extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    Reviews.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4
        },
        userId: {
            type: DataTypes.STRING,
            field: 'user_id',
            references: {
                model: 'users',
                key: 'id'
            },
            allowNull: false
        },
        recipeId: {
            type: DataTypes.STRING,
            field: 'recipe_id',
            references: {
                model: 'recipes',
                key: 'post_id'
            },
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Reviews',
        tableName: 'reviews',
        underscored: true,
        timestamps: true,
        paranoid: true
    })
    return Reviews
}