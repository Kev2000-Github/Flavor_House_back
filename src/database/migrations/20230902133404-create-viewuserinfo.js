'use strict'

const query = `
SELECT
    T1.id as user_id, followers, follows, posts
FROM
    (
    SELECT
        u.id,
        COUNT(f.followed_by) AS followers
    FROM
        users u
    LEFT JOIN followers f ON
        u.id = f.user_id
    GROUP BY
        u.id
) T1
JOIN(
    SELECT
        u.id,
        COUNT(f.user_id) AS FOLLOWS
    FROM
        users u
    LEFT JOIN followers f ON
        u.id = f.followed_by
    GROUP BY
        u.id
) T2
ON
    T1.id = T2.id
JOIN (
select users.id, COUNT(posts.id) as posts from users 
left join posts 
on users.id = posts.made_by
where posts.deleted_at is NULL
group by users.id
) T3 
ON T1.id = T3.id;
`
const viewName = 'view_user_info'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${query}`)
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`DROP VIEW ${viewName}`)
    }
}