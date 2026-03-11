const pool = require('../core/database');

async function calculateRefundRisk(){

  const refunds = await pool.query(`
    SELECT technician_id, COUNT(*) as refunds
    FROM refunds
    WHERE created_at > NOW() - INTERVAL '7 days'
    GROUP BY technician_id
  `);

  for(const row of refunds.rows){

    if(parseInt(row.refunds) > 3){

      console.warn("⚠️ High refund risk technician:", row.technician_id);

    }

  }

}

module.exports = { calculateRefundRisk };
