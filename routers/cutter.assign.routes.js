const router = require('express').Router();

const CutterAssignController = require("../controller/cutter.assign.controller");

router.post('/add_cutter_assign', CutterAssignController.register);

router.get('/get_cutter_assign', CutterAssignController.getAssignCutter);

router.post('/update_cutter_assign_status/:id', CutterAssignController.updateStatus);



module.exports = router;
