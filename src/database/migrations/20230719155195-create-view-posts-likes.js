'use strict'

const query = `
select p.id, likes from posts p 
join (SELECT p.id, COUNT(p.id) as likes FROM posts p join likes l on p.id = l.post_id group by p.id) T 
on p.id = T.id;
`
const viewName = 'view_posts_likes'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${query}`)
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`DROP VIEW ${viewName}`)
    }
}