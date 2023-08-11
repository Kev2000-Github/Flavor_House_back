'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Steps extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    Steps.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4
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
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: { 
            type: DataTypes.STRING,
            allowNull: true 
        }
    }, {
        sequelize,
        tableName: 'steps',
        modelName: 'Steps',
        underscored: true,
        timestamps: true,
        paranoid: false
    })
    return Steps
}