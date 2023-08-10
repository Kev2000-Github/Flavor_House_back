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
        const recipes = []
        const reviews = []
        const comments = []
        const steps = []
        const ingredients = []
        const likes = []
        const favorites = []
        const usernameMap = {}
        for(const {username, comments, reviews, likes, favorites} of data){
            usernameMap[username] = true
            for(const {username} of comments) usernameMap[username] = true
            for(const {username} of reviews) usernameMap[username] = true
            for(const username of likes) usernameMap[username] = true
            for(const username of favorites) usernameMap[username] = true
        }
        const users = await Users.findAll({where: {username: Object.keys(usernameMap)}})
        for(const {id, username} of users){
            usernameMap[username] = id
        }
        for(const post of data){
            const postId = uuid()
            const recipeLikes = post.likes.map(username => ({
                user_id: usernameMap[username],
                post_id: postId,
                created_at: now,
                updated_at: now
            }))
            const recipeFavorites = post.favorites.map(username => ({
                user_id: usernameMap[username],
                post_id: postId,
                created_at: now,
                updated_at: now
            }))
            const recipeIngredients = post.ingredients.map(ingredient => ({
                id: uuid(),
                recipe_id: postId,
                description: ingredient,
                created_at: now,
                updated_at: now
            }))
            const recipeSteps = post.steps.map(step => ({
                id: uuid(),
                recipe_id: postId,
                ...step,
                created_at: now,
                updated_at: now
            }))
            const recipeComments = post.comments.map(comment => ({
                id: uuid(),
                user_id: usernameMap[comment.username],
                post_id: postId,
                content: comment.content,
                created_at: now,
                updated_at: now
            }))
            const recipeReviews = post.reviews.map(review => ({
                id: uuid(),
                user_id: usernameMap[review.username],
                recipe_id: postId,
                content: review.content,
                stars: review.stars,
                created_at: now,
                updated_at: now
            }))
            posts.push({
                id: postId,
                made_by: usernameMap[post.username],
                type: 'RECIPE',
                created_at: now,
                updated_at: now
            })
            recipes.push({
                post_id: postId,
                name: post.title,
                description: post.description,
                image: post.image,
                created_at: now,
                updated_at: now
            })
            ingredients.push(...recipeIngredients)
            comments.push(...recipeComments)
            reviews.push(...recipeReviews)
            steps.push(...recipeSteps)
            likes.push(...recipeLikes)
            favorites.push(...recipeFavorites)
        }
        await queryInterface.bulkInsert('posts', posts)
        await queryInterface.bulkInsert('recipes', recipes)
        await queryInterface.bulkInsert('ingredients', ingredients)
        await queryInterface.bulkInsert('steps', steps)
        await queryInterface.bulkInsert('comments', comments)
        await queryInterface.bulkInsert('reviews', reviews)
        await queryInterface.bulkInsert('likes', likes)
        await queryInterface.bulkInsert('favorites', favorites)
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('likes', null, {})
        await queryInterface.bulkDelete('favorites', null, {})
        await queryInterface.bulkDelete('comments', null, {})
        await queryInterface.bulkDelete('reviews', null, {})
        await queryInterface.bulkDelete('ingredients', null, {})
        await queryInterface.bulkDelete('steps', null, {})
        await queryInterface.bulkDelete('recipes', null, {})
        await queryInterface.bulkDelete('posts', null, {})
    }
}
