const pool = require('../core/database');
const { smartDispatch } = require('../modules/bookings/booking.smartDispatch.service');

async function retryDispatch(bookingId){

  const booking = await pool.query(
    `SELECT * FROM bookings WHERE id=$1`,
    [bookingId]
  );

  if(!booking.rows.length) return;

  const b = booking.rows[0];

  const technicians = await smartDispatch(
    b.service_id,
    b.society_id,
    0,
    0
  );

  if(!technicians.length) return;

  for(const tech of technicians){

    if(tech !== b.technician_id){

      await pool.query(`
        UPDATE bookings
        SET technician_id=$1,
            status='ASSIGNED'
        WHERE id=$2
      `,[tech, bookingId]);

      await pool.query(`
        UPDATE technicians
        SET active_bookings = active_bookings + 1
        WHERE user_id=$1
      `,[tech]);

      break;

    }

  }

}

module.exports = { retryDispatch };
