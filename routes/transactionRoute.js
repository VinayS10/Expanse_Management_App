const express = require('express')
const { addTransaction, getAllTransaction, editTransaction } = require('../controllers/transactionController')

//routes object
const router = express.Router()

//routers
//add transaction POST method
router.post('/add-tranction', addTransaction)

//edit transaction POST method
router.post('/edit-tranction', editTransaction)

//get transaction
router.post('/get-tranction',getAllTransaction)

module.exports = router