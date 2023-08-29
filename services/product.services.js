const ProductModel = require('../models/product.model');
const CounterModel = require('../models/counter.model');

class ProductService {

    static async registerProduct(name,itemCode) {
        try {
            let counter = await CounterModel.findOne({ id: "productCode" });
      
            let seqId;
            if (!counter) {
              const newCounter = new CounterModel({ id: "productCode", seq: 1 });
              await newCounter.save();
              seqId = "P" + newCounter.seq.toString().padStart(2, "0");
            } else {
              counter.seq += 1;
              await counter.save();
              seqId = "P" + counter.seq.toString().padStart(2, "0");
            }

            const addProduct = new ProductModel({name,itemCode:seqId });
            return await addProduct.save();
        } catch (err) {
            throw err;
        }
    }

    static async checkproduct(name) {
        try {
            return await ProductModel.findOne({ name });
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductService;
