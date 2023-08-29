const { json } = require("body-parser");
const CutterAssignModel = require("../models/cutter.assign.model");
const CounterModel = require('../models/counter.model');
class CutterAssignServices {

    static async assignCutter(date,productId,stockID,employID,assignedQuantity) {
        try {

            let counter = await CounterModel.findOne({ id: "batchId" });
      
            let seqId;
            if (!counter) {
              const newCounter = new CounterModel({ id: "batchId", seq: 1 });
              await newCounter.save();
              seqId = "BATCH" + newCounter.seq.toString().padStart(2, "0");
            } else {
              counter.seq += 1;
              await counter.save();
              seqId = "BATCH" + counter.seq.toString().padStart(2, "0");
            }
        
            const addToAssign = new CutterAssignModel({ date:date,batchID:seqId,productId:productId,stockID:stockID,employID:employID,assignedQuantity:assignedQuantity});
            return await addToAssign.save();
        } catch (err) {
            throw err;
        }
    }

 
    static async getAssignments() {
      try {
        const result = await CutterAssignModel.aggregate([
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
              localField: "stockID",
              foreignField: "_id",
              as: "material"
            }
          },
          {
            $lookup: {
              from: "users",
              localField: "employID",
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


module.exports = CutterAssignServices;
