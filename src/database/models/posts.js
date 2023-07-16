'use strict';
const {
  Model
} = require('sequelize');
const { enumFields } = require('../helper');
const { POST_TYPE } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Posts.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4
    },
    madeBy: {
      type: DataTypes.STRING,
      field: 'made_by',
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: false
    },
    type: enumFields(DataTypes, POST_TYPE, POST_TYPE.MOMENT),
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Posts',
    underscored: true,
    timestamps: true,
    paranoid: true
  });
  return Posts;
};