const mongoose = require("mongoose");
const db = require('../config/db');
const ProductModel = require('./product.model');
const MaterialModel = require('./material.model');
const UserModel = require('./user.model');
const TailerAssignModel = require('./tailer.assign.model');

const { Schema } = mongoose;

const tailerFinishSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        require: true
    },
    tailerAssignID: {
        type: Schema.Types.ObjectId,
        ref: TailerAssignModel.modelName,
        require: true
    },
    batchId: {
        type: String,
        require: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: ProductModel.modelName,
        require: true
    },
    materialId: {
        type: Schema.Types.ObjectId,
        ref: MaterialModel.modelName,
        require: true
    },
    employId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    finishedQuantity: {
        type: Number,
        require: true
    },  damage: {
        type: Number,
        require: true
    },
   
    status: {
        type: String,
        default:'Pending',
        require:true
      
    }

});


const TailerFinishModel = db.model('finish-tailer', tailerFinishSchema);
module.exports = TailerFinishModel;

