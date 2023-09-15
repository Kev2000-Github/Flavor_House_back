'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Comments.belongsTo(models.Users, {
                foreignKey: 'userId'
            })
        }
    }
    Comments.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4
        },
        userId: {
            type: DataTypes.STRING,
            field: 'user_id',
            references: {
                model: 'users',
                key: 'id'
            },
            allowNull: false
        },
        postId: {
            type: DataTypes.STRING,
            field: 'post_id',
            references: {
                model: 'posts',
                key: 'id'
            },
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Comments',
        tableName: 'comments',
        underscored: true,
        timestamps: true,
        paranoid: true
    })
    return Comments
}