const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http').Server(app)
require('dotenv').config();
const { router } = require('./routes')
const {errorHandler} = require('./errors/errorHandler')
const {PORT} = require('./config')

app.use(cors())
app.use(express.json())
app.use('/', router)
app.use(errorHandler)

http.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})