const db = require('../config/db');

const blog = {
  create: async (data) => {
    const sql = 'INSERT INTO blog (title, description, image, imageId, category, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.title,data.description,data.image,data.imageId,data.category]);
      
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
      const [results] = await db.execute('SELECT * FROM blog ORDER BY created_at DESC');
      
      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getAllByPage: async (limit, pageNo, searchtxt) => {
    try {
      const offset = (pageNo - 1) * limit;
  
      let query = 'SELECT * FROM blog';
      let queryParams = [];
  
      if (searchtxt) {
        const columns = ['title','description','image','category',];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const [results] = await db.execute(query, queryParams);
  
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM blog');
      const totalCount = totalCountResults[0].totalCount;
  
      return {
        status: 'success',
        data: results,
        totalCount: totalCount
      };
    } catch (err) {
      throw err;
    }
  },

  getById: async (id) => {
    try {
      const [results] = await db.execute('SELECT * FROM blog WHERE id = ?', [id]);
      
      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  update: async (id, data) => {
    const sql = 'UPDATE blog SET title = ?, description = ?, image = ?, imageId = ?, category = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.title, data.description, data.image, data.imageId, data.category, id]);
      
      let dataJson = {
        status: 'success',
        data: results
    }
      return dataJson;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const [results] = await db.execute('DELETE FROM blog WHERE id = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = blog;