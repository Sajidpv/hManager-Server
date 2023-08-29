const router = require('express').Router();

const SupplierController = require("../controller/supplier.controller");

router.post('/register_supplier', SupplierController.register);

router.get('/get_supplier', SupplierController.getSupplier);

router.get('/get_supplier/:id', SupplierController.getSupplier);

router.delete('/delete_supplier/:id', SupplierController.deleteSupplier);

router.post('/update_supplier_status/:id', SupplierController.updateStatus);

module.exports = router;
