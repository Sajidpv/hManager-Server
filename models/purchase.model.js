const mongoose = require("mongoose");
const db = require('../config/db');
const SupplierModel = require('../models/supplier.model');
const MaterialModel = require('../models/material.model');

const { Schema } = mongoose;

const purchaseSchema = new Schema({

  
    date: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
    },
    supplier:
    {
        type: Schema.Types.ObjectId,
        ref: SupplierModel.modelName,
    } ,
    purID: {
        type: String,
        unique: true
     },
    invoice: {
        type: String,
    },
    items: [
        {

            material: {
                type: Schema.Types.ObjectId,
                ref: MaterialModel.modelName,
            },
            quantity: {
                type: Number,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            sum: {
                type: Number,
                required: true,
            }
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    }
});


const PurchaseModel = db.model('material-purchase', purchaseSchema);
module.exports = PurchaseModel;