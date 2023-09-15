'use strict'
const uuid = require('uuid').v4

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        const now = new Date()
        return queryInterface.bulkInsert('interests', [
            { id: uuid(), color: '#ebb7ce', imageUrl: 'dulce.jpeg', name: 'dulce', created_at: now, updated_at: now },
            { id: uuid(), color: '#399af9', imageUrl: 'salado.jpg', name: 'salado', created_at: now, updated_at: now },
            { id: uuid(), color: '#88000b', imageUrl: 'picante.jpg', name: 'picante', created_at: now, updated_at: now },
            { id: uuid(), color: '#20c67a', imageUrl: 'vegetariano.jpg', name: 'vegetariano', created_at: now, updated_at: now },
            { id: uuid(), color: '#d5f37a', imageUrl: 'vegano.jpg', name: 'vegano', created_at: now, updated_at: now },
            { id: uuid(), color: '#ff7360', imageUrl: 'asiatico.jpg', name: 'asiático', created_at: now, updated_at: now },
            { id: uuid(), color: '#e68321', imageUrl: 'latino.jpg', name: 'latino', created_at: now, updated_at: now },
            { id: uuid(), color: '#7052ff', imageUrl: 'mariscos.jpg', name: 'mariscos', created_at: now, updated_at: now },
            { id: uuid(), color: '#ff8862', imageUrl: 'carne.jpg', name: 'carne', created_at: now, updated_at: now },
            { id: uuid(), color: '#f39224', imageUrl: 'pasta.jpg', name: 'pasta', created_at: now, updated_at: now },
            { id: uuid(), color: '#b66056', imageUrl: 'pizza.jpg', name: 'pizza', created_at: now, updated_at: now },
            { id: uuid(), color: '#ebe6ea', imageUrl: 'sushi.jpg', name: 'sushi', created_at: now, updated_at: now },
            { id: uuid(), color: '#93c9b2', imageUrl: 'tacos.jpg', name: 'tacos', created_at: now, updated_at: now },
            { id: uuid(), color: '#ebd47d', imageUrl: 'ceviche.jpg', name: 'ceviche', created_at: now, updated_at: now },
            { id: uuid(), color: '#bf3000', imageUrl: 'hamburguesas.jpg', name: 'hamburguesas', created_at: now, updated_at: now },
            { id: uuid(), color: '#e4c5c4', imageUrl: 'pasteles.jpg', name: 'pasteles', created_at: now, updated_at: now },
            { id: uuid(), color: '#b38471', imageUrl: 'galletas.jpg', name: 'galletas', created_at: now, updated_at: now }
        ])
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('interests', null, {})
    }
}
