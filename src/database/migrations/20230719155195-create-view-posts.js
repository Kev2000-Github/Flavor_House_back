'use strict'

const query = `
select p.id, made_by, likes, type, p.created_at, p.updated_at from posts p 
join (SELECT p.id, COUNT(p.id) as likes FROM posts p join likes l on p.id = l.post_id group by p.id) T 
on p.id = T.id;
`
const viewName = 'view_posts'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${query}`)
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`DROP VIEW ${viewName}`)
    }
}