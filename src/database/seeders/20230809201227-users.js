'use strict'
const { hashPassword } = require('../../utils/common')
const { Interests, Countries } = require('../models')
const { resolve } = require('path')
const dataPath = resolve(__dirname, `${__filename}.json`)
const data = require(dataPath)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        const now = new Date()
        const interestMap = {}
        const countryISOMap = {}
        const users = []
        const userInterests = []
        for(const {interests,countryISO} of data){
            countryISOMap[countryISO] = true
            for(const interest of interests) interestMap[interest] = true
        }
        const countries = await Countries.findAll({where: {iso3: Object.keys(countryISOMap)}})
        const interests = await Interests.findAll({where: {name: Object.keys(interestMap)}})
        for(const country of countries){
            countryISOMap[country.iso3] = country.id
        }
        for(const interest of interests){
            interestMap[interest.name] = interest.id
        }

        for(const {interests, countryISO, password, ...userData} of data){
            const encryptedPassword = await hashPassword(10, password)
            users.push({
                ...userData, 
                password: encryptedPassword,
                country_id: countryISOMap[countryISO],
                created_at: now,
                updated_at: now
            })
            for(const interestId of interests.map(val => interestMap[val])){
                userInterests.push({
                    user_id: userData.id,
                    interest_id: interestId,
                    created_at: now,
                    updated_at: now
                })
            }
        }
        await queryInterface.bulkInsert('users', users)
        await queryInterface.bulkInsert('user_interests', userInterests)
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {})
        await queryInterface.bulkDelete('user_interests', null, {})
    }
}
