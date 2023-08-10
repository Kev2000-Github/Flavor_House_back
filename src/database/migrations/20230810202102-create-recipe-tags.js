'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('recipe_tags', {
            recipe_id: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'recipes',
                    key: 'post_id'
                }
            },
            tag_id: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'interests',
                    key: 'id'
                }
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('recipe_tags')
    }
}