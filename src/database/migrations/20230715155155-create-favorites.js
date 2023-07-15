'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('favorites', {
      user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      post_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'posts',
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('favorites');
  }
};