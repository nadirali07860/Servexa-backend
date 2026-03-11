const pool = require('../../core/database');

async function goOnline(req, res) {
  try {

    const technicianId = req.user.id;

    await pool.query(
      `
      UPDATE technicians
      SET is_online = true,
          status = 'AVAILABLE'
      WHERE user_id = $1
      `,
      [technicianId]
    );

    return res.json({
      success: true,
      message: 'Technician is now ONLINE'
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Failed to go online',
      error: error.message
    });

  }
}

async function goOffline(req, res) {
  try {

    const technicianId = req.user.id;

    await pool.query(
      `
      UPDATE technicians
      SET is_online = false,
          status = 'OFFLINE'
      WHERE user_id = $1
      `,
      [technicianId]
    );

    return res.json({
      success: true,
      message: 'Technician is now OFFLINE'
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Failed to go offline',
      error: error.message
    });

  }
}

async function updateStatus(req, res) {

  const { status } = req.body;

  if (status === 'online') {
    return goOnline(req, res);
  }

  if (status === 'offline') {
    return goOffline(req, res);
  }

  return res.status(400).json({
    success: false,
    message: 'Invalid status value'
  });

}

module.exports = {
  updateStatus,
  goOnline,
  goOffline
};
