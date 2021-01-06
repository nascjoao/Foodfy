const Files = require('../../app/models/Files')
const Recipes = require('../../app/models/Recipes')
const Chefs = require('../models/Chefs')

module.exports = {
    async index(req, res) {
        let results = await Chefs.listAll()
        let chefs = results.rows
        chefs = chefs.map(chef => ({
            ...chef,
            imageSrc: `${req.protocol}://${req.headers.host}${chef.image_path.replace('public', '')}`
        }))

        return res.render('admin/chefs/index', { chefs })
    },

    create(req, res) {
        return res.render('admin/chefs/create')
    },

    async post(req, res) {
        req.files.map(async file => {
            let result = await Files.create({...file})
            const fileId = result.rows[0].id
            result = await Chefs.create(req.body, fileId)
            const chefId = result.rows[0].id
            return res.redirect(`/admin/chefs/${chefId}`)
        })

    },

    async show(req, res) {
        const id = req.params.id

        let results = await Chefs.find(id)
        let chef = results.rows[0]
        if (!chef) return res.send('Chef não encontrado')
        chef = {
            ...chef,
            imageSrc: `${req.protocol}://${req.headers.host}${chef.image_path.replace('public', '')}`
        }

        results = await Recipes.listRecipes()
        let recipes = results.rows
        recipes = recipes.map(recipe => ({
            ...recipe,
            imageSrc: `${req.protocol}://${req.headers.host}${recipe.image_path.replace('public', '')}`
        }))

        return res.render('admin/chefs/show', { chef, recipes })
    },

    async edit(req, res) {
        const id = req.params.id

        let results = await Chefs.find(id)
        const chef = results.rows[0]
        
        return res.render('admin/chefs/edit', { chef })
    },

    async put(req, res) {
        const id = req.body.id
        await Chefs.update(req.body)
        return res.redirect(`/admin/chefs/${id}`)
    },

    async delete(req, res) {
        const id = req.body.id

        let results = await Chefs.find(id)
        const chefImageId = results.rows[0].file_id

        await Chefs.delete(id)
        
        await Files.delete(chefImageId)

        return res.redirect('/admin/chefs')
    }
}