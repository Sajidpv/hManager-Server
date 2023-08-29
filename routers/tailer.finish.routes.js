const router = require('express').Router();

const TailerFinishController = require("../controller/tailer.finish.controller");

router.post('/add_tailer_finished', TailerFinishController.register);

router.get('/get_tailer_finished', TailerFinishController.getFinishedTailer);

router.post('/update_tailer_finish_status/:id', TailerFinishController.updateStatus);

module.exports = router;
