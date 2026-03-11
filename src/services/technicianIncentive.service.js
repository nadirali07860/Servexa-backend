const pool = require('../core/database');

async function triggerIncentives(){

  const busyAreas = await pool.query(`
    SELECT society_id, COUNT(*) as bookings
    FROM bookings
    WHERE created_at > NOW() - INTERVAL '20 minutes'
    GROUP BY society_id
  `);

  for(const area of busyAreas.rows){

    if(parseInt(area.bookings) > 8){

      console.log("Incentive triggered for society:", area.society_id);

    }

  }

}

module.exports = { triggerIncentives };
