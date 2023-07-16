'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Followers extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    Followers.init({
        userId: {
            type: DataTypes.STRING,
            field: 'user_id',
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        followedBy: {
            type: DataTypes.STRING,
            field: 'followed_by',
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
    }, {
        sequelize,
        modelName: 'Followers',
        tableName: 'followers',
        underscored: true,
        timestamps: true,
        paranoid: true
    })
    return Followers
}