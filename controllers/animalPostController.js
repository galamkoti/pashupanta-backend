const AnimalPost = require("../models/AnimalPost");
const Post = require("../models/Post");
const User = require("../models/User");

const getAnimalPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    try{
        const AnimalPostData = await Post.find({ kind: "AnimalPost" }).skip(skip).limit(limit);
        const totalPosts = await Post.countDocuments({ kind: "AnimalPost" });
        res.status(200).json({
            success: true,
            data: AnimalPostData,
            totalPosts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            msg: `Got all the Posts ${AnimalPostData}`
        });
    }
    catch(error){
        res.status(500).json({msg:"failed to fetch the posts"});
    }
}

const createAnimalPost = async (req, res) => {
    const { user, description, images, phone, price, locationName, animalType, breed, age } = req.body;
    const newAnimalPost = new AnimalPost({
        user, description, images, phone, price, locationName, animalType, breed, age
    });
    await newAnimalPost.save();
    await User.findByIdAndUpdate(user,
        {
            $push: { posts: newAnimalPost._id }
        });
    console.log(newAnimalPost)
    res.status(201).json({ message: "Animal Post Created!!" })
}
module.exports = { createAnimalPost, getAnimalPosts };