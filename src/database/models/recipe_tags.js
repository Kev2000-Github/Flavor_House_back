'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class RecipeTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    RecipeTags.init({}, {
        sequelize,
        modelName: 'RecipeTags',
        tableName: 'recipe_tags',
        timestamps: false,
        underscored: true,
        paranoid: false
    })
    return RecipeTags
}