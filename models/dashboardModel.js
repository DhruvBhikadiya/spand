const db = require('../config/db');

const Dashboard = {
  superadminDashboard: async () => {
    try {
      const [admins] = await db.execute(`SELECT COUNT(*) AS row_count FROM admin`);
      const [contactleads] = await db.execute(`SELECT COUNT(*) AS row_count FROM contactleads`);
      
      let dashboardJson = [
        {
          totalAdmins: admins[0].row_count,
          totalContactLeads: contactleads[0].row_count,
        }
      ]

      let dataJSON = {
        status: 'success',
        data: dashboardJson
      };
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = Dashboard;