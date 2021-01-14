const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    find(id) {
        return db.query(`SELECT * FROM files WHERE id = $1`, [id])
    },

    create({filename, path}) {
        const query = `
            INSERT INTO files (
                name,
                path
            ) VALUES ($1, $2)
            RETURNING id
        `

        const values = [
            filename,
            path
        ]

        return db.query(query, values)
    },

    async update(file, fileId) {
        const { filename, path } = file

        const result = await db.query(`SELECT * FROM files WHERE id = $1`, [fileId])
        const oldFile = result.rows[0]
        fs.unlinkSync(oldFile.path)

        const query = `
        UPDATE files SET 
            name = $1, 
            path = $2 
        WHERE id = $3`

        const values = [
            filename,
            path,
            fileId
        ]

        return db.query(query, values)
    },

    async delete(id) {
        const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
        const file = result.rows[0]

        fs.unlinkSync(file.path)

        return db.query(`DELETE FROM files WHERE id = $1`, [id])
    }
}