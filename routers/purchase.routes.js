const router = require('express').Router();

const PurchaseController = require("../controller/purchase.controller");

router.post('/add_purchase', PurchaseController.register);

router.get('/get_purchase', PurchaseController.getPurchase);

module.exports = router;
