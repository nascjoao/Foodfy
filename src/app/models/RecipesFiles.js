const db = require('../../config/db')

module.exports = {
    create(recipeId, fileId) {
        const query = `
            INSERT INTO recipe_files (
                recipe_id,
                file_id
            ) VALUES ($1, $2)
        `

        const values = [
            recipeId,
            fileId
        ]

        return db.query(query, values)
    },

    find(id) {
        return db.query(`
        SELECT recipe_files.*, 
        files.path AS path 
        FROM recipe_files 
        LEFT JOIN files ON (files.id = recipe_files.file_id) 
        WHERE file_id = $1`, [id])
    },

    delete(id) {
        return db.query(`DELETE FROM recipe_files WHERE recipe_id = $1 RETURNING file_id`, [id])
    }
}