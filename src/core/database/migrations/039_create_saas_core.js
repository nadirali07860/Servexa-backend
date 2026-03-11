module.exports = {
  up: async (pool) => {

    /*
    TENANTS
    */

    await pool.query(`
      CREATE TABLE tenants (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);


    /*
    ORGANIZATIONS
    */

    await pool.query(`
      CREATE TABLE organizations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);


    /*
    TENANT CITIES
    */

    await pool.query(`
      CREATE TABLE tenant_cities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        city_name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);


    /*
    API KEYS
    */

    await pool.query(`
      CREATE TABLE tenant_api_keys (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        api_key TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);


    /*
    BILLING
    */

    await pool.query(`
      CREATE TABLE tenant_billing (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        amount NUMERIC,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

  },

  down: async (pool) => {

    await pool.query(`DROP TABLE IF EXISTS tenant_billing`);
    await pool.query(`DROP TABLE IF EXISTS tenant_api_keys`);
    await pool.query(`DROP TABLE IF EXISTS tenant_cities`);
    await pool.query(`DROP TABLE IF EXISTS organizations`);
    await pool.query(`DROP TABLE IF EXISTS tenants`);

  }
};
