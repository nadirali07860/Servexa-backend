const pool = require('../core/database');

async function calculateTenantUsage(tenantId){

  const usage = await pool.query(`
    SELECT COUNT(*) as bookings
    FROM bookings
    WHERE tenant_id = $1
  `,[tenantId]);

  const bookings = parseInt(usage.rows[0].bookings);

  const bill = bookings * 2;

  console.log("Tenant bill calculated:", bill);

  return bill;

}

module.exports = { calculateTenantUsage };
