require('dotenv').config()
const config = {
    username: process.env.HOST_USERNAME ?? 'root',
    password: process.env.HOST_PASSWORD ?? 'root',
    database: process.env.HOST_DATABASE ?? 'pruebas',
    host: process.env.HOST_HOST ?? '127.0.0.1',
    dialect: 'mysql',
    logging: process.env.HOST_LOGGING === 'true' ? console.log : false,
}

module.exports = {
    'development': config,
    'test': config,
    'production': config
}