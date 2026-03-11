const express = require('express')
const router = express.Router()

const pool = require('../../core/database')
const authenticate = require('../../core/middleware/authenticate')
const requirePermission = require('../../shared/middlewares/permission.middleware')

router.get(
'/users',
authenticate,
requirePermission('manage_users'),
async(req,res)=>{

 const { rows } = await pool.query(`
   SELECT id,name,phone,role
   FROM users
   ORDER BY created_at DESC
 `)

 res.json({
  success:true,
  data:rows
 })

})

module.exports = router
