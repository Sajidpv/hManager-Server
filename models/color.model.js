const mongoose = require("mongoose"); 
const db=require('../config/db');

const{Schema}=mongoose;

const colorSchema=new Schema({

     color: {
        type:String,
        required:true,
     } 
});
 

const ColorModel=db.model('colors',colorSchema);
module.exports=ColorModel;