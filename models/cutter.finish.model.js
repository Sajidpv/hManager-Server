const mongoose = require("mongoose");
const db = require('../config/db');
const ProductModel = require('./product.model');
const MaterialModel = require('./material.model');
const UserModel = require('./user.model');
const CutterAssignModelModel = require('./cutter.assign.model');

const { Schema } = mongoose;

const cutterFinishSchema = new Schema({
   date: {
      type: Date,
      default: Date.now,
      require:true
   },
   proAssignID: {
    type: Schema.Types.ObjectId,
    ref: CutterAssignModelModel.modelName,
    require:true
   },
   batchId: {
    type: String,
    require:true,

 },
   productId: {
    type: Schema.Types.ObjectId,
        ref: ProductModel.modelName,
        require:true
 },
 materialId: {
    type: Schema.Types.ObjectId,
        ref: MaterialModel.modelName,
        require:true
 },
 employId: {
    type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        require:true
 },
 layerCount: {
    type: Number,
    require:true
 },
 meterCount: {
    type: Number,
    require:true
 },
 pieceCount: {
    type: Number,
    require:true
 },
 quantity: [
    {

        color: {
            type:String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        status: {
         type: String,
         default:'Pending',
         require:true
     }
    },
],
 balance: {
  type: Number,
  require:true
},
damage: {
    type: Number,
    require:true
 },
 wastage: {
    type: Number,
    require:true
 },
}); 


const CutterFinishModel = db.model('finish-cutter', cutterFinishSchema);
module.exports = CutterFinishModel;

