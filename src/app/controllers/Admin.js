const recipes = require('../data')

module.exports = {
    index(req, res) {
        return res.render('admin/index', {recipes})
    },

    create(req, res) {
        return res.render('admin/create')
    },

    show(req, res) {
        const recipeIndex = req.params.id
        const recipe = recipes[recipeIndex]
        return res.render('admin/show', {recipe, recipeIndex})
    },

    edit(req, res) {
        return res.render('admin/edit')
    }
}