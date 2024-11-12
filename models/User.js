const mongoose = require("mongoose")

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    phone:{
        type:Number,
        required:true,
        trim:true,
        unique: true, // Ensure that mobile numbers are unique
        validate: {
        validator: function(v) {
            return /^\d{10}$/.test(v); // Ensure it's a 10-digit phone number
        },
        message: props => `${props.value} is not a valid phone number!`
    },
    },
    verified:{
        type:Boolean,
        default:false,
        required:false
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    posts:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    contacted:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    membership:{
        type:String,
        default:"No Active Membership"
    },
    profilePicture:{
        type:String,
        default:""
    },
    blockedUsers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }

},{timestamps:true})

const User=mongoose.model("User",UserSchema);

module.exports=User;