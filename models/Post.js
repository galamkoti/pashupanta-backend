const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        type:String,
        required:true
    },
    description:{
        type:String,
        trim:true
    },
    images:[
        {
            type:String,
            required:false
        }
    ],
    phone:{
        type:Number,
        required:true
    },
    viewed:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:true
    },
    locationName:{
        type:String,
        required:true
    }
},{timestamps:true , discriminatorKey:'kind'})

const Post=mongoose.model("Post",postSchema);

module.exports=Post;