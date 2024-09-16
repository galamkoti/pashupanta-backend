const mongoose=require("mongoose");
const Post = require("./Post");

const animalPostSchema=new mongoose.Schema({    
    animalType: {
        type: String,
        required: true
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
    }
});

const AnimalPost=Post.discriminator('AnimalPost',animalPostSchema);

module.exports=AnimalPost;