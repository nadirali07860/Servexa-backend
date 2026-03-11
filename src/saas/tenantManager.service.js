const pool = require('../core/database');

async function createTenant(name){

  const result = await pool.query(`
    INSERT INTO tenants (name)
    VALUES ($1)
    RETURNING *
  `,[name]);

  console.log("New SaaS tenant created:", result.rows[0].name);

  return result.rows[0];

}

async function listTenants(){

  const tenants = await pool.query(`
    SELECT * FROM tenants
  `);

  return tenants.rows;

}

module.exports = {
  createTenant,
  listTenants
};
