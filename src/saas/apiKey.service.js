const crypto = require('crypto');

function generateApiKey(){

  const key = crypto.randomBytes(32).toString('hex');

  console.log("Generated SaaS API Key");

  return key;

}

module.exports = { generateApiKey };
