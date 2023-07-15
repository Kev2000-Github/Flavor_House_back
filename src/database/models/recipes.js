'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipes.belongsToMany(models.Reviews, {
        through: models.Reviews
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
      type: DataTypes.STRING
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
  });
  return Recipes;
};