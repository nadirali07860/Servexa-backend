const pool = require('../core/database');

async function suggestRelocation(){

  const demand = await pool.query(`
    SELECT society_id, COUNT(*) as bookings
    FROM bookings
    WHERE created_at > NOW() - INTERVAL '30 minutes'
    GROUP BY society_id
  `);

  for(const row of demand.rows){

    if(parseInt(row.bookings) > 10){

      console.log("Suggest technicians move to:", row.society_id);

    }

  }

}

module.exports = { suggestRelocation };
