const mongoose = require("mongoose"); 
const db=require('../config/db');

const{Schema}=mongoose;

const materialSchema=new Schema({

     name: {
        type:String,
        required:true,
     } ,  
     itemCode: {
        type:String,
     }, 
     hsn: {
        type:String,
     },
     quantity: {
        type:Number,
     }
});
 

const MaterialModel=db.model('stock',materialSchema);
module.exports=MaterialModel;