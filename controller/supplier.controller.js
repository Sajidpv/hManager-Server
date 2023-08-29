const SupplierModel = require("../models/supplier.model");
const SupplierService = require("../services/supplier.services");

exports.register = async (req, res, next) => {
    try {
        const { name, address, status } = req.body;

        const successRes = await SupplierService.registerSupplier(name, address, status);
        

        res.json({ status: true,message: "Supplier Registered Succefully" });
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


exports.getSupplier = async (req, res) => {
    try {
        let data;
        if (req.params.id) {
             data = await SupplierModel.findById(req.params.id);
        } else {
             data = await SupplierModel.find();
        }
         res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

exports.deleteSupplier = async (req, res) => {
    try {
        let data;
             data = await SupplierModel.findByIdAndDelete(req.params.id);
         res.status(200).json('Deleted Succesfully');
    } catch (error) {
        res.status(500).json(error.message);
    }
}


exports.updateStatus = async (req, res) => {
    
    let id =req.params.id;
    let options = { new: true };
    const item = await SupplierModel.findById(id);
if(item){
    
  try {
        const data = await SupplierModel.findByIdAndUpdate(id,{ status:req.body.status}, options);
        res.json({ status: true,message: 'Update status'});
    } catch (error) {
        res.send(error.message);

    }

}else{
    res.json({ status: false,message: " No Supplier found" });
}
  
}






    



