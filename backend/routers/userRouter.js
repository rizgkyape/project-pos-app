const express = require('express');
const router = express.Router();

const { userController } = require('./../controllers');

router.post('/login', userController.loginAdmin);
router.post('/login/cashier', userController.loginCashier)

module.exports = router;
