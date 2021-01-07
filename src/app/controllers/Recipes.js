const Recipes = require('../models/Recipes')

module.exports = {
    async index(req, res) {
        try {
            const results = await Recipes.listRecipes()
            let recipes = results.rows
            recipes = recipes.map(recipe => ({
                ...recipe,
                imageSrc: `${req.protocol}://${req.headers.host}${recipe.image_path.replace('public', '')}`
            }))

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