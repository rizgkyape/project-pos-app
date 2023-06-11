const express = require('express');
const router = express.Router();

const { userController } = require('./../controllers');

router.post('/login', userController.loginAdmin);
router.post('/login/cashier', userController.loginCashier)
router.post('/register/cashier', userController.createCashier)
router.patch('/status/cashier', userController.statusCashier)
router.get('/cashier', userController.getCashierList)

module.exports = router;
