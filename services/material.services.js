const MaterialModel = require('../models/material.model');
const CounterModel = require('../models/counter.model');
class MaterialService {

    static async registerMaterial(name, itemCode,id, hsn, quantity) {
        try {
            let counter = await CounterModel.findOne({ id: "itemCode" });
      
            let seqId;
            if (!counter) {
              const newCounter = new CounterModel({ id: "itemCode", seq: 1 });
              await newCounter.save();
              seqId = "M" + newCounter.seq.toString().padStart(2, "0");
            } else {
              counter.seq += 1;
              await counter.save();
              seqId = "M" + counter.seq.toString().padStart(2, "0");
            }
            const addMaterial = new MaterialModel({ name:name, itemCode:seqId, hsn:hsn, quantity:quantity });
            return await addMaterial.save();
        } catch (err) {
            throw err;
        }
    }

    static async checkmaterial(name) {
        try {
            return await MaterialModel.findOne({ name });
        } catch (error) {
            throw error
        }
    }
}

module.exports = MaterialService;
