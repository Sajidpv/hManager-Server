const router = require('express').Router();

const FinishedController = require("../controller/finished.controller");

router.post('/add_finisher_finished', FinishedController.register);

router.get('/get_finisher_finished', FinishedController.getFinishedData);



module.exports = router;
