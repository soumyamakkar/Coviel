const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:["male","female","other"],
        required:true,
    },
    year:{
        type:String,
        enum:["1","2","3","4"],
        required:true,
    },
    branch:{
        type:String,
        enum:["CSE"],
        required:true,
    }
})

const User=mongoose.model("user",userSchema)
module.exports=User;