'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInterests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserInterests.init({}, {
    sequelize,
    modelName: 'UserInterests',
    tableName: 'user_interests',
    underscored: true,
    timestamps: false,
    paranoid: true
  });
  return UserInterests;
};