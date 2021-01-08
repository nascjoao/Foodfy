const Chefs = require('../models/Chefs')

module.exports = {
    async index(req, res) {
        const results = await Chefs.listAll()
        let chefs = results.rows
        chefs = chefs.map(chef => ({
            ...chef,
            imageSrc: `${req.protocol}://${req.headers.host}${chef.image_path.replace('public', '')}`
        }))
        return res.render('chefs/index', { chefs })
    }
}