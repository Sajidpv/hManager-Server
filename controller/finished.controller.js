
const FinishedServices = require("../services/finished.services");

exports.register = async (req, res, next) => {
    try {
        const    { date,finisherAssignID,batchId,productId,materialId,employId,color,finishedQuantity,damage,quantity} = req.body;
    
        const successRes = await FinishedServices.finishFinisher(date,finisherAssignID,batchId,productId,materialId,employId,color,finishedQuantity,damage,quantity);

        res.status(200).json({ status: true, message: "Finished Succefully" });
    } catch (error) {
        res.json({ status: false, message:error });
    }
}


exports.getFinishedData = async (req, res,next) => {
    try {
     
        let data = await FinishedServices.getFinishedData();
    
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message)
    }
}
     


  