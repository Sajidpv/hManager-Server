const SupplierModel=require('../models/supplier.model');

class SupplierService{

   static async registerSupplier(name,address,status){
       try{
const createSupplier=new SupplierModel({name,address,status});
return await createSupplier.save();
       }catch(err){         
           throw err;
       }
   }
}

module.exports=SupplierService;
