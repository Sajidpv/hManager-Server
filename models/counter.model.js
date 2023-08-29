const mongoose = require("mongoose");
const db = require('../config/db');

const { Schema } = mongoose;

const couterSchema = new Schema({
   id: {
      type: String,

   },
   seq: {
      type: Number,
   }
}); 


const CounterModel = db.model('counter', couterSchema);
module.exports = CounterModel;