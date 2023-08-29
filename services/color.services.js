const ColorModel = require('../models/color.model');

class ColorServices {

    static async registerColor(color) {
        try {
            const addColor = new ColorModel({color});
            return await addColor.save();
        } catch (err) {
            throw err;
        }
    }

    static async checkcolor(color) {
        try {
            return await ColorModel.findOne({ color });
        } catch (error) {
            throw error
        }
    }
}

module.exports = ColorServices;
