const express = require('express');
const router = express.Router();

const { productController } = require('./../controllers');
const { multerUpload } = require('./../middleware/multer');

// IMPORT ROUTER
router.get('/', productController.productsList);
router.post('/', multerUpload.single('image'), productController.create);
router.put(
	'/modify/:id',
	multerUpload.single('image'),
	productController.modify
);
router.delete('/delete/:id', productController.delete);
router.post('/categories', productController.createCategory);
router.put('/categories/modify/:id', productController.modifyCategory);

module.exports = router;
