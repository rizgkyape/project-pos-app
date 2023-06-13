const express = require('express');
const router = express.Router();

const { transactionController } = require('./../controllers');

// IMPORT ROUTER
router.get('/', transactionController.getAllOrderList)
router.get('/report', transactionController.getAllTransaction)
router.get('/report/aggregate', transactionController.salesAggregate)
router.post('/order/create', transactionController.createOrder)
router.post('/orderdetail', transactionController.createOrderDetail)
router.patch('/orderdetail/reduce', transactionController.reduceProduct)
router.patch('/oncharge', transactionController.onCharge)
router.get('/order/status', transactionController.checkStatusOrder)




module.exports = router;
