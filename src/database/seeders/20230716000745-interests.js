'use strict';
const uuid = require('uuid').v4

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()
    queryInterface.bulkInsert('interests', [
      { id: uuid(), name: "dulce", created_at: now, updated_at: now },
      { id: uuid(), name: "salado", created_at: now, updated_at: now },
      { id: uuid(), name: "picante", created_at: now, updated_at: now },
      { id: uuid(), name: "vegetariano", created_at: now, updated_at: now },
      { id: uuid(), name: "vegano", created_at: now, updated_at: now },
      { id: uuid(), name: "asiático", created_at: now, updated_at: now },
      { id: uuid(), name: "latino", created_at: now, updated_at: now },
      { id: uuid(), name: "mariscos", created_at: now, updated_at: now },
      { id: uuid(), name: "carne", created_at: now, updated_at: now },
      { id: uuid(), name: "pasta", created_at: now, updated_at: now },
      { id: uuid(), name: "pizza", created_at: now, updated_at: now },
      { id: uuid(), name: "sushi", created_at: now, updated_at: now },
      { id: uuid(), name: "tacos", created_at: now, updated_at: now },
      { id: uuid(), name: "ceviche", created_at: now, updated_at: now },
      { id: uuid(), name: "hamburguesas", created_at: now, updated_at: now },
      { id: uuid(), name: "pasteles", created_at: now, updated_at: now },
      { id: uuid(), name: "galletas", created_at: now, updated_at: now }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('interests', null, {})
  }
};
