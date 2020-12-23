const express = require('express')
const routes = express.Router()

const RecipesController = require('../app/controllers/Recipes')

routes.get('/', RecipesController.index)
routes.get('/:index', RecipesController.show)

module.exports = routes