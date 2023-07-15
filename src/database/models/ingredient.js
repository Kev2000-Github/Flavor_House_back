'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ingredients.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4
    },
    recipeId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'recipe_id',
      references: {
        model: 'recipes',
        key: 'post_id'
      }
    },
    description: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'ingredients',
    modelName: 'Ingredients',
    underscored: true,
    timestamps: true,
    paranoid: true
  });
  return Ingredients;
};