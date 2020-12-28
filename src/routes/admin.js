const express = require('express')
const routes = express.Router()

const AdminController = require('../app/controllers/Admin')

routes.get('/receitas', AdminController.index)
routes.get('/receitas/criar', AdminController.create)
routes.get('/receitas/:id', AdminController.show)
routes.get('/receitas/:id/editar', AdminController.edit)

// routes.post('/receitas', AdminController.post)
// routes.put('/receitas', AdminController.put)
// routes.delete('/receitas', AdminController.delete)

module.exports = routes