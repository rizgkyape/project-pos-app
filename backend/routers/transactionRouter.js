const express = require('express');
const router = express.Router();

const { transactionController } = require('./../controllers');
const { verifyToken, checkRole } = require('./../middleware/auth');

// IMPORT ROUTER
router.get(
	'/report/aggregate',
	verifyToken,
	checkRole,
	transactionController.salesAggregate
);

module.exports = router;
