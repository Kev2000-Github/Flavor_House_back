'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_interests', {
            user_id: {
                type: Sequelize.STRING,
                primaryKey: true,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            interest_id: {
                type: Sequelize.STRING,
                primaryKey: true,
                references: {
                    model: 'interests',
                    key: 'id'
                }
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
        await queryInterface.dropTable('user_interests')
    }
}