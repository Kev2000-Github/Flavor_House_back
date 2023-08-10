'use strict'

const { SEX } = require('../constants')
const { enumArray } = require('../helper')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            full_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            sex: {
                type: Sequelize.ENUM(...enumArray(SEX)),
                allowNull: false
            },
            phone_number: {
                type: Sequelize.STRING
            },
            country_id: {
                type: Sequelize.STRING,
                references: {
                    model: 'countries',
                    key: 'id'
                }
            },
            avatar: {
                type: Sequelize.TEXT
            },
            step: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            deleted_at: {
                type: Sequelize.DATE
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users')
    }
}