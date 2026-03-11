const pool = require('../core/database');

async function createOrganization(tenantId, name){

  const result = await pool.query(`
    INSERT INTO organizations (tenant_id, name)
    VALUES ($1,$2)
    RETURNING *
  `,[tenantId,name]);

  console.log("Organization created:", name);

  return result.rows[0];

}

module.exports = { createOrganization };
