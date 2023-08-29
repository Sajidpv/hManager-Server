const router = require('express').Router();

const ColorController = require("../controller/color.controller");

router.post('/add_color', ColorController.register);

router.get('/get_colors', ColorController.getColors);

module.exports = router;
