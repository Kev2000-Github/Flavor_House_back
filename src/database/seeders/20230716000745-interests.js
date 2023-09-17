'use strict'
const uuid = require('uuid').v4

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        const now = new Date()
        return queryInterface.bulkInsert('interests', [
            { id: uuid(), color: '#ebb7ce', image_url: 'dulce.jpeg', name: 'dulce', created_at: now, updated_at: now },
            { id: uuid(), color: '#399af9', image_url: 'salado.jpg', name: 'salado', created_at: now, updated_at: now },
            { id: uuid(), color: '#88000b', image_url: 'picante.jpg', name: 'picante', created_at: now, updated_at: now },
            { id: uuid(), color: '#20c67a', image_url: 'vegetariano.jpg', name: 'vegetariano', created_at: now, updated_at: now },
            { id: uuid(), color: '#d5f37a', image_url: 'vegano.jpg', name: 'vegano', created_at: now, updated_at: now },
            { id: uuid(), color: '#ff7360', image_url: 'asiatico.jpg', name: 'asiático', created_at: now, updated_at: now },
            { id: uuid(), color: '#e68321', image_url: 'latino.jpg', name: 'latino', created_at: now, updated_at: now },
            { id: uuid(), color: '#7052ff', image_url: 'mariscos.jpg', name: 'mariscos', created_at: now, updated_at: now },
            { id: uuid(), color: '#ff8862', image_url: 'carne.jpg', name: 'carne', created_at: now, updated_at: now },
            { id: uuid(), color: '#f39224', image_url: 'pasta.jpg', name: 'pasta', created_at: now, updated_at: now },
            { id: uuid(), color: '#b66056', image_url: 'pizza.jpg', name: 'pizza', created_at: now, updated_at: now },
            { id: uuid(), color: '#ebe6ea', image_url: 'sushi.jpg', name: 'sushi', created_at: now, updated_at: now },
            { id: uuid(), color: '#93c9b2', image_url: 'tacos.jpg', name: 'tacos', created_at: now, updated_at: now },
            { id: uuid(), color: '#ebd47d', image_url: 'ceviche.jpg', name: 'ceviche', created_at: now, updated_at: now },
            { id: uuid(), color: '#bf3000', image_url: 'hamburguesa.jpg', name: 'hamburguesas', created_at: now, updated_at: now },
            { id: uuid(), color: '#e4c5c4', image_url: 'pasteles.jpg', name: 'pasteles', created_at: now, updated_at: now },
            { id: uuid(), color: '#b38471', image_url: 'galletas.jpg', name: 'galletas', created_at: now, updated_at: now }
        ])
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('interests', null, {})
    }
}
