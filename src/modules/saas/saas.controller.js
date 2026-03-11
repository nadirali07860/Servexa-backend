const { createTenant, listTenants } = require('../../saas/tenantManager.service');
const { createOrganization } = require('../../saas/organization.service');
const { addCity } = require('../../saas/cityManager.service');
const { generateApiKey } = require('../../saas/apiKey.service');
const { calculateTenantUsage } = require('../../saas/billing.service');

exports.createTenant = async (req,res) => {

  const tenant = await createTenant(req.body.name);

  res.json({
    success:true,
    tenant
  });

};

exports.listTenants = async (req,res) => {

  const tenants = await listTenants();

  res.json({
    success:true,
    tenants
  });

};

exports.createOrganization = async (req,res) => {

  const org = await createOrganization(
    req.body.tenant_id,
    req.body.name
  );

  res.json({
    success:true,
    organization:org
  });

};

exports.addCity = async (req,res) => {

  await addCity(
    req.body.tenant_id,
    req.body.city_id
  );

  res.json({
    success:true,
    message:"City added"
  });

};

exports.generateApiKey = async (req,res) => {

  const key = generateApiKey();

  res.json({
    success:true,
    apiKey:key
  });

};

exports.billing = async (req,res) => {

  const bill = await calculateTenantUsage(
    req.body.tenant_id
  );

  res.json({
    success:true,
    bill
  });

};
