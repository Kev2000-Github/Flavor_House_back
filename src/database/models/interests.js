'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Interests extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Interests.belongsToMany(models.Users, {
                through: models.UserInterests
            })
            Interests.belongsToMany(models.Recipes, {
                through: models.RecipeTags,
                foreignKey: 'tagId'
            })
        }
    }
    Interests.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            field: 'image_url'
        },
        color: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'interests',
        modelName: 'Interests',
        underscored: true,
        timestamps: true,
        paranoid: true
    })
    return Interests
}