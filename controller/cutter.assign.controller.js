
const CutterAssignModel = require("../models/cutter.assign.model");
const CutterAssignServices = require("../services/cutter.assign.services");

exports.register = async (req, res, next) => {
    try {
        const    { date,productId,stockID,employID,assignedQuantity} = req.body;
    
        const successRes = await CutterAssignServices.assignCutter(date,productId,stockID,employID,assignedQuantity);

        res.json({ status: true, message: "Assigned Succefully" });
    } catch (error) {
        res.json({ status: false, message:error });
    }
}


exports.getAssignCutter = async (req, res,next) => {
    try {
     
        let data = await CutterAssignServices.getAssignments();
    
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message)
    }
}
     

exports.updateStatus = async (req, res, next) => {
    
    try {
        const { status: newStatus } = req.body;
        const itemId = req.params.id;
    
        const item = await CutterAssignModel.findById(itemId);
    
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
    //   const item = await CutterAssignModel.findById(req.params.id);
    
    //   if (item) {
    //     let id = item._id;
    //     let updatedQuantity = item.quantity - req.body.quantity;
    //     let updatedData = { quantity: updatedQuantity };
  
    //     let options = { new: true };
        
    //       const data = await CutterAssignModel.findByIdAndUpdate(id, updatedData, options);
    //       res.json({ status: true, message: "Quantity updated" });
        
    //   } else {
    //      res.status(404).json({ status: false, message: "No item found" });
    //   }
    // } catch (error) {
    //     res.status(404).json({ status: false, message: error });
    // }
  };
  