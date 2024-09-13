const mongoose = require("mongoose");

const connectDB =async (MONGO_URI)=>{
    try {   
        await mongoose.connect(MONGO_URI);
        console.log("DB connected");
    } catch (error) {
        console.log("DB not connected");
    }
}
module.exports=connectDB;