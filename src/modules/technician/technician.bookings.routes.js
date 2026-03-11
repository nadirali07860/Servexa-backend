const express = require('express')
const router = express.Router()

const authenticate = require('../../middleware/authenticate')
const pool = require('../../core/database')

/*
TECHNICIAN BOOKINGS
*/

router.get(
'/bookings',
authenticate,
async(req,res)=>{

 const { rows } = await pool.query(
 `
 SELECT *
 FROM bookings
 WHERE technician_id=$1
 ORDER BY created_at DESC
 `,
 [req.user.id]
 )

 res.json({
  success:true,
  data:rows
 })

})

module.exports = router
