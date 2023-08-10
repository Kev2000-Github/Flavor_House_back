'use strict'
const { Users } = require('../models')
const { resolve } = require('path')
const dataPath = resolve(__dirname, `${__filename}.json`)
const data = require(dataPath)
const uuid = require('uuid').v4

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        const now = new Date()
        const posts = []
        const moments = []
        const comments = []
        const favorites = []
        const likes = []
        const usernameMap = {}
        for(const {username, comments, likes, favorites} of data){
            usernameMap[username] = true
            for(const {username} of comments) usernameMap[username] = true
            for(const username of likes) usernameMap[username] = true
            for(const username of favorites) usernameMap[username] = true
        }
        const users = await Users.findAll({where: {username: Object.keys(usernameMap)}})
        for(const {id, username} of users){
            usernameMap[username] = id
        }
        for(const post of data){
            const postId = uuid()
            const postLikes = post.likes.map(username => ({
                user_id: usernameMap[username],
                post_id: postId,
                created_at: now,
                updated_at: now
            }))
            const postFavorites = post.favorites.map(username => ({
                user_id: usernameMap[username],
                post_id: postId,
                created_at: now,
                updated_at: now
            }))
            const postComments = post.comments.map(comment => ({
                id: uuid(),
                user_id: usernameMap[comment.username],
                post_id: postId,
                content: comment.content,
                created_at: now,
                updated_at: now
            }))
            posts.push({
                id: postId,
                made_by: usernameMap[post.username],
                type: 'MOMENT',
                created_at: now,
                updated_at: now
            })
            moments.push({
                post_id: postId,
                description: post.description,
                image: post.image,
                created_at: now,
                updated_at: now
            })
            comments.push(...postComments)
            favorites.push(...postFavorites)
            likes.push(...postLikes)
        }
        await queryInterface.bulkInsert('posts', posts)
        await queryInterface.bulkInsert('moments', moments)
        await queryInterface.bulkInsert('comments', comments)
        await queryInterface.bulkInsert('likes', likes)
        await queryInterface.bulkInsert('favorites', favorites)

    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('likes', null, {})
        await queryInterface.bulkDelete('favorites', null, {})
        await queryInterface.bulkDelete('comments', null, {})
        await queryInterface.bulkDelete('moments', null, {})
        await queryInterface.bulkDelete('posts', null, {})
    }
}
