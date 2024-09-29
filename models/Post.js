const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        type:String,
        required:false
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
        required:false
    },
    viewed:{
        type:Number,
        default:0
    },
    price:{
        type:String,
        required:false
    },
    locationName:{
        type:String,
        required:false
    },
    location:{
        type:{
            type:String,
            default:'Point'
        },
        coordinates:{
            type:[Number],
            required:false
        }
    }
},{timestamps:true , discriminatorKey:'kind'})


const Post=mongoose.model("Post",postSchema);

Post.collection.createIndex({ location: '2dsphere' });

module.exports=Post;