const express = require('express')
const router = express.Router()

router.get('/health',(req,res)=>{

 res.json({

  status:"ok",
  service:"servexa-backend",
  uptime:process.uptime(),
  time:new Date()

 })

})

router.get('/version',(req,res)=>{

 res.json({
  version:"1.0.0"
 })

})

module.exports = router
