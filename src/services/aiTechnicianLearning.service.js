const pool = require('../core/database');

async function learnTechnicianPerformance(){

  const data = await pool.query(`
    SELECT
      technician_id,
      COUNT(*) as jobs,
      AVG(rating) as avg_rating
    FROM ratings
    GROUP BY technician_id
  `);

  for(const tech of data.rows){

    const score =
      (parseInt(tech.jobs) * 0.5) +
      ((tech.avg_rating || 0) * 10);

    await pool.query(`
      UPDATE technicians
      SET reputation_score = $1
      WHERE user_id = $2
    `,[score, tech.technician_id]);

  }

  console.log("AI technician learning updated");

}

module.exports = { learnTechnicianPerformance };
