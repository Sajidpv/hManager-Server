
const TailerFinishModel = require("../models/tailer.finish.model");
const TailerFinishServices = require("../services/tailer.finish.services");

exports.register = async (req, res, next) => {
    try {
        const    { date,tailerAssignID,batchId,productId,materialId,employId,color,finishedQuantity,damage} = req.body;
    
        const successRes = await TailerFinishServices.finishTailer(date,tailerAssignID,batchId,productId,materialId,employId,color,finishedQuantity,damage);

        res.status(200).json({ status: true, message: "Finished Succefully" });
    } catch (error) {
        res.json({ status: false, message:error });
    }
}


exports.getFinishedTailer = async (req, res,next) => {
    try {
     
        let data = await TailerFinishServices.getFinishedData();
    
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message)
    }
}
     
exports.updateStatus = async (req, res, next) => {
    try {
      const { status: newStatus } = req.body;
      const itemId = req.params.id;
  
      const item = await TailerFinishModel.findById(itemId);
  
      if (item) {
       console.log(item)
          item.status = newStatus;

          await item.save();
  
          res.json({ status: true, message: "Status updated" });
        } else {
          res.status(404).json({ status: false, message: "Item not found" });
        }
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  };

  