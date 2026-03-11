const pool = require('../core/database');

async function runTechnicianGuard(){

  const badTechs = await pool.query(`
    SELECT user_id
    FROM technicians
    WHERE refund_strikes >= 3
       OR average_rating < 2.5
  `);

  for(const tech of badTechs.rows){

    await pool.query(`
      UPDATE technicians
      SET status='SUSPENDED',
          is_online=false
      WHERE user_id=$1
    `,[tech.user_id]);

  }

}

module.exports = { runTechnicianGuard };
