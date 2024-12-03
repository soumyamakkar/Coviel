const mongoose=require("mongoose");

const connection=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Db connected")
    }
    catch(error){
        console.log("Error in connecting db",error.message);
    }
}

module.exports=connection