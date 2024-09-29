const mongoose=require("mongoose");
const Post = require("./Post");

const animalPostSchema=new mongoose.Schema({    
    animalType: {
        type: String,
        required: false
    },
    breed: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    lactationPeriod:{
        type:Number,
        required:false
    },
    childPresent:{
        type:Boolean,
        required:false
    },
    milkCapacity:{
        type:Number,
        required:false
    },
    pregnancyStatus:{
        type:String,
        required:false
    },
    isBargainable:{
        type:String,
        required:false
    }
});

const AnimalPost=Post.discriminator('AnimalPost',animalPostSchema);

module.exports=AnimalPost;