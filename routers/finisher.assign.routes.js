const router = require('express').Router();

const FinisherAssignController = require("../controller/finisher.assign.controller");

router.post('/add_finisher_assign', FinisherAssignController.register);

router.get('/get_finisher_assign', FinisherAssignController.getAssignFinisher);

router.post('/update_finisher_assign_status/:id', FinisherAssignController.updateStatus);

module.exports = router;
