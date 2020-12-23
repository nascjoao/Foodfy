const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/Home')
const RecipesController = require('../app/controllers/Recipes')

routes.get('/', HomeController.index)
routes.get('/sobre', (req, res) => { return res.render('sobre/index') })
routes.get('/receitas', RecipesController.index)

module.exports = routes