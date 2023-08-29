const router = require('express').Router();

const CutterFinishController = require("../controller/cutter.finish.controller");

router.post('/add_cutter_finish', CutterFinishController.register);

router.get('/get_cutter_finish', CutterFinishController.getFinishCutter);

router.get('/get_cutter_finish_all', CutterFinishController.getFinishCutterAggregate);

 router.post('/update_cutter_finish_status/:id', CutterFinishController.updateStatus);



module.exports = router;
