'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('steps', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            recipe_id: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'recipes',
                    key: 'post_id'
                }
            },
            description: {
                type: Sequelize.STRING
            },
            image: { 
                type: Sequelize.STRING
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
        await queryInterface.dropTable('steps')
    }
}