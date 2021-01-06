const db = require("../../config/db")

module.exports = {
    create(data, fileId) {
        const query = `
            INSERT INTO chefs (
                file_id,
                name
            ) VALUES ($1, $2)
            RETURNING id
        `

        const values = [
            fileId,
            data.name
        ]

        return db.query(query, values)
    },

    update(data) {
        return db.query(`UPDATE chefs SET name = $1 WHERE id = $2`, [data.name, data.id])
    },

    delete(id) {
        return db.query(`DELETE FROM chefs WHERE id = $1`, [id])
    },

    find(id) {
        return db.query(`
        SELECT chefs.*, count(recipes) AS recipes_count, files.path AS image_path
        FROM chefs 
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        LEFT JOIN files ON (files.id = chefs.file_id)
        WHERE chefs.id = $1
        GROUP BY chefs.id, files.path
        `, [id])
    },

    listAll() {
        return db.query(`
        SELECT chefs.*, files.path AS image_path 
        FROM chefs
        LEFT JOIN files ON (files.id = chefs.file_id)
        `)
    }
}