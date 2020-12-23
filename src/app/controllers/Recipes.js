const recipes = require('../data')

module.exports = {
    index(req, res) {
        return res.render('recipes/index', { recipes })
    },

    show(req, res) {
        const recipeIndex = req.params.index;

        const recipe = recipes[recipeIndex]

        return res.render('recipes/show', { recipe })
    }
}