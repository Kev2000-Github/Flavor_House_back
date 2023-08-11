'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Recipes extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Recipes.belongsTo(models.Posts, {
                foreignKey: 'postId'
            })
            Recipes.belongsToMany(models.Interests, {
                through: models.RecipeTags,
                foreignKey: 'recipeId',
                as: 'Tags'
            })
            Recipes.hasMany(models.Ingredients, {
                foreignKey: 'recipeId'
            })
            Recipes.hasMany(models.Steps, {
                foreignKey: 'recipeId'
            })
        }
    }
    Recipes.init({
        postId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4,
            field: 'post_id',
            references: {
                model: 'posts',
                key: 'id'
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            validate: {
                len:{
                    args: [10, 500],
                    msg: 'String length is not in this range'
                } 
            }
        },
        image: { 
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'recipes',
        modelName: 'Recipes',
        underscored: true,
        timestamps: true,
        paranoid: true
    })
    return Recipes
}