
const CutterFinishServices = require("../services/cutter.finish.services");
const CutterFinishModel = require("../models/cutter.finish.model");

exports.register = async (req, res, next) => {
    try {
        const    {date,proAssignID,batchID,productId,materialId,employId,layerCount,meterLayer,pieceLayer,quantity,balance,damage,wastage } = req.body;
    
        const successRes = await CutterFinishServices.finishCutter(date,proAssignID,batchID,productId,materialId,employId,layerCount,meterLayer,pieceLayer,quantity,balance,damage,wastage);
        console.log('date:',date,'proAssignId', proAssignID,)
if(successRes)
        res.status(200).json({ status: true, message: "Finished Succefully" });
    } catch (error) {

        res.json({ status: false, message:error });
    }
}


exports.getFinishCutter = async (req, res,next) => {
    try {
     
        let data = await CutterFinishServices.getCutterFinish();
    
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message)
    }
}


exports.getFinishCutterAggregate = async (req, res,next) => {
    try {
     
        let data = await CutterFinishServices.getCutterFinishAll()
    
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message)
    }
}
           
exports.updateStatus = async (req, res, next) => {
  

  try {
    const { color, status: newStatus } = req.body;
    const itemId = req.params.id;

    // Find the cutter finish item by ID
    const item = await CutterFinishModel.findById(itemId);

    if (item) {
      console.log(item)
      // Find the specific quantity item within the quantity array
      const colorItem = item.quantity.find((item) => item.color === color);

      if (colorItem) {
        // Update the status value
        colorItem.status = newStatus;

        // Save the updated item
        await item.save();

        res.json({ status: true, message: "Status updated" });
      } else {
        res.status(404).json({ status: false, message: "Color item not found" });
      }
    } else {
      res.status(404).json({ status: false, message: "No item found" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
  
  // try {
  //     const { color, quantity: newQuantity } = req.body;
  //     const itemId = req.params.id;
  
  //     // Find the cutter finish item by ID
  //     const item = await CutterFinishModel.findById(itemId);
  
  //     if (item) {
  //       console.log(item)
  //       // Find the specific quantity item within the quantity array
  //       const colorItem = item.quantity.find((item) => item.color === color);
  
  //       if (colorItem) {
  //         // Update the quantity value
  //         colorItem.quantity -= newQuantity;
  
  //         // Save the updated item
  //         await item.save();
  
  //         res.json({ status: true, message: "Quantity updated" });
  //       } else {
  //         res.status(404).json({ status: false, message: "Color item not found" });
  //       }
  //     } else {
  //       res.status(404).json({ status: false, message: "No item found" });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ status: false, message: error.message });
  //   }
  };
  