
const FinisherAssignModel = require("../models/finisher.assign.model");
const FinisherAssignServices = require("../services/finisher.assign.services");

exports.register = async (req, res, next) => {
    try {
        const    { date,batchId,productId,materialId,employId,color,assignedQuantity,tailerFinishId} = req.body;
    
        const successRes = await FinisherAssignServices.assignFinisher(date,batchId,productId,materialId,employId,color,assignedQuantity,tailerFinishId);

        res.json({ status: true, message: "Assigned Succefully" });
    } catch (error) {
        res.json({ status: false, message:error });
    }
}


exports.getAssignFinisher = async (req, res,next) => {
    try {
     
        let data = await FinisherAssignServices.getAssignments();
    
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message)
    }
}
     

exports.updateStatus = async (req, res, next) => {

    try {
        const { status: newStatus } = req.body;
        const itemId = req.params.id;
    
        const item = await FinisherAssignModel.findById(itemId);
    
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

    // try {
    //   const { quantity } = req.body;
    //   const item = await FinisherAssignModel.findById(req.params.id);
    
    //   if (item) {
    //     let id = item._id;
    //     let updatedQuantity = item.quantity - req.body.quantity;
    //     let updatedData = { quantity: updatedQuantity };
  
    //     let options = { new: true };
        
    //       const data = await FinisherAssignModel.findByIdAndUpdate(id, updatedData, options);
    //       res.json({ status: true, message: "Quantity updated" });
        
    //   } else {
    //      res.status(404).json({ status: false, message: "No item found" });
    //   }
    // } catch (error) {
    //     res.status(404).json({ status: false, message: error });
    // }
  };
  