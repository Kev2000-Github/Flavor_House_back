'use strict'
const {
    Model
} = require('sequelize')
const { enumFields } = require('../helper')
const { SEX } = require('../constants')
const { hashPassword } = require('../../utils/common')
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Users.belongsToMany(models.Interests, {
                through: models.UserInterests
            })
            Users.belongsTo(models.Countries, {
                foreignKey: 'country_id'
            })
        }
    }
    Users.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4
        },
        fullName: {
            type: DataTypes.STRING,
            field: 'full_name',
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'This username is already taken'
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'This email is already taken'
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sex: enumFields(DataTypes, SEX, SEX.NONE),
        phoneNumber: {
            field: 'phone_number',
            type: DataTypes.STRING
        },
        countryId: {
            field: 'country_id',
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.TEXT
        },
        step: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Users',
        tableName: 'users',
        underscored: true,
        timestamps: true,
        paranoid: true,
        hooks: {
            beforeCreate: async function (user) {
                const newPass = await hashPassword(10, user.password)
                user.password = newPass
            },
            beforeUpdate: async function (user) {
                if(user.changed('password')){
                    const newPass = await hashPassword(10, user.password)
                    user.password = newPass  
                }
            }
        }
    })
    return Users
}