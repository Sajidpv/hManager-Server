const PurchaseModel = require("../models/purchase.model");
const PurchaseService = require("../services/purchase.services");

exports.register = async (req, res, next) => {
    try {
        const { date,supplier,invoice,description,items,totalAmount } = req.body;

        const successRes = await PurchaseService.registerPurchase(date,supplier,invoice,description,items,totalAmount);

        res.json({ status: true, message: "Purchase added Succefully" });
    } catch (error) {
            res.json(error);
    }
}


exports.getPurchase = async (req, res) => {
    try {
     
        let data = await PurchaseService.getPurchases();
        res.status(200).json({message:'success',data:data,});
    } catch (error) {
        res.status(500).json(error.message)
    }
}





    



