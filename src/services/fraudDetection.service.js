const pool = require('../core/database');

async function detectFraudulentUsers(){

  const suspicious = await pool.query(`
    SELECT customer_id, COUNT(*) as bookings
    FROM bookings
    WHERE status = 'CANCELLED'
    AND created_at > NOW() - INTERVAL '1 day'
    GROUP BY customer_id
  `);

  for(const user of suspicious.rows){

    if(parseInt(user.bookings) > 5){

      console.warn("⚠️ Fraud risk detected for user:", user.customer_id);

    }

  }

}

module.exports = { detectFraudulentUsers };
