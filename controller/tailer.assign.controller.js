
const TailerAssignModel = require("../models/tailer.assign.model");
const TailerAssignServices = require("../services/tailer.assign.services");

exports.register = async (req, res, next) => {
    try {
        const    { date,batchId,productId,materialId,employId,color,assignedQuantity} = req.body;
    
        const successRes = await TailerAssignServices.assignTailer(date,batchId,productId,materialId,employId,color,assignedQuantity);

        res.json({ status: true, message: "Assigned Succefully" });
    } catch (error) {
        res.json({ status: false, message:error });
    }
}


exports.getAssignTailer = async (req, res,next) => {
    try {
     
        let data = await TailerAssignServices.getAssignments();
    
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message)
    }
}
     

           
exports.updateStatus = async (req, res, next) => {
    try {
      const { status: newStatus } = req.body;
      const itemId = req.params.id;
  
      const item = await TailerAssignModel.findById(itemId);
  
      if (item) {
       
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
  