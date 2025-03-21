const db = require('../config/db');

const paymentsetting = {
    create: async (data) => {
        const sql = 'INSERT INTO paymentsetting (razorpayKeyId, razorpayKeySecret, isRazorpayActive, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';
        try {
            const [results] = await db.execute(sql, [data.razorpayKeyId, data.razorpayKeySecret, data.isRazorpayActive]);

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
            const [results] = await db.execute(`SELECT * FROM paymentsetting`);

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
        const sqlUpdate = 'UPDATE paymentsetting SET razorpayKeyId = ?, razorpayKeySecret = ?, isRazorpayActive = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sqlUpdate, [data.razorpayKeyId, data.razorpayKeySecret, data.isRazorpayActive, id]);
            
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
            const [results] = await db.execute('DELETE FROM paymentsetting WHERE id = ?', [id]);
            return results;
        } catch (err) {
            throw err;
        }
    },  
};

module.exports = paymentsetting;