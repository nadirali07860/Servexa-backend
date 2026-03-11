const pool = require('../core/database');

async function addCity(tenantId, cityId){

  await pool.query(`
    INSERT INTO tenant_cities (tenant_id, city_id)
    VALUES ($1,$2)
  `,[tenantId, cityId]);

  console.log("City added to tenant:", cityId);

}

module.exports = { addCity };
