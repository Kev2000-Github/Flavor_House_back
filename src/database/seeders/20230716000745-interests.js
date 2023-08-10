'use strict'
const uuid = require('uuid').v4

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        const now = new Date()
        return queryInterface.bulkInsert('interests', [
            { id: uuid(), color: '#ebb7ce', name: 'dulce', created_at: now, updated_at: now },
            { id: uuid(), color: '#399af9', name: 'salado', created_at: now, updated_at: now },
            { id: uuid(), color: '#88000b', name: 'picante', created_at: now, updated_at: now },
            { id: uuid(), color: '#20c67a', name: 'vegetariano', created_at: now, updated_at: now },
            { id: uuid(), color: '#d5f37a', name: 'vegano', created_at: now, updated_at: now },
            { id: uuid(), color: '#ff7360', name: 'asiático', created_at: now, updated_at: now },
            { id: uuid(), color: '#e68321', name: 'latino', created_at: now, updated_at: now },
            { id: uuid(), color: '#7052ff', name: 'mariscos', created_at: now, updated_at: now },
            { id: uuid(), color: '#ff8862', name: 'carne', created_at: now, updated_at: now },
            { id: uuid(), color: '#f39224', name: 'pasta', created_at: now, updated_at: now },
            { id: uuid(), color: '#b66056', name: 'pizza', created_at: now, updated_at: now },
            { id: uuid(), color: '#ebe6ea', name: 'sushi', created_at: now, updated_at: now },
            { id: uuid(), color: '#93c9b2', name: 'tacos', created_at: now, updated_at: now },
            { id: uuid(), color: '#ebd47d', name: 'ceviche', created_at: now, updated_at: now },
            { id: uuid(), color: '#bf3000', name: 'hamburguesas', created_at: now, updated_at: now },
            { id: uuid(), color: '#e4c5c4', name: 'pasteles', created_at: now, updated_at: now },
            { id: uuid(), color: '#b38471', name: 'galletas', created_at: now, updated_at: now }
        ])
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('interests', null, {})
    }
}
