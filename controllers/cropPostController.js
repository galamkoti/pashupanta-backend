const CropPost = require("../models/CropPost");
const Post = require("../models/Post");
const User = require("../models/User");

const getCropsPosts = async (req, res) => {
    const CropsPostData = await Post.find({ kind: "CropPost" });
    res.status(200).json({ msg: `Got all the Posts ${CropsPostData}` });
}
const createCropPost = async (req, res) => {
    const { user, description, images, phone, price, locationName, cropType, quantity } = req.body;
    const newCropPost = new CropPost({ user, description, images, phone, price, locationName , cropType, quantity });
    await newCropPost.save();
    await User.findByIdAndUpdate(user,
        {
            $push:{posts:newCropPost._id}
        });
    console.log(newCropPost)
    res.status(201).json({ message: "Crop Post Created Successfully" });
}

module.exports = { createCropPost, getCropsPosts };