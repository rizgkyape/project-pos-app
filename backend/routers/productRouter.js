const express = require('express');
const router = express.Router();

const { productController } = require('./../controllers');

// IMPORT ROUTER
router.get('/', productController.filterProductByName);

module.exports = router;
