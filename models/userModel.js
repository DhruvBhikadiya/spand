const db = require('../config/db');

const userJson = {
    create: async (latitude , longitude , data, city , region, country) => {
        const sql = 'INSERT INTO user (name, password, mobile, email, latitude, longitude, ip, city , region, country, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
        try {
            const [results] = await db.execute(sql, [data.name, data.password, data.mobile, data.email, latitude, longitude, data.ip, city , region, country]);

            const insertedId = results.insertId;

            const [createdUser] = await db.execute('SELECT * FROM user WHERE id = ?', [insertedId]);

            return { status: 'success', data: createdUser[0] };
        } catch (err) {
            throw err;
        }
    },

    getAll: async () => {
        try {
            const [results] = await db.execute(`SELECT * FROM user ORDER BY created_at DESC`);
    
            const modifiedResults = results.map(user => ({
                ...user,
                roleName: user.roleName
            }));

            let dataJSON = {
                status: 'success',
                data: modifiedResults
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    
    getAllByPage: async (limit, pageNo, searchtxt) => {
        try {
          const offset = (pageNo - 1) * limit;
      
          let query = `SELECT * FROM user`;
          let queryParams = [];
      
          if (searchtxt) {
            const columns = ['user.name', 'user.password', 'user.mobile', 'user.email', 'user.city', 'user.region', 'user.country'];
            const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
            query += ` WHERE ${searchConditions}`;
            queryParams = columns.map(() => `%${searchtxt}%`);
          }
      
          query += ' ORDER BY user.created_at DESC LIMIT ? OFFSET ?';
          queryParams.push(limit, offset);
      
          const [results] = await db.execute(query, queryParams);
      
          const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM user');
          const totalCount = totalCountResults[0].totalCount;
      
          const modifiedResults = results.map(user => ({
            ...user,
            roleName: user.roleName, // Assuming you want to include roleName in the response
          }));
      
          return {
            status: 'success',
            data: modifiedResults,
            totalCount: totalCount
          };
        } catch (err) {
          throw err;
        }
      },      

    update: async (latitude , longitude, id, data) => {
        const sqlUpdate = 'UPDATE user SET name = ?, password = ?, mobile = ?, email = ?, latitude = ?, longitude = ?, ip = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [updateResults] = await db.execute(sqlUpdate, [data.name, data.password, data.mobile, data.email,latitude ,longitude , data.ip,  id]);
      
            const sqlSelect = 'SELECT * FROM user WHERE id = ?';
            const [updatedUser] = await db.execute(sqlSelect, [id]);
    
            if (updatedUser.length === 0) {
                throw new Error('User not found');
            }
    
            let dataJSON = {
                status: 'success',
                data: updatedUser[0]
            }
    
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    delete: async (id) => {
        try {
            const [user] = await db.execute('SELECT * FROM user WHERE id = ?', [id]);
            const [results] = await db.execute('DELETE FROM user WHERE id = ?', [id]);

            return results;
        } catch (err) {
            throw err;
        }
    },
    findByEmail: async (lat , lon , email, ip, city , region, country) => {
        const sql = 'SELECT * FROM user WHERE email = ?';
        try {
            
            const [results] = await db.execute(sql, [email]);
            let storeData;
            
            if(results.length>0){
                await db.execute('UPDATE user SET latitude = ?, longitude = ?, ip = ?, city = ?, region = ?, country = ? WHERE id = ?', [lat, lon, ip, city , region, country, results[0].id]);
            }
    
            if (results.length > 0) {
                return {
                    status: 'success',
                    data: results[0],
                    store: storeData
                };
            } else {
                return {
                    status: 'not_found',
                    data: null
                };
            }
        } catch (err) {
            throw err;
        }
    },
    updateUserToken: async (id, data) => {        
        const sqlUpdate = 'UPDATE user SET token = ?, updated_at = NOW() WHERE id = ?';
        try {
            db.execute(sqlUpdate, [data, id]);
        } catch (err) {
            throw err;
        }
    },
    verifyPassword: async function (inputPassword, storedPassword) {
        try {
            return inputPassword === storedPassword;
        } catch (err) {
            throw err;
        }
    },    
};

module.exports = userJson;