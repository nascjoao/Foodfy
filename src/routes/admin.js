const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const RecipesController = require('../app/controllers/AdminRecipes')
const ChefsController = require('../app/controllers/AdminChefs')

routes.get('/receitas', RecipesController.index)
routes.get('/receitas/criar', RecipesController.create)
routes.get('/receitas/:id', RecipesController.show)
routes.get('/receitas/:id/editar', RecipesController.edit)

routes.post('/receitas', multer.array('photos', 5), RecipesController.post)
routes.put('/receitas', multer.array('photos', 5), RecipesController.put)
routes.delete('/receitas', RecipesController.delete)

routes.get('/chefs', ChefsController.index)
routes.get('/chefs/criar', ChefsController.create)
routes.get('/chefs/:id', ChefsController.show)
routes.get('/chefs/:id/editar', ChefsController.edit)

routes.post('/chefs', multer.array('photos', 1), ChefsController.post)
routes.put('/chefs', multer.array('photos', 1), ChefsController.put)
routes.delete('/chefs', ChefsController.delete)

module.exports = routes