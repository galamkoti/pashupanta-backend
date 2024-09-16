const mongoose = require("mongoose");
const Post = require("./Post");

const cropPostSchema = new mongoose.Schema({
    cropType: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    harvestDate: {
        type: Date,
        required: false
    }
});

const CropPost = Post.discriminator('CropPost', cropPostSchema);

module.exports = CropPost;