const express = require('express');
const router = express.Router();

const { transactionController } = require('./../controllers');
const { verifyToken, checkRole } = require('./../middleware/auth');

// IMPORT ROUTER
router.get('/', transactionController.getAllOrderList)
router.post('/order/create', transactionController.createOrder)
router.post('/orderdetail', transactionController.createOrderDetail)
router.patch('/orderdetail/reduce', transactionController.reduceProduct)
router.patch('/oncharge', transactionController.onCharge)
router.get('/order/status', transactionController.checkStatusOrder)
router.get(
	'/report/aggregate',
	verifyToken,
	checkRole,
	transactionController.salesAggregate
);

module.exports = router;
