const ColorModel = require("../models/color.model");
const ColorServices = require("../services/color.services");

exports.register = async (req, res, next) => {
    try {
        const { color } = req.body;
        const item = await ColorServices.checkcolor(color);
       
        if (item) {
            res.json({ status: false, message: "Color already exist" });
        } else {
            const successRes = await ColorServices.registerColor(color);

            res.json({ status: true, message: "Color added Succefully" });
        }

    } catch (error) {
        res.json(error);
    }
}


exports.getColors = async (req, res) => {
    try {
        let data = await ColorModel.find();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

