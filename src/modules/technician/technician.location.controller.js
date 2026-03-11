const pool = require('../../core/database');

async function autoApproveTechnician(userId) {

  const check = await pool.query(`
    SELECT
      t.user_id,
      t.is_approved,
      sa.service_id
    FROM technicians t
    LEFT JOIN service_availability sa
      ON sa.technician_id = t.user_id
    WHERE t.user_id = $1
  `,[userId]);

  if (!check.rows.length) return;

  const technician = check.rows[0];

  if (!technician.is_approved && technician.service_id) {

    await pool.query(`
      UPDATE technicians
      SET is_approved = true,
          status = 'AVAILABLE'
      WHERE user_id = $1
    `,[userId]);

  }

}

async function updateLocation(req,res){

  const technicianId = req.user.id;
  const { latitude, longitude } = req.body;

  try{

    await pool.query(`
      INSERT INTO technician_locations
      (technician_id, latitude, longitude)
      VALUES ($1,$2,$3)
      ON CONFLICT (technician_id)
      DO UPDATE SET
        latitude=$2,
        longitude=$3,
        updated_at=NOW()
    `,[technicianId, latitude, longitude]);

    await autoApproveTechnician(technicianId);

    res.json({
      success:true,
      message:"Location updated"
    });

  }catch(error){

    res.status(500).json({
      success:false,
      message:"Location update failed"
    });

  }

}

module.exports = { updateLocation };
