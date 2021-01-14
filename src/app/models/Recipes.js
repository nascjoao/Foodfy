const db = require('../../config/db')

module.exports = {
    
    create(data) {
        const query = `
            INSERT INTO recipes (
                chef_id,
                title,
                ingredients,
                preparation,
                information
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `

        const values = [
            data.chef,
            data.name,
            data.ingredients,
            data.preparation,
            data.plus_information,
        ]

        return db.query(query, values)
    },

    update(data) {
        const query = `
            UPDATE recipes SET
                chef_id = $1,
                title = $2,
                ingredients = $3,
                preparation = $4,
                information = $5
            WHERE id = $6
        `

        const values = [
            data.chef,
            data.name,
            data.ingredients,
            data.preparation,
            data.plus_information,
            data.id,
        ]

        return db.query(query, values)
    },

    delete(id) {
        return db.query(`DELETE FROM recipes WHERE id = $1`, [id])
    },

    listRecipes(search) {
        let query = '',
            searchQuery =''
        
        if (search) {
            searchQuery = `
                WHERE recipes.title ILIKE '%${search}%'
            `
        }

        query = `
            SELECT recipes.*, 
            recipe_files.file_id AS file_id, 
            files.path AS image_path,
            chefs.name AS chef_name 
            FROM recipes
            LEFT JOIN recipe_files ON (recipes.id = recipe_files.recipe_id)
            LEFT JOIN files ON (files.id = recipe_files.file_id)
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ${searchQuery}
            `
        return db.query(query)
    },

    find(id) {
        return db.query(`
        SELECT recipes.*,
        chefs.name AS chef_name,
        recipe_files.file_id AS file_id
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id) 
        LEFT JOIN recipe_files ON (recipes.id = recipe_files.recipe_id) 
        WHERE recipes.id = $1
        `, [id])
    }
}