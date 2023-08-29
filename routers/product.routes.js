const router = require('express').Router();

const ProductController = require("../controller/product.controller");

router.post('/register_product', ProductController.register);

router.get('/get_product', ProductController.getProduct);


module.exports = router;
