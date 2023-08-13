'use strict'

const query = `
SELECT r.post_id, ROUND(AVG(re.stars), 1) as stars FROM recipes r
JOIN reviews re 
ON r.post_id = re.recipe_id
GROUP BY r.post_id;
`
const viewName = 'view_recipe_stars'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${query}`)
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`DROP VIEW ${viewName}`)
    }
}