'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Moments extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Moments.belongsTo(models.Posts, {
                foreignKey: 'postId'
            })
        }
    }
    Moments.init({
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
        description: {
            type: DataTypes.TEXT,
            validate: {
                len:{
                    args: [10, 500],
                    msg: 'String length is not in this range'
                } 
            }
        },
        image: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'moments',
        modelName: 'Moments',
        underscored: true,
        timestamps: true,
        paranoid: true
    })
    return Moments
}