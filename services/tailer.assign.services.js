const { json } = require("body-parser");
const TailerAssignModel = require("../models/tailer.assign.model");

class TailerAssignServices {

    static async assignTailer(date,batchId,productId,materialId,employId,color,assignedQuantity) {
        try {
            const addToAssign = new TailerAssignModel({ date:date,batchId:batchId,productId:productId,materialId:materialId,employId:employId,color:color,assignedQuantity:assignedQuantity});
            return await addToAssign.save();
        } catch (err) {
            throw err;
        }
    }

 
    static async getAssignments() {
      try {
        const result = await TailerAssignModel.aggregate([
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


module.exports = TailerAssignServices;
