const express = require('express');
const router = express.Router();

const { productController } = require('./../controllers');
const { multerUpload } = require('./../middleware/multer');
const { verifyToken, checkRole } = require('./../middleware/auth');

// IMPORT ROUTER
router.get('/', productController.productsList);
router.get('/categories', productController.getCategory)
router.post('/', verifyToken, checkRole, multerUpload.single('image'), productController.create);
router.put(
	'/modify/:id',
	multerUpload.single('image'),
	productController.modify
);
router.delete('/delete/:id', verifyToken, checkRole, productController.delete);
router.post('/categories', verifyToken, checkRole, productController.createCategory);
router.put('/categories/modify/:id', verifyToken, checkRole, productController.modifyCategory);

module.exports = router;
