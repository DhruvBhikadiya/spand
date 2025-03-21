const db = require('../config/db');

const aboutus = {
    create: async (data) => {
        const sql = 'INSERT INTO aboutus (description, image, profile, vision, mission, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())';
        try {
            const [results] = await db.execute(sql, [data.description, data.image, data.profile, data.vision, data.mission]);

            let dataJSON = {
                status: 'success',
                data: results
            }

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    getAll: async () => {
        try {
            const [results] = await db.execute(`SELECT * FROM aboutus`);

            let dataJSON = {
                status: 'success',
                data: results
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    update: async (id, data) => {
        const sqlUpdate = 'UPDATE aboutus SET description = ?, image = ?, profile = ?, vision = ?, mission = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sqlUpdate, [data.description, data.image, data.profile, data.vision, data.mission, id]);
            
            let dataJSON = {
                status: 'success',
                data: results
            }
    
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    delete: async (id) => {
        try {
            const [results] = await db.execute('DELETE FROM aboutus WHERE id = ?', [id]);
            return results;
        } catch (err) {
            throw err;
        }
    },  
};

module.exports = aboutus;