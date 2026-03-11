const express = require('express');
const router = express.Router();

const controller = require('./saas.controller');

router.post('/tenant', controller.createTenant);

router.get('/tenants', controller.listTenants);

router.post('/organization', controller.createOrganization);

router.post('/city', controller.addCity);

router.get('/apikey', controller.generateApiKey);

router.post('/billing', controller.billing);

module.exports = router;
