const mongoose = require("mongoose"); 

// Connect to mongoose
const connection=mongoose.createConnection("mongodb://localhost:27017/hManager").on('open',()=>{

    console.log("Connected to db");
}).on('error',()=>{
    console.log("Faild to Connected db");
});

module.exports=connection
