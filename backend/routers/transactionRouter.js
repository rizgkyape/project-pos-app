const express = require('express');
const router = express.Router();

const { transactionController } = require('./../controllers');

// IMPORT ROUTER
router.get('/report', transactionController.getAllTransaction)
router.get('/report/aggregate', transactionController.salesAggregate)


module.exports = router;
