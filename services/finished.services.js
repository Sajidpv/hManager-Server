const { json } = require("body-parser");
const FinishedModel = require("../models/finished.model");

class FinishedServices {

    static async finishFinisher(date,finisherAssignID,batchId,productId,materialId,employId,color,finishedQuantity,damage,quantity) {
        try {
            const addToAssign = new FinishedModel({ date:date,finisherAssignID:finisherAssignID,batchId:batchId,productId:productId,materialId:materialId,employId:employId,color:color,finishedQuantity:finishedQuantity,damage:damage,quantity:quantity});
            return await addToAssign.save();
        } catch (err) {
            throw err;
        }
    }

 
    static async getFinishedData() {
        try {
            const result = await FinishedModel.aggregate([
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
                        quantity: "$finishedQuantity"
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
                        colors: {
                          $reduce: {
                            input: "$batches.colors",
                            initialValue: [],
                            in: {
                              $cond: [
                                { $in: ["$$this.color", "$$value.color"] },
                                {
                                  $map: {
                                    input: "$$value",
                                    as: "item",
                                    in: {
                                      $cond: [
                                        { $eq: ["$$item.color", "$$this.color"] },
                                        {
                                          color: "$$item.color",
                                          quantity: {
                                            $add: ["$$item.quantity", "$$this.quantity"]
                                          }
                                        },
                                        "$$item"
                                      ]
                                    }
                                  }
                                },
                                { $concatArrays: ["$$value", ["$$this"]] }
                              ]
                            }
                          }
                        },
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


module.exports = FinishedServices;
