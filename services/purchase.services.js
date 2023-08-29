const PurchaseModel = require('../models/purchase.model');
const CounterModel = require('../models/counter.model');
class PurchaseService {

    static async registerPurchase(date,supplier,invoice,description,items,totalAmount) {
        try {

            let counter = await CounterModel.findOne({ id: "purID" });
      
            let seqId;
            if (!counter) {
              const newCounter = new CounterModel({ id: "purID", seq: 1 });
              await newCounter.save();
              seqId = "PUR" + newCounter.seq.toString().padStart(4, "0");
            } else {
              counter.seq += 1;
              await counter.save();
              seqId = "PUR" + counter.seq.toString().padStart(4, "0");
            }
        
            const addPurchase = new PurchaseModel({date:date,supplier:supplier,purID:seqId,invoice:invoice,description:description,items:items,totalAmount:totalAmount });
            return await addPurchase.save();
        } catch (err) {
            throw err;
        }
    }

    static async getPurchases() {
      try {
        const result = await PurchaseModel.aggregate([
          {
            $lookup: {
              from: "suppliers",
              localField: "supplier",
              foreignField: "_id",
              as: "supplier"
            }
          },
          {$lookup: {
            from: "stocks",
            localField: "items.material",
            foreignField: "_id",
            as: "mat"
          }
        }
          
        ]).exec();
        return result;
      } catch (err) {
        throw err;
      }
    }
    
}

module.exports = PurchaseService;
