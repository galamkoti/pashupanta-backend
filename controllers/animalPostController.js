const AnimalPost = require("../models/AnimalPost");
const Post = require("../models/Post");
const User = require("../models/User");

const getAnimalPosts = async (req, res) => {
    const AnimalPostData = await Post.find({ kind: "AnimalPost" });
    res.status(200).json({ msg: `Got all the Posts ${AnimalPostData}` });
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
module.exports = { createAnimalPost ,getAnimalPosts };