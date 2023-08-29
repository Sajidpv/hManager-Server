const mongoose = require("mongoose"); 

// Connect to mongoose
//const connection=mongoose.createConnection("mongodb://localhost:27017/hManager").on('open',()=>{
const connection=mongoose.createConnection("mongodb+srv://hmanage:hManage@hmanager.gmyn7uu.mongodb.net/hmanager").on('open',()=>{
    console.log("Connected to db");
}).on('error',()=>{
    console.log("Faild to Connected db");
});

module.exports=connection
