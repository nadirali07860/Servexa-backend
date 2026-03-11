const express = require('express')
const router = express.Router()
const pool = require('../../core/database')

/*
GET USER NOTIFICATIONS
*/

router.get('/:userId', async(req,res)=>{

 const {userId} = req.params

 const result = await pool.query(
 `
 SELECT *
 FROM notifications
 WHERE user_id=$1
 ORDER BY created_at DESC
 `,
 [userId]
 )

 res.json({
  success:true,
  data:result.rows
 })

})

/*
MARK AS READ
*/

router.post('/read/:id', async(req,res)=>{

 const {id} = req.params

 await pool.query(
 `
 UPDATE notifications
 SET is_read=true
 WHERE id=$1
 `,
 [id]
 )

 res.json({
  success:true
 })

})

module.exports = router
