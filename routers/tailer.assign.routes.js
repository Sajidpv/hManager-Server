const router = require('express').Router();

const TailerAssignController = require("../controller/tailer.assign.controller");

router.post('/add_tailer_assign', TailerAssignController.register);

router.get('/get_tailer_assign', TailerAssignController.getAssignTailer);

router.post('/update_tailer_assign_status/:id', TailerAssignController.updateStatus);

module.exports = router;
