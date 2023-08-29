const { json } = require("body-parser");
const CutterFinishModel = require("../models/cutter.finish.model");
class CutterFinishServices {

    static async finishCutter(date, proAssignID, batchId, productId, materialId, employId, layerCount, meterCount, pieceCount, quantity, balance, damage, wastage) {
        try {
            const addToFinish = new CutterFinishModel({ date: date, proAssignID: proAssignID, batchId: batchId, productId: productId, materialId: materialId, employId: employId, layerCount: layerCount, meterCount: meterCount, pieceCount: pieceCount, quantity: quantity, balance: balance, damage: damage, wastage: wastage });

            return await addToFinish.save();
        } catch (err) {
            throw err;
        }
    }


    static async getCutterFinish() {
        try {
            const result = await CutterFinishModel.aggregate([
                {
                    $lookup: {
                        from: "assign-cutters",
                        localField: "proAssignId",
                        foreignField: "_id",
                        as: "proAssignId"
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "productId"
                    }
                },
                {
                    $lookup: {
                        from: "stocks",
                        localField: "materialId",
                        foreignField: "_id",
                        as: "materialId"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "employId",
                        foreignField: "_id",
                        as: "employId"
                    }
                },

            ]).exec();
            return result;
        } catch (err) {
            throw err;
        }
    }


    static async getCutterFinishAll() {
        try {
          const result = await CutterFinishModel.aggregate([
            {
              $unwind: "$quantity"
            },
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
                    quantity: "$quantity",
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
                },
                products: {
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


module.exports = CutterFinishServices;
