const ProductModel = require("../models/product.model");
const ProductService = require("../services/product.services");

exports.register = async (req, res, next) => {
    try {
        const { name } = req.body;
        const item = await ProductService.checkproduct(name);
        if (item) {
            res.json({ status: false, message: "Product already exist" });
        } else {
            const successRes = await ProductService.registerProduct(name);

            res.json({ status: true, message: "Product added Succefully" });
        }

    } catch (error) {
        res.json(error);
    }
}


exports.getProduct = async (req, res) => {
    try {
        let data = await ProductModel.find();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message)
    }
}


