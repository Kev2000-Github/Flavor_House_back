'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class ViewRecipeStars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    ViewRecipeStars.init({
        postId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4,
            references: {
                model: 'recipes',
                key: 'postId'
            }
        },
        stars: {
            type: DataTypes.FLOAT
        }
    }, {
        sequelize,
        tableName: 'view_recipe_stars',
        modelName: 'ViewRecipeStars',
        timestamps: false,
        underscored: true
    })
    return ViewRecipeStars
}