const pool = require('../../core/database');
const { smartDispatch } = require('./booking.smartDispatch.service');

async function createBooking(user, body) {

  const client = await pool.connect();

  try {

    await client.query('BEGIN');

    const { service_id, society_id, latitude, longitude } = body;

    const technicians = await smartDispatch(
      service_id,
      society_id,
      latitude,
      longitude
    );

    if (!technicians.length) {
      throw new Error("No technicians available");
    }

    const technicianId = technicians[0];

    const bookingResult = await client.query(
      `
      INSERT INTO bookings
      (customer_id, service_id, society_id, technician_id, status)
      VALUES ($1,$2,$3,$4,'ASSIGNED')
      RETURNING *
      `,
      [user.id, service_id, society_id, technicianId]
    );

    const booking = bookingResult.rows[0];

    await client.query(
      `
      UPDATE technicians
      SET active_bookings = active_bookings + 1
      WHERE user_id = $1
      `,
      [technicianId]
    );

    /*
    DISPATCH LOG
    */

    await client.query(
      `
      INSERT INTO dispatch_decision_logs
      (booking_id, technician_id, score, reason)
      VALUES ($1,$2,$3,$4)
      `,
      [
        booking.id,
        technicianId,
        100,
        'INITIAL_ASSIGNMENT'
      ]
    );

    await client.query('COMMIT');

    return booking;

  } catch (err) {

    await client.query('ROLLBACK');
    throw err;

  } finally {

    client.release();

  }

}



async function acceptBooking(bookingId, userId) {

  await pool.query(
    `
    UPDATE bookings
    SET status='ACCEPTED'
    WHERE id=$1 AND technician_id=$2
    `,
    [bookingId, userId]
  );

  return { message: "Booking accepted" };

}



async function startBooking(bookingId, userId) {

  await pool.query(
    `
    UPDATE bookings
    SET status='IN_PROGRESS'
    WHERE id=$1 AND technician_id=$2
    `,
    [bookingId, userId]
  );

  return { message: "Booking started" };

}



async function completeBooking(bookingId, userId) {

  await pool.query(
    `
    UPDATE bookings
    SET status='COMPLETED'
    WHERE id=$1 AND technician_id=$2
    `,
    [bookingId, userId]
  );

  await pool.query(
    `
    UPDATE technicians
    SET active_bookings = active_bookings - 1
    WHERE user_id=$1
    `,
    [userId]
  );

  return { message: "Booking completed" };

}



async function rejectBooking(bookingId, userId) {

  await pool.query(
    `
    INSERT INTO booking_rejections
    (booking_id, technician_id)
    VALUES ($1,$2)
    `,
    [bookingId, userId]
  );

  await pool.query(
    `
    UPDATE technicians
    SET active_bookings = active_bookings - 1
    WHERE user_id=$1
    `,
    [userId]
  );

  return { message: "Booking rejected" };

}



async function getAllBookings() {

  const { rows } = await pool.query(
    `
    SELECT
      b.id,
      b.status,
      b.created_at,
      u.name as customer,
      t.name as technician,
      s.name as service

    FROM bookings b

    LEFT JOIN users u
    ON b.customer_id = u.id

    LEFT JOIN technicians tech
    ON b.technician_id = tech.user_id

    LEFT JOIN users t
    ON tech.user_id = t.id

    LEFT JOIN services s
    ON b.service_id = s.id

    ORDER BY b.created_at DESC
    `
  );

  return rows;

}



module.exports = {
  createBooking,
  acceptBooking,
  startBooking,
  completeBooking,
  rejectBooking,
  getAllBookings
};
