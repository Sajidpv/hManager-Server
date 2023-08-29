const { json } = require("body-parser");
const FinisherAssignModel = require("../models/finisher.assign.model");

class FinisherAssignServices {

    static async assignFinisher(date,batchId,productId,materialId,employId,color,assignedQuantity,tailerFinishId) {
        try {
            const addToAssign = new FinisherAssignModel({ date:date,batchId:batchId,productId:productId,materialId:materialId,employId:employId,color:color,assignedQuantity:assignedQuantity,tailerFinishId:tailerFinishId});
            return await addToAssign.save();
        } catch (err) {
            throw err;
        }
    }

 
    static async getAssignments() {
      try {
        const result = await FinisherAssignModel.aggregate([
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "product"
            }
          },
          {
            $lookup: {
              from: "stocks",
              localField: "materialId",
              foreignField: "_id",
              as: "material"
            }
          },
     
          {
            $lookup: {
              from: "users",
              localField: "employId",
              foreignField: "_id",
              as: "employ"
            }
          }
        ]).exec();
        return result;
      } catch (err) {
        throw err;
      }
    }
    
}


module.exports = FinisherAssignServices;
