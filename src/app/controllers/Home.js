const recipes = require('../data')

module.exports = {
    index(req, res) {
        return res.render('home/index', { recipes })
    }
}