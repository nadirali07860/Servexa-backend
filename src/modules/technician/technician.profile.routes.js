const express = require('express')
const router = express.Router()

const pool = require('../../core/database')
const authenticate = require('../../core/middleware/authenticate')

router.get(
'/profile',
authenticate,
async(req,res)=>{

 const { rows } = await pool.query(`
   SELECT
   t.user_id,
   u.name,
   u.phone,
   t.approved,
   t.active_bookings
   FROM technicians t
   JOIN users u
   ON u.id=t.user_id
   WHERE t.user_id=$1
 `,[req.user.id])

 res.json({
  success:true,
  data:rows[0]
 })

})

module.exports = router
