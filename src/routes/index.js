const express = require('express')
const routes = express.Router()
const recipesRoutes = require('./recipes')

const HomeController = require('../app/controllers/Home')

routes.get('/', HomeController.index)
routes.get('/sobre', (req, res) => { return res.render('sobre/index') })

routes.use('/receitas', recipesRoutes)

module.exports = routes