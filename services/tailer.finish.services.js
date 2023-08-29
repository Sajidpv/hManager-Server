const { json } = require("body-parser");
const TailerFinishModel = require("../models/tailer.finish.model");

class TailerFinishServices {

    static async finishTailer(date,tailerAssignID,batchId,productId,materialId,employId,color,finishedQuantity,damage) {
        try {
            const addToAssign = new TailerFinishModel({ date:date,tailerAssignID:tailerAssignID,batchId:batchId,productId:productId,materialId:materialId,employId:employId,color:color,finishedQuantity:finishedQuantity,damage:damage});
            return await addToAssign.save();
        } catch (err) {
            throw err;
        }
    }

 
    static async getFinishedData() {
        try {
          const result = await TailerFinishModel.aggregate([
            {
              $group: {
                _id: {
                  productId: "$productId",
                  batchId: "$batchId",
                  materialId: "$materialId"
                },
                colors: {
                  $push: {
                    color: "$color",
                    quantity: "$finishedQuantity",
                    id:"$_id"
                  }
                }
              }
            },
            {
              $group: {
                _id: {
                  productId: "$_id.productId"
                },
                batches: {
                  $push: {
                    batchId: "$_id.batchId",
                    materialId: "$_id.materialId",
                    colors: "$colors"
                  }
                }
              }
            },
            {
              $lookup: {
                from: "stocks",
                localField: "batches.materialId",
                foreignField: "_id",
                as: "material"
              }
            },
            {
              $lookup: {
                from: "products",
                localField: "_id.productId",
                foreignField: "_id",
                as: "products"
              }
            },
            {
              $unwind: "$batches"
            },
            {
              $lookup: {
                from: "stocks",
                localField: "batches.materialId",
                foreignField: "_id",
                as: "batches.material"
              }
            },
            {
              $group: {
                _id: "$_id",
                batches: {
                  $push: {
                    batchId: "$batches.batchId",
                    materialId: "$batches.materialId",
                    colors: "$batches.colors",
                    material: {
                      $arrayElemAt: ["$batches.material", 0]
                    }
                  }
                }, products: {
                  $first: "$products"
                }
              }
            }
          ]).exec();

            return result;
        } catch (err) {
            throw err;
        }
    }
    
}


module.exports = TailerFinishServices;
