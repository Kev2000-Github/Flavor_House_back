'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Likes.init({
    userId: {
      type: DataTypes.STRING,
      field: 'user_id',
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    postId: {
      type: DataTypes.STRING,
      field: 'post_id',
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Likes',
    tableName: 'likes',
    underscored: true,
    timestamps: true,
    paranoid: true
  });
  return Likes;
};