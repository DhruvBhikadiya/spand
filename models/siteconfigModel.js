const db = require('../config/db');

const siteconfig = {
    create: async (data) => {
        const sql = 'INSERT INTO siteconfig (siteName, logo, version, whiteLogo, mapUrl, address, instagramURL, facebookURL, twitterURL, linkedInURL, youtubeURL, mobile, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
        try {
            const [results] = await db.execute(sql, [data.siteName, data.logo, data.version, data.whiteLogo, data.mapUrl, data.address, data.instagramURL, data.facebookURL, data.twitterURL,data.linkedInURL, data.youtubeURL, data.mobile,data.email]);

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
            const [results] = await db.execute(`SELECT * FROM siteconfig`);

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
        const sqlUpdate = 'UPDATE siteconfig SET siteName = ?, logo = ?, version = ?, mapUrl = ?, address = ?, instagramURL = ?, whiteLogo = ?, facebookURL = ?, twitterURL = ?, linkedInURL = ?, youtubeURL = ?, mobile = ?, email = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sqlUpdate, [data.siteName, data.logo, data.version, data.mapUrl, data.address, data.instagramURL, data.whiteLogo, data.facebookURL, data.twitterURL, data.linkedInURL, data.youtubeURL, String(data.mobile), data.email, id]);
            
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
            const [results] = await db.execute('DELETE FROM siteconfig WHERE id = ?', [id]);
            return results;
        } catch (err) {
            throw err;
        }
    },  
};

module.exports = siteconfig;