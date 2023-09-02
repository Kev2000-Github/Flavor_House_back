'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class viewuserinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    viewuserinfo.init({
        userId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        followers: DataTypes.NUMBER,
        follows: DataTypes.NUMBER,
        posts: DataTypes.NUMBER
    }, {
        sequelize,
        tableName: 'view_user_info',
        modelName: 'ViewUserInfo',
        timestamps: false,
        underscored: true
    })
    return viewuserinfo
}