const Recipes = require('../models/Recipes')

module.exports = {
    async index(req, res) {
        try {
            const results = await Recipes.listRecipes()
            const recipes = results.rows
            return res.render('recipes/index', { recipes })
        } catch (err) {
            console.error(err)
        }
    },

    show(req, res) {
        const recipeIndex = req.params.index;

        const recipe = recipes[recipeIndex]

        return res.render('recipes/show', { recipe })
    }
}