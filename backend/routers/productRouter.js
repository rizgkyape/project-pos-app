const express = require('express');
const router = express.Router();

const { productController } = require('./../controllers');

// IMPORT ROUTER
router.get('/', productController.productsList)
router.get('/getcategory', productController.getCategory)

module.exports = router;
