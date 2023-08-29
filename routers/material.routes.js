const router = require('express').Router();

const MaterialController = require("../controller/material.controller");

router.post('/add_material', MaterialController.register);

router.get('/get_material', MaterialController.getMaterial);

router.post('/update_material/', MaterialController.updateMaterial);

router.post('/get_quantity_decrease/:id', MaterialController.updateQuantity);

router.post('/material_quantity_add/:id', MaterialController.addQuantity);

module.exports = router;
