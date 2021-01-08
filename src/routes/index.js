const express = require('express')
const routes = express.Router()
const recipesRoutes = require('./recipes')
const chefsRoutes = require('./chefs')
const adminRoutes = require('./admin')

const HomeController = require('../app/controllers/Home')

routes.get('/', HomeController.index)
routes.get('/sobre', (req, res) => { return res.render('sobre/index') })

routes.use('/receitas', recipesRoutes)
routes.use('/chefs', chefsRoutes)
routes.use('/admin', adminRoutes)

module.exports = routes