const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('src/app/views', {
    express: server,
    noCache: true
})

server.listen(5000, () => console.log('Server is running.'))