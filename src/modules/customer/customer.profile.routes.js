const express = require('express')
const router = express.Router()

const authenticate = require('../../core/middleware/authenticate')
const pool = require('../../core/database')

/*
GET CUSTOMER PROFILE
*/
router.get(
'/profile',
authenticate,
async (req,res)=>{

const { rows } = await pool.query(
'SELECT id,full_name,phone FROM users WHERE id=$1',
[req.user.id]
)

res.json({
success:true,
data:rows[0]
})

}
)

/*
CUSTOMER BOOKINGS LIST
*/
router.get(
'/bookings',
authenticate,
async(req,res)=>{

const { rows } = await pool.query(
`
SELECT *
FROM bookings
WHERE customer_id=$1
ORDER BY created_at DESC
`,
[req.user.id]
)

res.json({
success:true,
data:rows
})

}
)

/*
BOOKING DETAILS
*/
router.get(
'/bookings/:id',
authenticate,
async(req,res)=>{

const { rows } = await pool.query(
`
SELECT *
FROM bookings
WHERE id=$1 AND customer_id=$2
`,
[req.params.id,req.user.id]
)

res.json({
success:true,
data:rows[0]
})

}
)

module.exports = router
