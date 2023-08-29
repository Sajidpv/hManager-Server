const mongoose = require("mongoose");
const db = require('../config/db');
const ProductModel = require('./product.model');
const MaterialModel = require('./material.model');
const UserModel = require('./user.model');
const FinisherAssignModel = require('./finisher.assign.model');

const { Schema } = mongoose;

const finishedSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        require: true
    },
    finisherAssignID: {
        type: Schema.Types.ObjectId,
        ref: FinisherAssignModel.modelName,
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
    }, 
     damage: {
        type: Number,
        require: true
    }
 

});


const FinishedModel = db.model('finished-products', finishedSchema);
module.exports = FinishedModel;
 
