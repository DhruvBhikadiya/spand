const db = require('../config/db');

const course = {
  create: async (data) => {
    const sql = 'INSERT INTO course (name, image, imageId, description, duration, fees, benefits, validMonth, categoryId, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.name, data.image, data.imageId, data.description, data.duration, data.fees, data.benefits, data.validMonth, data.categoryId]);
      
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
      const [results] = await db.execute('SELECT * FROM course ORDER BY created_at DESC');
      
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
  
      let query = 'SELECT * FROM course';
      let queryParams = [];
  
      if (searchtxt) {
        const columns = ['name','description','duration','fees','benefits','validMonth'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const [results] = await db.execute(query, queryParams);
  
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM course');
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
      const [results] = await db.execute('SELECT * FROM course WHERE id = ?', [id]);
      
      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },


  getByCategory: async (id) => {
    try {
      const [results] = await db.execute('SELECT * FROM course WHERE categoryId = ?', [id]);
      
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
    const sql = 'UPDATE course SET name = ?, image = ?, imageId = ?, description = ?, duration = ?, fees = ?, benefits = ?, validMonth = ?, categoryId = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.name, data.image, data.imageId, data.description, data.duration, data.fees, data.benefits, data.validMonth, data.categoryId, id]);
      
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
      const [results] = await db.execute('DELETE FROM course WHERE id = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = course;