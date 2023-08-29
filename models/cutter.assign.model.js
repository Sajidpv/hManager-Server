const mongoose = require("mongoose");
const db = require('../config/db');
const ProductModel = require('./product.model');
const MaterialModel = require('./material.model');
const UserModel = require('./user.model');
const { Schema } = mongoose;

const cutterAssgnSchema = new Schema({
   date: {
      type: Date,
      default: Date.now,
      require:true
   },
   batchID: {
      type: String,
      unique:true
   },
   productId: {
    type: Schema.Types.ObjectId,
        ref: ProductModel.modelName,
        require:true
 },
 stockID: {
    type: Schema.Types.ObjectId,
        ref: MaterialModel.modelName,
        require:true
 },
 employID: {
    type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        require:true
 },
 assignedQuantity: {
    type: Number,
    require:true
 },

status: {
   type: String,
   default:'Pending',
   require:true
 
}
}); 


const CutterAssignModel = db.model('assign-cutter', cutterAssgnSchema);
module.exports = CutterAssignModel;

