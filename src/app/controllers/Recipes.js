const Recipes = require('../models/Recipes')
const RecipesFiles = require('../models/RecipesFiles')

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

    async show(req, res) {
        try {
            const recipeId = req.params.id;
    
            let results = await Recipes.find(recipeId)
            let recipe = results.rows[0]
            results = await RecipesFiles.find(recipe.file_id)
            const image = results.rows[0]

            recipe = {
                ...recipe,
                imageSrc: `${req.protocol}://${req.headers.host}${image.path.replace('public', '')}`
            }
    
            return res.render('recipes/show', { recipe })

        } catch(err) {
            console.error(err)
        }
    }
}