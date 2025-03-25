const db = require('../config/db');

const coursepurchase = {
  create: async (data) => {
    const sql = 'INSERT INTO coursepurchase (courseId, userId, amount, courseName, expireDate, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.courseId, data.userId, data.amount, data.courseName, data.expireDate]);
      
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
      const [results] = await db.execute('SELECT * FROM coursepurchase ORDER BY created_at DESC');
      
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
  
      let query = 'SELECT * FROM coursepurchase';
      let queryParams = [];
  
      if (searchtxt) {
        const columns = ['name', 'email', 'phone', 'message'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const [results] = await db.execute(query, queryParams);
  
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM coursepurchase');
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
  
  getByUserId: async (id) => {
    try {
        const [purchases] = await db.execute('SELECT * FROM coursepurchase WHERE userId = ?', [id]);

        if (purchases.length === 0) {
            return {
                status: 'success',
                data: []
            };
        }

        // Extract course IDs from purchases
        const courseIds = purchases.map(purchase => purchase.courseId);

        // Fetch course details where courseId matches
        const [courses] = await db.execute(`SELECT * FROM course WHERE id IN (${courseIds.join(',')})`);

        // Map purchases to include courseData
        const enrichedPurchases = purchases.map(purchase => ({
            ...purchase,
            courseData: courses.find(course => course.id === purchase.courseId) || null
        }));

        return {
            status: 'success',
            data: enrichedPurchases
        };
    } catch (err) {
        throw err;
    }
},


  update: async (id, data) => {
    const sql = 'UPDATE coursepurchase SET userId = ?, courseId = ?, amount = ?, courseName = ?, expireDate = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.userId, data.courseId, data.amount, data.courseName, data.expireDate, id]);
      
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
      const [results] = await db.execute('DELETE FROM coursepurchase WHERE id = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = coursepurchase;