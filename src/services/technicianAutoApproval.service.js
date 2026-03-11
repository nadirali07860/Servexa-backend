const pool = require('../core/database');

async function autoApproveTechnicians(){

  const pending = await pool.query(`
    SELECT user_id
    FROM technicians
    WHERE is_approved = false
  `);

  for(const tech of pending.rows){

    await pool.query(`
      UPDATE technicians
      SET is_approved = true
      WHERE user_id = $1
    `,[tech.user_id]);

    console.log("Technician auto-approved:", tech.user_id);

  }

}

module.exports = { autoApproveTechnicians };
