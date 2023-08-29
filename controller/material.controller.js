const MaterialModel = require("../models/material.model");
const MaterialService = require("../services/material.services");

exports.register = async (req, res, next) => {
    try {
        const { name, itemCode } = req.body;
        const item = await MaterialService.checkmaterial(name);

        if (item) {
            let id = item._id;
            let updatedData = req.body;
            updatedData.quantity=item.quantity+req.body.quantity;
            let options = { new: true };
            try {
                const data = await MaterialModel.findByIdAndUpdate(id, updatedData, options);
                res.json({ status: true, message: "Quantity updated" });
              } catch (error) {
                res.send(error.message);
        
              }
            

        } else {

            const { name, itemCode,id, hsn, quantity } = req.body;

            const successRes = await MaterialService.registerMaterial(name, itemCode,id, hsn, quantity);

            res.json({ status: true, message: "Material added Succefully" });
        }


    } catch (error) {
        if (error.code === 11000) {
            res.json({ message: 'Alredy Exist', status: false });
            console.log('already exist');
        } else {
            console.log(error);
            res.json(error);
        }
    }
}


exports.getMaterial = async (req, res) => {
    try {
        let data;
        if (req.params.id) {
             data = await MaterialModel.findById(req.params.id);
        } else {
             data = await MaterialModel.find();
        }
         res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message)
    }
}


exports.updateMaterial = async (req, res,next) => {
    try {
        const { material } = req.body;
        const item = await MaterialModel.findById(material);
        if (item) {
            let id = item._id;
            quantity=item.quantity+req.body.quantity;
            let updatedData = { quantity: quantity }; 
          
            let options = { new: true };
            try {
                const data = await MaterialModel.findByIdAndUpdate(id, updatedData, options);
                res.json({ status: true, message: "Quantity updated" });
              } catch (error) {
                res.send(error.message);
        
              }
            

        } else {

            const { name, itemCode, hsn, quantity } = req.body;

            const successRes = await MaterialService.registerMaterial(name, itemCode, hsn, quantity);

            res.json({ status: true, message: "Material added Succefully" });
        }


    } catch (error) {
        if (error.code === 11000) {
            res.json({ message: 'Alredy Exist', status: false });
        } else {
            res.json(error);
        }
    }

    
}

exports.updateQuantity = async (req, res, next) => {
    try {
      const { quantity } = req.body;
      const item = await MaterialModel.findById(req.params.id);
     
      if (item) {
        let id = item._id;
        let updatedQuantity = item.quantity - req.body.quantity;
        let updatedData = { quantity: updatedQuantity };
  
        let options = { new: true };
        
          const data = await MaterialModel.findByIdAndUpdate(id, updatedData, options);
          res.json({ status: true, message: "Quantity updated" });
        
      } else {
         res.status(404).json({ status: false, message: "No item found" });
      }
    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
  };

  exports.addQuantity = async (req, res, next) => {
    try {
      const { quantity } = req.body;
      const item = await MaterialModel.findById(req.params.id);
     
      if (item) {
        let id = item._id;
        let updatedQuantity = item.quantity + req.body.quantity;
        let updatedData = { quantity: updatedQuantity };
  
        let options = { new: true };
        
          const data = await MaterialModel.findByIdAndUpdate(id, updatedData, options);
          res.json({ status: true, message: "Quantity updated" });
        
      } else {
         res.status(404).json({ status: false, message: "No item found" });
      }
    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
  };
  
 