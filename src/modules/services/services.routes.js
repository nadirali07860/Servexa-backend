const express = require('express')
const router = express.Router()

const pool = require('../../core/database')

/*
GET SERVICES
*/

router.get('/',async(req,res)=>{

 const { rows } = await pool.query(
 'SELECT * FROM services ORDER BY name'
 )

 res.json({
  success:true,
  data:rows
 })

})

/*
SERVICE DETAILS
*/

router.get('/:id',async(req,res)=>{

 const { rows } = await pool.query(
 'SELECT * FROM services WHERE id=$1',
 [req.params.id]
 )

 res.json({
  success:true,
  data:rows[0]
 })

})

module.exports = router
