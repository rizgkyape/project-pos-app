const express = require('express');
const router = express.Router();

const { productController } = require('./../controllers');
const { multerUpload } = require('./../middleware/multer');

// IMPORT ROUTER
router.get('/', productController.productsList);
router.post('/', multerUpload.single('image'), productController.create);

module.exports = router;
