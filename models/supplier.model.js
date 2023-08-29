const mongoose = require("mongoose"); 
const db=require('../config/db');

const{Schema}=mongoose;

const suppSchema=new Schema({

     name: {
        type:String,
        required:true,
     } ,  
     address: {
        type:String,
        required:true,
     }, 
     status: {
        type:String,
        required:true,
     }
});
 

const SupplierModel=db.model('suppliers',suppSchema);
module.exports=SupplierModel;