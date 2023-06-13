const express = require('express');
const router = express.Router();

const { userController } = require('./../controllers');
const { verifyToken, checkRole } = require('./../middleware/auth');

router.post('/login', userController.loginAdmin);
router.post('/login/cashier', userController.loginCashier);
router.post(
	'/register/cashier',
	verifyToken,
	checkRole,
	userController.createCashier
);
router.patch(
	'/status/cashier',
	verifyToken,
	checkRole,
	userController.statusCashier
);
router.get('/cashier', verifyToken, checkRole, userController.getCashierList);

module.exports = router;
