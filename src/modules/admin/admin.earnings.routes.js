const express = require('express')
const router = express.Router()

const pool = require('../../core/database')

/*
PLATFORM EARNINGS
*/

router.get('/earnings', async(req,res)=>{

 const revenue = await pool.query(
 `
 SELECT SUM(commission_amount) as total
 FROM bookings
 WHERE status='COMPLETED'
 `
 )

 res.json({
  success:true,
  data:{
   revenue: revenue.rows[0].total || 0
  }
 })

})

module.exports = router
