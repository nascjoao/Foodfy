const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => { return res.render('home/index') })
routes.get('/sobre', (req, res) => { return res.render('sobre/index') })

module.exports = routes