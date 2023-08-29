const mongoose = require("mongoose"); 
const db=require('../config/db');

const{Schema}=mongoose;

const proSchema=new Schema({

     name: {
        type:String,
        required:true,
     } ,  
     itemCode: {
        type:String,
     }
});
 

const ProductModel=db.model('products',proSchema);
module.exports=ProductModel;