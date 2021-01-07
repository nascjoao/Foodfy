const Recipes = require('../../app/models/Recipes')
const RecipesFiles = require('../../app/models/RecipesFiles')
const Files = require('../../app/models/Files')
const Chefs = require('../../app/models/Chefs')

module.exports = {
    async index(req, res) {
        let results = await Recipes.listRecipes()
        let recipes = results.rows
        
        recipes = recipes.map(recipe => ({
            ...recipe,
            imageSrc: `${req.protocol}://${req.headers.host}${recipe.image_path.replace('public', '')}`
        }))
        
        return res.render('admin/recipes/index', { recipes })
    },

    async create(req, res) {
        const results = await Chefs.listAll()
        const chefs = results.rows
        return res.render('admin/recipes/create', { chefs })
    },

    async post(req, res) {
        const results = await Recipes.create(req.body)
        const recipeId = results.rows[0].id

        if (req.files.length == 0) return res.send('Please send at least one image')

        const filesPromise = req.files.map(async file => { 
            const files = await Files.create({ ...file })
            const fileId = files.rows[0].id
            await RecipesFiles.create(recipeId, fileId)
        })

        await Promise.all(filesPromise)

        return res.redirect(`/admin/receitas/${recipeId}`)
    },

    async show(req, res) {
        const recipeId = req.params.id
        
        let results = await Recipes.find(recipeId)
        let recipe = results.rows[0]
        results = await RecipesFiles.find(results.rows[0].file_id)
        const image = results.rows[0]
        
        recipe = {
            ...recipe,
            imageSrc: `${req.protocol}://${req.headers.host}${image.path.replace('public', '')}`
        }
    
            return res.render('admin/recipes/show', { recipe })
    },

    async edit(req, res) {
        const recipeId = req.params.id
        
        let results = await Recipes.find(recipeId)
        const recipe = results.rows[0]

        recipe.ingredients = recipe.ingredients.toString().split(',')
        recipe.preparation = recipe.preparation.toString().split(',')

        results = await Chefs.listAll()
        const chefs = results.rows

        return res.render('admin/recipes/edit', { recipe, chefs })
    },

    async put(req, res) {
        const id = req.body.id
        await Recipes.update(req.body)
        return res.redirect(`/admin/receitas/${id}`)
    },

    async delete(req, res) {
        const id = req.body.id

        const results = await RecipesFiles.delete(id)
        const fileId = results.rows[0].file_id
        await Files.delete(fileId)
        await Recipes.delete(id)

        return res.redirect('/admin/receitas')
    }
}